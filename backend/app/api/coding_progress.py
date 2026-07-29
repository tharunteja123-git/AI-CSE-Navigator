from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.core.dependencies import get_current_user
from app.db.database import get_db
from app.models.user import User
from app.models.coding_progress import CodingProgress
from app.schemas.coding_progress import CodingProgressUpdate, CodingProgressOut

router = APIRouter(prefix="/coding-progress", tags=["Coding Progress"])

DEFAULT_TOPICS = [
    ("Arrays", 50), ("Strings", 30), ("Linked Lists", 25),
    ("Trees & BST", 35), ("Dynamic Programming", 40),
    ("Graphs", 30), ("Sorting & Searching", 20), ("Recursion", 20),
    ("Stack & Queue", 25), ("Hashing", 20),
]


@router.get("/", response_model=List[CodingProgressOut])
def get_progress(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    existing = db.query(CodingProgress).filter(
        CodingProgress.user_id == current_user.id
    ).all()

    if not existing:
        for topic, total in DEFAULT_TOPICS:
            db.add(CodingProgress(user_id=current_user.id, topic=topic, solved=0, total=total))
        db.commit()
        existing = db.query(CodingProgress).filter(CodingProgress.user_id == current_user.id).all()

    return existing


@router.put("/{topic}")
def update_progress(
    topic: str,
    data: CodingProgressUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    record = db.query(CodingProgress).filter(
        CodingProgress.user_id == current_user.id,
        CodingProgress.topic == topic
    ).first()

    if record:
        record.solved = data.solved
        record.total = data.total
    else:
        record = CodingProgress(user_id=current_user.id, topic=data.topic, solved=data.solved, total=data.total)
        db.add(record)

    db.commit()
    db.refresh(record)
    return record
