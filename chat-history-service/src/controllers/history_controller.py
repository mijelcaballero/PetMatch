from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
from ..services.history_service import create_message, get_messages
from ..config.db import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/history/{room}", response_model=dict)
def post_message(room: str, payload: dict, db: Session = Depends(get_db)):
    if "sender" not in payload or "content" not in payload:
        raise HTTPException(status_code=400, detail="sender and content required")
    msg = create_message(db, room, payload["sender"], payload["content"])
    return {
        "id": msg.id,
        "room": msg.room,
        "sender": msg.sender,
        "content": msg.content,
        "timestamp": msg.timestamp.isoformat()
    }

@router.get("/history/{room}", response_model=list)
def read_history(room: str, limit: int = 100, db: Session = Depends(get_db)):
    messages = get_messages(db, room, limit)
    return [
        {
            "id": m.id,
            "room": m.room,
            "sender": m.sender,
            "content": m.content,
            "timestamp": m.timestamp.isoformat()
        } for m in messages
    ]
