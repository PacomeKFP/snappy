# from sqlalchemy import create_engine, Column, String, JSON, ForeignKey , Text
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker, relationship

# # Configuration de la base de données
# DATABASE_URL = "sqlite:///./chatbot.db"
# engine = create_engine(DATABASE_URL)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# Base = declarative_base()

# # Modèle de table pour les chatbots
# class ChatbotDB(Base):
#     __tablename__ = "chatbots"
#     id = Column(String, primary_key=True)  # UUID sous forme de chaîne
#     accesskeys = Column(String, unique=True)  # Clé d'accès unique
#     label = Column(String)
#     prompt = Column(String)
#     description = Column(String)
#     projectId = Column(String)
#     languageModel = Column(String)
#     chatbotAttachements = Column(JSON)  # Stocke les pièces jointes sous forme de JSON

#     # Relation avec la table des embeddings
#     embeddings = relationship("EmbeddingDB", back_populates="chatbot")

# # Modèle de table pour les embeddings
# class EmbeddingDB(Base):
#     __tablename__ = "embeddings"
#     id = Column(String, primary_key=True)  # UUID sous forme de chaîne
#     accesskeys = Column(String, ForeignKey("chatbots.accesskeys"))  # Clé étrangère
#     embedding = Column(JSON)  # Stocke l'embedding sous forme de JSON

#     # Relation avec la table des chatbots
#     chatbot = relationship("ChatbotDB", back_populates="embeddings")


# # Modèle de table pour les conversations
# class ConversationDB(Base):
#     __tablename__ = "conversations"
#     idInstanceChat = Column(String, primary_key=True)  # Identifiant unique de la conversation
#     accesskeys = Column(String, ForeignKey("chatbots.accesskeys"))  # Clé étrangère vers le chatbot

#     # Relation avec la table des chatbots
#     chatbot = relationship("ChatbotDB", back_populates="conversations")


# # Modèle de table pour les messages
# class MessageDB(Base):
#     __tablename__ = "messages"
#     id = Column(String, primary_key=True)  # Identifiant unique du message
#     idInstanceChat = Column(String, ForeignKey("conversations.idInstanceChat"))  # Clé étrangère vers la conversation
#     message = Column(Text)  # Message de l'utilisateur
#     response = Column(Text)  # Réponse du chatbot

#     # Relation avec la table des conversations
#     conversation = relationship("ConversationDB", back_populates="messages")


# # Créez les tables dans la base de données
# Base.metadata.create_all(bind=engine)


from sqlalchemy import create_engine, Column, String, JSON, ForeignKey, Text , DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID, JSONB



# Configuration de la base de données
DATABASE_URL = "postgresql://root:noumedem@localhost:5432/chatbot_db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Modèle de table pour les conversations
class ConversationDB(Base):
    __tablename__ = "conversations"
    idInstanceChat = Column(String, primary_key=True)  # Identifiant unique de la conversation
    accesskeys = Column(String, ForeignKey("chatbots.accesskeys"))  # Clé étrangère vers le chatbot

    # Relation avec la table des chatbots
    chatbot = relationship("ChatbotDB", back_populates="conversations")
    # Relation avec la table des messages
    messages = relationship("MessageDB", back_populates="conversation")

# Modèle de table pour les chatbots
class ChatbotDB(Base):
    __tablename__ = "chatbots"
    id = Column(UUID(as_uuid=True), primary_key=True)
    accesskeys = Column(String, unique=True)  # Clé d'accès unique
    label = Column(String)
    prompt = Column(String)
    description = Column(String)
    projectId = Column(String)
    languageModel = Column(String)
    chatbotAttachements = Column(JSONB)  # Stocke les pièces jointes sous forme de JSON

    # Relation avec la table des embeddings
    embeddings = relationship("EmbeddingDB", back_populates="chatbot")
    # Relation avec la table des conversations
    conversations = relationship("ConversationDB", back_populates="chatbot")

# Modèle de table pour les embeddings
class EmbeddingDB(Base):
    __tablename__ = "embeddings"
    id = Column(String, primary_key=True)  # UUID sous forme de chaîne
    accesskeys = Column(String, ForeignKey("chatbots.accesskeys"))  # Clé étrangère
    embedding = Column(JSON)  # Stocke l'embedding sous forme de JSON

    # Relation avec la table des chatbots
    chatbot = relationship("ChatbotDB", back_populates="embeddings")

# Modèle de table pour les messages
class MessageDB(Base):
    __tablename__ = "messages"
    id = Column(String, primary_key=True)  # Identifiant unique du message
    idInstanceChat = Column(String, ForeignKey("conversations.idInstanceChat"))  # Clé étrangère vers la conversation
    message = Column(Text)  # Message de l'utilisateur
    response = Column(Text)  # Réponse du chatbot
    timestamp = Column(DateTime(timezone=True), server_default=func.now())  # Horodatage du message

    # Relation avec la table des conversations
    conversation = relationship("ConversationDB", back_populates="messages")

# Créez les tables dans la base de données
Base.metadata.create_all(bind=engine)