import uuid
import numpy as np
from fastapi import FastAPI, HTTPException , Query
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from sklearn.metrics.pairwise import cosine_similarity
import openai
import cohere
import requests
import os # Pour les bonnes pratiques futures
from models import (
    InitRequest, InitResponse, CreateRequest, CreateResponse, InstancesResponse, InstanceInfo,
    InferRequest, InferResponse, HistoryRequest, HistoryResponse, MessageHistory,
     LLMListResponse, UpdateChatbotLLMRequest, UpdateChatbotLLMResponse # Importer les nouveaux modèles
)
from database import SessionLocal, ChatbotDB, EmbeddingDB, ConversationDB, MessageDB
from utils.extract_text_from_pdf import extract_text_from_pdf
from utils.split_text_into_chunks import split_text_into_chunks
from utils.generate_embeddings import generate_embeddings



LLM_CONFIG = {
    "gemini-pro": {
        "api_key": "AIzaSyAfCi7g6555XvHg2Qfr84eX04J3fo5kvz8", # Votre clé Gemini
        "model_name": "gemini-1.5-pro", # Nom du modèle chez Google
        "library": "google-generativeai" # Indique comment interagir
    },
    "openai-gpt-3.5": {
        "api_key": "sk-proj-...", # Votre clé OpenAI
        "model_name": "gpt-3.5-turbo", # Nom du modèle chez OpenAI
        "library": "openai" # Indique comment interagir
    },
    "cohere-chat": {
        "api_key": "dceIuAXGLozLXz2fywlTIiaFib9GlK6uVjcrfckc", # Votre clé Cohere
        "model_name": "command-r", # Exemple de modèle Cohere (vous pouvez en choisir un autre)
        "library": "cohere"
    },
    "huggingface-mistral": {
        "api_key": "hf_rJzcenbdkxhbaxoPyPy...", # Votre clé Hugging Face
        "model_name": "mistralai/Mistral-7B-Instruct-v0.1", # Nom du modèle chez HF
        "api_url": "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1", # Endpoint spécifique si nécessaire
        "library": "requests" # Indique d'utiliser la bibliothèque requests pour une API HTTP
    },
     "groq-llama-scout": {
        "api_key": "gsk_bXb1YkxAmnhkPWH4...", # Votre clé Groq
        "model_name": "meta-llama/llama-4-scout-17b-16e-instruct", # Nom du modèle chez Groq
        "api_url": "https://api.groq.com/openai/v1/chat/completions", # Endpoint OpenAI-compatible
        "library": "requests" # On utilisera requests, bien qu'openai lib soit aussi possible
    }
}


genai.configure(api_key=LLM_CONFIG["gemini-pro"]["api_key"]) # Utilise la clé du config

# Pour OpenAI, il faut définir la clé globale
openai.api_key = LLM_CONFIG["openai-gpt-3.5"]["api_key"]

# Pour Cohere, il faut une instance Client
cohere_client = cohere.Client(LLM_CONFIG["cohere-chat"]["api_key"])


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



# @app.post("/infer", response_model=InferResponse)
# async def infer_chatbot_response(request: InferRequest):
#     db = SessionLocal()
#     try:
#         # Vérifier si l'instance de conversation existe
#         conversation = db.query(ConversationDB).filter(ConversationDB.idInstanceChat == request.idInstanceChat).first()
#         if not conversation:
#             raise HTTPException(status_code=404, detail="Conversation non trouvée")

#         # Récupérer les embeddings associés au chatbot
#         embeddings = db.query(EmbeddingDB).filter(EmbeddingDB.accesskeys == conversation.accesskeys).all()
#         if not embeddings:
#             raise HTTPException(status_code=404, detail="Aucun embedding trouvé pour ce chatbot")

#         # Convertir les embeddings en tableau numpy
#         embeddings_list = [np.array(embedding.embedding).reshape(1, -1) for embedding in embeddings]
#         embeddings_array = np.vstack(embeddings_list)

