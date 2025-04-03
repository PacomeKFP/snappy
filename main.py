import uuid
import numpy as np
from fastapi import FastAPI, HTTPException , Query
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from sklearn.metrics.pairwise import cosine_similarity

from models import (
    InitRequest, InitResponse, CreateRequest, CreateResponse, InstancesResponse, InstanceInfo,
    InferRequest, InferResponse, HistoryRequest, HistoryResponse, MessageHistory
)
from database import SessionLocal, ChatbotDB, EmbeddingDB, ConversationDB, MessageDB
from utils.extract_text_from_pdf import extract_text_from_pdf
from utils.split_text_into_chunks import split_text_into_chunks
from utils.generate_embeddings import generate_embeddings

# Configuration de Google Gemini
genai.configure(api_key="AIzaSyAfCi7g6555XvHg2Qfr84eX04J3fo5kvz8")
model = genai.GenerativeModel('gemini-1.5-pro')

app = FastAPI(title="Chatbot RAG API")

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/init", response_model=InitResponse)
async def init_chatbot(request: InitRequest):
    db = SessionLocal()
    try:
        # Vérifier si le chatbot existe déjà
        existing_chatbot = db.query(ChatbotDB).filter(ChatbotDB.id == request.id).first()
        if existing_chatbot:
            raise HTTPException(status_code=400, detail="Chatbot déjà initialisé")

        # Traiter les pièces jointes (PDF)
        for attachment in request.chatbotAttachements:
            if attachment.mimetype == "application/pdf":
                # Extraire le texte du PDF
                text = extract_text_from_pdf(attachment.path)

                # Diviser le texte en chunks
                chunks = split_text_into_chunks(text)

                # Générer des embeddings pour chaque chunk
                embeddings = generate_embeddings(chunks)

                # Sauvegarder chaque embedding dans la base de données
                for embedding in embeddings:
                    embedding_id = uuid.uuid4()
                    embedding_list = embedding.tolist()
                    embedding_db = EmbeddingDB(
                        id=embedding_id,
                        accesskeys=str(request.accesskeys),
                        embedding=embedding_list,
                    )
                    db.add(embedding_db)

        # Enregistrer le chatbot dans la base de données
        chatbot = ChatbotDB(
            id=request.id,
            accesskeys=str(request.accesskeys),
            label=request.label,
            prompt=request.prompt,
            description=request.description,
            projectId=request.projectId,
            languageModel=request.languageModel,
            chatbotAttachements=[attachment.dict() for attachment in request.chatbotAttachements],
        )
        db.add(chatbot)
        db.commit()
        db.refresh(chatbot)

        return InitResponse(status="success", message="Chatbot initialisé avec succès")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Erreur lors de l'initialisation du chatbot : {str(e)}")
    finally:
        db.close()

@app.post("/create", response_model=CreateResponse)
async def create_chatbot_instance(request: CreateRequest):
    db = SessionLocal()
    try:
        # Vérifier si le chatbot existe
        chatbot = db.query(ChatbotDB).filter(ChatbotDB.accesskeys == request.accesskeys).first()
        if not chatbot:
            raise HTTPException(status_code=404, detail="Chatbot non trouvé")

        # Générer un idInstanceChat unique
        idInstanceChat = str(uuid.uuid4())

        # Créer une nouvelle instance de conversation
        conversation = ConversationDB(
            idInstanceChat=idInstanceChat,
            accesskeys=request.accesskeys,
        )
        db.add(conversation)
        db.commit()
        db.refresh(conversation)

        return CreateResponse(idInstanceChat=idInstanceChat)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Erreur lors de la création de l'instance : {str(e)}")
    finally:
        db.close()

