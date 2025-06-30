from fastapi import FastAPI
from routes.matchRoutes import router as match_router

app = FastAPI(title="BasicMatch Service")

app.include_router(match_router, prefix="/api/match")

@app.get("/health")
async def health():
    return {"status": "OK", "service": "basic-match-service"}
