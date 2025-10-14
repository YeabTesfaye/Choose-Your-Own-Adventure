from typing import List
from pydantic import field_validator
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    API_PREFIX: str = "/api"
    DEBUG: bool
    DATABASE_URL: str
    ALLOWED_ORIGINS: List[str] = []
    OPENAI_API_KEY: str 
    
    @field_validator("ALLOWED_ORIGINS", mode="before")
    def parse_allowed_origins(cls, v):
        return v.split(",") if isinstance(v, str) else v
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True
        
settings = Settings() # type: ignore

