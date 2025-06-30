# advanced-match-service/Dockerfile
FROM golang:1.20-alpine

WORKDIR /app

# Copia go.mod/sum e instala deps
COPY go.mod go.sum ./
RUN go mod download

# Copia el proto y el código
COPY proto ./proto
COPY cmd ./cmd
COPY internal ./internal

# Genera stubs
RUN apk add --no-cache protoc protobuf
RUN protoc --go_out=. --go-grpc_out=. proto/advanced_match.proto

# Compila el binario
RUN go build -o adv-match ./cmd/server

EXPOSE 3008

CMD ["./adv-match"]
# Este Dockerfile crea una imagen para el servicio de coincidencia avanzada.
# Utiliza Go 1.20 en Alpine, instala dependencias, genera stubs de                  