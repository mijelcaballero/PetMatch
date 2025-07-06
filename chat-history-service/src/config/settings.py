import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./chat_history.db")
    PORT: int = int(os.getenv("PORT", 3010))

settings = Settings()
