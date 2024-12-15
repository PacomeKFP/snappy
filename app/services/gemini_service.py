# app/services/gemini_service.py

import google.generativeai as genai
from app.config.config import Config

# Configurer l'API Gemini
genai.configure(api_key=Config.GEMINI_API_KEY)

def generate_answer(prompt: str):
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)
    return response.text.strip()


