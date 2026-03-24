import CodeBlock from '@theme/CodeBlock';
import { FileTreeInfo } from '@site/src/components/file-tree-info';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

const FileTreeJava = () => (
  <CodeBlock language="log" title="File Tree">
    {`
// highlight-modified
├── build.gradle
├── ...
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
    │   │               ├── common
    │   │               │   ├── util
// highlight-added-start
    │   │               │   │   └── EnumUtils.java
    │   │               │   └── ValuedEnum.java
// highlight-added-end
    │   │               ├── sakila
    │   │               │   └── film
    │   │               │       ├── adapter
    │   │               │       │   └── in
    │   │               │       │       └── rest
    │   │               │       │           ├── dto
// highlight-removed
    │   │               │       │           │   └── FilmResponse.java
// highlight-modified-start
    │   │               │       │           ├── FilmRestMapper.java
    │   │               │       │           └── FilmRestController.java
// highlight-modified-end
    │   │               │       ├── domain
    │   │               │       │   ├── model
// highlight-modified
    │   │               │       │   │   ├── Film.java
// highlight-added-start
    │   │               │       │   │   ├── FilmLanguage.java
    │   │               │       │   │   └── FilmRating.java
// highlight-added-end
    │   │               │       │   └── service
// highlight-modified
    │   │               │       │       └── FilmUseCasesImpl.java
    │   │               │       └── ...
    │   │               └── ...
    │   └── ...
    └── ...`}
  </CodeBlock>
);

const FileTreeKt = () => (
  <CodeBlock language="log" title="File Tree">
    {`
// highlight-modified
├── build.gradle.kts
├── ...
└── src
    ├── main
    │   ├── java
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_kotlin
    │   │               ├── config
    │   │               │   └── web
// highlight-modified
    │   │               │       └── ControllerAdvice.kt
    │   │               ├── common
    │   │               │   ├── util
// highlight-added-start
    │   │               │   │   └── EnumUtils.kt
    │   │               │   └── ValuedEnum.kt
// highlight-added-end
    │   │               ├── sakila
    │   │               │   └── film
    │   │               │       ├── adapter
    │   │               │       │   └── in
    │   │               │       │       └── rest
    │   │               │       │           ├── dto
// highlight-removed
    │   │               │       │           │   └── FilmResponse.kt
// highlight-modified-start
    │   │               │       │           ├── FilmRestMapper.kt
    │   │               │       │           └── FilmRestController.kt
// highlight-modified-end
    │   │               │       ├── domain
    │   │               │       │   ├── model
// highlight-modified
    │   │               │       │   │   ├── Film.kt
// highlight-added-start
    │   │               │       │   │   ├── FilmLanguage.kt
    │   │               │       │   │   └── FilmRating.kt
// highlight-added-end
    │   │               │       │   └── service
// highlight-modified
    │   │               │       │       └── FilmUseCasesImpl.kt
    │   │               │       └── ...
    │   │               └── ...
    │   └── ...
    └── ...`}
  </CodeBlock>
);

const FileTreeGroovy = () => (
  <CodeBlock language="log" title="File Tree">
    {`// highlight-modified
├── build.gradle
├── ...
└── src
    ├── main
    │   ├── groovy
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_groovy
    │   │               ├── config
    │   │               │   ├── mapper
// highlight-modified
    │   │               │   │   └── ModelMapperConfig.groovy
    │   │               │   └── web
// highlight-modified
    │   │               │       └── ControllerAdvice.groovy
    │   │               ├── common
    │   │               │   ├── util
// highlight-added-start
    │   │               │   │   └── EnumUtils.groovy
    │   │               │   └── ValuedEnum.groovy
// highlight-added-end
    │   │               ├── sakila
    │   │               │   └── film
    │   │               │       ├── adapter
    │   │               │       │   └── in
    │   │               │       │       └── rest
    │   │               │       │           ├── dto
// highlight-removed
    │   │               │       │           │   └── FilmResponse.groovy
// highlight-modified-start
    │   │               │       │           ├── FilmRestMapper.groovy
    │   │               │       │           └── FilmRestController.groovy
// highlight-modified-end
    │   │               │       ├── domain
    │   │               │       │   ├── model
// highlight-modified
    │   │               │       │   │   ├── Film.groovy
// highlight-added-start
    │   │               │       │   │   ├── FilmLanguage.groovy
    │   │               │       │   │   └── FilmRating.groovy
// highlight-added-end
    │   │               │       │   └── service
// highlight-modified
    │   │               │       │       └── FilmUseCasesImpl.groovy
    │   │               │       └── ...
    │   │               └── ...
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
  "instance": "/api/films/42",
  "status": 200,
  "timestamp": "2026-02-19T16:41:30.343577085Z",
  "trace": "0342323f19e37da6b13a009854548007",
  "data": {
    "description": "A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies",
    "id": 42,
    "language": "English",
    "lengthMinutes": 86,
    "rating": "PG",
    "releaseYear": 2006,
    "title": "ACADEMY DINOSAUR"
  }
}`}
  </CodeBlock>
);
