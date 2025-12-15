# syntax=docker/dockerfile:1.6

##########
# Build Stage
##########
FROM gradle:8.5-jdk17 AS build
WORKDIR /app

# Copy Gradle wrapper and build files
COPY gradlew gradlew.bat ./
COPY gradle/wrapper/ gradle/wrapper/
COPY build.gradle settings.gradle* ./

# Warm up Gradle cache to avoid re-downloading dependencies
RUN --mount=type=cache,target=/home/gradle/.gradle \
    ./gradlew --no-daemon --version

# Copy source code
COPY src src

# Build the Spring Boot JAR
RUN --mount=type=cache,target=/home/gradle/.gradle \
    ./gradlew --no-daemon clean bootJar

##########
# Runtime Stage
##########
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copy built JAR from build stage
COPY --from=build /app/build/libs/nyc311-app-*.jar app.jar

# Expose port and run
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
