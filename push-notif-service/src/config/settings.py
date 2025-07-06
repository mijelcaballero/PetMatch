import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PORT: int = int(os.getenv("PORT", 3017))
    # In-memory subscribers, no external broker for this stub

settings = Settings()
