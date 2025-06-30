# basic-match-service/Dockerfile
FROM python:3.11-alpine

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src ./src

ENV PYTHONUNBUFFERED=1

EXPOSE 3007

CMD ["uvicorn", "src.app.main:app", "--host", "0.0.0.0", "--port", "3007"]
