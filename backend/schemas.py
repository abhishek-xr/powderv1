from pydantic import BaseModel
from uuid import UUID
from typing import Optional  # Add this import

class FileBase(BaseModel):
    filename: str
    filepath: str
    parsed_text: Optional[str]  # Use Optional instead of |

class FileCreate(FileBase):
    pass

class FileResponse(FileBase):
    id: UUID  # Use UUID for id

    class Config:
        orm_mode = True
