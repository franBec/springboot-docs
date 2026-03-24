import CodeBlock from '@theme/CodeBlock';
import { FileTreeInfo } from '@site/src/components/file-tree-info';
import ZoomContainer from '@site/src/components/zoom-container';
import Mermaid from '@theme/Mermaid';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export const FilmJson = () => (
  <CodeBlock language="json">
    {`{
  "id": 42,
  "title": "ACADEMY DINOSAUR",
  "description": "A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies",
  "releaseYear": 2006,
  "rating": "PG",
  "length": 86,
  "language": "English"
}`}
  </CodeBlock>
);

const FileTreeJava = () => (
  <CodeBlock language="log" title="File Tree">
    {`.
// highlight-modified
├── build.gradle
// highlight-added
├── greclipse.properties
├── ...
└── src
    ├── main
    │   ├── java
    │   │   └── dev/pollito/spring_java
    │   │       ├── sakila
    │   │       │   └── film
    │   │       │       ├── adapter
    │   │       │       │   └── in/rest
    │   │       │       │       ├── dto
// highlight-added-start
    │   │       │       │       │   └── FilmResponse.java
    │   │       │       │       ├── FilmRestController.java
    │   │       │       │       └── FilmRestMapper.java
// highlight-added-end
    │   │       │       └── domain
    │   │       │           ├── model
// highlight-added
    │   │       │           │   └── Film.java
    │   │       │           ├── port/in
// highlight-added
    │   │       │           │   └── FilmUseCases.java
    │   │       │           └── service
// highlight-added
    │   │       │               └── FilmUseCasesImpl.java
    │   │       └── ...
    │   └── ...
    └── ...`}
  </CodeBlock>
);

const FileTreeKt = () => (
  <CodeBlock language="log" title="File Tree">
    {`.
// highlight-modified
├── build.gradle.kts
├── ...
└── src
    ├── main
    │   ├── kotlin
    │   │   └── dev/pollito/spring_kotlin
    │   │       ├── sakila
    │   │       │   └── film
    │   │       │       ├── adapter
    │   │       │       │   └── in/rest
    │   │       │       │       ├── dto
// highlight-added-start
    │   │       │       │       │   └── FilmResponse.kt
    │   │       │       │       ├── FilmRestController.kt
    │   │       │       │       └── FilmRestMapper.kt
// highlight-added-end
    │   │       │       └── domain
    │   │       │           ├── model
// highlight-added
    │   │       │           │   └── Film.kt
    │   │       │           ├── port/in
// highlight-added
    │   │       │           │   └── FilmUseCases.kt
    │   │       │           └── service
// highlight-added
    │   │       │               └── FilmUseCasesImpl.kt
    │   │       └── ...
    │   └── ...
    └── ...`}
  </CodeBlock>
);

const FileTreeGroovy = () => (
  <CodeBlock language="log" title="File Tree">
    {`.
// highlight-modified
├── build.gradle
// highlight-added
├── greclipse.properties
├── ...
└── src
    ├── main
    │   ├── groovy
    │   │   └── dev/pollito/spring_groovy
    │   │       ├── sakila
    │   │       │   └── film
    │   │       │       ├── adapter
    │   │       │       │   └── in/rest
    │   │       │       │       ├── dto
// highlight-added-start
    │   │       │       │       │   └── FilmResponse.groovy
    │   │       │       │       ├── FilmRestController.groovy
    │   │       │       │       └── FilmRestMapper.groovy
// highlight-added-end
    │   │       │       └── domain
    │   │       │           ├── model
// highlight-added
    │   │       │           │   └── Film.groovy
    │   │       │           ├── port/in
// highlight-added
    │   │       │           │   └── FilmUseCases.groovy
    │   │       │           └── service
// highlight-added
    │   │       │               └── FilmUseCasesImpl.groovy
    │   │       └── ...
    │   └── ...
    └── ...`}
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

export const Terminal = () => (
  <CodeBlock language="log" title="Terminal">
    {`curl -s http://localhost:8080/api/films/42 | jq
{
  "id": 42,
  "title": "ACADEMY DINOSAUR",
  "description": "A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies",
  "releaseYear": 2006,
  "rating": "PG",
  "lengthMinutes": 86,
  "language": "English"
}`}
  </CodeBlock>
);

export const ApplicationSequenceDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
    participant Client
    participant FilmRestController
    participant FilmUseCasesImpl

    Client->>FilmRestController: GET /api/films/{filmId} Request
    activate FilmRestController

    FilmRestController->>FilmUseCasesImpl: getFilm()
    activate FilmUseCasesImpl

    FilmUseCasesImpl-->>FilmRestController: Film
    deactivate FilmUseCasesImpl

    Note over FilmRestController: Map Film to FilmResponse using FilmRestMapper

    FilmRestController-->>Client: FilmResponse (HTTP 200 OK)
    deactivate FilmRestController`}
    />
  </ZoomContainer>
);
