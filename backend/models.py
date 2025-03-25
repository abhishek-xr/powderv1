from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
import datetime
from database import Base

class File(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    filepath = Column(String, nullable=False)
    parsed_text = Column(String, nullable=True)
    portfolio_id = Column(Integer, ForeignKey("portfolios.id"))  # Add foreign key

class Portfolio(Base):
    __tablename__ = "portfolios"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    files = relationship("File", back_populates="portfolio")  # Update relationship

File.portfolio = relationship("Portfolio", back_populates="files")  # Add back_populates
