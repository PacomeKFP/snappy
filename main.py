from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers import message_controller
from database import engine
from models import message_model

# Création des tables en base de données
message_model.Base.metadata.create_all(bind=engine)

# Initialisation de FastAPI
app = FastAPI()

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # À restreindre en production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion des contrôleurs
app.include_router(message_controller.router)