#         # Diviser le message de l'utilisateur en chunks
#         chunks = split_text_into_chunks(text=request.message)

#         # Générer un embedding pour le message de l'utilisateur
#         user_message_embedding = np.array(generate_embeddings(chunks))
#         user_message_embedding = user_message_embedding.reshape(1, -1)

#         # Calculer la similarité cosinus entre le message et les embeddings
#         similarities = cosine_similarity(user_message_embedding, embeddings_array)[0]

#         # Trouver l'embedding le plus similaire
#         most_similar_index = np.argmax(similarities)
#         most_similar_embedding = embeddings[most_similar_index]

#         # Récupérer le contexte de la conversation
#         messages = db.query(MessageDB).filter(
#             MessageDB.idInstanceChat == request.idInstanceChat
#         ).order_by(MessageDB.timestamp.desc()).limit(5).all()

#         conversation_history = "\n".join(
#             [f"User: {msg.message}\nBot: {msg.response}" for msg in reversed(messages)]
#         )

#         # Utiliser Google Gemini pour générer une réponse
#         prompt = f"""Contexte documentaire: {most_similar_embedding.embedding}

# Historique de conversation:
# {conversation_history}

# Question: {request.message}

# Réponds de manière naturelle et précise:"""

#         response = model.generate_content(prompt).text

#         # Enregistrer le message et la réponse
#         message_id = uuid.uuid4()
#         user_message = MessageDB(
#             id=message_id,
#             idInstanceChat=request.idInstanceChat,
#             message=request.message,
#             response=response,
#         )
#         db.add(user_message)
#         db.commit()
#         db.refresh(user_message)

#         return InferResponse(response=response)
#     except Exception as e:
#         db.rollback()
#         raise HTTPException(status_code=500, detail=f"Erreur lors de l'interaction avec le chatbot : {str(e)}")
#     finally:
#         db.close()


