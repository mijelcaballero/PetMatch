from sqlalchemy.orm import Session
from ..models.message import Message
from datetime import datetime

def create_message(db: Session, room: str, sender: str, content: str):
    msg = Message(room=room, sender=sender, content=content, timestamp=datetime.utcnow())
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg

def get_messages(db: Session, room: str, limit: int = 100):
    return db.query(Message).filter(Message.room == room).order_by(Message.timestamp).limit(limit).all()
