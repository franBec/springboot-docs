import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { FileTreeInfo } from '@site/src/components/file-tree-info';

const FileTreeJava = () => (
  <CodeBlock language="log" title="File Tree">
    {`.
├── ...
// highlight-added-start
├── database/
│   ├── flyway/
│   │   ├── Dockerfile
│   │   └── migrations/
│   │       ├── V1__create_sakila_schema.sql
│   │       ├── V2__insert_sample_data.sql
│   │       └── V3__grant_app_user_privileges.sql
│   └── postgres/
│       ├── Dockerfile
│       └── init-users.sh
// highlight-added-end
// highlight-modified
├── docker-compose.yml
└── spring-java/
    ├── ...
// highlight-modified
    ├── build.gradle
    └── src
        └── main
            └── resources
                ├── ...
// highlight-modified
                └── application.yaml`}
  </CodeBlock>
);

const FileTreeKt = () => (
  <CodeBlock language="log" title="File Tree">
    {`.
├── ...
// highlight-added-start
├── database/
│   ├── flyway/
│   │   ├── Dockerfile
│   │   └── migrations/
│   │       ├── V1__create_sakila_schema.sql
│   │       ├── V2__insert_sample_data.sql
│   │       └── V3__grant_app_user_privileges.sql
│   └── postgres/
│       ├── Dockerfile
│       └── init-users.sh
// highlight-added-end
// highlight-modified
├── docker-compose.yml
└── spring-kotlin/
    ├── ...
// highlight-modified
    ├── build.gradle.kts
    └── src
        └── main
            └── resources
                ├── ...
// highlight-modified
                └── application.yaml`}
  </CodeBlock>
);

const FileTreeGroovy = () => (
  <CodeBlock language="log" title="File Tree">
    {`.
├── ...
// highlight-added-start
├── database/
│   ├── flyway/
│   │   ├── Dockerfile
│   │   └── migrations/
│   │       ├── V1__create_sakila_schema.sql
│   │       ├── V2__insert_sample_data.sql
│   │       └── V3__grant_app_user_privileges.sql
│   └── postgres/
│       ├── Dockerfile
│       └── init-users.sh
// highlight-added-end
// highlight-modified
├── docker-compose.yml
└── spring-groovy/
    ├── ...
// highlight-modified
    ├── build.gradle
    └── src
        └── main
            └── resources
                ├── ...
// highlight-modified
                └── application.yaml`}
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
    {`curl -s https://sakila-java.pollito.tech/api/films/1 | jq
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
  </CodeBlock>
);
