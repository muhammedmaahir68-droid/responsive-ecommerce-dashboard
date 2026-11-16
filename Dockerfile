# Stage 1: Build Spring Boot backend
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app

# Copy backend files and build
COPY backend/pom.xml .
COPY backend/src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run with lightweight JRE
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT} -jar app.jar"]
