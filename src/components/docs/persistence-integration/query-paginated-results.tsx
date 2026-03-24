import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { FileTreeInfo } from '@site/src/components/file-tree-info';
import ZoomContainer from '@site/src/components/zoom-container';
import Mermaid from '@theme/Mermaid';

const FileTreeJava = () => (
  <CodeBlock language="log" title="File Tree">
    {`├── ...
└── src
    ├── main
    │   ├── java
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_java
    │   │               └── sakila
    │   │                   └── film
    │   │                       ├── adapter
    │   │                       │   ├── in
    │   │                       │   │   └── rest
// highlight-modified
    │   │                       │   │       ├── FilmRestController.java
    │   │                       │   │       └── FilmRestMapper.java
    │   │                       │   └── out
    │   │                       │       └── jpa
// highlight-modified-start
    │   │                       │           ├── FilmJpaMapper.java
    │   │                       │           ├── FilmJpaRepository.java
    │   │                       │           └── FilmRepositoryImpl.java
// highlight-modified-end
    │   │                       └── domain
    │   │                           ├── port
    │   │                           │   ├── in
// highlight-modified
    │   │                           │   │   └── FilmUseCases.java
    │   │                           │   └── out
// highlight-modified
    │   │                           │       └── FilmRepository.java
    │   │                           └── service
// highlight-modified
    │   │                               └── FilmUseCasesImpl.java
    │   └── resources
// highlight-modified-start
    │       ├── application.yaml
    │       ├── application-dev.yaml
// highlight-modified-end
// highlight-modified
    │       └── openapi.yaml
    └── test
        └── java
            └── dev
                └── pollito
                    └── spring_java
                        ├── sakila
                        │   └── film
                        │       ├── adapter
                        │       │   ├── in
                        │       │   │   └── rest
// highlight-modified
                        │       │   │       └── FilmRestControllerMockMvcTest.java
                        │       │   └── out
                        │       │       └── jpa
// highlight-modified
                        │       │           └── FilmRepositoryImplDataJpaTest.java
                        │       └── domain
                        │           └── service
// highlight-modified
                        │               └── FilmUseCasesImplTest.java
                        └── test
                            └── util
// highlight-modified
                                └── MockMvcResultMatchers.java`}
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
    │   │               └── sakila
    │   │                   └── film
    │   │                       ├── adapter
    │   │                       │   ├── in
    │   │                       │   │   └── rest
// highlight-modified
    │   │                       │   │       ├── FilmRestController.kt
    │   │                       │   │       └── FilmRestMapper.kt
    │   │                       │   └── out
    │   │                       │       └── jpa
// highlight-modified-start
    │   │                       │           ├── FilmJpaMapper.kt
    │   │                       │           ├── FilmJpaRepository.kt
    │   │                       │           └── FilmRepositoryImpl.kt
// highlight-modified-end
    │   │                       └── domain
    │   │                           ├── port
    │   │                           │   ├── in
// highlight-modified
    │   │                           │   │   └── FilmUseCases.kt
    │   │                           │   └── out
// highlight-modified
    │   │                           │       └── FilmRepository.kt
    │   │                           └── service
// highlight-modified
    │   │                               └── FilmUseCasesImpl.kt
    │   └── resources
// highlight-modified-start
    │       ├── application.yaml
    │       ├── application-dev.yaml
// highlight-modified-end
// highlight-modified
    │       └── openapi.yaml
    └── test
        └── kotlin
            └── dev
                └── pollito
                    └── spring_kotlin
                        ├── sakila
                        │   └── film
                        │       ├── adapter
                        │       │   ├── in
                        │       │   │   └── rest
// highlight-modified
                        │       │   │       └── FilmRestControllerMockMvcTest.kt
                        │       │   └── out
                        │       │       └── jpa
// highlight-modified
                        │       │           └── FilmRepositoryImplDataJpaTest.kt
                        │       └── domain
                        │           └── service
// highlight-modified
                        │               └── FilmUseCasesImplTest.kt
                        └── test
                            └── util
// highlight-modified
                                └── MockMvcResultMatchersDsl.kt`}
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
    │   │               └── sakila
    │   │                   └── film
    │   │                       ├── adapter
    │   │                       │   ├── in
    │   │                       │   │   └── rest
// highlight-modified
    │   │                       │   │       ├── FilmRestController.groovy
    │   │                       │   │       └── FilmRestMapper.groovy
    │   │                       │   └── out
    │   │                       │       └── jpa
// highlight-modified-start
    │   │                       │           ├── FilmJpaMapper.groovy
    │   │                       │           ├── FilmJpaRepository.groovy
    │   │                       │           └── FilmRepositoryImpl.groovy
// highlight-modified-end
    │   │                       └── domain
    │   │                           ├── port
    │   │                           │   ├── in
// highlight-modified
    │   │                           │   │   └── FilmUseCases.groovy
    │   │                           │   └── out
// highlight-modified
    │   │                           │       └── FilmRepository.groovy
    │   │                           └── service
// highlight-modified
    │   │                               └── FilmUseCasesImpl.groovy
    │   └── resources
// highlight-modified-start
    │       ├── application.yaml
    │       ├── application-dev.yaml
// highlight-modified-end
// highlight-modified
    │       └── openapi.yaml
    └── test
        └── groovy
            └── dev
                └── pollito
                    └── spring_groovy
                        ├── sakila
                        │   └── film
                        │       ├── adapter
                        │       │   ├── in
                        │       │   │   └── rest
// highlight-modified
                        │       │   │       └── FilmRestControllerMockMvcSpec.groovy
                        │       │   └── out
                        │       │       └── jpa
// highlight-modified
                        │       │           └── FilmRepositoryImplDataJpaSpec.groovy
                        │       └── domain
                        │           └── service
// highlight-modified
                        │               └── FilmUseCasesImplSpec.groovy
                        └── test
                            └── util
// highlight-modified
                                └── MockMvcResultMatchersTrait.groovy`}
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

