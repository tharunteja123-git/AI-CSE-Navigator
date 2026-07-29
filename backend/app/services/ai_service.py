from app.ai.chains.career_chain import career_chain
from app.ai.models.groq import llm


def generate_career_advice(data):
    response = career_chain.invoke({
        "career_goal": data.career_goal,
        "languages": data.languages,
        "dsa": data.dsa,
        "skill": data.skill,
        "hours": data.hours,
        "interests": data.interests,
    })
    return {"response": response.content}


def chat_with_ai(message: str):
    from app.ai.models.gemini import llm
    response = llm.invoke(
        f"""You are an expert AI Career Mentor for CSE students in India.
Answer the following question about career, programming, placements, or tech skills.
Be specific, practical, and encouraging.

Question: {message}

Give a helpful, structured answer."""
    )
    return {"response": response.content}
