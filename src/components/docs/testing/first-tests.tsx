import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import { JacocoCoverageTable } from '@site/src/components/jacoco-coverage-table';
import { FileTreeInfo } from '@site/src/components/file-tree-info';

const FileTreeJava = () => (
  <CodeBlock language="log" title="File Tree">
    {`.
// highlight-modified
├── build.gradle
├── ...
└── src
    ├── main
    │   └── java
    │       └── dev
    │           └── pollito
    │               └── spring_java
    │                   ├── config
    │                   │   └── web
// highlight-modified
    │                   │       └── ControllerAdvice.java
    │                   └── ...
    └── test
        ├── java
        │   └── dev
        │       └── pollito
        │           └── spring_java
        │               ├── common
        │               │   └── util
// highlight-added
        │               │       └── EnumUtilsTest.java
        │               ├── config
        │               │   └── web
// highlight-added
        │               │       └── ControllerAdviceMockMvcTest.java
        │               └── sakila
        │                   └── film
        │                       ├── adapter
        │                       │   └── in
        │                       │       └── rest
// highlight-added
        │                       │           └── FilmRestControllerMockMvcTest.java
        │                       └── domain
        │                           └── service
// highlight-added
        │                               └── FilmUseCasesImplTest.java
        └── util
// highlight-added
            └── MockMvcResultMatchers.java`}
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
    │   └── kotlin
    │       └── dev
    │           └── pollito
    │               └── spring_kotlin
    │                   ├── config
    │                   │   └── web
// highlight-modified
    │                   │       └── ControllerAdvice.kt
    │                   └── ...
    └── test
        ├── kotlin
        │   └── dev
        │       └── pollito
        │           └── spring_kotlin
        │               ├── common
        │               │   └── util
// highlight-added
        │               │       └── EnumUtilsTest.kt
        │               ├── config
        │               │   └── web
// highlight-added
        │               │       └── ControllerAdviceMockMvcTest.kt
        │               └── sakila
        │                   └── film
        │                       ├── adapter
        │                       │   └── in
        │                       │       └── rest
// highlight-added
        │                       │           └── FilmRestControllerMockMvcTest.kt
        │                       └── domain
        │                           └── service
// highlight-added
        │                               └── FilmUseCasesImplTest.kt
        └── util
// highlight-added
            └── MockMvcResultMatchersDsl.kt`}
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
    │   └── groovy
    │       └── dev
    │           └── pollito
    │               └── spring_groovy
    │                   ├── config
    │                   │   └── web
// highlight-modified
    │                   │       └── ControllerAdvice.groovy
    │                   └── ...
    └── test
        ├── groovy
        │   └── dev
        │       └── pollito
        │           └── spring_groovy
        │               ├── common
        │               │   └── util
// highlight-added
        │               │       └── EnumUtilsSpec.groovy
        │               ├── config
        │               │   └── web
// highlight-added
        │               │       └── ControllerAdviceMockMvcSpec.groovy
        │               └── sakila
        │                   └── film
        │                       ├── adapter
        │                       │   └── in
        │                       │       └── rest
// highlight-added
        │                       │           └── FilmRestControllerMockMvcSpec.groovy
        │                       └── domain
        │                           └── service
// highlight-added
        │                               └── FilmUseCasesImplSpec.groovy
        └── util
// highlight-added
            └── MockMvcResultMatchersTrait.groovy`}
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

export const JacocoReportJava = () => (
  <JacocoCoverageTable
    data={[
      {
        name: 'dev.pollito.spring_java.common.util',
        instructionCoverage: 100,
        branchCoverage: 100,
        missedComplexity: 0,
        totalComplexity: 3,
        missedLines: 0,
        totalLines: 4,
        missedMethods: 0,
        totalMethods: 1,
        missedClasses: 0,
        totalClasses: 1,
      },
      {
        name: 'dev.pollito.spring_java.config.web',
        instructionCoverage: 93,
        branchCoverage: 66,
        missedComplexity: 1,
        totalComplexity: 8,
        missedLines: 1,
        totalLines: 19,
        missedMethods: 0,
        totalMethods: 6,
        missedClasses: 0,
        totalClasses: 1,
      },
      {
        name: 'dev.pollito.spring_java.sakila.film.adapter.in.rest',
        instructionCoverage: 100,
        branchCoverage: undefined,
        missedComplexity: 0,
        totalComplexity: 5,
        missedLines: 0,
        totalLines: 10,
        missedMethods: 0,
        totalMethods: 5,
        missedClasses: 0,
        totalClasses: 1,
      },
      {
        name: 'dev.pollito.spring_java.sakila.film.domain.service',
        instructionCoverage: 100,
        branchCoverage: undefined,
        missedComplexity: 0,
        totalComplexity: 2,
        missedLines: 0,
        totalLines: 16,
        missedMethods: 0,
        totalMethods: 2,
        missedClasses: 0,
        totalClasses: 1,
      },
      {
        name: 'Total',
        instructionCoverage: 97,
        branchCoverage: 85,
        missedComplexity: 1,
        totalComplexity: 18,
        missedLines: 1,
        totalLines: 49,
        missedMethods: 0,
        totalMethods: 14,
        missedClasses: 0,
        totalClasses: 4,
        isTotal: true,
      },
    ]}
  />
);

