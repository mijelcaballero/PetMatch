from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Match(BaseModel):
    user_id: str
    matches: List[str]
    created_at: datetime = datetime.utcnow()
