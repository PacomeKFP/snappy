from sqlalchemy import Column, String, Boolean, DateTime, Enum, func
from sqlalchemy.ext.declarative import declarative_base
import uuid
import enum

Base = declarative_base()

class MessagingMode(enum.Enum):
    LISTEN = "listen"
    ON = "on"

class Message(Base):
    __tablename__ = "messages"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    sender = Column(String(36), nullable=False)
    receiver = Column(String(36), nullable=False)
    body = Column(String(8192), nullable=False)
    projectId = Column(String(36), nullable=False)
    isWrittenByHuman = Column(Boolean, default=False)
    mode = Column(Enum(MessagingMode , Name="messaging_mode"), nullable=False)
    createdAt = Column(DateTime, default=func.now())
    updatedAt = Column(DateTime, default=func.now(), onupdate=func.now())
