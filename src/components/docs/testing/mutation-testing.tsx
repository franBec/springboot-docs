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
  id 'java'
  id 'org.springframework.boot' version '4.0.1'
  id 'io.spring.dependency-management' version '1.1.7'
  id 'com.diffplug.spotless' version '8.1.0'
  id 'org.openapi.generator' version '7.17.0'
  id 'jacoco'
// highlight-added
  id 'info.solidsoft.pitest' version '1.19.0-rc.3'
}

group = 'dev.pollito'
version = '0.0.1-SNAPSHOT'
description = 'Demo project for Spring Boot with Java'

java {
  toolchain {
    languageVersion = JavaLanguageVersion.of(21)
  }
}

configurations {
  compileOnly {
    extendsFrom annotationProcessor
  }
}

repositories {
  mavenCentral()
}

dependencies {
  implementation 'org.springframework.boot:spring-boot-starter-actuator'
  implementation 'org.springframework.boot:spring-boot-starter-webmvc'
  compileOnly 'org.projectlombok:lombok'
  developmentOnly 'org.springframework.boot:spring-boot-devtools'
  annotationProcessor 'org.springframework.boot:spring-boot-configuration-processor'
  annotationProcessor 'org.projectlombok:lombok'
  testImplementation 'org.springframework.boot:spring-boot-starter-actuator-test'
  testImplementation 'org.springframework.boot:spring-boot-starter-webmvc-test'
  testRuntimeOnly 'org.junit.platform:junit-platform-launcher'

  def mapstructVersion = '1.6.3'
  def mapstructSpringExtensionsVersion = '2.0.0'
  implementation "org.mapstruct:mapstruct:\${mapstructVersion}"
  annotationProcessor "org.mapstruct:mapstruct-processor:\${mapstructVersion}"
  implementation "org.mapstruct.extensions.spring:mapstruct-spring-annotations:\${mapstructSpringExtensionsVersion}"
  annotationProcessor "org.mapstruct.extensions.spring:mapstruct-spring-extensions:\${mapstructSpringExtensionsVersion}"
  testImplementation "org.mapstruct.extensions.spring:mapstruct-spring-test-extensions:\${mapstructSpringExtensionsVersion}"
  testAnnotationProcessor "org.mapstruct.extensions.spring:mapstruct-spring-extensions:\${mapstructSpringExtensionsVersion}"

  implementation 'org.aspectj:aspectjtools:1.9.25.1'
  implementation 'org.springframework.boot:spring-boot-starter-opentelemetry'

  implementation 'io.swagger.core.v3:swagger-annotations:2.2.41'
  implementation 'org.openapitools:jackson-databind-nullable:0.2.8'
  implementation 'org.springframework.boot:spring-boot-starter-validation'
}

jacoco {
  toolVersion = "0.8.14"
}

jacocoTestReport {
  dependsOn test
  reports {
    xml.required = true
    html.required = true
  }

  classDirectories.setFrom(
      files(classDirectories.files.collect {
        fileTree(it) {
          exclude(
              // OpenAPI generated code
              '**/generated/**',

              // Application entry point
              '**/*Application*',

              // Domain models (POJOs)
              '**/domain/model/**',

              // MapStruct
              '**/config/mapper/**',
              '**/*MapperImpl*',
              )
        }
      })
      )
}

jacocoTestCoverageVerification {
  dependsOn jacocoTestReport
  classDirectories.setFrom(jacocoTestReport.classDirectories)
  violationRules {
    rule {
      limit {
        counter = 'LINE'
        minimum = 0.8
      }
      limit {
        counter = 'BRANCH'
        minimum = 0.5
      }
    }
  }
}

tasks.named('check') {
  dependsOn jacocoTestCoverageVerification
// highlight-added
  dependsOn 'pitest'
}

