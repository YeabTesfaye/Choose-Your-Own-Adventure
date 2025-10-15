from typing import List
from pydantic import field_validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    API_PREFIX: str = "/api"
    DEBUG: bool
    DATABASE_URL: str
    ALLOWED_ORIGINS: List[str] = []
    GOOGLE_API_KEYS: List[str]

    @field_validator("ALLOWED_ORIGINS", mode="before")
    def parse_allowed_origins(cls, v):
        if isinstance(v, str):
            return v.strip("[]").replace(" ", "").split(",")
        return v

    @field_validator("GOOGLE_API_KEYS", mode="before", check_fields=False)
    def parse_api_keys(cls, v):
        if isinstance(v, str):
            v = v.strip("[]").replace(" ", "")
            return v.split(",")
        return v

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


settings = Settings()  # type: ignore
