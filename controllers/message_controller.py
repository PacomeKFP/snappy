from fastapi import APIRouter, Depends, HTTPException , Query
from sqlalchemy.orm import Session
from schemas.message_schema import MessageRequest
from database import SessionLocal
from services.message_service import process_message
from enum import Enum
import traceback


router = APIRouter()


# Définir l'énumération pour le mode
class MessagingMode(str, Enum):
    LISTEN = "listen"
    ON = "on"


# Dépendance pour obtenir la session de base de données
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/messages/")
async def handle_message(
    request: MessageRequest,  # Extraire le corps de la requête
    mode: int = Query(..., description="Messaging mode: 0 for 'listen', 1 for 'on'"),  # Extraire le mode de l'URL
    db: Session = Depends(get_db)  # Injecter la session de la base de données
):
    try:
        # Convertir le mode en enum MessagingMode
        messaging_mode = MessagingMode.LISTEN if mode == 0 else MessagingMode.ON

        # Reconstituer la requête au format attendu par process_message
        processed_request = {
            "sender": request.sender,
            "receiver": request.receiver,
            "body": request.body,
            "projectId": request.projectId,
            "mode": messaging_mode.value,
        }
        print("message controller",processed_request)
        # Appeler le service pour traiter le message
        response = process_message(processed_request, db)

        if response:
            return {"response": response}
        return {"message": "Message enregistré avec succès."}

    except Exception as e:
        print("Erreur complète :", traceback.format_exc())  # Afficher l'erreur complète dans les logs
        raise HTTPException(status_code=500, detail=str(e))
