import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { FileTreeInfo } from '@site/src/components/file-tree-info';

export const FileTree = () => (
  <FileTreeInfo>
    <CodeBlock language="log" title="File Tree">
      {`.
// highlight-modified
├── build.gradle  # or build.gradle.kts in kotlin
├── ...           # other root files omitted
└── src
    ├── main
    │   ├── ...   # source code omitted
    │   └── resources
    │       ├── application-dev.yaml
    │       ├── application.yaml
// highlight-added-start
    │       ├── hibernate.reveng.xml
    │       ├── hibernate-tools.properties
// highlight-added-end
    │       ├── logback-spring.xml
    │       ├── openapi.yaml
// highlight-added-start
    │       ├── sakila-data.sql
    │       ├── sakila-schema.sql
    │       └── templates/hibernate/pojo/Pojo.ftl
// highlight-added-end
    └── test/...    # test sources omitted`}
    </CodeBlock>
  </FileTreeInfo>
);
