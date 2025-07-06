FROM golang:1.20-alpine AS build
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY src ./src
RUN go build -o moderation-service ./src/main.go

FROM alpine:latest
WORKDIR /root/
COPY --from=build /app/moderation-service .
EXPOSE 3016
CMD ["./moderation-service"]
