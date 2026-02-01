import { CollapsibleCodeBlock } from '@site/src/components/collapsible-code-block';

export const Dockerfile = () => (
  <CollapsibleCodeBlock language="dockerfile" title="Dockerfile">
    {`# Build Stage
FROM gradle:jdk21-alpine AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build -x test --no-daemon

# Run Stage
FROM eclipse-temurin:21-jre-alpine
RUN apk add --no-cache curl
COPY --from=build /home/gradle/src/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]`}
  </CollapsibleCodeBlock>
);
