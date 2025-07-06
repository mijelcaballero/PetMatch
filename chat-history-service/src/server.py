import uvicorn
from .config.settings import settings
from .app import app

if __name__ == "__main__":
    uvicorn.run("chat_history_service.src.app:app", host="0.0.0.0", port=settings.PORT, log_level="info")
