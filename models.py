from pydantic import BaseModel,UUID4
from typing import List , Optional
from datetime import datetime

# Modèle pour les pièces jointes (simplifié)
class ChatbotAttachment(BaseModel):
    filesize: int
    mimetype: str
    filename: str
    path: str

# Modèle pour la requête /init (simplifié)
class InitRequest(BaseModel):
    id: UUID4
    accesskeys: UUID4
    label: str
    prompt: str
    description: str
    projectId: str
    languageModel: str  # Ex: "MISTRAL"
    chatbotAttachements: List[ChatbotAttachment]

# Modèle pour la réponse /init (simplifié)
class InitResponse(BaseModel):
    status: str
    message: str


class CreateRequest(BaseModel):
    accesskeys: str  # Clé d'accès du chatbot

class CreateResponse(BaseModel):
    idInstanceChat: str  # Identifiant unique de l'instance de conversation


class InferRequest(BaseModel):
    idInstanceChat: str  # Identifiant de l'instance de conversation
    message: str  # Message de l'utilisateur
    attachment: Optional[str] = None  # Pièce jointe (optionnelle)

class InferResponse(BaseModel):
    response: str  # Réponse générée par le chatbot


# Nouveaux modèles pour l'historique des conversations
class HistoryRequest(BaseModel):
    idInstanceChat: str  # Identifiant de l'instance de conversation

class MessageHistory(BaseModel):
    id: str
    message: str
    response: str
    timestamp: Optional[datetime] = None

class HistoryResponse(BaseModel):
    idInstanceChat: str
    accesskeys: str
    messages: List[MessageHistory]