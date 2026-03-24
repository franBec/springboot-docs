import CodeBlock from '@theme/CodeBlock';
import ZoomContainer from '@site/src/components/zoom-container';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Mermaid from '@theme/Mermaid';
import { FileTreeInfo } from '@site/src/components/file-tree-info';

const FileTreeJava = () => (
  <CodeBlock language="log" title="File Tree">
    {`.
├── ...
└── src
    ├── main
    │   ├── java
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_java
    │   │               ├── config
    │   │               │   ├── ...
    │   │               │   └── web
// highlight-added
    │   │               │       └── ControllerAdvice.java
    │   │               ├── sakila
    │   │               │   └── ...
    │   │               └── ...
    │   └── resources
    │       └── ...
    └── test
        └── ...`}
  </CodeBlock>
);

const FileTreeKt = () => (
  <CodeBlock language="log" title="File Tree">
    {`.
├── ...
└── src
    ├── main
    │   ├── kotlin
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_kotlin
    │   │               ├── config
    │   │               │   ├── ...
    │   │               │   └── web
// highlight-added
    │   │               │       └── ControllerAdvice.kt
    │   │               ├── sakila
    │   │               │   └── ...
    │   │               └── ...
    │   └── resources
    │       └── ...
    └── test
        └── ...`}
  </CodeBlock>
);

const FileTreeGroovy = () => (
  <CodeBlock language="log" title="File Tree">
    {`.
├── ...
└── src
    ├── main
    │   ├── groovy
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_groovy
    │   │               ├── config
    │   │               │   ├── ...
    │   │               │   └── web
// highlight-added
    │   │               │       └── ControllerAdvice.groovy
    │   │               ├── sakila
    │   │               │   └── ...
    │   │               └── ...
    │   └── resources
    │       └── ...
    └── test
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

export const ErrorScenario1 = () => (
  <CodeBlock language="json">
    {`{
  "errorDescription": "User not found",
  "cause": "BAD REQUEST"
}`}
  </CodeBlock>
);

export const ErrorScenario2 = () => (
  <CodeBlock language="json">
    {`{
  "message": "not found",
  "error": 404
}`}
  </CodeBlock>
);

export const NotFoundErrorTerminal = () => (
  <CodeBlock language="log" title="Terminal">
    {`curl -s http://localhost:8080 | jq; curl -sw "→ HTTP %{http_code}\\n" -o /dev/null http://localhost:8080
{
  "detail": "No static resource  for request '/'.",
  "instance": "/",
  "status": 404,
  "title": "Not Found",
  "timestamp": "2026-01-11T20:16:13.240960834Z",
  "trace": "d9178227-18d6-4442-8598-9a9f17f65f9c"
}
→ HTTP 404`}
  </CodeBlock>
);

export const NotFoundErrorSequenceDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
    participant Client
    participant DS as DispatcherServlet
    participant CA as ControllerAdvice

    Client->>DS: GET /
    DS->>DS: No resource found for "/"
    DS->>CA: throws NoResourceFoundException
    CA->>CA: @ExceptionHandler(NoResourceFoundException.class)
    CA->>CA: buildProblemDetail(e, NOT_FOUND)
    CA->>CA: log.warn("NoResourceFoundException being handled")
    CA-->>DS: ProblemDetail {status: 404, detail, timestamp, trace}
    DS-->>Client: HTTP 404 (ProblemDetail JSON)`}
    />
  </ZoomContainer>
);
