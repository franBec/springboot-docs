import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { FileTreeInfo } from '@site/src/components/file-tree-info';

const FileTreeJava = () => (
  <CodeBlock language="log" title="File Tree">
    {`├── ...
└── src/
    ├── main/java/dev/pollito/spring_java/sakila/film/
    │   ├── adapter/
    │   │   ├── in/rest/
// highlight-modified
    │   │   │   └── FilmRestController.java
    │   │   └── out/jpa/
// highlight-modified-start
    │   │       ├── FilmJpaMapper.java
    │   │       ├── FilmRepositoryImpl.java
// highlight-modified-end
// highlight-added
    │   │       └── LanguageJpaRepository.java
    │   └── domain/
    │       ├── port/
    │       │   ├── in/
// highlight-modified
    │       │   │   └── FilmUseCases.java
    │       │   └── out/
// highlight-modified
    │       │       └── FilmRepository.java
    │       └── service/
// highlight-modified
    │           └── FilmUseCasesImpl.java
    └── test/java/dev/pollito/spring_java/sakila/film/
        ├── adapter/
        │   ├── in/rest/
// highlight-modified
        │   │   └── FilmRestControllerMockMvcTest.java
        │   └── out/jpa/
// highlight-modified
        │       └── FilmRepositoryImplDataJpaTest.java
        └── domain/
            └── service/
// highlight-modified
                └── FilmUseCasesImplTest.java`}
  </CodeBlock>
);

const FileTreeKt = () => (
  <CodeBlock language="log" title="File Tree">
    {`├── ...
└── src/
    ├── main/kotlin/dev/pollito/spring_kotlin/sakila/film/
    │   ├── adapter/
    │   │   ├── in/rest/
// highlight-modified
    │   │   │   └── FilmRestController.kt
    │   │   └── out/jpa/
// highlight-modified-start
    │   │       ├── FilmJpaMapper.kt
    │   │       ├── FilmRepositoryImpl.kt
// highlight-modified-end
// highlight-added
    │   │       └── LanguageJpaRepository.kt
    │   └── domain/
    │       ├── port/
    │       │   ├── in/
// highlight-modified
    │       │   │   └── FilmUseCases.kt
    │       │   └── out/
// highlight-modified
    │       │       └── FilmRepository.kt
    │       └── service/
// highlight-modified
    │           └── FilmUseCasesImpl.kt
    └── test/kotlin/dev/pollito/spring_kotlin/sakila/film/
        ├── adapter/
        │   ├── in/rest/
// highlight-modified
        │   │   └── FilmRestControllerMockMvcTest.kt
        │   └── out/jpa/
// highlight-modified
        │       └── FilmRepositoryImplDataJpaTest.kt
        └── domain/
            └── service/
// highlight-modified
                └── FilmUseCasesImplTest.kt`}
  </CodeBlock>
);

const FileTreeGroovy = () => (
  <CodeBlock language="log" title="File Tree">
    {`├── ...
└── src/
    ├── main/groovy/dev/pollito/spring_groovy/sakila/film/
    │   ├── adapter/
    │   │   ├── in/rest/
// highlight-modified
    │   │   │   └── FilmRestController.groovy
    │   │   └── out/jpa/
// highlight-modified-start
    │   │       ├── FilmJpaMapper.groovy
    │   │       ├── FilmRepositoryImpl.groovy
// highlight-modified-end
// highlight-added
    │   │       └── LanguageJpaRepository.groovy
    │   └── domain/
    │       ├── port/
    │       │   ├── in/
// highlight-modified
    │       │   │   └── FilmUseCases.groovy
    │       │   └── out/
// highlight-modified
    │       │       └── FilmRepository.groovy
    │       └── service/
// highlight-modified
    │           └── FilmUseCasesImpl.groovy
    └── test/groovy/dev/pollito/spring_groovy/sakila/film/
        ├── adapter/
        │   ├── in/rest/
// highlight-modified
        │   │   └── FilmRestControllerMockMvcSpec.groovy
        │   └── out/jpa/
// highlight-modified
        │       └── FilmRepositoryImplDataJpaSpec.groovy
        └── domain/
            └── service/
// highlight-modified
                └── FilmUseCasesImplSpec.groovy`}
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

export const TerminalCurl = () => (
  <CodeBlock language="log" title="Terminal">
    {`# Create a new film

curl -s -X POST https://sakila-java.pollito.tech/api/films \\
  -H "Content-Type: application/json" \\
  -d '{"title":"NEW FILM","language":"English","rentalDuration":3,"rentalRate":4.99,"replacementCost":20.99}' | jq

{
  "instance": "/api/films",
  "status": 201,
  "timestamp": "2026-04-29T11:05:41.803702787Z",
  "trace": "65c2da37361f6d669884f7caf6ed2a93",
  "data": {
    "title": "NEW FILM",
    "language": "English",
    "rentalDuration": 3,
    "rentalRate": 4.99,
    "replacementCost": 20.99,
    "id": 1001,
    "lastUpdate": "2026-04-29T11:05:41.738848092Z",
    "description": null,
    "length": null,
    "originalLanguage": null,
    "rating": null,
    "releaseYear": null,
    "specialFeatures": null
  }
}

# Update an existing film

curl -s -X PUT https://sakila-java.pollito.tech/api/films/1001 \\
  -H "Content-Type: application/json" \\
  -d '{"title":"UPDATED FILM","language":"English","rentalDuration":3,"rentalRate":4.99,"replacementCost":20.99}' | jq
  
{
  "instance": "/api/films/1001",
  "status": 200,
  "timestamp": "2026-04-29T11:39:44.242877421Z",
  "trace": "1ff671817013fd4896e987c81994b685",
  "data": {
    "title": "UPDATED FILM",
    "language": "English",
    "rentalDuration": 3,
    "rentalRate": 4.99,
    "replacementCost": 20.99,
    "id": 1001,
    "lastUpdate": "2026-04-29T11:39:44.236617507Z",
    "description": null,
    "length": null,
    "originalLanguage": null,
    "rating": null,
    "releaseYear": null,
    "specialFeatures": null
  }
}

# Delete a film

curl -s -X DELETE https://sakila-java.pollito.tech/api/films/1001 -w "\\n%{http_code}\\n"

204
`}
  </CodeBlock>
);