export const JacocoReportKt = () => (
  <JacocoCoverageTable
    data={[
      {
        name: 'dev.pollito.spring_kotlin.common.util',
        instructionCoverage: 100,
        branchCoverage: 100,
        missedComplexity: 0,
        totalComplexity: 2,
        missedLines: 0,
        totalLines: 2,
        missedMethods: 0,
        totalMethods: 1,
        missedClasses: 0,
        totalClasses: 1,
      },
      {
        name: 'dev.pollito.spring_kotlin.config.web',
        instructionCoverage: 92,
        branchCoverage: 75,
        missedComplexity: 3,
        totalComplexity: 13,
        missedLines: 1,
        totalLines: 22,
        missedMethods: 2,
        totalMethods: 11,
        missedClasses: 0,
        totalClasses: 2,
      },
      {
        name: 'dev.pollito.spring_kotlin.sakila.film.adapter.in.rest',
        instructionCoverage: 100,
        branchCoverage: undefined,
        missedComplexity: 0,
        totalComplexity: 6,
        missedLines: 0,
        totalLines: 16,
        missedMethods: 0,
        totalMethods: 6,
        missedClasses: 0,
        totalClasses: 1,
      },
      {
        name: 'dev.pollito.spring_kotlin.sakila.film.domain.service',
        instructionCoverage: 100,
        branchCoverage: undefined,
        missedComplexity: 0,
        totalComplexity: 2,
        missedLines: 0,
        totalLines: 15,
        missedMethods: 0,
        totalMethods: 2,
        missedClasses: 0,
        totalClasses: 1,
      },
      {
        name: 'Total',
        instructionCoverage: 96,
        branchCoverage: 83,
        missedComplexity: 3,
        totalComplexity: 23,
        missedLines: 1,
        totalLines: 55,
        missedMethods: 2,
        totalMethods: 20,
        missedClasses: 0,
        totalClasses: 5,
        isTotal: true,
      },
    ]}
  />
);

export const JacocoReportGroovy = () => (
  <JacocoCoverageTable
    data={[
      {
        name: 'dev.pollito.spring_groovy.common.util',
        instructionCoverage: 87,
        branchCoverage: 100,
        missedComplexity: 1,
        totalComplexity: 3,
        missedLines: 1,
        totalLines: 5,
        missedMethods: 1,
        totalMethods: 2,
        missedClasses: 0,
        totalClasses: 1,
      },
      {
        name: 'dev.pollito.spring_groovy.config.web',
        instructionCoverage: 92,
        branchCoverage: 75,
        missedComplexity: 1,
        totalComplexity: 9,
        missedLines: 2,
        totalLines: 26,
        missedMethods: 0,
        totalMethods: 7,
        missedClasses: 0,
        totalClasses: 1,
      },
      {
        name: 'dev.pollito.spring_groovy.sakila.film.adapter.in.rest',
        instructionCoverage: 100,
        branchCoverage: undefined,
        missedComplexity: 0,
        totalComplexity: 8,
        missedLines: 0,
        totalLines: 19,
        missedMethods: 0,
        totalMethods: 8,
        missedClasses: 0,
        totalClasses: 2,
      },
      {
        name: 'dev.pollito.spring_groovy.sakila.film.domain.service',
        instructionCoverage: 100,
        branchCoverage: undefined,
        missedComplexity: 0,
        totalComplexity: 2,
        missedLines: 0,
        totalLines: 14,
        missedMethods: 0,
        totalMethods: 2,
        missedClasses: 0,
        totalClasses: 1,
      },
      {
        name: 'Total',
        instructionCoverage: 95,
        branchCoverage: 83,
        missedComplexity: 2,
        totalComplexity: 22,
        missedLines: 3,
        totalLines: 64,
        missedMethods: 1,
        totalMethods: 19,
        missedClasses: 0,
        totalClasses: 5,
        isTotal: true,
      },
    ]}
  />
);
