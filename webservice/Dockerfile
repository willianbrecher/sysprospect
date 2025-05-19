#build
FROM maven:3.8.7-openjdk-18-slim as builder

WORKDIR /app
COPY pom.xml .
COPY src ./src

RUN mvn clean package -Pprod -DskipTests 

#serve
FROM openjdk:21

WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]