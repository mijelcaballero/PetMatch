from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from ..config.db import Base

class Message(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True, index=True)
    room = Column(String, index=True)
    sender = Column(String, index=True)
    content = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)