@app.post("/infer", response_model=InferResponse)
async def infer_chatbot_response(request: InferRequest):
    db = SessionLocal()
    try:
        # Vérifier si l'instance de conversation existe
        conversation = db.query(ConversationDB).filter(ConversationDB.idInstanceChat == request.idInstanceChat).first()
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation non trouvée")

        # Récupérer les embeddings associés au chatbot
        embeddings = db.query(EmbeddingDB).filter(EmbeddingDB.accesskeys == conversation.accesskeys).all()
        if not embeddings:
            raise HTTPException(status_code=404, detail="Aucun embedding trouvé pour ce chatbot")

        # Convertir les embeddings en tableau numpy
        embeddings_list = [np.array(embedding.embedding).reshape(1, -1) for embedding in embeddings]
        embeddings_array = np.vstack(embeddings_list)

        # Diviser le message de l'utilisateur en chunks
        chunks = split_text_into_chunks(text=request.message)

        # Générer un embedding pour le message de l'utilisateur
        user_message_embedding = np.array(generate_embeddings(chunks))
        user_message_embedding = user_message_embedding.reshape(1, -1)

        # Calculer la similarité cosinus entre le message et les embeddings
        similarities = cosine_similarity(user_message_embedding, embeddings_array)[0]

        # Trouver l'embedding le plus similaire
        most_similar_index = np.argmax(similarities)
        most_similar_embedding = embeddings[most_similar_index]

        # Récupérer le contexte de la conversation
        messages = db.query(MessageDB).filter(
            MessageDB.idInstanceChat == request.idInstanceChat
        ).order_by(MessageDB.timestamp.desc()).limit(5).all()

        conversation_history = "\n".join(
            [f"User: {msg.message}\nBot: {msg.response}" for msg in reversed(messages)]
        )

        # Utiliser Google Gemini pour générer une réponse
        prompt = f"""Contexte documentaire: {most_similar_embedding.embedding}

Historique de conversation:
{conversation_history}

Question: {request.message}

Réponds de manière naturelle et précise:"""

        response = model.generate_content(prompt).text

        # Enregistrer le message et la réponse
        message_id = uuid.uuid4()
        user_message = MessageDB(
            id=message_id,
            idInstanceChat=request.idInstanceChat,
            message=request.message,
            response=response,
        )
        db.add(user_message)
        db.commit()
        db.refresh(user_message)

        return InferResponse(response=response)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Erreur lors de l'interaction avec le chatbot : {str(e)}")
    finally:
        db.close()

@app.post("/history", response_model=HistoryResponse)
async def get_conversation_history(request: HistoryRequest):
    db = SessionLocal()
    try:
        # Vérifier si l'instance de conversation existe
        conversation = db.query(ConversationDB).filter(ConversationDB.idInstanceChat == request.idInstanceChat).first()
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation non trouvée")

        # Récupérer les messages
        messages = db.query(MessageDB).filter(
            MessageDB.idInstanceChat == request.idInstanceChat
        ).order_by(MessageDB.timestamp).all()
        
        # Convertir les messages en format de réponse
        message_history = [
            MessageHistory(
                id=str(message.id),
                message=message.message,
                response=message.response,
                timestamp=message.timestamp
            )
            for message in messages
        ]
        
        return HistoryResponse(
            idInstanceChat=request.idInstanceChat,
            accesskeys=conversation.accesskeys,
            messages=message_history
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération de l'historique : {str(e)}")
    finally:
        db.close()


# Ajouter cette route à votre API
@app.get("/instances", response_model=InstancesResponse)
async def get_instances(accessKey: str = Query(...)):
    db = SessionLocal()
    try:
        # Vérifier si le chatbot existe
        chatbot = db.query(ChatbotDB).filter(ChatbotDB.accesskeys == accessKey).first()
        if not chatbot:
            raise HTTPException(status_code=404, detail="Chatbot non trouvé")
        
        # Obtenir les instances de conversation pour ce chatbot
        conversations = db.query(ConversationDB).filter(ConversationDB.accesskeys == accessKey).all()
        
        # Créer la liste des instances
        instances = []
        for idx, conversation in enumerate(conversations, start=1):
            # Compter le nombre de messages dans cette conversation
            messages_count = db.query(MessageDB).filter(MessageDB.idInstanceChat == conversation.idInstanceChat).count()
            
            instances.append({
                "idInstanceChat": conversation.idInstanceChat,
                "created_at": conversation.created_at.isoformat() if hasattr(conversation, "created_at") else "",
                "messages_count": messages_count,
                "index": idx
            })
        
        # Créer les infos du chatbot
        chatbot_info = {
            "label": chatbot.label,
            "description": chatbot.description
        }
        
        return {
            "chatbotInfo": chatbot_info,
            "instances": instances
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération des instances: {str(e)}")
    finally:
        db.close()




@app.get("/")
async def root():
    return {"message": "Chatbot RAG API fonctionne correctement!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)