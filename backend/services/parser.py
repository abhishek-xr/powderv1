

import pytesseract 
from PIL import Image 
import pdfplumber

def parsePDF(file_path):
    # extracting text from pdf

    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text()
    return text.strip()




def parseImage(file_path):
    image = Image.open(file_path)
    text = pytesseract.image_to_string(image)
    return text.strip()

    
    
def parseFile(file_path, file_type):
    if file_type == "pdf":
        return parsePDF(file_path)
    elif file_type in ["jpg", "jpeg", "png"]:
        return parseImage(file_path)
    raise ValueError("invalid file type")


