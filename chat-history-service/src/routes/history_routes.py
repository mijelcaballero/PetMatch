from fastapi import FastAPI
from ..controllers.history_controller import router as history_router

def setup_routes(app: FastAPI):
    app.include_router(history_router, prefix="/api")
