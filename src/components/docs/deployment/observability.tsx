import CodeBlock from '@theme/CodeBlock';
import Mermaid from '@theme/Mermaid';
import { FileTreeInfo } from '@site/src/components/file-tree-info';
import ZoomContainer from '@site/src/components/zoom-container';

export const FileTree = () => (
  <FileTreeInfo>
    <CodeBlock language="log" title="File Tree">{`springboot-demo-projects/
// highlight-modified
├── build.gradle
// highlight-modified
├── docker-compose.yml
├── observability/
// highlight-added-start
│   ├── grafana.Dockerfile
│   ├── grafana/
│   │   ├── dashboards/
│   │   │   ├── dashboards.yml
│   │   │   └── *.json
│   │   └── datasources/
│   │       └── datasources.yml
│   ├── loki.Dockerfile
│   ├── loki-config.yml
│   ├── prometheus.Dockerfile
│   ├── prometheus.yml
│   ├── promtail.Dockerfile
│   ├── promtail-config.yml
│   ├── tempo.Dockerfile
│   └── tempo.yml
// highlight-added-end
└── src/
    └── main/
        └── resources/
// highlight-modified
            └── application.yaml`}</CodeBlock>
  </FileTreeInfo>
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
