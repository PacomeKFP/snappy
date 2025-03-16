from fastapi import FastAPI, HTTPException
from models import InitRequest, InitResponse ,CreateRequest, CreateResponse , InferRequest , InferResponse , HistoryRequest, HistoryResponse, MessageHistory
from database import SessionLocal, ChatbotDB, EmbeddingDB , ConversationDB , MessageDB
from utils.generate_embeddings import generate_embeddings
from utils.extract_text_from_pdf import extract_text_from_pdf
from utils.split_text_into_chunks import split_text_into_chunks
import uuid
import google.generativeai as genai
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity




# Configuration de Google Gemini
genai.configure(api_key="AIzaSyAfCi7g6555XvHg2Qfr84eX04J3fo5kvz8")
model = genai.GenerativeModel('gemini-pro')  # Utilisez le modèle approprié


app = FastAPI()

@app.post("/init", response_model=InitResponse)
async def init_chatbot(request: InitRequest):
    db = SessionLocal()
    try:
        # Vérifiez si le chatbot existe déjà
        existing_chatbot = db.query(ChatbotDB).filter(ChatbotDB.id == str(request.id)).first()
        if existing_chatbot:
            raise HTTPException(status_code=400, detail="Chatbot déjà initialisé")

        # Traitement des pièces jointes (PDF)
        for attachment in request.chatbotAttachements:
            if attachment.mimetype == "application/pdf":
                # Extrait le texte du PDF
                text = extract_text_from_pdf(attachment.path)

                # Divise le texte en chunks
                chunks = split_text_into_chunks(text)

                # Génère des embeddings pour chaque chunk
                embeddings = generate_embeddings(chunks)

               # Sauvegarde chaque embedding dans la base de données
                for embedding in embeddings:
                    embedding_id = (uuid.uuid4())  # Génère un UUID unique pour l'embedding
                    embedding_list = embedding.tolist()  # Convertit le tableau NumPy en liste
                    embedding_db = EmbeddingDB(
                        id=embedding_id,
                        accesskeys=str(request.accesskeys),  # Associe l'embedding au chatbot
                        embedding=embedding_list,  # Stocke l'embedding sous forme de liste
                    )
                    db.add(embedding_db)


        # Enregistrez le chatbot dans la base de données
        chatbot = ChatbotDB(
            id=str(request.id),  # Convertit UUID en chaîne
            accesskeys=str(request.accesskeys),  # Convertit UUID en chaîne
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
        # Vérifiez si le chatbot existe
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
        # Vérifiez si l'instance de conversation existe
        conversation = db.query(ConversationDB).filter(ConversationDB.idInstanceChat == request.idInstanceChat).first()
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation non trouvée")

        # Récupérer les embeddings associés au chatbot via accesskeys
        embeddings = db.query(EmbeddingDB).filter(EmbeddingDB.accesskeys == conversation.accesskeys).all()
        if not embeddings:
            raise HTTPException(status_code=404, detail="Aucun embedding trouvé pour ce chatbot")

        # Convertir les embeddings en tableau numpy
        embeddings_list = [np.array(embedding.embedding).reshape(1, -1) for embedding in embeddings]  # Assure une forme 2D
        embeddings_array = np.vstack(embeddings_list)  # Concatène les embeddings en une seule matrice 2D

        # Diviser le message de l'utilisateur en chunks (si nécessaire)
        chunks = split_text_into_chunks(text=request.message)

        # Générer un embedding pour le message de l'utilisateur
        user_message_embedding = np.array(generate_embeddings(chunks))  # Génère les embeddings pour chaque chunk
        user_message_embedding = user_message_embedding.reshape(1, -1)  # Assure une forme 2D

        # Calculer la similarité cosinus entre le message et les embeddings
        similarities = cosine_similarity(user_message_embedding, embeddings_array)[0]

        # Trouver l'embedding le plus similaire
        most_similar_index = np.argmax(similarities)
        most_similar_embedding = embeddings[most_similar_index]

        # Utiliser Google Gemini pour générer une réponse
        prompt = f"Contexte : {most_similar_embedding.embedding}\nQuestion : {request.message} reponse de facon naturel"
        response = model.generate_content(prompt).text

        # Enregistrer le message de l'utilisateur et la réponse dans la base de données
        message_id = str(uuid.uuid4())
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

        # Récupérer tous les messages liés à cette conversation
        messages = db.query(MessageDB).filter(MessageDB.idInstanceChat == request.idInstanceChat).order_by(MessageDB.timestamp).all()
        
        # Convertir les messages en modèle Pydantic
        message_history = [
            MessageHistory(
                id=message.id,
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