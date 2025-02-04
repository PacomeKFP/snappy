from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum

class MessagingMode(str, Enum):
    LISTEN = "listen"
    ON = "on"

class MessageRequest(BaseModel):
    sender: str
    receiver: str
    body: str
    projectId: str
    mode: MessagingMode

class MessageResponse(BaseModel):
    id: str
    sender: str
    receiver: str
    body: str
    projectId: str
    isWrittenByHuman: bool
    mode: MessagingMode
    createdAt: datetime
    updatedAt: datetime
