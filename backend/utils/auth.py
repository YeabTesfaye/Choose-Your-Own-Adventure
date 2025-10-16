import os
import logging
from uuid import UUID, uuid4
from datetime import datetime, timedelta, timezone
from typing import Annotated

import jwt
from jwt import PyJWTError
from passlib.context import CryptContext
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from dotenv import load_dotenv

from db.database import get_db
from models.user import User
from schemas.user import Token, TokenData, UserCreate, UserLogin
from .exceptions import (
    UserError,
    AuthenticationError,
)

# Load environment variables
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "0"))

if not SECRET_KEY or not ALGORITHM or not ACCESS_TOKEN_EXPIRE_MINUTES:
    raise Exception("Authentication environment variables are not set!")

# Security & OAuth
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="users/token")
bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# ------------------------
# Password Utilities
# ------------------------


def verify_password(plain_password, hashed_password):
    return bcrypt_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return bcrypt_context.hash(password)


# ------------------------
# User Authentication
# ------------------------
def authenticate_user(email: str, password: str, db: Session) -> User | bool:
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.hashed_password):
        logging.warning(f"Failed authentication attempt for email: {email}")
        return False
    return user


# ------------------------
# JWT Token Utilities
# ------------------------
def create_access_token(email: str, user_id: UUID, expires_delta: timedelta) -> str:
    payload = {
        "sub": email,
        "id": str(user_id),
        "exp": datetime.now(timezone.utc) + expires_delta,
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def verify_token(token: str) -> TokenData:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])  # type: ignore
        user_id: str = payload.get("id")
        if not user_id:
            logging.warning("Token payload missing user_id")
            raise AuthenticationError("Invalid token")
        return TokenData(user_id=user_id)
    except PyJWTError as e:
        logging.warning(f"Token verification failed: {str(e)}")
        raise AuthenticationError("Invalid token")


# ------------------------
# FastAPI Dependencies
# ------------------------
def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]) -> TokenData:
    return verify_token(token)


CurrentUser = Annotated[TokenData, Depends(get_current_user)]


# ------------------------
# Register & Login
# ------------------------
def register_user(db: Session, user_req: UserCreate) -> User:
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user_req.email).first()
    if existing_user:
        raise UserError(status_code=409, detail="Email already registered")

    try:
        db_user = User(
            id=uuid4(),
            email=user_req.email,
            first_name=user_req.first_name,
            last_name=user_req.last_name,
            hashed_password=get_password_hash(user_req.password),
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except Exception as e:
        logging.error(f"Error registering user: {str(e)}")
        raise UserError(status_code=500, detail="Failed to register user")


def login_for_access_token(
    user_data: UserLogin,
    db: Session = Depends(get_db),
) -> Token:
    user = authenticate_user(user_data.email, user_data.password, db)
    if not user:
        raise AuthenticationError("Invalid credentials")
    token = create_access_token(
        user.email,  # type: ignore
        user.id,  # type: ignore
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    return Token(access_token=token, token_type="bearer")
