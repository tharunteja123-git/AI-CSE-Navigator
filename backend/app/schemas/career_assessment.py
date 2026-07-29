from pydantic import BaseModel


class CareerAssessmentResponse(BaseModel):

    recommended_role: str

    career_score: int

    missing_skills: str

    recommended_languages: str

    recommended_projects: str

    target_companies: str

    weekly_plan: str

    class Config:
        from_attributes = True