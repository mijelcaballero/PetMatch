from fastapi import APIRouter
from controllers.matchController import read_matches, create_match
from models.match import Match

router = APIRouter()

@router.get("/{user_id}", summary="Get basic matches for a user")
async def get_match(user_id: str):
    return await read_matches(user_id)

@router.post("/", summary="Create or update basic match")
async def post_match(match: Match):
    return await create_match(match)
