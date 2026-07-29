from fastapi import APIRouter, Depends
from app.schemas.ai import CareerAdviceRequest, ChatRequest
from app.services.ai_service import generate_career_advice, chat_with_ai
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/ai",
    tags=["Artificial Intelligence"],
)


@router.post("/career-advice")
def career_advice(
    data: CareerAdviceRequest,
    current_user: User = Depends(get_current_user)
):
    return generate_career_advice(data)


@router.post("/chat")
def chat(
    data: ChatRequest,
    current_user: User = Depends(get_current_user)
):
    return chat_with_ai(data.message)
