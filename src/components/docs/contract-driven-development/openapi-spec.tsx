import { CollapsibleCodeBlock } from '@site/src/components/collapsible-code-block';
import { FileTreeInfo } from '@site/src/components/file-tree-info';

export const FilmStructureJson = () => (
  <CollapsibleCodeBlock language="json">
    {`{
  "id": 42,
  "title": "ACADEMY DINOSAUR",
  "description": "A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies",
  "releaseYear": 2006,
  "rating": "PG",
  "lengthMinutes": 86,
  "language": "English"
}`}
  </CollapsibleCodeBlock>
);

export const FileTree = () => (
  <FileTreeInfo>
    <CollapsibleCodeBlock language="log" title="File Tree">
      {`├── ...
└── src
    ├── main
    │   ├── ...
    │   └── resources
    │       ├── ...
// highlight-added
    │       └── openapi.yaml
    └── ...`}
    </CollapsibleCodeBlock>
  </FileTreeInfo>
);

export const ErrorResponseJson = () => (
  <CollapsibleCodeBlock language="json">
    {`{
  "instance": "/api/something",
  "timestamp": "2026-01-03T17:11:50.826722328Z",
  "trace": "9482c151-b417-43ff-9dbb-ee12b84e5d99",
  "status": 404,
  "title": "Not Found",
  "detail": "No static resource for request '/'."
}`}
  </CollapsibleCodeBlock>
);

export const FilmsListResponseJson = () => (
  <CollapsibleCodeBlock language="json">
    {`{
  "instance": "/api/films",
  "timestamp": "2026-01-03T17:11:50.826722328Z",
  "trace": "9482c151-b417-43ff-9dbb-ee12b84e5d99",
  "status": 200,
  "data": [
    {
      "id": 42,
      "title": "ACADEMY DINOSAUR",
      "description": "An Epic Drama of a Feminist And a Mad Scientist",
      "releaseYear": 2006,
      "rating": "PG",
      "lengthMinutes": 86,
      "language": "English"
    }
  ]
}`}
  </CollapsibleCodeBlock>
);

export const FilmResponseJson = () => (
  <CollapsibleCodeBlock language="json">
    {`{
  "instance": "/api/films/42",
  "timestamp": "2026-01-03T17:11:50.826722328Z",
  "trace": "9482c151-b417-43ff-9dbb-ee12b84e5d99",
  "status": 200,
  "data": {
    "id": 42,
    "title": "ACADEMY DINOSAUR",
    "description": "An Epic Drama of a Feminist And a Mad Scientist",
    "releaseYear": 2006,
    "rating": "PG",
    "lengthMinutes": 86,
    "language": "English"
  }
}`}
  </CollapsibleCodeBlock>
);

export const EnvelopePatternJson = () => (
  <CollapsibleCodeBlock language="json">
    {`{
  "instance": "/api/films/42",
  "timestamp": "...",
  "trace": "...",
  "status": 200,
  "data": {
    "id": 42,
    "title": "ACADEMY DINOSAUR",
    //...
  }
}`}
  </CollapsibleCodeBlock>
);

export const ResponseMetadataSchemaYaml = () => (
  <CollapsibleCodeBlock language="yaml">
    {`# Base metadata for all responses
ResponseMetadata:
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
  </CollapsibleCodeBlock>
);
