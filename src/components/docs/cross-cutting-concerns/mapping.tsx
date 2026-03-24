import CodeBlock from '@theme/CodeBlock';
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
    └── main
        └── java
            └── dev
                └── pollito
                    └── spring_java
                        ├── sakila
                        │   └── film
                        │       ├── adapter
                        │       │   └── in
                        │       │       └── rest
                        │       │           ├── ...
// highlight-modified
                        │       │           └── FilmRestMapper.java
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
    └── main
        └── kotlin
            └── dev
                └── pollito
                    └── spring_kotlin
                        ├── sakila
                        │   └── film
                        │       ├── adapter
                        │       │   └── in
                        │       │       └── rest
                        │       │           ├── ...
// highlight-modified
                        │       │           └── FilmRestMapper.kt
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
    └── main
        └── groovy
            └── dev
                └── pollito
                    └── spring_groovy
                        ├── config
                        │   └── mapper
// highlight-added
                        │       └── ModelMapperConfig.groovy
                        ├── sakila
                        │   └── film
                        │       ├── adapter
                        │       │   └── in
                        │       │       └── rest
                        │       │           ├── ...
// highlight-modified-start
                        │       │           ├── FilmRestController.groovy
                        │       │           └── FilmRestMapper.groovy
// highlight-modified-end
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
