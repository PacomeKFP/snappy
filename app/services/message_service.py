# app/services/message_service.py

from sqlalchemy.orm import Session
from app.models.message_model import Message
from app.crud.message_crud import create_message, get_last_messages
from app.services.gemini_service import generate_answer

# Fonction pour enregistrer un message et gérer la logique de réponse conditionnelle
def process_message(request_data, db: Session):
    # Enregistrer le message dans la base de données
    new_message = create_message(db, request_data)
    
    # Si conversationMode == 1, générer une réponse
    if request_data.conversationMode == 1:
        # Récupérer les 10 derniers messages de la conversation
        recent_messages = get_last_messages(db, request_data.conversation)
        
        # Construire le contexte pour Gemini
        user_message_sample = "\n".join([msg.content for msg in reversed(recent_messages)])
        prompt = f"repond a comme si tu voulais immiter  : {user_message_sample}\n\nQuestion : {request_data.content}"
        
        # Générer la réponse avec Gemini
        answer = generate_answer(prompt)
        return answer
    
    return None  # Aucun traitement spécial pour conversationMode == 0
