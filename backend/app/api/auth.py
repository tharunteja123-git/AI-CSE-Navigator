from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.user import (
    UserRegister,
    UserLogin,
    UserResponse,
    Token,
)
from app.services.auth_service import (
    register_user,
    authenticate_user,
)
from app.core.security import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post("/register", response_model=UserResponse)
def register(user: UserRegister, db: Session = Depends(get_db)):
    return register_user(user, db)


@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = authenticate_user(
        user.email,
        user.password,
        db,
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    access_token = create_access_token(
        {"sub": str(db_user.id)}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }