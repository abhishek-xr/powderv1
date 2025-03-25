from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import File as FileModel

router = APIRouter()

@router.get("/analysis/{file_id}")
def get_analysis(file_id : str, db : Session = Depends(get_db)):
    file_record = db.query(FileModel).filter(FileModel.id == file_id).first()

    if not file_record or not file_record.parsed_text:
        raise HTTPException(status_code=404, detail="File not found or not parsed yet")
    
    analysis_data = {
        "file_id": file_record.id,
        "filename": file_record.filename,
        "analysis": file_record.parsed_text[:500]
    }
    
    
    return analysis_data
