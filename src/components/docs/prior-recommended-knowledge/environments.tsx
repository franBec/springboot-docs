import { CollapsibleCodeBlock } from '@site/src/components/collapsible-code-block';

export const ApplicationYml = () => (
  <CollapsibleCodeBlock
    language="yaml"
    title="src/main/resources/application.yml"
  >{`spring:
  application:
    name: spring_java

server:
  port: 8080`}</CollapsibleCodeBlock>
);

export const ApplicationDevYml = () => (
  <CollapsibleCodeBlock
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
    dev.pollito: DEBUG`}</CollapsibleCodeBlock>
);

export const ApplicationProdYml = () => (
  <CollapsibleCodeBlock
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
    dev.pollito: INFO`}</CollapsibleCodeBlock>
);

export const ApplicationYmlWithProfile = () => (
  <CollapsibleCodeBlock
    language="yaml"
    title="src/main/resources/application.yml"
  >{`spring:
  profiles:
    active: dev`}</CollapsibleCodeBlock>
);
