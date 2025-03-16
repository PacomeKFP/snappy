from PyPDF2 import PdfReader

def extract_text_from_pdf(path: str) -> str:
    """
    Extrait le texte d'un fichier PDF.
    """
    reader = PdfReader(path)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text