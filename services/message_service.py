from sqlalchemy.orm import Session
from models.message_model import Message , MessagingMode
from repositories.message_repository import create_message, get_last_messages
from services.gemini_service import generate_answer

def process_message(request_data, db: Session):
    # Vérification du mode dans le dictionnaire
    mode = request_data.get("mode")
    
    if mode == "on":
        # Logique pour le mode "on"
        sender = request_data.get("sender")
        receiver = request_data.get("receiver")
        body = request_data.get("body")
        projectId = request_data.get("projectId")
        
        # Créer et sauvegarder le message
        new_message = create_message(db, request_data)

        # Marquer comme écrit par un humain
        new_message.isWrittenByHuman = True
        db.commit()

        # Récupérer les 10 derniers messages
        recent_messages = get_last_messages(db, sender)
        conversation_context = "\n".join([msg.body for msg in reversed(recent_messages)])

        # Construire le prompt
        prompt = f"Réponds au message (en au plus 30 mots): {conversation_context}\n\nQuestion : {body}"

        # Générer la réponse avec Gemini
        answer = generate_answer(prompt)

        # Sauvegarder la réponse de l'IA
        ai_response = Message(
            sender=receiver,
            receiver=sender,
            body=answer,
            projectId=projectId,
            isWrittenByHuman=False,
            mode=MessagingMode.LISTEN,
        )

        
        ai_resp= {
            "sender":receiver,
            "receiver":sender,
            "body":answer,
            "projectId":projectId,
            "writtenByHuman":False
        }
            
        
        db.add(ai_response)
        db.commit()
        db.refresh(ai_response)

        return ai_resp  # Retourne la réponse générée

    # Si le mode est "listen", aucun traitement IA
    return None
