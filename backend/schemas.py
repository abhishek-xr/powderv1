from pydantic import BaseModel
from uuid import UUID

class FileBase(BaseModel):
    filename: str
    filepath: str
    parsed_text: str | None  # Include parsed_text in the response

class FileCreate(FileBase):
    pass

class FileResponse(FileBase):
    id: UUID  # Use UUID for id

    class Config:
        orm_mode = True
