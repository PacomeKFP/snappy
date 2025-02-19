import os
from dotenv import load_dotenv

load_dotenv()  # Charge les variables depuis .env

class Config:
    """Classe de configuration centrale"""
    
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")  # Clé API Google Gemini
    DATABASE_URL = os.getenv("DATABASE_URL")      # URL de connexion MySQL
    MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")        # Clé API

    