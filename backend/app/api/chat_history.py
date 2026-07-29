from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.core.dependencies import get_current_user
from app.db.database import get_db
from app.models.user import User
from app.models.chat_history import ChatHistory
from app.schemas.chat_history import ChatMessageCreate, ChatMessageOut

router = APIRouter(prefix="/chat-history", tags=["Chat History"])


@router.get("/", response_model=List[ChatMessageOut])
def get_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(ChatHistory).filter(
        ChatHistory.user_id == current_user.id
    ).order_by(ChatHistory.created_at.asc()).limit(100).all()


@router.post("/", response_model=ChatMessageOut)
def save_message(
    data: ChatMessageCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    msg = ChatHistory(user_id=current_user.id, role=data.role, message=data.message)
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg


@router.delete("/")
def clear_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db.query(ChatHistory).filter(ChatHistory.user_id == current_user.id).delete()
    db.commit()
    return {"message": "Chat history cleared"}
