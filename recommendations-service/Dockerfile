# Stage 1: build
FROM rust:1.71 as builder
WORKDIR /usr/src/app
COPY . .
RUN cargo build --release

# Stage 2: runtime
FROM gcr.io/distroless/cc
COPY --from=builder /usr/src/app/target/release/recommendations_service /usr/local/bin/recommendations_service
EXPOSE 3014
CMD ["recommendations_service"]
