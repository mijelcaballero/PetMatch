from fastapi import FastAPI
from .config.db import init_db
from .routes.history_routes import setup_routes

app = FastAPI(title="Chat History Service")

# Initialize DB
init_db()

# Setup routes
setup_routes(app)

@app.get("/health")
def health():
    return {"status": "OK", "service": "chat-history-service"}