@app.post("/infer", response_model=InferResponse)
async def infer_chatbot_response(request: InferRequest):
    """
    Interagit avec une instance de conversation de chatbot RAG.
    """
    db = SessionLocal()
    try:
        # 1. Vérifier si l'instance de conversation existe
        conversation = db.query(ConversationDB).filter(ConversationDB.idInstanceChat == request.idInstanceChat).first()
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation non trouvée")

        # 2. Récupérer le chatbot associé pour connaître le LLM à utiliser
        # L'accesskeys est stocké dans la conversation, lié au chatbot
        chatbot = db.query(ChatbotDB).filter(ChatbotDB.accesskeys == conversation.accesskeys).first()
        if not chatbot:
            # Cette situation ne devrait normalement pas arriver si la conversation existe et est bien liée
            raise HTTPException(status_code=500, detail="Configuration du chatbot associée introuvable.")

        llm_to_use = chatbot.languageModel # Obtenir le nom du LLM configuré pour CE chatbot

        # 3. Vérifier si le LLM configuré est actuellement supporté par l'API
        if llm_to_use not in LLM_CONFIG:
             # Ceci gère le cas où un LLM a été configuré mais n'est plus dans LLM_CONFIG
             raise HTTPException(status_code=500, detail=f"Le LLM configuré pour ce chatbot ('{llm_to_use}') n'est pas disponible ou supporté par l'API.")


        # 4. Récupérer les embeddings associés au chatbot (pour le RAG)
        # Nous avons besoin de l'embedding ET du texte source pour le contexte
        embeddings_db_list = db.query(EmbeddingDB).filter(EmbeddingDB.accesskeys == conversation.accesskeys).all()

        retrieved_context = "Aucun document de référence pertinent trouvé." # Contexte par défaut si pas d'embeddings ou pas de match

        if embeddings_db_list:
            # Convertir les embeddings en tableau numpy pour le calcul de similarité
            embeddings_vectors = [np.array(emb.embedding).reshape(1, -1) for emb in embeddings_db_list]
            embeddings_array = np.vstack(embeddings_vectors)

            # 5. Générer un embedding pour le message de l'utilisateur
            # generate_embeddings prend une liste, donc [request.message]
            user_message_embeddings = generate_embeddings([request.message]) # Retourne List[np.ndarray]

            if not user_message_embeddings or user_message_embeddings[0] is None or user_message_embeddings[0].size == 0:
                # Gérer le cas où l'embedding du message utilisateur a échoué
                 print("Attention: Échec de la génération de l'embedding pour le message utilisateur. Le RAG ne sera pas effectué.")
                 # Le retrieved_context reste le message par défaut "Aucun document..."
            else:
                user_message_embedding = user_message_embeddings[0].reshape(1, -1)

                # 6. Calculer la similarité cosinus entre le message et les embeddings documentaires
                similarities = cosine_similarity(user_message_embedding, embeddings_array)[0]

                # 7. Trouver l'embedding le plus similaire et récupérer le texte associé
                most_similar_index = np.argmax(similarities)
                most_similar_score = similarities[most_similar_index]

                # Optionnel: Ajouter un seuil de similarité
                SIMILARITY_THRESHOLD = 0.5 # Définir un seuil pertinent
                if most_similar_score > SIMILARITY_THRESHOLD:
                    most_similar_embedding_db = embeddings_db_list[most_similar_index]
                    # Assurez-vous que EmbeddingDB a bien la colonne 'text'
                    retrieved_context = most_similar_embedding_db.text
                    print(f"Contexte RAG récupéré (score: {most_similar_score:.4f}):\n{retrieved_context[:200]}...") # Log les premiers caractères pour debug
                else:
                    print(f"Meilleur score de similarité ({most_similar_score:.4f}) en dessous du seuil ({SIMILARITY_THRESHOLD}). Pas de contexte RAG pertinent récupéré.")
                    # Le retrieved_context reste le message par défaut

        # 8. Récupérer le contexte de la conversation (historique)
        # Récupérer les N derniers messages pour maintenir un historique (par exemple, 10)
        # On trie par timestamp ASC pour avoir l'ordre chronologique
        messages = db.query(MessageDB).filter(
            MessageDB.idInstanceChat == request.idInstanceChat
        ).order_by(MessageDB.timestamp.asc()).limit(10).all() # Limit the history size

        # Formatage de l'historique pour le prompt du LLM
        conversation_history = "\n".join(
            [f"User: {msg.message}\nBot: {msg.response}" for msg in messages]
        )
        # Ajouter une nouvelle ligne avant l'historique s'il y en a
        if conversation_history:
             conversation_history = "\n" + conversation_history


        # 9. Utiliser la fonction utilitaire get_llm_response pour générer la réponse
        try:
            # Passez le nom du LLM configuré, le contexte RAG, l'historique et la question
            response_text = get_llm_response(
                llm_name=llm_to_use,
                context=retrieved_context,
                history=conversation_history,
                query=request.message
            )
        except Exception as llm_error:
            # Gérer les erreurs spécifiques survenant lors de l'appel à l'API LLM
            db.rollback() # Annuler toute opération DB en cours avant de remonter l'erreur
            print(f"Erreur lors de l'appel de l'API LLM ({llm_to_use}): {llm_error}") # Log l'erreur pour debug
            raise HTTPException(status_code=500, detail=f"Erreur lors de l'interaction avec le modèle de langage ({llm_to_use}): {str(llm_error)}")


        # 10. Enregistrer le message utilisateur et la réponse générée dans l'historique
        message_id = uuid.uuid4()
        user_message_db = MessageDB(
            id=message_id,
            idInstanceChat=request.idInstanceChat,
            message=request.message,
            response=response_text, # Enregistre la réponse obtenue du LLM
        )
        db.add(user_message_db)
        db.commit() # Commit les changements (sauvegarde du message)
        db.refresh(user_message_db) # Rafraîchit l'objet pour obtenir le timestamp généré par la DB

        # 11. Retourner la réponse au client
        return InferResponse(response=response_text)

    except HTTPException as http_exc:
        # Les HTTPException (404, 500 contrôlées) sont attrapées ici pour rollback avant de les relancer
        db.rollback()
        raise http_exc # Relance l'exception HTTP pour qu'FastAPI la gère

    except Exception as e:
        # Attrape toute autre exception inattendue
        db.rollback() # Assurez-vous d'annuler en cas d'erreur
        print(f"Erreur inattendue lors de l'inférence: {e}") # Log l'erreur pour investigation
        raise HTTPException(status_code=500, detail=f"Une erreur interne est survenue lors du traitement de votre requête : {str(e)}")
    finally:
        # S'assure que la session DB est fermée dans tous les cas
        db.close()
