def split_text_into_chunks(text: str, chunk_size: int = 500, overlap: int = 50) -> list[str]:
    """
    Divise le texte en chunks de taille fixe avec un chevauchement.
    """
    words = text.split()
    chunks = []
    for i in range(0, len(words), chunk_size - overlap):
        chunk = " ".join(words[i:i + chunk_size])
        chunks.append(chunk)
    return chunks