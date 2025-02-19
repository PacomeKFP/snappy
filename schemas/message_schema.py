from pydantic import BaseModel, UUID4
from datetime import datetime
from typing import List, Optional

class MessageAttachment(BaseModel):
    id: UUID4
    mimetype: str
    filename: str
    filesize: int
    createdAt: datetime
    updatedAt: datetime
    path: str

class MessageRequest(BaseModel):
    id: UUID4
    projectId: str
    body: str
    ack: str
    sender: str
    receiver: str
    messageAttachements: List[MessageAttachment]
    createdAt: datetime
    updatedAt: datetime
    writtenByHuman: bool



# class MessageRequest(BaseModel):
#     sender: str
#     receiver: str
#     body: str
#     projectId: str
#     mode: MessagingMode