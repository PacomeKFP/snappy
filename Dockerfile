FROM openjdk:21-jdk-slim

WORKDIR /app

#RUN mvn package -Dmaven.test.skip

# Copy the JAR file
COPY target/*.jar app.jar

# Copy the uploads directory if it exists
COPY uploads/ /app/uploads/

# Expose ports
EXPOSE 8001
EXPOSE 3305

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
