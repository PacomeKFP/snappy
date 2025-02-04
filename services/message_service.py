from sqlalchemy.orm import Session
from models.message_model import Message
from repositories.message_repository import create_message, get_last_messages
from services.gemini_service import generate_answer

def process_message(request_data, db: Session):
    # Création et sauvegarde du message en base
    new_message = create_message(db, request_data)

    # Si le mode est "on", générer une réponse de l'IA
    if request_data.mode == "on":
        # Marquer comme écrit par un humain
        new_message.isWrittenByHuman = True
        db.commit()

        # Récupérer les 10 derniers messages
        recent_messages = get_last_messages(db, request_data.sender)
        conversation_context = "\n".join([msg.body for msg in reversed(recent_messages)])
        
        # Construire le prompt
        prompt = f"Réponds comme si tu imitais l'utilisateur : {conversation_context}\n\nQuestion : {request_data.body}"
        
        # Générer la réponse avec Gemini
        answer = generate_answer(prompt)
        
        # Sauvegarder la réponse de l'IA
        ai_response = Message(
            sender="AI",
            receiver=request_data.sender,
            body=answer,
            projectId=request_data.projectId,
            isWrittenByHuman=False,
            mode="listen",
        )
        db.add(ai_response)
        db.commit()
        db.refresh(ai_response)

        return ai_response # Retourne la réponse générée

    return None  # Mode "listen", aucun traitement IA
