# Use the official OpenJDK 17 image
FROM openjdk:17-jdk-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the Maven project files
COPY pom.xml .

# Install the dependencies
RUN mvn dependency:resolve

# Copy the application code
COPY . .

# Build the application
RUN mvn clean install -DskipTests=true

# Expose the port
EXPOSE 8080

# Run the command when the container starts
CMD ["mvn", "spring-boot:run"]