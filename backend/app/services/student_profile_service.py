from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.student_profile import StudentProfile
from app.schemas.student_profile import StudentProfileCreate


def create_student_profile(profile: StudentProfileCreate, user_id: int, db: Session):
    existing = db.query(StudentProfile).filter(StudentProfile.user_id == user_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Profile already exists. Use update instead.")
    student_profile = StudentProfile(
        user_id=user_id,
        current_year=profile.current_year,
        career_goal=profile.career_goal,
        skill_level=profile.skill_level,
        languages=profile.languages,
        dsa_level=profile.dsa_level,
        study_hours=profile.study_hours,
        learning_style=profile.learning_style,
        interests=profile.interests,
    )
    db.add(student_profile)
    db.commit()
    db.refresh(student_profile)
    return student_profile


def update_student_profile(profile: StudentProfileCreate, user_id: int, db: Session):
    existing = db.query(StudentProfile).filter(StudentProfile.user_id == user_id).first()
    if not existing:
        return create_student_profile(profile, user_id, db)
    existing.current_year = profile.current_year
    existing.career_goal = profile.career_goal
    existing.skill_level = profile.skill_level
    existing.languages = profile.languages
    existing.dsa_level = profile.dsa_level
    existing.study_hours = profile.study_hours
    existing.learning_style = profile.learning_style
    existing.interests = profile.interests
    db.commit()
    db.refresh(existing)
    return existing
