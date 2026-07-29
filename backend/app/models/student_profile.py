from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.db.database import Base


class StudentProfile(Base):
    __tablename__ = "student_profiles"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    current_year = Column(String(50))

    career_goal = Column(String(100))

    skill_level = Column(String(50))

    languages = Column(String(255))

    dsa_level = Column(String(50))

    study_hours = Column(String(50))

    learning_style = Column(String(100))

    interests = Column(String(255))

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User")