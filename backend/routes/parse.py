from fastapi import APIRouter, File, UploadFile, Depends, HTTPException

from sqlalchemy.orm import Session 

from database import get_db
from models import File as FileModel

from schemas import FileResponse
from services.parser import parseFile

router = APIRouter()

@router.post("/parse/{file_id}")

def parseUploadedFile(file_id: str, db: Session = Depends(get_db)):
    file_record = db.query(FileModel).filter(FileModel.id == file_id).first()

    if not file_record:
        raise HTTPException(status_code=404, detail="File not found")
    
    file_ext = file_record.filepath.split(".")[-1].lower()

    extractedText = (file_record.filepath, file_ext)

    if extractedText:
        file_record.parsed_text = extractedText
        db.commit()

    return file_record