# --- Fin de la route /infer ---




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



@app.get("/llms", response_model=LLMListResponse)
async def list_available_llms():
    """
    Liste les modèles de langage (LLM) disponibles configurés dans l'API.
    """
    # Récupérer les noms des LLM depuis la configuration
    available_llm_names = list(LLM_CONFIG.keys())

    # Retourner la liste dans le format du modèle Pydantic
    return LLMListResponse(available_llms=available_llm_names)




@app.put("/chatbot/{accesskeys}/llm", response_model=UpdateChatbotLLMResponse)
async def update_chatbot_llm(
    accesskeys: str, # Paramètre de chemin
    request: UpdateChatbotLLMRequest # Corps de la requête
):
    """
    Change le modèle de langage (LLM) utilisé par un chatbot spécifique.
    """
    db = SessionLocal()
    try:
        # 1. Récupérer le chatbot par accesskeys
        chatbot = db.query(ChatbotDB).filter(ChatbotDB.accesskeys == accesskeys).first()

        # 2. Vérifier si le chatbot existe
        if not chatbot:
            raise HTTPException(status_code=404, detail="Chatbot non trouvé")

        # 3. Récupérer le nom du nouveau LLM depuis la requête
        new_llm_name = request.new_llm_name

        # 4. Valider si le nouveau LLM est supporté (important !)
        if new_llm_name not in LLM_CONFIG:
             raise HTTPException(status_code=400, detail=f"LLM '{new_llm_name}' non supporté. Les LLM disponibles sont : {list(LLM_CONFIG.keys())}")


        # 5. Mettre à jour le champ languageModel du chatbot
        chatbot.languageModel = new_llm_name

        # 6. Enregistrer les modifications dans la base de données
        db.commit()
        db.refresh(chatbot) # Optionnel, rafraîchit l'objet avec les données DB

        return UpdateChatbotLLMResponse(status="success", message=f"LLM du chatbot mis à jour vers '{new_llm_name}'")

    except HTTPException as http_exc:
         db.rollback() # Annuler les changements en cas d'erreur HTTP contrôlée
         raise http_exc # Relancer l'exception HTTP
    except Exception as e:
        db.rollback() # Annuler les changements en cas d'erreur inattendue
        raise HTTPException(status_code=500, detail=f"Erreur lors de la mise à jour du LLM du chatbot : {str(e)}")
    finally:
        db.close()




