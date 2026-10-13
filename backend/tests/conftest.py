import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.db.database import Base, get_db

# Use in-memory SQLite for tests
SQLALCHEMY_TEST_URL = "sqlite://"
engine = create_engine(
    SQLALCHEMY_TEST_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture
def client():
    return TestClient(app)


@pytest.fixture
def test_user_data():
    return {
        "full_name": "Test Student",
        "email": "test@cse.com",
        "password": "testpass123",
        "college": "Test University",
        "graduation_year": 2024,
        "career_interest": "AI Engineer"
    }


@pytest.fixture
def auth_headers(client, test_user_data):
    # Register
    client.post("/auth/register", json=test_user_data)
    # Login
    login = client.post("/auth/login", json={
        "email": test_user_data["email"],
        "password": test_user_data["password"]
    })
    token = login.json().get("access_token", "")
    return {"Authorization": f"Bearer {token}"}
