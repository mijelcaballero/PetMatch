FROM maven:3.8.8-eclipse-temurin-17 as build

WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn package -DskipTests

FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/communities-service-1.0.0.jar app.jar
EXPOSE 3011
CMD ["java","-jar","app.jar"]
