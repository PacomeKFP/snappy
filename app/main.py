# app/main.py

from fastapi import FastAPI
from .routers import message_router
from .database.database import engine
from .models import message_model
from fastapi.middleware.cors import CORSMiddleware


# Créer les tables dans la base de données
message_model.Base.metadata.create_all(bind=engine)

# Créer l'instance de l'application FastAPI
app = FastAPI()

# Configuration du CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Autorise toutes les origines. À restreindre en production.
    allow_credentials=True,
    allow_methods=["*"],  # Autorise toutes les méthodes HTTP (GET, POST, etc.)
    allow_headers=["*"],  # Autorise tous les en-têtes HTTP
)

# Inclure les routes
app.include_router(message_router.router)
