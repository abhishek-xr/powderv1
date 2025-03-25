from fastapi import APIRouter, File, UploadFile, Depends, HTTPException
from sqlalchemy.orm import Session
import shutil
import os
import uuid
import pdfplumber 
from database import get_db
from models import File as FileModel

router = APIRouter()

UPLOAD_FOLDER = "uploads/"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@router.post("/upload", response_model=None)
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    file_ext = file.filename.split(".")[-1].lower()
    if file_ext != "pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    id = str(uuid.uuid4())
    filepath = os.path.join(UPLOAD_FOLDER, f"{id}.{file_ext}")

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    
    parsed_text = None
    try:
        with pdfplumber.open(filepath) as pdf:
            parsed_text = " ".join(page.extract_text() or "" for page in pdf.pages)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing PDF: {str(e)}")

    # Save only the filename in the database
    db_file = FileModel(id=id, filename=file.filename, filepath=f"{id}.{file_ext}", parsed_text=parsed_text)
    db.add(db_file)
    db.commit()

    return {"file_id": id, "filename": file.filename, "filepath": f"{id}.{file_ext}", "parsed_text": parsed_text}

@router.get("/document/{file_id}")
async def get_document(file_id: str, db: Session = Depends(get_db)):
    document = db.query(FileModel).filter(FileModel.id == file_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    return {
        "file_id": document.id,
        "filename": document.filename,
        "filepath": document.filepath,
        "parsed_text": document.parsed_text,
    }

@router.get("/documents")
async def list_documents(db: Session = Depends(get_db)):
    documents = db.query(FileModel).all()
    return [
        {
            "file_id": document.id,
            "filename": document.filename,
            "filepath": document.filepath,
            "parsed_text": document.parsed_text,
        }
        for document in documents
    ]

@router.delete("/document/{file_id}")
async def delete_document(file_id: str, db: Session = Depends(get_db)):
    document = db.query(FileModel).filter(FileModel.id == file_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    
    file_path = os.path.join(UPLOAD_FOLDER, document.filepath)
    if os.path.exists(file_path):
        os.remove(file_path)
    
    
    db.delete(document)
    db.commit()
    return {"message": "Document deleted successfully"}



