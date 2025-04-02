from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from schemas.message_schema import MessageRequest
from database import SessionLocal
from services.message_service import process_message
from models.message_model import MessagingMode
import traceback
import requests
import os
import json
import uuid
from datetime import datetime

router = APIRouter()

# Dépendance pour obtenir la session de base de données
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/messages/")
async def handle_message(
    request: MessageRequest,
    mode: int = Query(..., description="Messaging mode: 0 for 'listen', 1 for 'on'"),
    db: Session = Depends(get_db)
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
            "isWrittenByHuman": request.writtenByHuman
        }
        
        # Appeler le service pour traiter le message
        response = process_message(processed_request, db)
        print("response", response)
        
        if response:
            address_ip = os.getenv("ADDRESS_IP")
            token = os.getenv("TOKEN_ORG_ALAN")
            
            # Vérifier si address_ip est défini
            if not address_ip:
                print("ATTENTION: La variable d'environnement ADDRESS_IP n'est pas définie")
                return {"message": "Message enregistré avec succès, mais impossible d'envoyer au service de chat."}
            
            api_url = f"http://{address_ip}:8001/chat/send"
            print(f"Tentative d'envoi vers: {api_url}")
            
            try:
                # Récupérer les ID internes pour l'expéditeur et le destinataire
                sender_id = request.receiver
                receiver_id = request.sender
                
                # Vérifier si les ID sont valides
                if not sender_id or not receiver_id:
                    print(f"ATTENTION: Impossible de trouver les ID internes pour {response['sender']} ou {response['receiver']}")
                    return {"message": "Message enregistré avec succès, mais impossible d'envoyer au service de chat."}
                
                # Préparer les données pour multipart/form-data avec les ID internes corrects
                api_data = {
                    "projectId": request.projectId,  # Utiliser le project ID correct
                    "body": response["body"],
                    "senderId": sender_id,  # Utiliser l'ID interne de l'expéditeur
                    "receiverId": receiver_id,  # Utiliser l'ID interne du destinataire
                    "writtenByHuman": str(False).lower()
                }
                
                headers = {
                    "Authorization": f"Bearer {token}",
                    #"Content-type": "multipart/form-data"
                }
                
                # Créer un dictionnaire pour les données de formulaire multipart
                files = {}
                for key, value in api_data.items():
                    files[key] = (None, str(value))
                
                # Envoyer comme multipart/form-data
                response_api = requests.post(api_url, files=files, headers=headers)
                print(f"Réponse API: {response_api.status_code} {response_api.text if hasattr(response_api, 'text') else ''}")
                
                # Afficher les en-têtes et les données envoyées pour le débogage
                print(f"En-têtes envoyés: {response_api.request.headers}")
                print(f"Données envoyées: {api_data}")
                
            except Exception as e:
                print(f"Erreur lors de l'envoi à l'API: {str(e)}")
                
        return {"message": "Message enregistré avec succès."}

    except Exception as e:
        print("Erreur complète :", traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))