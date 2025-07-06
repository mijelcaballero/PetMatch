FROM python:3.11-alpine
WORKDIR /app

# Dependencies for lxml
RUN apk add --no-cache gcc musl-dev libxml2-dev libxslt-dev

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src src

ENV PORT=3018

EXPOSE 3018

CMD ["python", "src/app.py"]
