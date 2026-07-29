from langchain_core.prompts import ChatPromptTemplate

career_prompt = ChatPromptTemplate.from_template(
"""
You are an expert AI Career Mentor.

Student Profile

Career Goal:
{career_goal}

Languages:
{languages}

DSA:
{dsa}

Skill Level:
{skill}

Study Hours:
{hours}

Interests:
{interests}

Generate

1. Best Career

2. Why

3. Missing Skills

4. Weekly Plan

5. Projects

6. Companies

7. Certifications

8. Salary Range

Return in clean markdown.
"""
)