from pydantic import BaseModel
from typing import List, Optional

class ChatbotInit(BaseModel):
    llm: str
    prompt: str
    attachments: List[dict]  # {path: str, mime: str}
    accesskey: str

class InferenceRequest(BaseModel):
    instance_id: str
    message: str
    attachment: Optional[dict]