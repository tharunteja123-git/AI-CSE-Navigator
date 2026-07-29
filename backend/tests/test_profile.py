def test_get_profile_unauthenticated(client):
    response = client.get("/profile/me")
    assert response.status_code == 401


def test_get_profile_authenticated(client, auth_headers):
    response = client.get("/profile/me", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert "email" in data
    assert "full_name" in data


def test_create_profile(client, auth_headers):
    profile_data = {
        "current_year": "Fresher / Graduate",
        "career_goal": "AI Engineer",
        "skill_level": "Beginner",
        "languages": "Python, JavaScript",
        "dsa_level": "Basic Arrays/Strings",
        "study_hours": "2-4 hours",
        "learning_style": "Video Tutorials",
        "interests": "AI, Web Development"
    }
    response = client.post("/profile/onboarding", json=profile_data, headers=auth_headers)
    assert response.status_code == 200


def test_update_profile(client, auth_headers):
    profile_data = {
        "current_year": "Fresher / Graduate",
        "career_goal": "Full Stack Developer",
        "skill_level": "Intermediate",
        "languages": "Python, React",
        "dsa_level": "Intermediate (DP, Trees)",
        "study_hours": "4-6 hours",
        "learning_style": "Hands-on Projects",
        "interests": "Web Dev, Open Source"
    }
    response = client.put("/profile/update", json=profile_data, headers=auth_headers)
    assert response.status_code == 200
