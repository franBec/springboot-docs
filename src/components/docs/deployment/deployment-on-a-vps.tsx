import { CollapsibleCodeBlock } from '@site/src/components/collapsible-code-block';
import ZoomContainer from '@site/src/components/zoom-container';
import Mermaid from '@theme/Mermaid';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { FileTreeInfo } from '@site/src/components/file-tree-info';

export const DeploymentFlowDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`flowchart TD
    A[1. Developer pushes to main] --> B[2. GitHub Actions triggers]
    B --> C[3. Build & Test all modules]
    C -->|❌ Fail| D[No deployment]
    C -->|✅ Pass| E[4. Trigger Coolify webhook]
    E --> F[5. Coolify pulls latest code]
    F --> G[6. Coolify builds Docker images]
    G --> H[7. Coolify deploys containers]`}
    />
  </ZoomContainer>
);

export const DeploymentFlowDiagramES = () => (
  <ZoomContainer>
    <Mermaid
      value={`flowchart TD
    A[1. El desarrollador hace push a main] --> B[2. GitHub Actions se activa]
    B --> C[3. Compilar y probar todos los módulos]
    C -->|❌ Falla| D[Sin despliegue]
    C -->|✅ Pasa| E[4. Activar webhook de Coolify]
    E --> F[5. Coolify obtiene el código más reciente]
    F --> G[6. Coolify construye imágenes Docker]
    G --> H[7. Coolify despliega contenedores]`}
    />
  </ZoomContainer>
);

export const FileTree = () => (
  <FileTreeInfo>
    <CollapsibleCodeBlock
      language="log"
      title="File Tree"
    >{`springboot-demo-projects/
├── .github/
│   └── workflows/
// highlight-added-start
│       └── ci-cd.yml
├── docker-compose.yml
// highlight-added-end
// highlight-modified
├── .gitignore
├── spring_java/
// highlight-added-start
│   ├── Dockerfile
│   └── settings-docker.gradle
// highlight-added-end
├── spring_kotlin/
// highlight-added-start
│   ├── Dockerfile
│   └── settings-docker.gradle
// highlight-added-end
└── spring_groovy/
// highlight-added-start
    ├── Dockerfile
    └── settings-docker.gradle
// highlight-added-end`}</CollapsibleCodeBlock>
  </FileTreeInfo>
);

export const DockerComposeYaml = () => (
  <CollapsibleCodeBlock language="yaml" title="docker-compose.yml">{`
// highlight-added-start
services:
  spring-java:
    build:
      context: .
      dockerfile: spring_java/Dockerfile
    container_name: spring-java
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    restart: unless-stopped

  spring-kotlin:
    build:
      context: .
      dockerfile: spring_kotlin/Dockerfile
    container_name: spring-kotlin
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    restart: unless-stopped

  spring-groovy:
    build:
      context: .
      dockerfile: spring_groovy/Dockerfile
    container_name: spring-groovy
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    restart: unless-stopped
// highlight-added-end`}</CollapsibleCodeBlock>
);

const DockerfileJava = () => (
  <CollapsibleCodeBlock
    language="dockerfile"
    title="spring_java/Dockerfile"
  >{`// highlight-added-start
FROM gradle:jdk21-alpine AS build
WORKDIR /home/gradle/src

COPY --chown=gradle:gradle spring_java/settings-docker.gradle ./settings.gradle
COPY --chown=gradle:gradle gradle ./gradle
COPY --chown=gradle:gradle gradlew ./
COPY --chown=gradle:gradle spring_java ./spring_java

RUN gradle :spring_java:bootJar -x test -x spotlessApply -x spotlessCheck --no-daemon

FROM eclipse-temurin:21-jre-alpine
RUN apk add --no-cache curl
WORKDIR /app
COPY --from=build /home/gradle/src/spring_java/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
// highlight-added-end`}</CollapsibleCodeBlock>
);

const DockerfileKotlin = () => (
  <CollapsibleCodeBlock
    language="dockerfile"
    title="spring_kotlin/Dockerfile"
  >{`// highlight-added-start
FROM gradle:jdk21-alpine AS build
WORKDIR /home/gradle/src

COPY --chown=gradle:gradle spring_kotlin/settings-docker.gradle ./settings.gradle
COPY --chown=gradle:gradle gradle ./gradle
COPY --chown=gradle:gradle gradlew ./
COPY --chown=gradle:gradle spring_kotlin ./spring_kotlin

RUN gradle :spring_kotlin:bootJar -x test -x spotlessApply -x spotlessCheck --no-daemon

FROM eclipse-temurin:21-jre-alpine
RUN apk add --no-cache curl
WORKDIR /app
COPY --from=build /home/gradle/src/spring_kotlin/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
// highlight-added-end`}</CollapsibleCodeBlock>
);

