import { CollapsibleCodeBlock } from '@site/src/components/collapsible-code-block';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export const FlywayMigrationV3GrantAppUserPrivileges = () => (
  <CollapsibleCodeBlock
    language="sql"
    title="database/flyway/migrations/V3__grant_app_user_privileges.sql"
  >
    {`-- ============================================================================
-- Flyway Migration V3: Grant DML Privileges to Application User
-- ============================================================================
--
-- This migration enforces the principle of least privilege by granting
-- the sakila_app user (created by postgres/init-users.sh) with DML-only
-- privileges (SELECT, INSERT, UPDATE, DELETE) on all tables and sequences.
--
-- The sakila (admin) user retains full DDL privileges for future migrations.
--

-- Grant schema usage
GRANT USAGE ON SCHEMA public TO sakila_app;

-- Grant DML privileges on all existing tables
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO sakila_app;

-- Grant sequence privileges for auto-increment IDs (SERIAL columns)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO sakila_app;

-- Set default privileges for future tables created by sakila (admin) user
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO sakila_app;

-- Set default privileges for future sequences
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO sakila_app;`}
  </CollapsibleCodeBlock>
);

export const FlywayDockerfile = () => (
  <CollapsibleCodeBlock
    language="Dockerfile"
    title="database/flyway/Dockerfile"
  >
    {`// highlight-added-start
FROM flyway/flyway:12-alpine
COPY database/flyway/migrations/ /flyway/sql/
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const PostgresDockerfile = () => (
  <CollapsibleCodeBlock
    language="Dockerfile"
    title="database/postgres/Dockerfile"
  >
    {`// highlight-added-start
FROM postgres:17-alpine
COPY init-users.sh /docker-entrypoint-initdb.d/01-init-users.sh
RUN chmod +x /docker-entrypoint-initdb.d/01-init-users.sh
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const PostgresInitUser = () => (
  <CollapsibleCodeBlock language="sh" title="database/postgres/init-users.sh">
    {`// highlight-added-start
#!/bin/bash
set -e

echo "Creating sakila_app user with DML-only privileges..."

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create restricted application user
    CREATE USER sakila_app WITH PASSWORD '$SAKILA_APP_PASSWORD';
    
    -- Grant connection to database
    GRANT CONNECT ON DATABASE $POSTGRES_DB TO sakila_app;
EOSQL

echo "sakila_app user created successfully"
echo "Privileges will be granted by Flyway migration V3 after tables are created"
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const DockerCompose = () => (
  <CollapsibleCodeBlock language="yml" title="docker-compose.yml">
    {`services:
// highlight-added-start
  postgres:
    build:
      context: database/postgres
      dockerfile: Dockerfile
    container_name: postgres
    environment:
      - POSTGRES_DB=\${POSTGRES_DB}
      - POSTGRES_USER=\${POSTGRES_USER}
      - POSTGRES_PASSWORD=\${POSTGRES_PASSWORD}
      - SAKILA_APP_PASSWORD=\${SAKILA_APP_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \${POSTGRES_USER} -d \${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 20s
    networks:
      - monitoring

  flyway:
    build:
      context: .
      dockerfile: database/flyway/Dockerfile
    container_name: flyway
    command: migrate
    restart: "no"
    environment:
      - FLYWAY_URL=jdbc:postgresql://postgres:5432/\${POSTGRES_DB}
      - FLYWAY_USER=\${POSTGRES_USER}
      - FLYWAY_PASSWORD=\${POSTGRES_PASSWORD}
      - FLYWAY_LOCATIONS=filesystem:/flyway/sql
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - monitoring

  pgadmin:
    image: dpage/pgadmin4:9
    container_name: pgadmin
    environment:
      - PGADMIN_DEFAULT_EMAIL=\${PGADMIN_DEFAULT_EMAIL}
      - PGADMIN_DEFAULT_PASSWORD=\${PGADMIN_DEFAULT_PASSWORD}
    ports:
      - "5050:80"
    volumes:
      - pgadmin-data:/var/lib/pgadmin
    restart: unless-stopped
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - monitoring
// highlight-added-end

  spring-java:
    # ...
// highlight-added-start
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/\${POSTGRES_DB}
      - SPRING_DATASOURCE_USERNAME=sakila_app
      - SPRING_DATASOURCE_PASSWORD=\${SAKILA_APP_PASSWORD}
// highlight-added-end
    # ...
    depends_on:
// highlight-added-start
      flyway:
        condition: service_completed_successfully
// highlight-added-end
// highlight-modified
      tempo:
// highlight-added
        condition: service_started
    # ...

  spring-kotlin:
    # ...
// highlight-added-start
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/\${POSTGRES_DB}
      - SPRING_DATASOURCE_USERNAME=sakila_app
      - SPRING_DATASOURCE_PASSWORD=\${SAKILA_APP_PASSWORD}
// highlight-added-end
    # ...
// highlight-added-start
      flyway:
        condition: service_completed_successfully
// highlight-added-end
// highlight-modified
      tempo:
// highlight-added
        condition: service_started
    # ...

  spring-groovy:
    # ...
// highlight-added-start
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/\${POSTGRES_DB}
      - SPRING_DATASOURCE_USERNAME=sakila_app
      - SPRING_DATASOURCE_PASSWORD=\${SAKILA_APP_PASSWORD}
// highlight-added-end
    # ...
    depends_on:
// highlight-added-start
      flyway:
        condition: service_completed_successfully
// highlight-added-end
// highlight-modified
      tempo:
// highlight-added
        condition: service_started
    # ...
  # ...
# ...
volumes:
// highlight-added-start
  postgres-data:
    driver: local
  pgadmin-data:
    driver: local
// highlight-added-end
  # ...`}
  </CollapsibleCodeBlock>
);

const BuildGradleGroovy = () => (
  <CollapsibleCodeBlock language="groovy" title="build.gradle">
    {`// ...
dependencies {
  // ...
// highlight-added
  runtimeOnly 'org.postgresql:postgresql'
}
// ...`}
  </CollapsibleCodeBlock>
);

const BuildGradleKt = () => (
  <CollapsibleCodeBlock language="kts" title="build.gradle.kts">
    {`// ...
dependencies {
  // ...
// highlight-added
  runtimeOnly("org.postgresql:postgresql")
}
// ...`}
  </CollapsibleCodeBlock>
);

export const BuildGradle = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <BuildGradleGroovy />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <BuildGradleKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <BuildGradleGroovy />
    </TabItem>
  </Tabs>
);

export const ApplicationYaml = () => (
  <CollapsibleCodeBlock language="yaml" title="resources/application.yaml">
    {`# ...
// highlight-added-start
  datasource:
    url: \${SPRING_DATASOURCE_URL}
    driver-class-name: org.postgresql.Driver
    username: \${SPRING_DATASOURCE_USERNAME}
    password: \${SPRING_DATASOURCE_PASSWORD}
  jpa:
    database-platform: org.hibernate.dialect.PostgreSQLDialect
    hibernate:
      ddl-auto: none
    show-sql: false
  flyway:
    enabled: false
// highlight-added-end
# ...`}
  </CollapsibleCodeBlock>
);

export const TerminalCurl = () => (
  <CollapsibleCodeBlock language="log" title="Terminal">
    {`$ curl -s https://sakila-java.pollito.tech/api/films/1 | jq
{
  "instance": "/api/films/1",
  "status": 200,
  "timestamp": "2026-03-13T16:19:38.475466237Z",
  "trace": "625422f841d818b44d771d428cf802a4",
  "data": {
    "description": "A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies",
    "id": 1,
    "language": "English",
    "length": 86,
    "rating": "PG",
    "releaseYear": 2006,
    "title": "ACADEMY DINOSAUR"
  }
}`}
  </CollapsibleCodeBlock>
);
