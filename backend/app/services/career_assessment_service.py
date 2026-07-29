from sqlalchemy.orm import Session
from app.models.student_profile import StudentProfile
from app.ai.models.gemini import llm


def generate_assessment(user_id: int, db: Session):
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == user_id).first()
    if not profile:
        return None

    prompt = f"""You are an expert AI Career Advisor for CSE students in India.

Student Profile:
- Career Goal: {profile.career_goal}
- Current Year: {profile.current_year}
- Skill Level: {profile.skill_level}
- Languages Known: {profile.languages}
- DSA Level: {profile.dsa_level}
- Study Hours/Day: {profile.study_hours}
- Interests: {profile.interests}

Respond ONLY with a valid JSON object (no markdown, no backticks) with these exact keys:
{{
  "recommended_role": "string",
  "career_score": number (0-100),
  "why": "2-3 sentence explanation",
  "missing_skills": ["skill1", "skill2", "skill3", "skill4"],
  "recommended_languages": ["lang1", "lang2", "lang3"],
  "recommended_projects": ["project1", "project2", "project3"],
  "target_companies": ["company1", "company2", "company3", "company4"],
  "certifications": ["cert1", "cert2", "cert3"],
  "salary_range": "X LPA - Y LPA",
  "weekly_plan": {{
    "Monday": "topic",
    "Tuesday": "topic",
    "Wednesday": "topic",
    "Thursday": "topic",
    "Friday": "topic",
    "Saturday": "topic",
    "Sunday": "topic"
  }}
}}"""

    try:
        response = llm.invoke(prompt)
        import json
        text = response.content.strip()
        text = text.replace("```json", "").replace("```", "").strip()
        data = json.loads(text)
        return data
    except Exception:
        # Fallback static response
        return {
            "recommended_role": profile.career_goal or "Full Stack Developer",
            "career_score": 72,
            "why": "Based on your profile, you have a solid foundation. With focused effort on missing skills, you can reach your goal.",
            "missing_skills": ["Docker", "System Design", "Cloud (AWS/GCP)", "Testing"],
            "recommended_languages": ["Python", "JavaScript", "SQL"],
            "recommended_projects": ["AI Resume Analyzer", "RAG Chatbot", "REST API with FastAPI"],
            "target_companies": ["TCS", "Infosys", "Wipro", "Accenture"],
            "certifications": ["AWS Cloud Practitioner", "Google Python Certificate", "Meta Frontend Developer"],
            "salary_range": "4 LPA - 8 LPA",
            "weekly_plan": {
                "Monday": "DSA - Arrays & Strings",
                "Tuesday": "Core Subject (DBMS/OS)",
                "Wednesday": "Project Development",
                "Thursday": "System Design Basics",
                "Friday": "AI/ML Concepts",
                "Saturday": "Mock Interview Practice",
                "Sunday": "Revision & Planning"
            }
        }
