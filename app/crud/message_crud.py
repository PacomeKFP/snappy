# app/crud/message_crud.py

from sqlalchemy.orm import Session
from app.models.message_model import Message

def create_message(db: Session, message_data):
    new_message = Message(**message_data.dict())
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    return new_message

def get_last_messages(db: Session, conversation_id: str, limit: int = 10):
    return db.query(Message).filter(Message.conversation == conversation_id).order_by(Message.createdAt.desc()).limit(limit).all()


