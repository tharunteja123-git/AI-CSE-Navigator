from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.services.career_assessment_service import generate_assessment

router = APIRouter(
    prefix="/assessment",
    tags=["AI Assessment"],
)


@router.get("/generate")
def generate(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    result = generate_assessment(current_user.id, db)

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Complete your onboarding first."
        )

    return result