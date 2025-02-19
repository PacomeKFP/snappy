from sqlalchemy.orm import Session
from models.message_model import Message

def create_message(db: Session, message_data):
    new_message = Message(**message_data)
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    return new_message

def get_last_messages(db: Session, sender_id: str, limit: int = 10):
    return (
        db.query(Message)
        .filter(Message.sender == sender_id)
        .order_by(Message.createdAt.desc())
        .limit(limit)
        .all()
    )
