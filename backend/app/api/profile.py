from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.db.database import get_db
from app.models.user import User
from app.models.student_profile import StudentProfile
from app.schemas.student_profile import StudentProfileCreate
from app.services.student_profile_service import create_student_profile, update_student_profile

router = APIRouter(
    prefix="/profile",
    tags=["Profile"],
)


@router.get("/me")
def get_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    profile = db.query(StudentProfile).filter(
        StudentProfile.user_id == current_user.id
    ).first()
    return {
        "id": current_user.id,
        "full_name": current_user.full_name,
        "email": current_user.email,
        "college": current_user.college,
        "graduation_year": current_user.graduation_year,
        "career_interest": current_user.career_interest,
        "profile": profile,
        "has_profile": profile is not None,
    }


@router.post("/onboarding")
def onboarding(
    profile: StudentProfileCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return create_student_profile(profile, current_user.id, db)


@router.put("/update")
def update_profile(
    profile: StudentProfileCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return update_student_profile(profile, current_user.id, db)
