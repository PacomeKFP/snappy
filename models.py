from pydantic import BaseModel, UUID4
from typing import List, Optional
from datetime import datetime

# Modèle pour les pièces jointes
class ChatbotAttachment(BaseModel):
    filesize: int
    mimetype: str
    filename: str
    path: str

# Requête d'initialisation
class InitRequest(BaseModel):
    id: UUID4
    accesskeys: UUID4
    label: str
    prompt: str
    description: str
    projectId: str
    languageModel: str
    chatbotAttachements: List[ChatbotAttachment]

# Réponse d'initialisation
class InitResponse(BaseModel):
    status: str
    message: str

# Requête de création de conversation
class CreateRequest(BaseModel):
    accesskeys: str

# Réponse de création
class CreateResponse(BaseModel):
    idInstanceChat: str

# Requête d'inférence
class InferRequest(BaseModel):
    idInstanceChat: str
    message: str
    attachment: Optional[str] = None

# Réponse d'inférence
class InferResponse(BaseModel):
    response: str

# Requête d'historique
class HistoryRequest(BaseModel):
    idInstanceChat: str

# Message d'historique
class MessageHistory(BaseModel):
    id: str
    message: str
    response: str
    timestamp: Optional[datetime] = None

# Réponse d'historique
class HistoryResponse(BaseModel):
    idInstanceChat: str
    accesskeys: str
    messages: List[MessageHistory]


# Modèles pour la réponse
class InstanceInfo(BaseModel):
    idInstanceChat: str
    created_at: str
    messages_count: int
    index: int


class ChatbotInfo(BaseModel):
    label: str
    description: str

class InstancesResponse(BaseModel):
    chatbotInfo: ChatbotInfo
    instances: List[InstanceInfo]


# Modèle pour la réponse de liste des LLM
class LLMListResponse(BaseModel):
    available_llms: List[str]


# Modèle pour la réponse de changement de LLM d'un chatbot
class UpdateChatbotLLMResponse(BaseModel):
    status: str
    message: str