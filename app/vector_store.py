import faiss
import numpy as np
from langchain.embeddings import GooglePalmEmbeddings

class VectorStore:
    def __init__(self):
        self.embeddings = GooglePalmEmbeddings()
        
    def create_index(self, texts):
        embeddings = self.embeddings.embed_documents(texts)
        index = faiss.IndexFlatL2(len(embeddings[0]))
        index.add(np.array(embeddings))
        return index