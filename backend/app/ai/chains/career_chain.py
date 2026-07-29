#from app.ai.models.gemini import llm
from app.ai.models.groq import llm
from app.ai.prompts.career_prompt import career_prompt

career_chain = career_prompt | llm