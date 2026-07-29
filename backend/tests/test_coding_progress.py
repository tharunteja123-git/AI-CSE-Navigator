def test_get_default_progress(client, auth_headers):
    response = client.get("/coding-progress/", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "topic" in data[0]
    assert "solved" in data[0]
    assert "total" in data[0]


def test_update_progress(client, auth_headers):
    # First get to initialize
    client.get("/coding-progress/", headers=auth_headers)

    response = client.put("/coding-progress/Arrays", json={
        "topic": "Arrays",
        "solved": 15,
        "total": 50
    }, headers=auth_headers)
    assert response.status_code == 200
    assert response.json()["solved"] == 15


def test_progress_requires_auth(client):
    response = client.get("/coding-progress/")
    assert response.status_code == 401
