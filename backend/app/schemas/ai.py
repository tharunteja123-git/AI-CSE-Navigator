from pydantic import BaseModel


class CareerAdviceRequest(BaseModel):
    career_goal: str
    languages: str
    dsa: str
    skill: str
    hours: str
    interests: str


class ChatRequest(BaseModel):
    message: str
