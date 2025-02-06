FROM openjdk:21-jdk-slim

# Install Maven
RUN apt-get update && \
    apt-get install -y maven && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the pom.xml file
COPY pom.xml .

# Copy the source code
COPY src ./src

# Build the application
RUN mvn package -Dmaven.test.skip

# No need to copy the JAR file since it's already built in the container
# Just rename/move it if needed
RUN mv target/*.jar app.jar

# Copy the uploads directory if it exists
COPY uploads/ /app/uploads/

# Expose ports
EXPOSE 8001
EXPOSE 3305

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
