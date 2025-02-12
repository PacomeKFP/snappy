from fastapi import APIRouter, UploadFile, File
from app.schemas import ChatbotInit, InferenceRequest
from app.models import Chatbot, ChatInstance, Chat
from app.database import SessionLocal
from app.file_processor import FileProcessor
from app.llm import GeminiClient
from app.vector_store import VectorStore
import uuid
import faiss
import numpy as np

router = APIRouter()

@router.post("/init")
async def init_chatbot(config: ChatbotInit):
    db = SessionLocal()
    
    # Traiter les fichiers attachés
    texts = []
    for att in config.attachments:
        text = FileProcessor().extract_text(att["path"], att["mime"])
        texts.extend(chunk_text(text))  # Découpage en chunks
        
    # Créer l'index vectoriel
    vector_id = str(uuid.uuid4())
    index = VectorStore().create_index(texts)
    faiss.write_index(index, f"data/vectors/{vector_id}.faiss")
    
    # Sauvegarder le chatbot
    chatbot = Chatbot(
        id=str(uuid.uuid4()),
        accesskey=config.accesskey,
        llm=config.llm,
        prompt=config.prompt,
        vector_id=vector_id
    )
    db.add(chatbot)
    db.commit()
    return {"chatbot_id": chatbot.id}

@router.post("/infer")
async def infer(request: InferenceRequest):
    db = SessionLocal()
    
    # Récupérer l'instance et le chatbot
    instance = db.query(ChatInstance).filter_by(id=request.instance_id).first()
    chatbot = db.query(Chatbot).filter_by(id=instance.chatbot_id).first()
    
    # Charger l'index vectoriel
    index = faiss.read_index(f"data/vectors/{chatbot.vector_id}.faiss")
    
    # Recherche RAG
    query_embedding = VectorStore().embeddings.embed_query(request.message)
    _, indices = index.search(np.array([query_embedding]), k=3)
    
    # Générer réponse
    model = GeminiClient().get_model(chatbot.llm)
    response = model.generate(
        chatbot.prompt, 
        context=indices, 
        message=request.message
    )
    
    # Sauvegarder l'historique
    db.add(Chat(id=str(uuid.uuid4()), instance_id=instance.id, body=request.message, sender="USER"))
    db.add(Chat(id=str(uuid.uuid4()), instance_id=instance.id, body=response, sender="AGENT"))
    db.commit()
    
    return {"response": response}