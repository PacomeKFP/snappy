# app/routers/message_router.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.message_schema import MessageRequest
from app.database.database import SessionLocal
from app.services.message_service import process_message

router = APIRouter()

# Dépendance pour obtenir la session de base de données
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/messages/")
async def handle_message(request: MessageRequest, db: Session = Depends(get_db)):
    try:
        # Appeler le service pour traiter le message
        answer = process_message(request, db)
        
        if answer:
            return {"response": answer}
        return {"message": "Message enregistré avec succès."}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
