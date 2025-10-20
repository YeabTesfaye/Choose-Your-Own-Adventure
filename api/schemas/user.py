from pydantic import BaseModel, EmailStr, model_validator, Field, validator
from uuid import UUID
from datetime import datetime
from typing import Optional
import re


# -------------------------------
# Response model (without password)
# -------------------------------
class UserResponse(BaseModel):
    id: UUID
    email: EmailStr
    first_name: str
    last_name: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# -------------------------------
# Input model for creating new users
# -------------------------------
class UserCreate(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    password: str

    @validator("first_name", "last_name")
    def validate_name(cls, value):
        if not re.match(r"^[A-Za-z]+$", value):
            raise ValueError(
                "Name must contain only letters (no numbers or special characters)."
            )
        return value

    @validator("password")
    def validate_password(cls, value):
        if not re.search(r"[A-Z]", value):
            raise ValueError("Password must contain at least one uppercase letter.")
        if not re.search(r"[a-z]", value):
            raise ValueError("Password must contain at least one lowercase letter.")
        if not re.search(r"[0-9]", value):
            raise ValueError("Password must contain at least one number.")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", value):
            raise ValueError("Password must contain at least one special character.")
        return value

    class Config:
        from_attributes = True


# -------------------------------
# Input model for logging in
# -------------------------------
class UserLogin(BaseModel):
    email: EmailStr
    password: str

    class Config:
        from_attributes = True


# -------------------------------
# Input model for changing password
# -------------------------------
class PasswordChange(BaseModel):
    current_password: str
    new_password: str
    new_password_confirm: str

    # Use a model validator to check the relationship between multiple fields
    @model_validator(mode="after")
    def passwords_match(self) -> "PasswordChange":
        if self.new_password != self.new_password_confirm:
            raise ValueError("New passwords do not match")
        return self

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    user_id: Optional[str] = None

    def get_uuid(self):
        return UUID(self.user_id) if self.user_id else None
