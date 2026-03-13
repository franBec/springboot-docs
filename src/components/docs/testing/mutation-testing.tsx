import { CollapsibleCodeBlock } from '@site/src/components/collapsible-code-block';
import { PitCoverageReport } from '@site/src/components/pit-coverage-report';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { FileTreeInfo } from '@site/src/components/file-tree-info';

const FileTreeJava = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`// highlight-modified
├── build.gradle
└── src/
    └── ...`}
  </CollapsibleCodeBlock>
);

const FileTreeKt = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`// highlight-modified
├── build.gradle.kts
└── src/
    └── ...`}
  </CollapsibleCodeBlock>
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
    </Tabs>
  </FileTreeInfo>
);

const BuildGradleCode = () => (
  <CollapsibleCodeBlock language="groovy" title="build.gradle">
    {`plugins {
  // ...
// highlight-added
  id 'info.solidsoft.pitest' version '1.19.0-rc.3'
}
// ...
tasks.named('check') {
  // ...
// highlight-added
  dependsOn 'pitest'
}
// ...
// highlight-added-start
pitest {
  def basePackage = "\${project.group}.\${project.name}".toString()

  targetClasses = [
    "\${basePackage}.config.advice.*",
    "\${basePackage}.config.log.*",
    "\${basePackage}.sakila.*.adapter.*",
    "\${basePackage}.sakila.*.domain.port.*",
  ] as Iterable<? extends String>

  targetTests = ["\${basePackage}.*"] as Iterable<? extends String>

  excludedClasses = [
    "\${basePackage}.generated.*",
    '**.*MapperImpl*',
  ] as Iterable<? extends String>

  mutationThreshold = 70
  coverageThreshold = 80

  junit5PluginVersion = '1.2.3'
  threads = 4
  outputFormats = ['HTML']
  timestampedReports = false
  jvmArgs = [
    '-XX:+EnableDynamicAgentLoading',
    '--add-opens',
    'java.base/java.lang=ALL-UNNAMED',
    '--add-opens',
    'java.base/java.util=ALL-UNNAMED',
    '--add-opens',
    'java.base/java.lang.reflect=ALL-UNNAMED',
    '--add-opens',
    'java.base/java.io=ALL-UNNAMED'
  ]
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const BuildGradleKtsCode = () => (
  <CollapsibleCodeBlock language="kts" title="build.gradle.kts">
    {`plugins {
  // ...
// highlight-added
  id("info.solidsoft.pitest") version "1.19.0-rc.3"
}
// ...
// highlight-modified
tasks.named("check") { dependsOn(tasks.jacocoTestCoverageVerification, tasks.pitest) }
// ...
// highlight-added-start
pitest {
  junit5PluginVersion.set("1.2.3")
  threads.set(Runtime.getRuntime().availableProcessors())
  outputFormats.set(setOf("HTML"))
  timestampedReports.set(false)
  jvmArgs.set(listOf("-XX:+EnableDynamicAgentLoading", "-Xshare:off"))
  mainProcessJvmArgs.set(listOf("-XX:+EnableDynamicAgentLoading", "-Xshare:off"))

  avoidCallsTo.set(
      setOf(
          "kotlin.jvm.internal",
          "kotlin.ResultKt",
          "org.slf4j",
          "io.github.oshai.kotlinlogging",
          "ch.qos.logback",
      )
  )

  val basePackage = "\${project.group}.\${project.name}"
  targetClasses.set(
      setOf(
          "$basePackage.config.advice.*",
          "$basePackage.config.log.*",
          "$basePackage.sakila.*.adapter.*",
          "$basePackage.sakila.*.domain.port.*",
      )
  )
  targetTests.set(setOf("$basePackage.*"))
  excludedClasses.set(
      setOf(
          "$basePackage.generated.*",
          "**.*MapperImpl*",
      )
  )

  mutationThreshold = 70
  coverageThreshold = 80
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const BuildGradle = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <BuildGradleCode />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <BuildGradleKtsCode />
    </TabItem>
  </Tabs>
);

export const PitestCoverageReportJava = () => (
  <PitCoverageReport
    summary={{
      numberOfClasses: 6,
      lineCoverage: {
        covered: 87,
        total: 91,
      },
      mutationCoverage: {
        covered: 21,
        total: 25,
      },
      testStrength: {
        covered: 21,
        total: 24,
      },
    }}
    packages={[
      {
        name: 'dev.pollito.spring_java.config.advice',
        numberOfClasses: 1,
        lineCoverage: {
          covered: 18,
          total: 19,
        },
        mutationCoverage: {
          covered: 4,
          total: 4,
        },
        testStrength: {
          covered: 4,
          total: 4,
        },
      },
      {
        name: 'dev.pollito.spring_java.config.log',
        numberOfClasses: 3,
        lineCoverage: {
          covered: 51,
          total: 54,
        },
        mutationCoverage: {
          covered: 15,
          total: 19,
        },
        testStrength: {
          covered: 15,
          total: 18,
        },
      },
      {
        name: 'dev.pollito.spring_java.sakila.film.adapter.in.rest',
        numberOfClasses: 1,
        lineCoverage: {
          covered: 8,
          total: 8,
        },
        mutationCoverage: {
          covered: 1,
          total: 1,
        },
        testStrength: {
          covered: 1,
          total: 1,
        },
      },
      {
        name: 'dev.pollito.spring_java.sakila.film.domain.port.in',
        numberOfClasses: 1,
        lineCoverage: {
          covered: 10,
          total: 10,
        },
        mutationCoverage: {
          covered: 1,
          total: 1,
        },
        testStrength: {
          covered: 1,
          total: 1,
        },
      },
    ]}
  />
);

export const PitestCoverageReportKt = () => (
  <PitCoverageReport
    summary={{
      numberOfClasses: 4,
      lineCoverage: {
        covered: 80,
        total: 83,
      },
      mutationCoverage: {
        covered: 26,
        total: 28,
      },
      testStrength: {
        covered: 26,
        total: 27,
      },
    }}
    packages={[
      {
        name: 'dev.pollito.spring_kotlin.config.advice',
        numberOfClasses: 1,
        lineCoverage: {
          covered: 19,
          total: 20,
        },
        mutationCoverage: {
          covered: 1,
          total: 1,
        },
        testStrength: {
          covered: 1,
          total: 1,
        },
      },
      {
        name: 'dev.pollito.spring_kotlin.config.log',
        numberOfClasses: 3,
        lineCoverage: {
          covered: 61,
          total: 63,
        },
        mutationCoverage: {
          covered: 25,
          total: 27,
        },
        testStrength: {
          covered: 25,
          total: 26,
        },
      },
    ]}
  />
);
