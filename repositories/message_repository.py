from sqlalchemy.orm import Session
from models.message_model import Message, MessagingMode
from typing import List

def create_message(db: Session, message_data: dict):
    # Convertir le mode string en enum
    mode_str = message_data.get("mode")
    if mode_str == "listen":
        mode_enum = MessagingMode.LISTEN
    elif mode_str == "on":
        mode_enum = MessagingMode.ON
    else:
        # Valeur par défaut ou gestion d'erreur
        mode_enum = MessagingMode.LISTEN

    message = Message(
        sender=message_data.get("sender"),
        receiver=message_data.get("receiver"),
        body=message_data.get("body"),
        projectId=message_data.get("projectId"),
        mode=mode_enum,  # Utiliser l'enum au lieu de la chaîne
    )
    
    db.add(message)
    db.commit()
    db.refresh(message)
    return message

def get_last_messages(db: Session, user_id: str, limit: int = 10) -> List[Message]:
    return db.query(Message).filter(
        (Message.sender == user_id) | (Message.receiver == user_id)
    ).order_by(Message.createdAt.desc()).limit(limit).all()