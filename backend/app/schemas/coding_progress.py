from pydantic import BaseModel


class CodingProgressUpdate(BaseModel):
    topic: str
    solved: int
    total: int


class CodingProgressOut(BaseModel):
    topic: str
    solved: int
    total: int

    class Config:
        from_attributes = True
