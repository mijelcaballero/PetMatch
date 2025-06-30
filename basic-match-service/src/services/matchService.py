from models.match import Match
from config.settings import settings
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource("dynamodb", region_name=settings.aws_region)
table = dynamodb.Table(settings.table)

async def get_matches(user_id: str):
    try:
        resp = table.get_item(Key={"user_id": user_id})
        return resp.get("Item")
    except ClientError as e:
        raise e

async def put_match(data: Match):
    item = data.dict()
    table.put_item(Item=item)
    return item
