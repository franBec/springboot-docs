---
sidebar_position: 2
---

# Docker

If you've been doing software development for a bit, you've likely seen this logo:


[Docker](https://www.docker.com/) is like a standard shipping container for software. Just as shipping containers revolutionized global trade by providing a standard way to transport goods regardless of content, Docker provides a standard way to package and run software regardless of the underlying infrastructure.

Think of Docker as creating a complete, self-contained box that has everything your application needs to run:

- The application itself.
- All libraries and dependencies.
- Runtime environment.
- Configuration.

This "box" (called a container) can then be moved and run consistently on any system that supports Docker - from a developer's laptop to a test environment to a production server.

## Why Dockerize Spring Boot Applications?

Spring Boot applications are perfect candidates for Docker containers for several reasons:

1. **Portability across environments**.
   * Docker containers bundle the application along with all its dependencies (e.g., JDK, libraries).
   * It ensures consistency across different environments (development, staging, production), avoiding the classic “it works on my machine” problem.
2. **Ease of deployment**.
   * A Docker image is a self-contained artifact that can be deployed anywhere Docker is supported (on-premises, AWS, GCP, Azure, etc.).
3. **Scalability**.
   * Containers are lightweight compared to traditional virtual machines, allowing you to spin up multiple instances of your Spring Boot app quickly.
   * Useful for microservices architecture where scaling individual services is common.
4. **Isolation**.
   * Each Docker container runs in its own isolated environment.
   * This avoids conflicts between your Spring Boot app’s dependencies and other apps or system-level libraries.
5. **Simplified CI/CD pipelines**.
   * Docker integrates seamlessly with CI/CD tools like Jenkins, GitLab CI, or GitHub Actions.
6. **Improved resource utilization**.
   * Containers share the host OS kernel, making them more resource-efficient than traditional VMs.
   * This enables running more instances of your Spring Boot app on the same hardware.
7. **Versioning and rollbacks**.
   * Docker images are versioned, allowing you to track changes and roll back to a previous version if needed.
8. **Cloud-Native alignment**.
   * Most cloud platforms are optimized for containerized applications.
9. **Simplifies team collaboration**.
   * Developers and DevOps teams can use the same Docker image to ensure that everyone is working with identical application setups.

## Dockerfile For Spring Boot

A `Dockerfile` defines how your Spring Boot application should be containerized. Here's my own implementation:

```Dockerfile
# Build Stage
FROM gradle:jdk21-alpine AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build -x test --no-daemon

# Run Stage
FROM eclipse-temurin:21-jre-alpine
RUN apk add --no-cache curl
COPY --from=build /home/gradle/src/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

Nonetheless, if you are joining a team that already have their own `Dockerfile` defined, is best to avoid touching it unless necessary.

### Understanding The Multi-Stage Build

This `Dockerfile` uses what's called a "multi-stage build":

**Build Stage**. This first stage is like a workshop where we build our application:

1. We start with a container that has Gradle and the full [Java Development Kit (JDK)](https://www.geeksforgeeks.org/jdk-in-java/).
2. We copy our Spring Boot project into this container.
3. We run the Gradle build command to compile our application and create a `JAR` file.
4. When done, we'll have our compiled application, but also a lot of build tools we don't need anymore.

**Run Stage**. This second stage is the actual container that will run:

1. We start with a much smaller container that only has the [Java Runtime Environment (JRE)](https://www.geeksforgeeks.org/jre-in-java/).
2. We add curl for health checks and troubleshooting.
3. We copy just the final `JAR` file from the build stage.
4. We set up the command to run our application.

### Benefits Of This Approach

This two-stage approach provides several advantages:

* **Smaller final image size**: The final container only includes what's needed to run the application, not to build it.
* **Better security**: Fewer components mean fewer potential vulnerabilities.
* **Faster deployments**: Smaller images deploy more quickly.
* **Cleaner separation**: Build concerns are separated from runtime concerns.

## Now I Should Build The Container Right?

![well-yes-but-no.png](img/well-yes-but-no.png)

While building and testing Docker images locally is the ideal scenario, in many professional environments, developers take a different approach:

### Docker Installation Challenges

Getting Docker running smoothly on your development machine isn't always straightforward:

- **Windows users** may face compatibility issues with WSL (Windows Subsystem for Linux), Hyper-V requirements, or performance concerns.
- **macOS users** need to work with Docker Desktop, which consumes significant system resources and has licensing requirements for larger organizations.
- **Linux users** have the most native experience but still need proper permissions and configuration.

These setup hurdles can distract from your primary job: writing code.

### Leveraging Existing Pipelines

Most established projects already have CI/CD pipelines configured:

- When you push code to the repository, automated processes build, test, and deploy your changes.
- Development and test environments are automatically updated with your changes.
- Build logs and deployment results are available through your CI/CD platform (Jenkins, GitHub Actions, GitLab CI, etc.).

In these cases, it's often more efficient to:

1. Push your changes to a feature branch.
2. Let the pipeline handle the Docker build process.
3. Review logs if issues occur.
4. Check the deployed application in the development environment.

This approach lets you focus on code quality while specialized pipeline tools handle the build process in consistent, controlled environments purpose-built for that task.