@app.get("/")
async def root():
    return {"message": "Chatbot RAG API fonctionne correctement!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)






def get_llm_response(llm_name: str, context: str, history: str, query: str) -> str:
    """
    Appelle l'API du LLM spécifié pour générer une réponse.
    """
    llm_config = LLM_CONFIG.get(llm_name)
    if not llm_config:
        raise ValueError(f"Configuration pour LLM '{llm_name}' introuvable.")

    api_key = llm_config["api_key"]
    model_name = llm_config.get("model_name") # Certains APIs n'ont pas ce champ

    # Construire le prompt ou les messages selon l'API
    # C'est ici qu'il faut adapter le format du prompt pour chaque LLM
    # Pour l'exemple, nous allons créer un prompt textuel simple pour tous
    # Dans un cas réel, vous devriez adapter le format des messages pour chaque API
    # (ex: messages=[{"role": "user", "content": ...}] pour OpenAI/Groq)
    full_prompt_text = f"""Contexte documentaire:
{context}

Historique de conversation:
{history}

Question: {query}

Réponds de manière naturelle et précise en utilisant le contexte fourni. Si la réponse n'est pas dans le contexte, dis que tu ne sais pas.
"""

    # Appel de l'API en fonction de la bibliothèque/configuration
    try:
        if llm_config["library"] == "google-generativeai":
            # Initialisation globale déjà faite, utiliser le modèle
            # Note : genai.configure(api_key=...) ne devrait être appelée qu'une fois
            # Nous ré-utilisons l'instance de 'model' si elle correspond au nom
            # Sinon, il faudrait instancier le modèle ici
            current_model = genai.GenerativeModel(model_name or LLM_CONFIG["gemini-pro"]["model_name"]) # Utilisez le nom du modèle configuré
            response = current_model.generate_content(full_prompt_text).text
            return response

        elif llm_config["library"] == "openai":
            # L'api_key est déjà définie globalement
            response = openai.ChatCompletion.create(
                model=model_name,
                messages=[
                    {"role": "system", "content": "You are a helpful assistant that answers questions based on the provided context."},
                    {"role": "user", "content": full_prompt_text} # Ou structurer différemment
                ]
            )
            return response['choices'][0]['message']['content']

        elif llm_config["library"] == "cohere":
            # L'instance client est déjà créée
            response = cohere_client.chat(
                message=full_prompt_text,
                # Vous pouvez ajouter 'connectors' ou 'documents' ici si Cohere le permet
                # pour utiliser le contexte de manière native si l'API le supporte.
                # Pour l'instant, on met tout dans le message/prompt.
            )
            return response.text

        elif llm_config["library"] == "requests":
             api_url = llm_config["api_url"]
             headers = {"Authorization": f"Bearer {api_key}"}
             model_name_for_api = llm_config.get("model_name", "") # Certains APIs HF n'ont pas besoin de "model_name" dans le body, d'autres si. Groq oui.

             # Adapter le corps de la requête selon l'API (HF vs Groq)
             if "huggingface.co" in api_url:
                 # Hugging Face Inference API
                 payload = {"inputs": full_prompt_text}
                 hf_response = requests.post(api_url, headers=headers, json=payload)
                 hf_response.raise_for_status() # Lève une exception pour les codes d'état d'erreur
                 # Le format de réponse HF est souvent une liste [{"generated_text": "..."}]
                 return hf_response.json()[0]["generated_text"]

             elif "groq.com" in api_url:
                 # Groq API (format compatible OpenAI Chat Completions)
                 payload = {
                     "model": model_name_for_api, # Groq demande le nom du modèle
                     "messages": [
                         {"role": "system", "content": "You are a helpful assistant that answers questions based on the provided context."},
                         {"role": "user", "content": full_prompt_text}
                         ] # Le prompt peut être structuré comme OpenAI
                     }
                 groq_response = requests.post(api_url, headers=headers, json=payload)
                 groq_response.raise_for_status()
                 # Le format de réponse Groq est comme OpenAI
                 return groq_response.json()['choices'][0]['message']['content']

             else:
                  raise ValueError(f"Endpoint API inconnu pour le LLM '{llm_name}': {api_url}")


        else:
            raise ValueError(f"Bibliothèque LLM '{llm_config['library']}' non supportée.")

    except Exception as e:
        # Gérer les erreurs d'API spécifiques ici
        print(f"Erreur lors de l'appel de l'API LLM {llm_name}: {e}")
        # Vous pourriez vouloir lever une HTTPException ici,
        # ou retourner un message d'erreur standard.
        # Pour l'instant, on relance.
        raise e