def test_register_success(client, test_user_data):
    response = client.post("/auth/register", json=test_user_data)
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == test_user_data["email"]
    assert data["full_name"] == test_user_data["full_name"]
    assert "id" in data


def test_register_duplicate_email(client, test_user_data):
    client.post("/auth/register", json=test_user_data)
    response = client.post("/auth/register", json=test_user_data)
    assert response.status_code == 400


def test_login_success(client, test_user_data):
    client.post("/auth/register", json=test_user_data)
    response = client.post("/auth/login", json={
        "email": test_user_data["email"],
        "password": test_user_data["password"]
    })
    assert response.status_code == 200
    assert "access_token" in response.json()


def test_login_wrong_password(client, test_user_data):
    client.post("/auth/register", json=test_user_data)
    response = client.post("/auth/login", json={
        "email": test_user_data["email"],
        "password": "wrongpassword"
    })
    assert response.status_code in [400, 401]


def test_login_nonexistent_user(client):
    response = client.post("/auth/login", json={
        "email": "nobody@test.com",
        "password": "somepass"
    })
    assert response.status_code in [400, 401, 404]
