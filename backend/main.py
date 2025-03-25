from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routes import upload, parse, portfolio, analysis
from database import Base, engine

Base.metadata.create_all(bind=engine)
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from the frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

app.include_router(upload.router, prefix="/api")
app.include_router(parse.router, prefix="/api")
# app.include_router(portfolio.router, prefix="/api")
app.include_router(analysis.router, prefix="/api")

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.get("/")
def home():
    return {"message": "Welcome to portfolio api"}











