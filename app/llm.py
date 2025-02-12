import google.generativeai as genai

class GeminiClient:
    def __init__(self, api_key):
        genai.configure(api_key=api_key)
        
    def get_model(self, model_name):
        return genai.GenerativeModel(model_name)
    
    def generate(self, model, prompt, context=None):
        full_prompt = f"{prompt}\nContext: {context}\nQuestion: {message}"
        response = model.generate_content(full_prompt)
        return response.text