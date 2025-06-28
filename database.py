from sqlalchemy import create_engine, Column, String, JSON, ForeignKey, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID, JSONB

# Configuration de la base de données
DATABASE_URL = "postgresql://root:noumedem@localhost:5432/chatbot_final"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# Modèle de table pour les chatbots
class ChatbotDB(Base):
    __tablename__ = "chatbots"
    id = Column(UUID(as_uuid=True), primary_key=True)
    accesskeys = Column(String, unique=True)
    label = Column(String)
    prompt = Column(String)
    description = Column(String)
    projectId = Column(String)
    languageModel = Column(String)
    chatbotAttachements = Column(JSONB)

    # Relations
    embeddings = relationship("EmbeddingDB", back_populates="chatbot")
    conversations = relationship("ConversationDB", back_populates="chatbot")

# Modèle de table pour les embeddings
class EmbeddingDB(Base):
    __tablename__ = "embeddings"
    id = Column(UUID(as_uuid=True), primary_key=True)
    accesskeys = Column(String, ForeignKey("chatbots.accesskeys"))
    embedding = Column(JSON)
    text = Column(Text)
    # Relation
    chatbot = relationship("ChatbotDB", back_populates="embeddings")





# Modèle de table pour les conversations
class ConversationDB(Base):
    __tablename__ = "conversations"
    idInstanceChat = Column(String, primary_key=True)
    accesskeys = Column(String, ForeignKey("chatbots.accesskeys"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relations
    chatbot = relationship("ChatbotDB", back_populates="conversations")
    messages = relationship("MessageDB", back_populates="conversation")

# Modèle de table pour les messages
class MessageDB(Base):
    __tablename__ = "messages"
    id = Column(UUID(as_uuid=True), primary_key=True)
    idInstanceChat = Column(String, ForeignKey("conversations.idInstanceChat"))
    message = Column(Text)
    response = Column(Text)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

    # Relation
    conversation = relationship("ConversationDB", back_populates="messages")

# Créer les tables dans la base de données
Base.metadata.create_all(bind=engine)