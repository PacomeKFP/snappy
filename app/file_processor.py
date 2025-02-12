from PyPDF2 import PdfReader
import textract

class FileProcessor:
    def extract_text(self, file_path, mime_type):
        if mime_type == "application/pdf":
            return self._extract_pdf(file_path)
        # Ajout d'autres types (Word, TXT, etc.)
        
    def _extract_pdf(self, path):
        reader = PdfReader(path)
        return " ".join([page.extract_text() for page in reader.pages])
