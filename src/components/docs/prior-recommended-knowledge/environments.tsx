import CodeBlock from '@theme/CodeBlock';

export const ApplicationYml = () => (
  <CodeBlock
    language="yaml"
    title="src/main/resources/application.yml"
  >{`spring:
  application:
    name: spring_java

server:
  port: 8080`}</CodeBlock>
);

export const ApplicationDevYml = () => (
  <CodeBlock
    language="yaml"
    title="src/main/resources/application-dev.yml"
  >{`spring:
  datasource:
    url: jdbc:h2:mem:devdb
    username: sa
    password: password
  h2:
    console:
      enabled: true
logging:
  level:
    dev.pollito: DEBUG`}</CodeBlock>
);

export const ApplicationProdYml = () => (
  <CodeBlock
    language="yaml"
    title="src/main/resources/application-prod.yml"
  >{`spring:
  datasource:
    url: jdbc:postgresql://prod-db.example.com:5432/usersdb
    username: prod_user
    password: \${DB_PASSWORD}
server:
  port: 80
logging:
  level:
    dev.pollito: INFO`}</CodeBlock>
);

export const ApplicationYmlWithProfile = () => (
  <CodeBlock
    language="yaml"
    title="src/main/resources/application.yml"
  >{`spring:
  profiles:
    active: dev`}</CodeBlock>
);