export const PaginatedRequestSequenceDiagram = () => (
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

        Client->>FilmRestController: GET /api/films?page=0&size=10
        activate FilmRestController

        FilmRestController->>FilmUseCasesImpl: getFilms(Pageable)
        activate FilmUseCasesImpl

        FilmUseCasesImpl->>FilmRepositoryImpl: getFilms(Pageable)
        activate FilmRepositoryImpl

        FilmRepositoryImpl->>FilmJpaRepository: findAll(Pageable)
        activate FilmJpaRepository

        FilmJpaRepository->>H2 Database: SELECT * FROM FILM LIMIT 10 OFFSET 0
        H2 Database-->>FilmJpaRepository: Page of FilmEntity

        FilmJpaRepository-->>FilmRepositoryImpl: Page of FilmEntity
        deactivate FilmJpaRepository

        FilmRepositoryImpl->>FilmJpaMapper: map(Page of FilmEntity)
        activate FilmJpaMapper
        FilmJpaMapper-->>FilmRepositoryImpl: Page of Domain Film
        deactivate FilmJpaMapper

        FilmRepositoryImpl-->>FilmUseCasesImpl: Page of Domain Film
        deactivate FilmRepositoryImpl

        FilmUseCasesImpl-->>FilmRestController: Page of Domain Film
        deactivate FilmUseCasesImpl

        FilmRestController->>FilmRestMapper: map(Page of Domain Film)
        activate FilmRestMapper
        FilmRestMapper-->>FilmRestController: FilmListResponseAllOfData
        deactivate FilmRestMapper

        FilmRestController-->>Client: HTTP 200 OK + JSON body
        deactivate FilmRestController`}
    />
  </ZoomContainer>
);

export const OpenApiSnippet = () => (
  <CodeBlock language="yaml" title="openapi.yaml (snippet)">
    {`paths:
  /films:
    get:
      x-spring-paginated: true
      tags:
        - Films
      operationId: getFilms`}
  </CodeBlock>
);

export const ApplicationYamlSnippet = () => (
  <CodeBlock language="yaml" title="resources/application.yaml (snippet)">
    {`spring:
  data:
    web:
      pageable:
        default-page-size: 10
        max-page-size: 100`}
  </CodeBlock>
);

export const TerminalCurl = () => (
  <CodeBlock language="log" title="Terminal">
    {`curl -s "http://localhost:8080/api/films?page=0&size=5" | jq
{
  "instance": "/api/films",
  "status": 200,
  "timestamp": "2026-04-02T18:30:00.123456789+01:00",
  "trace": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
  "data": {
    "content": [
      { "id": 1, "title": "ACADEMY DINOSAUR", ... },
      { "id": 2, "title": "ACE GOLDFINGER", ... },
      { "id": 3, "title": "ADAPTATION HOLES", ... },
      { "id": 4, "title": "AFFAIR PREJUDICE", ... },
      { "id": 5, "title": "AFRICAN EGG", ... }
    ],
    "pageable": { "pageNumber": 0, "pageSize": 5 },
    "totalElements": 1000,
    "totalPages": 200
  }
}`}
  </CodeBlock>
);