tasks.named('test') {
  useJUnitPlatform()
  jvmArgs '-XX:+EnableDynamicAgentLoading'
  jvmArgumentProviders.add({
    def mockitoAgent = configurations.testRuntimeClasspath.resolvedConfiguration
        .resolvedArtifacts
        .find { it.name == 'mockito-core' }
        ?.file
    mockitoAgent ? ["-javaagent:\${mockitoAgent}"] : []
  } as CommandLineArgumentProvider)
  finalizedBy jacocoTestReport
}

spotless {
  java {
    target 'src/*/java/**/*.java'
    googleJavaFormat()
    removeUnusedImports()
    cleanthat()
    formatAnnotations()
  }
  groovyGradle {
    target '*.gradle'
    greclipse().configFile('greclipse.properties')
  }
}

tasks.named("build") {
  dependsOn 'spotlessApply'
  dependsOn 'spotlessGroovyGradleApply'
}

openApiGenerate {
  generatorName = "spring"
  inputSpec = layout.projectDirectory.file("src/main/resources/openapi.yaml").asFile.toString()
  outputDir = layout.buildDirectory.dir("generated/sources/openapi").get().asFile.toString()

  def basePackage = "\${project.group}.\${project.name}.generated".toString()
  apiPackage = "\${basePackage}.api"
  modelPackage = "\${basePackage}.model"

  configOptions = [
    interfaceOnly             : "true",
    requestMappingMode        : "api_interface",
    skipDefaultInterface      : "true",
    useJakartaEe              : "true",
    useSpringBoot3            : "true",
    useTags                   : "true",
  ]
}

sourceSets {
  main {
    java {
      srcDir(layout.buildDirectory.dir("generated/sources/openapi/src/main/java"))
    }
  }
}

tasks.named('compileJava') {
  dependsOn 'openApiGenerate'
}

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
  kotlin("jvm") version "2.2.21"
  kotlin("plugin.spring") version "2.2.21"
  id("org.springframework.boot") version "4.0.1"
  id("io.spring.dependency-management") version "1.1.7"
  id("com.diffplug.spotless") version "8.1.0"
  kotlin("kapt") version "2.3.0"
  id("org.openapi.generator") version "7.17.0"
  jacoco
// highlight-added
  id("info.solidsoft.pitest") version "1.19.0-rc.3"
}

group = "dev.pollito"

version = "0.0.1-SNAPSHOT"

description = "Demo project for Spring Boot with Kotlin"

java { toolchain { languageVersion = JavaLanguageVersion.of(21) } }

configurations { compileOnly { extendsFrom(configurations.annotationProcessor.get()) } }

repositories { mavenCentral() }

dependencies {
  implementation("org.springframework.boot:spring-boot-starter-actuator")
  implementation("org.springframework.boot:spring-boot-starter-webmvc")
  implementation("org.jetbrains.kotlin:kotlin-reflect")
  implementation("tools.jackson.module:jackson-module-kotlin")
  developmentOnly("org.springframework.boot:spring-boot-devtools")
  annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
  testImplementation("org.springframework.boot:spring-boot-starter-actuator-test")
  testImplementation("org.springframework.boot:spring-boot-starter-webmvc-test")
  testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
  testRuntimeOnly("org.junit.platform:junit-platform-launcher")

  val mapstructVersion = "1.6.3"
  val mapstructSpringExtensionsVersion = "2.0.0"
  implementation("org.mapstruct:mapstruct:$mapstructVersion")
  kapt("org.mapstruct:mapstruct-processor:$mapstructVersion")
  implementation(
      "org.mapstruct.extensions.spring:mapstruct-spring-annotations:$mapstructSpringExtensionsVersion"
  )
  kapt(
      "org.mapstruct.extensions.spring:mapstruct-spring-extensions:$mapstructSpringExtensionsVersion"
  )

  implementation("io.github.oshai:kotlin-logging-jvm:7.0.13")
  implementation("org.aspectj:aspectjtools:1.9.25.1")
  implementation("org.springframework.boot:spring-boot-starter-opentelemetry")

  val swaggerCoreVersion = "2.2.41"
  implementation("io.swagger.core.v3:swagger-annotations:$swaggerCoreVersion")
  implementation("io.swagger.core.v3:swagger-models:$swaggerCoreVersion")
  implementation("org.springframework.boot:spring-boot-starter-validation")

  testImplementation("com.ninja-squad:springmockk:5.0.1")
  testImplementation("io.mockk:mockk:1.14.7")
}

