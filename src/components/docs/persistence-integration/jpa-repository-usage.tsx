import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Mermaid from '@theme/Mermaid';
import { FileTreeInfo } from '@site/src/components/file-tree-info';
import ZoomContainer from '@site/src/components/zoom-container';

const FileTreeJava = () => (
  <CodeBlock language="log" title="File Tree">
    {`├── ...
└── src
    ├── main
    │   ├── java
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_java
    │   │               ├── config
    │   │               │   └── web
// highlight-modified
    │   │               │       └── ControllerAdvice.java
    │   │               └── sakila
    │   │                   └── film
    │   │                       ├── adapter
    │   │                       │   └── out
    │   │                       │       └── jpa
// highlight-added-start
    │   │                       │           ├── FilmJpaMapper.java
    │   │                       │           ├── FilmJpaRepository.java
    │   │                       │           └── FilmRepositoryImpl.java
// highlight-added-end
    │   │                       └── domain
    │   │                           ├── port
    │   │                           │   └── out
// highlight-added
    │   │                           │       └── FilmRepository.java
    │   │                           └── service
// highlight-modified
    │   │                               └── FilmUseCasesImpl.java
    │   └── resources
// highlight-modified
    │       ├── application-dev.yaml
// highlight-added
    │       └── sakila-data.sql
    └── test
        ├── java
        │   └── dev
        │       └── pollito
        │           └── spring_java
        │               ├── config
        │               │   └── web
// highlight-modified
        │               │       └── ControllerAdviceMockMvcTest.java
        │               └── sakila
        │                   └── film
        │                       ├── adapter
        │                       │   └── out
        │                       │       └── jpa
// highlight-added
        │                       │           └── FilmRepositoryImplDataJpaTest.java
        │                       └── domain
        │                           └── service
// highlight-modified
        │                               └── FilmUseCasesImplTest.java
        └── resources
// highlight-added-start
            ├── application-test.yaml
            ├── sakila-data.sql
            └── sakila-schema.sql
// highlight-added-end`}
  </CodeBlock>
);

const FileTreeKt = () => (
  <CodeBlock language="log" title="File Tree">
    {`├── ...
└── src
    ├── main
    │   ├── kotlin
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_kotlin
    │   │               ├── config
    │   │               │   └── web
// highlight-modified
    │   │               │       └── ControllerAdvice.kt
    │   │               └── sakila
    │   │                   └── film
    │   │                       ├── adapter
    │   │                       │   └── out
    │   │                       │       └── jpa
// highlight-added-start
    │   │                       │           ├── FilmJpaMapper.kt
    │   │                       │           ├── FilmJpaRepository.kt
    │   │                       │           └── FilmRepositoryImpl.kt
// highlight-added-end
    │   │                       └── domain
    │   │                           ├── port
    │   │                           │   └── out
// highlight-added
    │   │                           │       └── FilmRepository.kt
    │   │                           └── service
// highlight-modified
    │   │                               └── FilmUseCasesImpl.kt
    │   └── resources
// highlight-modified-start
    │       ├── application.yaml
    │       ├── application-dev.yaml
// highlight-modified-end
// highlight-added
    │       └── sakila-data.sql
    └── test
        ├── kotlin
        │   └── dev
        │       └── pollito
        │           └── spring_kotlin
        │               ├── config
        │               │   └── web
// highlight-modified
        │               │       └── ControllerAdviceMockMvcTest.kt
        │               └── sakila
        │                   └── film
        │                       ├── adapter
        │                       │   └── out
        │                       │       └── jpa
// highlight-added
        │                       │           └── FilmRepositoryImplDataJpaTest.kt
        │                       └── domain
        │                           └── service
// highlight-modified
        │                               └── FilmUseCasesImplTest.kt
        └── resources
// highlight-added-start
            ├── application-test.yaml
            ├── sakila-data.sql
            └── sakila-schema.sql
// highlight-added-end`}
  </CodeBlock>
);

