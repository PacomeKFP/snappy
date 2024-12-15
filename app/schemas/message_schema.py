# app/schemas/message_schema.py

from pydantic import BaseModel
from typing import Optional

class MessageRequest(BaseModel):
    author: str
    conversation: str
    content: str
    isRead: bool
    replyTo: Optional[str] = None
    conversationMode: int
