# app/models/message_model.py

from sqlalchemy import Column, String, Boolean, DateTime, Integer, func
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Message(Base):
    __tablename__ = "messages"
    
    uuid = Column(String(36), primary_key=True, index=True, default=func.uuid())
    author = Column(String(36), nullable=False)
    conversation = Column(String(36), nullable=False)
    content = Column(String(255), nullable=False)
    isRead = Column(Boolean, default=False)
    replyTo = Column(String(36), nullable=True)
    conversationMode = Column(Integer, default=0)  # 0: pas de réponse auto, 1: réponse auto
    createdAt = Column(DateTime, default=func.now())
    updatedAt = Column(DateTime, default=func.now(), onupdate=func.now())
