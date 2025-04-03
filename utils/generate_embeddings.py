import spacy
from typing import List
import numpy as np

# Charger le modèle spaCy
nlp = spacy.load("fr_core_news_sm")

def generate_embeddings(texts: List[str]) -> List[np.ndarray]:
    """
    Génère des embeddings pour une liste de textes en utilisant spaCy.
    """
    embeddings = []
    for text in texts:
        # Traiter le texte avec spaCy
        doc = nlp(text)
        # Récupérer le vecteur moyen du document
        if doc.has_vector:
            embeddings.append(doc.vector)
        else:
            # Si le texte est vide ou non vectorisable, retourner un vecteur nul
            embeddings.append(np.zeros(nlp.vocab.vectors_length))
    return embeddings