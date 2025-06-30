from fastapi import HTTPException
from services.matchService import get_matches, put_match
from models.match import Match

async def read_matches(user_id: str):
    item = await get_matches(user_id)
    if not item:
        raise HTTPException(status_code=404, detail="No matches found")
    return item

async def create_match(match: Match):
    item = await put_match(match)
    return item
