FROM python:3.11-alpine
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY src ./src
EXPOSE 3017
CMD ["uvicorn", "src.app:app", "--host", "0.0.0.0", "--port", "3017"]
