import ZoomContainer from '@site/src/components/zoom-container';
import Mermaid from '@theme/Mermaid';

export const SpringDataJpaFlowDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
    participant App as Application
    participant Port as Secondary Port (Repository Interface)
    participant Adapter as Secondary Adapter (Spring Data JPA)
    participant DB as Database

    App->>Port: findAll()
    Port->>Adapter: Delegates call
    Adapter->>DB: SELECT * FROM films
    DB-->>Adapter: Raw data rows
    Adapter-->>Port: Map to Film entities
    Port-->>App: List<Film>
    App->>App: Continue business logic`}
    />
  </ZoomContainer>
);

export const SpringDataJpaFlowDiagramES = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
    participant App as Aplicación
    participant Port as Puerto Secundario (Interfaz de Repositorio)
    participant Adapter as Adaptador Secundario (Spring Data JPA)
    participant DB as Base de Datos

    App->>Port: findAll()
    Port->>Adapter: Delega la llamada
    Adapter->>DB: SELECT * FROM films
    DB-->>Adapter: Filas de datos crudos
    Adapter-->>Port: Mapea a entidades Film
    Port-->>App: List<Film>
    App->>App: Continúa lógica de negocio`}
    />
  </ZoomContainer>
);
