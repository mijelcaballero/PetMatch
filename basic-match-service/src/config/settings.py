import os

from dotenv import load_dotenv

load_dotenv()

class Settings:
    port: int = int(os.getenv("PORT", 3007))
    aws_region: str = os.getenv("AWS_REGION", "us-east-1")
    table: str = os.getenv("DYNAMODB_TABLE_BASIC_MATCH", "petmatch-basicmatch")

settings = Settings()
