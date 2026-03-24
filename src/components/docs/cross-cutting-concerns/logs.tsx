import CodeBlock from '@theme/CodeBlock';
import ZoomContainer from '@site/src/components/zoom-container';
import Mermaid from '@theme/Mermaid';
import { FileTreeInfo } from '@site/src/components/file-tree-info';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

const FileTreeJava = () => (
  <CodeBlock language="log" title="File Tree">
    {`.
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
    │   │               │   └── log
// highlight-added-start
    │   │               │       ├── LogAspect.java
    │   │               │       ├── LogFilter.java
    │   │               │       ├── MaskingPatternLayout.java
    │   │               │       └── OTelApiTraceSpanFilter.java
// highlight-added-end
    │   │               └── ...
    │   └── resources
// highlight-added-start
    │       ├── application-dev.yaml
    │       ├── logback-spring.xml
// highlight-added-end
    │       └── ...
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
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_kotlin
    │   │               ├── config
    │   │               │   └── log
// highlight-added-start
    │   │               │       ├── LogAspect.kt
    │   │               │       ├── LogFilter.kt
    │   │               │       ├── MaskingPatternLayout.kt
    │   │               │       └── OTelApiTraceSpanFilter.kt
// highlight-added-end
    │   │               └── ...
    │   └── resources
// highlight-added-start
    │       ├── application-dev.yaml
    │       ├── logback-spring.xml
// highlight-added-end
    │       └── ...
    └── ...`}
  </CodeBlock>
);

const FileTreeGroovy = () => (
  <CodeBlock language="log" title="File Tree">
    {`.
// highlight-modified
├── build.gradle
├── ...
└── src
    ├── main
    │   ├── groovy
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_groovy
    │   │               ├── config
    │   │               │   └── log
// highlight-added-start
    │   │               │       ├── LogAspect.groovy
    │   │               │       ├── LogFilter.groovy
    │   │               │       ├── MaskingPatternLayout.groovy
    │   │               │       └── OTelApiTraceSpanFilter.groovy
// highlight-added-end
    │   │               └── ...
    │   └── resources
// highlight-added-start
    │       ├── application-dev.yaml
    │       ├── logback-spring.xml
// highlight-added-end
    │       └── ...
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

export const CurlRequest = () => (
  <CodeBlock language="log" title="Terminal">
    {`curl -s --request GET \
  --url http://localhost:8080/api/films/42 \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
  --header 'Cookie: JSESSIONID=A1B2C3D4E5F6G7H8I9J0; auth_token=secret123token456' \
  --header 'Proxy-Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=' \
  --header 'User-Agent: Mozilla/5.0 (Test Client)' \
  --header 'X-API-Key: super-secret-api-key' \
  --header 'X-Auth-Token: super-secret-auth-token-12345' \
  --header 'X-CSRF-Token: csrf_abc123def456ghi789' | jq`}
  </CodeBlock>
);

export const ApplicationLogs = () => (
  <CodeBlock language="log" title="Application logs">
    {`2026-02-18 15:28:11.600 trace_id=b8e1447340832e9b466fde0a1f172b55 span_id=a4fa1234784f7c02 trace_flags=01 INFO  http-nio-8080-exec-1 --- d.p.spring_java.config.log.LogFilter >>>> Method: GET; URI: /api/films/42; QueryString: null; Headers: {Host: localhost:8080, Accept: application/json, Authorization: ****, Cookie: ****, Proxy-Authorization: ****, User-Agent: Mozilla/5.0 (Test Client), X-API-Key: ****, X-Auth-Token: ****, X-CSRF-Token: ****
2026-02-18 15:28:11.619 trace_id=b8e1447340832e9b466fde0a1f172b55 span_id=a4fa1234784f7c02 trace_flags=01 INFO  http-nio-8080-exec-1 --- d.p.spring_java.config.log.LogAspect [FilmRestController.getFilm(..)] Args: [42]
2026-02-18 15:28:11.620 trace_id=b8e1447340832e9b466fde0a1f172b55 span_id=a4fa1234784f7c02 trace_flags=01 INFO  http-nio-8080-exec-1 --- d.p.spring_java.config.log.LogAspect [FilmRestController.getFilm(..)] Response: FilmResponse(id=42, title=ACADEMY DINOSAUR, description=A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies, releaseYear=2006, rating=PG, lengthMinutes=86, language=English)
2026-02-18 15:28:11.664 trace_id=b8e1447340832e9b466fde0a1f172b55 span_id=a4fa1234784f7c02 trace_flags=01 INFO  http-nio-8080-exec-1 --- d.p.spring_java.config.log.LogFilter <<<< Response Status: 200`}
  </CodeBlock>
);

export const ApplicationSequenceDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
participant Client
participant OTelApiTraceSpanFilter
participant LogFilter
participant LogAspect
participant FilmRestController

Client->>OTelApiTraceSpanFilter: HTTP Request
activate OTelApiTraceSpanFilter

OTelApiTraceSpanFilter->>OTelApiTraceSpanFilter: Set trace_id in MDC

OTelApiTraceSpanFilter->>LogFilter: doFilter(request, response)
activate LogFilter

Note over LogFilter: Log Request Details<br/>(Method, URI, QueryString, Headers)

LogFilter->>LogAspect: @Before advice
activate LogAspect
Note over LogAspect: Log method args

LogAspect->>FilmRestController: getFilm(42)
activate FilmRestController
FilmRestController-->>LogAspect: FilmResponse
deactivate FilmRestController

LogAspect-->>LogAspect: @AfterReturning advice
Note over LogAspect: Log method response

LogAspect-->>LogFilter: Return response
deactivate LogAspect

Note over LogFilter: Log Response Details<br/>(Status Code)

LogFilter-->>OTelApiTraceSpanFilter: Return response
deactivate LogFilter

OTelApiTraceSpanFilter->>OTelApiTraceSpanFilter: Clear MDC

OTelApiTraceSpanFilter-->>Client: HTTP Response
deactivate OTelApiTraceSpanFilter`}
    />
  </ZoomContainer>
);
