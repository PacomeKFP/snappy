# Base image
FROM python:3.11-slim

# Crée un dossier dans le conteneur
WORKDIR /app

# Copie les fichiers
COPY requirements.txt .
RUN pip install  -r requirements.txt

# Copie le reste de ton code
COPY . .

# Expose le port utilisé par uvicorn
EXPOSE 8000

# Commande de démarrage
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
