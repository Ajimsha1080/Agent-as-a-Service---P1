import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Hospitality Agent Cloud"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "development_secret_key_change_in_production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/hospitality_agent_cloud"
    PGVECTOR_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/hospitality_agent_cloud"
    REDIS_URL: str = "redis://localhost:6379/0"

    OPENAI_API_KEY: Optional[str] = "sk-mock-openai-key-for-dev"
    SARVAM_API_KEY: Optional[str] = None
    ANTHROPIC_API_KEY: Optional[str] = "sk-mock-anthropic-key-for-dev"
    GOOGLE_API_KEY: Optional[str] = "mock-google-key-for-dev"

    STT_PROVIDER: str = "whisper_mock"
    TTS_PROVIDER: str = "elevenlabs_mock"
    ELEVENLABS_API_KEY: Optional[str] = "mock-elevenlabs-key"

    WHATSAPP_API_KEY: Optional[str] = "mock-whatsapp-key"
    PAYMENT_PROVIDER_KEY: Optional[str] = "mock-stripe-key"
    STORAGE_PROVIDER: str = "local"

    LANGSMITH_TRACING: str = "false"
    LANGSMITH_API_KEY: Optional[str] = "mock-langsmith-key"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
