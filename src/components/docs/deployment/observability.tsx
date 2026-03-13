import { CollapsibleCodeBlock } from '@site/src/components/collapsible-code-block';
import ZoomContainer from '@site/src/components/zoom-container';
import Mermaid from '@theme/Mermaid';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

const BuildGradleGroovy = () => (
  <CollapsibleCodeBlock language="groovy" title="build.gradle">
    {`// ...
dependencies {
  // ...
// highlight-added
  implementation 'io.micrometer:micrometer-registry-prometheus:1.17.0-M2'
}
// ...`}
  </CollapsibleCodeBlock>
);

const BuildGradleKts = () => (
  <CollapsibleCodeBlock language="kotlin" title="build.gradle.kts">
    {`// ...
dependencies {
  // ...
// highlight-added
  implementation("io.micrometer:micrometer-registry-prometheus:1.17.0-M2")
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
      <BuildGradleKts />
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
management:
  endpoints:
    web:
      exposure:
        include: health,info,prometheus,metrics
  endpoint:
    health:
      show-details: always
    metrics:
      enabled: true
    prometheus:
      enabled: true
  prometheus:
    metrics:
      export:
        enabled: true
  metrics:
    distribution:
      percentiles-histogram:
        http:
          server:
            requests: true
    tags:
      application: \${spring.application.name}
  tracing:
    sampling:
      probability: 1.0
  otlp:
    tracing:
      endpoint: http://tempo:4318/v1/traces
    metrics:
      export:
        enabled: false

logging:
  pattern:
    level: "trace_id=%mdc{traceId} span_id=%mdc{spanId} trace_flags=%mdc{traceFlags} %p"
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const DockerComposeObservability = () => (
  <CollapsibleCodeBlock language="yaml" title="docker-compose.yml">
    {`services:
  spring-java:
    # ...
// highlight-added-start
    depends_on:
      - tempo
    networks:
      - monitoring
// highlight-added-end

  spring-kotlin:
    # ...
// highlight-added-start
    depends_on:
      - tempo
    networks:
      - monitoring
// highlight-added-end

  spring-groovy:
    # ...
// highlight-added-start
    depends_on:
      - tempo
    networks:
      - monitoring

  prometheus:
    build:
      context: .
      dockerfile: observability/prometheus.Dockerfile
    container_name: prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--storage.tsdb.retention.time=15d'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--web.enable-lifecycle'
    volumes:
      - prometheus-data:/prometheus
    ports:
      - "9090:9090"
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:9090/-/healthy"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    networks:
      - monitoring

  loki:
    build:
      context: .
      dockerfile: observability/loki.Dockerfile
    container_name: loki
    ports:
      - "3100:3100"
    volumes:
      - loki-data:/loki
    command: -config.file=/etc/loki/local-config.yaml
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:3100/ready"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    networks:
      - monitoring

  promtail:
    build:
      context: .
      dockerfile: observability/promtail.Dockerfile
    container_name: promtail
    volumes:
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - /var/run/docker.sock:/var/run/docker.sock
    command: -config.file=/etc/promtail/config.yml
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:9080/ready"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    depends_on:
      - loki
    networks:
      - monitoring

  tempo:
    build:
      context: .
      dockerfile: observability/tempo.Dockerfile
    container_name: tempo
    ports:
      - "3200:3200"
      - "4317:4317"
      - "4318:4318"
    volumes:
      - tempo-data:/tmp/tempo
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:3200/ready"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    networks:
      - monitoring

  grafana:
    build:
      context: .
      dockerfile: observability/grafana.Dockerfile
    container_name: grafana
    environment:
      - GF_SECURITY_ADMIN_USER=\${GF_SECURITY_ADMIN_USER}
      - GF_SECURITY_ADMIN_PASSWORD=\${GF_SECURITY_ADMIN_PASSWORD}
      - GF_USERS_ALLOW_SIGN_UP=false
    ports:
      - "3000:3000"
    volumes:
      - grafana-data:/var/lib/grafana
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    depends_on:
      - prometheus
      - loki
      - tempo
    networks:
      - monitoring

networks:
  monitoring:
    driver: bridge

volumes:
  prometheus-data:
    driver: local
  loki-data:
    driver: local
  grafana-data:
    driver: local
  tempo-data:
    driver: local
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const LokiDockerfile = () => (
  <CollapsibleCodeBlock
    language="dockerfile"
    title="observability/loki.Dockerfile"
  >
    {`// highlight-added-start
FROM alpine:latest AS builder

RUN mkdir -p /loki/chunks /loki/rules

FROM grafana/loki:3.5.10

COPY --from=builder --chown=10001:10001 /loki /loki
COPY observability/loki-config.yml /etc/loki/local-config.yaml

USER 10001
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const LokiConfig = () => (
  <CollapsibleCodeBlock language="yaml" title="observability/loki-config.yml">
    {`// highlight-added-start
auth_enabled: false

server:
  http_listen_port: 3100
  grpc_listen_port: 9096

common:
  instance_addr: 127.0.0.1
  path_prefix: /loki
  storage:
    filesystem:
      chunks_directory: /loki/chunks
      rules_directory: /loki/rules
  replication_factor: 1
  ring:
    kvstore:
      store: inmemory

query_range:
  results_cache:
    cache:
      embedded_cache:
        enabled: true
        max_size_mb: 100

schema_config:
  configs:
    - from: 2020-10-24
      store: tsdb
      object_store: filesystem
      schema: v13
      index:
        prefix: index_
        period: 24h

ruler:
  alertmanager_url: http://localhost:9093

compactor:
  working_directory: /loki/compactor
  compaction_interval: 10m
  retention_enabled: true
  retention_delete_delay: 2h
  retention_delete_worker_count: 150
  delete_request_store: filesystem

limits_config:
  retention_period: 360h # 15 days, matches Prometheus and Tempo

# By default, Loki will send anonymous usage data to Grafana.
# This can be disabled by setting this to false
analytics:
  reporting_enabled: false
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const PromtailDockerfile = () => (
  <CollapsibleCodeBlock
    language="dockerfile"
    title="observability/promtail.Dockerfile"
  >
    {`// highlight-added-start
FROM grafana/promtail:3.5.10
COPY observability/promtail-config.yml /etc/promtail/config.yml
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const PromtailConfig = () => (
  <CollapsibleCodeBlock
    language="yaml"
    title="observability/promtail-config.yml"
  >
    {`// highlight-added-start
server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  - job_name: containers
    docker_sd_configs:
      - host: unix:///var/run/docker.sock
        refresh_interval: 5s
    relabel_configs:
      - source_labels: ['__meta_docker_container_label_com_docker_compose_service']
        target_label: compose_service
      - source_labels: ['compose_service']
        regex: 'spring-.*'
        action: keep
      - source_labels: ['compose_service']
        regex: 'spring-(.*)'
        target_label: compose_service
        replacement: 'spring_\${1}'
    pipeline_stages:
      - regex:
          expression: 'trace_id=\\S+ span_id=\\S+ trace_flags=\\S+ (?P<type>\\w+) \\S+ ---'
      - labels:
          type:
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const TempoDockerfile = () => (
  <CollapsibleCodeBlock
    language="dockerfile"
    title="observability/tempo.Dockerfile"
  >
    {`// highlight-added-start
FROM alpine:latest AS builder

RUN mkdir -p /tmp/tempo/blocks /tmp/tempo/wal /tmp/tempo/generator/wal && \\
    chown -R 10001:10001 /tmp/tempo

FROM grafana/tempo:2.10.0

COPY --from=builder --chown=10001:10001 /tmp/tempo /tmp/tempo
COPY observability/tempo.yml /etc/tempo/tempo.yml

CMD ["-config.file=/etc/tempo/tempo.yml"]
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const TempoConfig = () => (
  <CollapsibleCodeBlock language="yaml" title="observability/tempo.yml">
    {`// highlight-added-start
auth_enabled: false

server:
  http_listen_port: 3200

distributor:
  receivers:
    otlp:
      protocols:
        grpc:
          endpoint: "0.0.0.0:4317"
        http:
          endpoint: "0.0.0.0:4318"

ingester:
  max_block_duration: 5m
  trace_idle_period: 10s
  max_block_bytes: 1_000_000

storage:
  trace:
    backend: local
    wal:
      path: /tmp/tempo/wal
    local:
      path: /tmp/tempo/blocks

query_frontend:
  search:
    duration_slo: 5s
    throughput_bytes_slo: 1.073741824e+09

metrics_generator:
  registry:
    external_labels:
      source: tempo
  storage:
    path: /tmp/tempo/generator/wal

overrides:
  defaults:
    metrics_generator:
      processors: [service-graphs, span-metrics]

usage_report:
  reporting_enabled: false
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const PrometheusDockerfile = () => (
  <CollapsibleCodeBlock
    language="dockerfile"
    title="observability/prometheus.Dockerfile"
  >
    {`// highlight-added-start
FROM prom/prometheus:v3.9.1
COPY observability/prometheus.yml /etc/prometheus/prometheus.yml
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const PrometheusConfig = () => (
  <CollapsibleCodeBlock language="yaml" title="observability/prometheus.yml">
    {`// highlight-added-start
global:
  scrape_interval: 60s
  evaluation_interval: 60s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['prometheus:9090']

  - job_name: 'spring-java'
    static_configs:
      - targets: ['spring-java:8080']
    metrics_path: '/actuator/prometheus'

  - job_name: 'spring-kotlin'
    static_configs:
      - targets: ['spring-kotlin:8080']
    metrics_path: '/actuator/prometheus'

  - job_name: 'spring-groovy'
    static_configs:
      - targets: ['spring-groovy:8080']
    metrics_path: '/actuator/prometheus'
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const GrafanaDockerfile = () => (
  <CollapsibleCodeBlock
    language="dockerfile"
    title="observability/grafana.Dockerfile"
  >
    {`// highlight-added-start
FROM grafana/grafana:11.6.11
COPY observability/grafana/datasources /etc/grafana/provisioning/datasources
COPY observability/grafana/dashboards/dashboards.yml /etc/grafana/provisioning/dashboards/dashboards.yml
COPY observability/grafana/dashboards/*.json /var/lib/grafana/dashboards/
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const GrafanaDatasources = () => (
  <CollapsibleCodeBlock
    language="yaml"
    title="observability/grafana/datasources/datasources.yml"
  >
    {`// highlight-added-start
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    uid: prometheus
    isDefault: true
    editable: false
    jsonData:
      httpMethod: POST
      manageAlerts: true
      exemplarTraceIdDestinations:
        - datasourceUid: tempo
          name: TraceID
          urlDisplayLabel: "View Trace"

  - name: Loki
    type: loki
    access: proxy
    url: http://loki:3100
    uid: loki
    editable: false
    jsonData:
      derivedFields:
        - name: TraceID
          matcherRegex: "trace_id=(\\w+)"
          url: "\$\${__value.raw}"
          datasourceUid: tempo
          urlDisplayLabel: "View Trace"

  - name: Tempo
    type: tempo
    access: proxy
    url: http://tempo:3200
    uid: tempo
    editable: false
    jsonData:
      nodeGraph:
        enabled: true
      tracesToLogs:
        datasourceUid: loki
        filterByTraceID: true
        filterBySpanID: false
        tags:
          - service.name
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const GrafanaDashboards = () => (
  <CollapsibleCodeBlock
    language="yaml"
    title="observability/grafana/dashboards/dashboards.yml"
  >
    {`// highlight-added-start
apiVersion: 1

providers:
  - name: 'default'
    orgId: 1
    folder: ''
    type: file
    disableDeletion: false
    updateIntervalSeconds: 10
    allowUiUpdates: false
    options:
      path: /var/lib/grafana/dashboards
      foldersFromFilesStructure: false
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const ArchitectureFlowchart = () => (
  <ZoomContainer height="400px">
    <Mermaid
      value={`flowchart LR
    subgraph SpringApps["Spring Boot Applications"]
        Java["spring-java"]
        Kotlin["spring-kotlin"]
        Groovy["spring-groovy"]
    end

    subgraph DataCollection["Data Collection"]
        Micrometer["Micrometer<br/>(Metrics)"]
        OTLP["OTLP Exporter<br/>(Traces)"]
        Promtail["Promtail<br/>(Logs)"]
    end

    subgraph TelemetryBackends["Telemetry Backends"]
        Prometheus["Prometheus<br/>(Metrics)"]
        Tempo["Tempo<br/>(Traces)"]
        Loki["Loki<br/>(Logs)"]
    end

    subgraph Visualization["Visualization"]
        Grafana["Grafana Dashboards"]
    end

    Java --> Micrometer
    Kotlin --> Micrometer
    Groovy --> Micrometer

    Java --> OTLP
    Kotlin --> OTLP
    Groovy --> OTLP

    Java -.->|Docker Logs| Promtail
    Kotlin -.->|Docker Logs| Promtail
    Groovy -.->|Docker Logs| Promtail

    Micrometer --> Prometheus
    OTLP --> Tempo
    Promtail --> Loki

    Prometheus --> Grafana
    Tempo --> Grafana
    Loki --> Grafana

    style SpringApps fill:#e8f4f8,stroke:#666,stroke-width:2px,color:#333
    style DataCollection fill:#f0f0f0,stroke:#666,stroke-width:2px,color:#333
    style TelemetryBackends fill:#e8f8e8,stroke:#666,stroke-width:2px,color:#333
    style Visualization fill:#fff4e6,stroke:#666,stroke-width:2px,color:#333`}
    />
  </ZoomContainer>
);
