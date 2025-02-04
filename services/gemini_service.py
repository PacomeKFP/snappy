import google.generativeai as genai
from config.config import Config
from mistralai import Mistral

#configuration Mistral Api
client = Mistral(api_key=Config.MISTRAL_API_KEY)


# Configuration de l'API Gemini
genai.configure(api_key=Config.GEMINI_API_KEY)

def generate_answer(prompt: str):

    model = genai.GenerativeModel("gemini-pro")
    
    response = model.generate_content(prompt)

    return response.text.strip()

