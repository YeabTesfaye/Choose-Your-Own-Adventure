from uuid import UUID
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from utils.exceptions import UserNotFoundError
from models.user import User
from db.database import get_db
from schemas.user import UserCreate, UserLogin, UserResponse, Token
from utils.auth import register_user, login_for_access_token, CurrentUser

router = APIRouter(prefix="/users", tags=["users"])


# Register new user
@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    return register_user(db, user)


# Login
@router.post("/token", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    return login_for_access_token(user, db)


@router.get("/me", response_model=UserResponse)
def get_current_user_info(current_user: CurrentUser, db: Session = Depends(get_db)):
    user_id = UUID(current_user.user_id)
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise UserNotFoundError()
    return user
