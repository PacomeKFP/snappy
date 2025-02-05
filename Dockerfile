FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /app

# Copier les fichiers du projet
COPY . .

# Construire l'application Java
RUN mvn package -Dmaven.test.skip

# Image finale avec OpenJDK 21
FROM openjdk:21-jdk-slim

WORKDIR /app

# Copier le JAR depuis l'étape de construction
COPY --from=builder /app/target/*.jar app.jar

# Copier le répertoire uploads si présent
COPY uploads/ /app/uploads/

# Exposer les ports nécessaires
EXPOSE 8001 3305

# Lancer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]