const DockerfileGroovy = () => (
  <CollapsibleCodeBlock
    language="dockerfile"
    title="spring_groovy/Dockerfile"
  >{`// highlight-added-start
FROM gradle:jdk21-alpine AS build
WORKDIR /home/gradle/src

COPY --chown=gradle:gradle spring_groovy/settings-docker.gradle ./settings.gradle
COPY --chown=gradle:gradle gradle ./gradle
COPY --chown=gradle:gradle gradlew ./
COPY --chown=gradle:gradle spring_groovy ./spring_groovy

RUN gradle :spring_groovy:bootJar -x test -x spotlessApply -x spotlessCheck --no-daemon

FROM eclipse-temurin:21-jre-alpine
RUN apk add --no-cache curl
WORKDIR /app
COPY --from=build /home/gradle/src/spring_groovy/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
// highlight-added-end`}</CollapsibleCodeBlock>
);

export const DockerFiles = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <DockerfileJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <DockerfileKotlin />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <DockerfileGroovy />
    </TabItem>
  </Tabs>
);

const SettingsDockerGradleJava = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="spring_java/settings-docker.gradle"
  >{`// highlight-added-start
rootProject.name = 'springboot-demo-projects'

include 'spring_java'
// highlight-added-end`}</CollapsibleCodeBlock>
);

const SettingsDockerGradleKotlin = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="spring_kotlin/settings-docker.gradle"
  >{`// highlight-added-start
rootProject.name = 'springboot-demo-projects'

include 'spring_kotlin'
// highlight-added-end`}</CollapsibleCodeBlock>
);

const SettingsDockerGradleGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="spring_groovy/settings-docker.gradle"
  >{`// highlight-added-start
rootProject.name = 'springboot-demo-projects'

include 'spring_groovy'
// highlight-added-end`}</CollapsibleCodeBlock>
);

export const SettingsDockerGradle = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <SettingsDockerGradleJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <SettingsDockerGradleKotlin />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <SettingsDockerGradleGroovy />
    </TabItem>
  </Tabs>
);

export const GitIgnore = () => (
  <CollapsibleCodeBlock language=".gitignore" title=".gitignore">
    {`# General
.DS_Store
.history
*.log

# Gradle stuff
.gradle/
**/build/
!**/src/**/build/
gradle-app.setting

# IDEs
.idea/
*.iml
*.iws
.vscode/
.project
.settings/
.classpath

# Spring Boot
*.jar
// highlight-added
!gradle/wrapper/gradle-wrapper.jar
*.war`}
  </CollapsibleCodeBlock>
);

export const GitHubActionsYaml = () => (
  <CollapsibleCodeBlock
    language="yaml"
    title=".github/workflows/ci-cd.yml"
  >{`// highlight-added-start
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set up JDK 21
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
          cache: gradle

      - name: Make gradlew executable
        run: chmod +x gradlew

      - name: Build & test all modules
        run: ./gradlew clean build

      - name: Upload test reports
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-reports
          path: '**/build/reports/**'

  deploy:
    needs: build-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'

    steps:
      - name: Trigger Coolify deployment
        run: |
          curl -X GET "https://coolify.pollito.tech/api/v1/deploy?uuid=\${{ secrets.COOLIFY_DEPLOY_UUID }}&force=false" \\
            --header "Authorization: Bearer \${{ secrets.COOLIFY_API_TOKEN }}" \\
            --fail-with-body
// highlight-added-end`}</CollapsibleCodeBlock>
);

export const VerificationTerminal = () => (
  <CollapsibleCodeBlock
    language="sh"
    title="Terminal"
  >{`pollito in @ springboot-docs  $ curl -s https://sakila-java.pollito.tech/api/films/42 | jq                                                    
{
  "instance": "/api/films/42",
  "status": 200,
  "timestamp": "2026-02-07T19:12:08.752369341Z",
  "trace": "b4e26474-1dd7-4af9-9865-21c056a43b34",
  "data": {
    "description": "A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies",
    "id": 42,
    "language": "English",
    "lengthMinutes": 86,
    "rating": "PG",
    "releaseYear": 2006,
    "title": "ACADEMY DINOSAUR"
  }
}

pollito in @ springboot-docs  $ curl -s https://sakila-kt.pollito.tech/api/films/42 | jq
{
  "instance": "/api/films/42",
  "status": 200,
  "timestamp": "2026-02-07T19:12:16.4206552Z",
  "trace": "58cf1f78-b195-41d4-8f43-0fc8b823899a",
  "data": {
    "id": 42,
    "title": "ACADEMY DINOSAUR",
    "description": "A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies",
    "releaseYear": 2006,
    "rating": "PG",
    "lengthMinutes": 86,
    "language": "English"
  }
}

pollito in @ springboot-docs  $ curl -s https://sakila-groovy.pollito.tech/api/films/42 | jq
{
  "instance": "/api/films/42",
  "status": 200,
  "timestamp": "2026-02-07T19:12:26.069297914Z",
  "trace": "005d057a-cc83-47b5-9962-1bbc44862b03",
  "data": {
    "description": "A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies",
    "id": 42,
    "language": "English",
    "lengthMinutes": 86,
    "rating": "PG",
    "releaseYear": 2006,
    "title": "ACADEMY DINOSAUR"
  }
}`}</CollapsibleCodeBlock>
);
