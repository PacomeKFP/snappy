from sqlalchemy import Column, String, Enum, ForeignKey
from app.database import Base

class Chatbot(Base):
    __tablename__ = "chatbots"
    id = Column(String, primary_key=True)
    accesskey = Column(String)
    llm = Column(String)  # "gemini-pro" ou "gemini-pro-vision"
    prompt = Column(String)
    vector_id = Column(String)  # Référence à l'index FAISS

class ChatInstance(Base):
    __tablename__ = "chat_instances"
    id = Column(String, primary_key=True)
    chatbot_id = Column(String, ForeignKey("chatbots.id"))

class Chat(Base):
    __tablename__ = "chats"
    id = Column(String, primary_key=True)
    instance_id = Column(String, ForeignKey("chat_instances.id"))
    body = Column(String)
    sender = Column(Enum("USER", "AGENT"))