const FileTreeGroovy = () => (
  <CodeBlock language="log" title="File Tree">
    {`├── ...
└── src
    ├── main
    │   ├── groovy
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_groovy
    │   │               ├── config
    │   │               │   └── web
// highlight-modified
    │   │               │       └── ControllerAdvice.groovy
    │   │               └── sakila
    │   │                   └── film
    │   │                       ├── adapter
    │   │                       │   └── out
    │   │                       │       └── jpa
// highlight-added-start
    │   │                       │           ├── FilmJpaMapper.groovy
    │   │                       │           ├── FilmJpaRepository.groovy
    │   │                       │           └── FilmRepositoryImpl.groovy
// highlight-added-end
    │   │                       └── domain
    │   │                           ├── port
    │   │                           │   └── out
// highlight-added
    │   │                           │       └── FilmRepository.groovy
    │   │                           └── service
// highlight-modified
    │   │                               └── FilmUseCasesImpl.groovy
    │   └── resources
// highlight-modified
    │       ├── application-dev.yaml
// highlight-added
    │       └── sakila-data.sql
    └── test
        ├── groovy
        │   └── dev
        │       └── pollito
        │           └── spring_groovy
        │               ├── config
        │               │   └── web
// highlight-modified
        │               │       └── ControllerAdviceMockMvcSpec.groovy
        │               └── sakila
        │                   └── film
        │                       ├── adapter
        │                       │   └── out
        │                       │       └── jpa
// highlight-added
        │                       │           └── FilmRepositoryImplDataJpaSpec.groovy
        │                       └── domain
        │                           └── service
// highlight-modified
        │                               └── FilmUseCasesImplSpec.groovy
        └── resources
// highlight-added-start
            ├── application-test.yaml
            ├── sakila-data.sql
            └── sakila-schema.sql
// highlight-added-end`}
  </CodeBlock>
);

export const FileTree = () => (
  <FileTreeInfo>
    <Tabs groupId="language" queryString>
      <TabItem value="java" label="Java" default>
        <FileTreeJava />
      </TabItem>
      <TabItem value="kotlin" label="Kotlin">
        <FileTreeKt />
      </TabItem>
      <TabItem value="groovy" label="Groovy">
        <FileTreeGroovy />
      </TabItem>
    </Tabs>
  </FileTreeInfo>
);

export const RequestFlowSequenceDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
        participant Client
        box Adapter In
            participant FilmRestController
            participant FilmRestMapper
        end
        box Domain
            participant FilmUseCasesImpl
        end
        box Adapter Out
            participant FilmRepositoryImpl
            participant FilmJpaRepository
            participant FilmJpaMapper
        end
        participant H2 Database

        Client->>FilmRestController: GET /api/films/1
        activate FilmRestController

        FilmRestController->>FilmUseCasesImpl: getFilm(1)
        activate FilmUseCasesImpl

        FilmUseCasesImpl->>FilmRepositoryImpl: getFilm(1)
        activate FilmRepositoryImpl

        FilmRepositoryImpl->>FilmJpaRepository: findById(1)
        activate FilmJpaRepository

        FilmJpaRepository->>H2 Database: SELECT * FROM FILM WHERE FILM_ID = 1
        H2 Database-->>FilmJpaRepository: Row data
        
        FilmJpaRepository-->>FilmRepositoryImpl: FilmEntity
        deactivate FilmJpaRepository

        FilmRepositoryImpl->>FilmJpaMapper: convert(entity)
        activate FilmJpaMapper
        FilmJpaMapper-->>FilmRepositoryImpl: Domain Film
        deactivate FilmJpaMapper

        FilmRepositoryImpl-->>FilmUseCasesImpl: Domain Film
        deactivate FilmRepositoryImpl

        FilmUseCasesImpl-->>FilmRestController: Domain Film
        deactivate FilmUseCasesImpl

        FilmRestController->>FilmRestMapper: convert(domain)
        activate FilmRestMapper
        FilmRestMapper-->>FilmRestController: REST DTO Film
        deactivate FilmRestMapper

        FilmRestController-->>Client: HTTP 200 OK + JSON body
        deactivate FilmRestController`}
    />
  </ZoomContainer>
);

export const TerminalCurl = () => (
  <CodeBlock language="log" title="Terminal">
    {`curl -s http://localhost:8080/api/films/42 | jq
{
  "instance": "/api/films/42",
  "status": 200,
  "timestamp": "2026-04-01T17:33:52.486385928+01:00",
  "trace": "cc4f4b4afbc7b3f280bcdb14dc960e83",
  "data": {
    "title": "ARTIST COLDBLOODED",
    "language": "English",
    "rentalDuration": 5,
    "rentalRate": 2.99,
    "replacementCost": 10.99,
    "id": 42,
    "lastUpdate": "2006-02-15T05:03:42Z",
    "description": "A Stunning Reflection of a Robot And a Moose who must Challenge a Woman in California",
    "releaseYear": 2006,
    "rating": "NC-17",
    "length": 170,
    "originalLanguage": null,
    "specialFeatures": "Trailers,Behind the Scenes"
  }
}`}
  </CodeBlock>
);
