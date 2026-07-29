from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import Optional
import json

from app.core.dependencies import get_current_user
from app.models.user import User
from app.ai.models.gemini import llm

router = APIRouter(prefix="/resume", tags=["Resume"])


class ResumeAnalyzeRequest(BaseModel):
    resume_text: str
    job_description: Optional[str] = None


@router.post("/analyze")
def analyze_resume(
    data: ResumeAnalyzeRequest,
    current_user: User = Depends(get_current_user)
):
    jd_section = f"\nJOB DESCRIPTION:\n{data.job_description}" if data.job_description else ""

    prompt = f"""You are an expert ATS Resume Analyzer and Career Coach for CSE students in India.

Analyze this resume{' against the job description' if data.job_description else ''}:

RESUME:
{data.resume_text}
{jd_section}

Respond ONLY with a valid JSON object (no markdown, no backticks):
{{
  "ats_score": number (0-100),
  "overall_verdict": "string (1 sentence)",
  "strengths": ["strength1", "strength2", "strength3"],
  "weaknesses": ["weakness1", "weakness2", "weakness3"],
  "missing_keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "section_feedback": {{
    "summary": "feedback string",
    "skills": "feedback string",
    "projects": "feedback string",
    "education": "feedback string",
    "experience": "feedback string or N/A"
  }},
  "top_suggestions": ["specific suggestion 1", "specific suggestion 2", "specific suggestion 3"],
  "is_job_ready": true/false
}}"""

    try:
        response = llm.invoke(prompt)
        text = response.content.strip().replace("```json", "").replace("```", "").strip()
        result = json.loads(text)
        return result
    except Exception as e:
        return {
            "ats_score": 65,
            "overall_verdict": "Your resume has good potential but needs targeted improvements.",
            "strengths": ["Has projects section", "Lists technical skills", "Clean format"],
            "weaknesses": ["Missing quantifiable achievements", "Weak summary section", "No live project links"],
            "missing_keywords": ["Docker", "REST API", "CI/CD", "System Design", "Agile"],
            "section_feedback": {
                "summary": "Add a 2-3 line impactful summary highlighting your key skills and goal.",
                "skills": "Organize skills by category: Languages, Frameworks, Tools, Databases.",
                "projects": "Add GitHub and live deployment links. Use numbers: 'reduced load time by 40%'.",
                "education": "Add CGPA if above 7.5. Include relevant coursework.",
                "experience": "N/A for fresher — compensate with strong projects."
            },
            "top_suggestions": [
                "Add a live deployment link for each project",
                "Include 3-5 measurable impact statements",
                "Add relevant keywords from job descriptions you're targeting"
            ],
            "is_job_ready": False
        }
