from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from sse_starlette.sse import EventSourceResponse
import asyncio
from config.settings import settings

app = FastAPI(title="Push Notification Service")

subscribers = []

@app.get("/health")
async def health():
    return {"status": "OK", "service": "push-notif-service"}

@app.post("/api/notify")
async def notify(request: Request):
    payload = await request.json()
    for queue in subscribers:
        await queue.put(payload)
    return JSONResponse({"message": "Notification sent", "subscribers": len(subscribers)})

@app.get("/api/stream")
async def stream(request: Request):
    queue = asyncio.Queue()
    subscribers.append(queue)

    async def event_generator():
        try:
            while True:
                if await request.is_disconnected():
                    break
                payload = await queue.get()
                yield {"event": "notification", "data": payload}
        except asyncio.CancelledError:
            pass
        finally:
            subscribers.remove(queue)

    return EventSourceResponse(event_generator())

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.app:app", host="0.0.0.0", port=settings.PORT)
