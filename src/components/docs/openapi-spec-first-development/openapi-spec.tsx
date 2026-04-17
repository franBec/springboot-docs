import CodeBlock from '@theme/CodeBlock';
import { FileTreeInfo } from '@site/src/components/file-tree-info';

export const FilmStructureJson = () => (
  <CodeBlock language="json">
    {`{
  "title": "ACADEMY DINOSAUR",
  "description": "An Epic Drama of a Feminist And a Mad Scientist",
  "releaseYear": 2006,
  "rating": "PG",
  "length": 86,
  "language": "English",
  "originalLanguage": "English",
  "rentalDuration": 3,
  "rentalRate": 4.99,
  "replacementCost": 20.99,
  "specialFeatures": "Trailers,Deleted Scenes",
  "id": 42,
  "lastUpdate": "2006-02-15T04:03:42Z"
}`}
  </CodeBlock>
);

export const FileTree = () => (
  <FileTreeInfo>
    <CodeBlock language="log" title="File Tree">
      {`.
├── ...
└── src
    ├── main
    │   ├── ...
    │   └── resources
    │       ├── ...
// highlight-added
    │       ├── openapi.yaml
    │       └── ...
    └── test
        └── ...`}
    </CodeBlock>
  </FileTreeInfo>
);

export const ErrorResponseJson = () => (
  <CodeBlock language="json">
    {`{
  "instance": "/api/something",
  "status": 200,
  "timestamp": "2026-01-03T17:11:50.826722328Z",
  "trace": "9482c151-b417-43ff-9dbb-ee12b84e5d99",
  "title": "Not Found",
  "detail": "No static resource for request '/'."
}`}
  </CodeBlock>
);

export const FilmsListResponseJson = () => (
  <CodeBlock language="json">
    {`{
  "instance": "/api/films",
  "status": 200,
  "timestamp": "2026-01-03T17:11:50.826722328Z",
  "trace": "9482c151-b417-43ff-9dbb-ee12b84e5d99",
  "data": {
    "content": [],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 10
    },
    "totalElements": 10,
    "totalPages": 10
  }
}`}
  </CodeBlock>
);

export const FilmResponseJson = () => (
  <CodeBlock language="json">
    {`{
  "instance": "/api/something",
  "status": 200,
  "timestamp": "2026-01-03T17:11:50.826722328Z",
  "trace": "9482c151-b417-43ff-9dbb-ee12b84e5d99",
  "data": {
    "title": "ACADEMY DINOSAUR",
    "description": "An Epic Drama of a Feminist And a Mad Scientist",
    "releaseYear": 2006,
    "rating": "PG",
    "length": 86,
    "language": "English",
    "originalLanguage": "English",
    "rentalDuration": 3,
    "rentalRate": 4.99,
    "replacementCost": 20.99,
    "specialFeatures": "Trailers,Deleted Scenes",
    "id": 42,
    "lastUpdate": "2006-02-15T04:03:42Z"
  }
}`}
  </CodeBlock>
);

export const EnvelopePatternJson = () => (
  <CodeBlock language="json">
    {`{
  "instance": "/api/films/42",
  "timestamp": "...",
  "trace": "...",
  "status": 200,
  "data": {
    "id": 42,
    "title": "ACADEMY DINOSAUR",
    // ...
  }
}`}
  </CodeBlock>
);

export const ResponseMetadataSchemaYaml = () => (
  <CodeBlock language="yaml">
    {`ResponseMetadata:
  type: object
  properties:
    instance:
      # ...
    status:
      # ...
    timestamp:
      # ...
    trace:
      # ...`}
  </CodeBlock>
);
