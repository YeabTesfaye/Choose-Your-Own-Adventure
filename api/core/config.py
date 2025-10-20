from typing import List, Optional
from pydantic import SecretStr, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    API_PREFIX: str = "/api"
    DEBUG: bool
    DATABASE_URL: str
    ALLOWED_ORIGINS: List[str] = []
    GOOGLE_API_KEYS: List[str] = []
    SECRET_KEY: SecretStr
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # Use model_config instead of the deprecated Config inner class
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", case_sensitive=True
    )

    @field_validator("ALLOWED_ORIGINS", "GOOGLE_API_KEYS", mode="before")
    def parse_list_from_str(cls, v):
        if isinstance(v, str):
            # The split() method handles the case of an empty string correctly
            return [val.strip() for val in v.strip("[]").split(",") if val.strip()]
        return v


settings = Settings()  # type: ignore