kotlin {
  compilerOptions {
    freeCompilerArgs.addAll("-Xjsr305=strict", "-Xannotation-default-target=param-property")
  }
}

tasks.withType<Test> {
  useJUnitPlatform()
  jvmArgs("-XX:+EnableDynamicAgentLoading", "-Xshare:off")
  finalizedBy(tasks.jacocoTestReport)
}

jacoco { toolVersion = "0.8.14" }

tasks.jacocoTestReport {
  dependsOn(tasks.test)
  reports {
    xml.required.set(true)
    html.required.set(true)
  }

  classDirectories.setFrom(
      files(
          classDirectories.files.map {
            fileTree(it) {
              exclude(
                  // OpenAPI generated code
                  "**/generated/**",
                  "**/openapitools/**",

                  // Application entry point
                  "**/*Application*",

                  // Domain models (POJOs)
                  "**/domain/model/**",

                  // MapStruct
                  "**/config/mapper/**",
                  "**/*MapperImpl*",
              )
            }
          }
      )
  )
}

tasks.jacocoTestCoverageVerification {
  dependsOn(tasks.jacocoTestReport)

  violationRules {
    rule {
      limit {
        counter = "LINE"
        minimum = "0.8".toBigDecimal()
      }
      limit {
        counter = "BRANCH"
        minimum = "0.5".toBigDecimal()
      }
    }
  }

  classDirectories.setFrom(tasks.jacocoTestReport.get().classDirectories)
}

// highlight-modified
tasks.named("check") { dependsOn(tasks.jacocoTestCoverageVerification, tasks.pitest) }

configure<com.diffplug.gradle.spotless.SpotlessExtension> {
  kotlin {
    target("src/**/*.kt")
    targetExclude("build/**/*.kt")
    ktfmt()
  }
  kotlinGradle {
    target("*.gradle.kts")
    ktfmt()
  }
}

tasks.named("build") {
  dependsOn("spotlessKotlinApply")
  dependsOn("spotlessKotlinGradleApply")
}

val openApiSpecPath = "$projectDir/src/main/resources/openapi.yaml"
val openApiGeneratedSourcesDir = "\${layout.buildDirectory.get().asFile}/generated/source/openapi"

tasks.register<org.openapitools.generator.gradle.plugin.tasks.GenerateTask>("generateOpenApi") {
  generatorName.set("kotlin-spring")
  generateApiTests.set(false)
  generateApiDocumentation.set(false)
  generateModelTests.set(false)
  generateModelDocumentation.set(false)

  inputSpec.set(openApiSpecPath)
  outputDir.set(openApiGeneratedSourcesDir)

  val basePackage = "\${project.group}.\${project.name}.generated"
  apiPackage.set("$basePackage.api")
  modelPackage.set("$basePackage.model")

  configOptions.set(
      mapOf(
          "gradleBuildFile" to "false",
          "interfaceOnly" to "true",
          "modelMutable" to "true",
          "requestMappingMode" to "api_interface",
          "skipDefaultInterface" to "true",
          "useJakartaEe" to "true",
          "useSpringBoot3" to "true",
          "useTags" to "true",
      )
  )
}

kotlin.sourceSets["main"].kotlin.srcDir("$openApiGeneratedSourcesDir/src/main/kotlin")

tasks.named("compileKotlin") { dependsOn("generateOpenApi") }

tasks.withType<org.jetbrains.kotlin.gradle.internal.KaptGenerateStubsTask> {
  dependsOn("generateOpenApi")
}

tasks.named("clean") { doFirst { delete(openApiGeneratedSourcesDir) } }

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
