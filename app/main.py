from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routes.chatbot import router as chatbot_router

# Créer toutes les tables de la base de données au démarrage
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Chatbot Service API",
    description="Service de gestion des chatbots avec RAG et Gemini",
    version="1.0.0"
)

# Configuration CORS pour l'intégration avec Spring Boot
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # À ajuster pour la production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclure les routes des chatbots
app.include_router(chatbot_router, prefix="/api/chatbot", tags=["chatbot"])

@app.get("/")
def health_check():
    return {
        "status": "running",
        "version": app.version,
        "docs": "/docs"
    }

# Point d'entrée pour l'exécution en développement
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
    