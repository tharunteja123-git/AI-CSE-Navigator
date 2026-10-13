from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.profile import router as profile_router
from app.api.auth import router as auth_router
from app.api.assessment import router as assessment_router
from app.api.ai import router as ai_router
from app.api.chat_history import router as chat_history_router
from app.api.coding_progress import router as coding_progress_router
from app.api.resume import router as resume_router
from app.db.database import Base, engine
from app.middleware.rate_limit import rate_limit_middleware
from app.core.logger import app_logger
from app.core.config import settings

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI CSE Navigator API",
    version="2.0.0",
    description="AI-powered career guidance platform for CSE students"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in settings.CORS_ORIGINS.split(",") if origin.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.middleware("http")(rate_limit_middleware)

app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(assessment_router)
app.include_router(ai_router)
app.include_router(chat_history_router)
app.include_router(coding_progress_router)
app.include_router(resume_router)


@app.on_event("startup")
async def startup():
    app_logger.info("AI CSE Navigator API started successfully 🚀")


@app.get("/")
def root():
    return {
        "message": "AI CSE Navigator API v2.0 🚀",
        "docs": "/docs",
        "status": "healthy"
    }
