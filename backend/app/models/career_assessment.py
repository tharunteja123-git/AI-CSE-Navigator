from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func

from app.db.database import Base


class CareerAssessment(Base):
    __tablename__ = "career_assessments"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    recommended_role = Column(String(100))

    career_score = Column(Integer)

    missing_skills = Column(String(500))

    recommended_languages = Column(String(300))

    recommended_projects = Column(String(500))

    target_companies = Column(String(500))

    weekly_plan = Column(String(1000))

    created_at = Column(DateTime(timezone=True), server_default=func.now())