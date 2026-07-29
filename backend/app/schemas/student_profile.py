from pydantic import BaseModel


class StudentProfileCreate(BaseModel):
    current_year: str
    career_goal: str
    skill_level: str
    languages: str
    dsa_level: str
    study_hours: str
    learning_style: str
    interests: str