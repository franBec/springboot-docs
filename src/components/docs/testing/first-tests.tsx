import { CollapsibleCodeBlock } from '@site/src/components/collapsible-code-block';
import { JacocoCoverageTable } from '@site/src/components/jacoco-coverage-table';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import { FileTreeInfo } from '@site/src/components/file-tree-info';

const MainFileTreeJava = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`spring_java/
├── SpringJavaApplication.java              ← 🔴 @SpringBootTest (context loads)
├── config/
│   ├── advice/
│   │   └── ControllerAdvice.java           ← 🔶 Standalone MockMvc
│   ├── log/
│   │   ├── LogAspect.java                  ┐
│   │   ├── LogFilter.java                  ├─→ 🔴 @SpringBootTest (single test)
│   │   ├── MaskingPatternLayout.java       │
│   │   └── TraceIdFilter.java              ┘
│   └── mapper/
│       └── MapperSpringConfig.java         ← ⚪ Ignored (Config)
└── sakila/
    └── film/
        ├── adapter/in/rest/
        │   ├── FilmRestMapper.java         ← ⚪ Ignored (Inteface)
        │   └── FilmRestController.java     ← 🟡 @WebMvcTest
        └── domain/
            ├── model/
            │   └── Film.java               ← ⚪ Ignored (POJO)
            └── port/in/
                ├── FindByIdPortIn.java     ← ⚪ Ignored (Interface)
                └── FindByIdPortInImpl.java ← 🟢 Unit Test`}
  </CollapsibleCodeBlock>
);

const MainFileTreeKt = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`spring_kotlin/
├── SpringKotlinApplication.kt              ← 🔴 @SpringBootTest (context loads)
├── config/
│   ├── advice/
│   │   └── ControllerAdvice.kt             ← 🔶 Standalone MockMvc
│   ├── log/
│   │   ├── LogAspect.kt                    ┐
│   │   ├── LogFilter.kt                    ├─→ 🔴 @SpringBootTest (single test)
│   │   ├── MaskingPatternLayout.kt         │
│   │   └── TraceIdFilter.kt                ┘
│   └── mapper/
│       └── MapperSpringConfig.kt           ← ⚪ Ignored (Config)
└── sakila/
    └── film/
        ├── adapter/in/rest/
        │   ├── FilmRestMapper.kt           ← ⚪ Ignored (Interface)
        │   └── FilmRestController.kt       ← 🟡 @WebMvcTest
        └── domain/
            ├── model/
            │   └── Film.kt                 ← ⚪ Ignored (data class)
            └── port/in/
                ├── FindByIdPortIn.kt       ← ⚪ Ignored (Interface)
                └── FindByIdPortInImpl.kt   ← 🟢 Unit Test`}
  </CollapsibleCodeBlock>
);

const MainFileTreeGroovy = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`spring_groovy/
├── SpringGroovyApplication.groovy          ← 🔴 @SpringBootTest (context loads)
├── config/
│   ├── advice/
│   │   └── ControllerAdvice.groovy         ← 🔶 Standalone MockMvc
│   ├── log/
│   │   ├── LogAspect.groovy                ┐
│   │   ├── LogFilter.groovy                ├─→ 🔴 @SpringBootTest (single test)
│   │   ├── MaskingPatternLayout.groovy     │
│   │   └── TraceIdFilter.groovy            ┘
│   └── mapper/
│       └── ModelMapperConfig.groovy        ← ⚪ Ignored (Config)
└── sakila/
    └── film/
        ├── adapter/in/rest/
        │   ├── FilmRestMapper.groovy       ← 🟣 @ContextConfiguration (ModelMapper)
        │   └── FilmRestController.groovy   ← 🟡 @WebMvcTest
        └── domain/
            ├── model/
            │   └── Film.groovy             ← ⚪ Ignored (POJO)
            └── port/in/
                ├── FindByIdPortIn.groovy   ← ⚪ Ignored (Interface)
                └── FindByIdPortInImpl.groovy ← 🟢 Unit Test`}
  </CollapsibleCodeBlock>
);

export const MainFileTree = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <MainFileTreeJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <MainFileTreeKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <MainFileTreeGroovy />
    </TabItem>
  </Tabs>
);

const FileTreeJava = () => (
  <CollapsibleCodeBlock language="log" title="FileTree">
    {`// highlight-modified
├── build.gradle
└── src/
    ├── main/java/.../spring_java/
    │   └── config/
    │       └── advice/
// highlight-modified
    │           └── ControllerAdvice.java
    └── test/java/.../spring_java/
        ├── SpringJavaApplicationTests.java
        ├── config/
        │   ├── advice/
// highlight-added
        │   │   └── ControllerAdviceTest.java
        │   └── log/
// highlight-added
        │       └── LoggingIntegrationTest.java
        ├── sakila/
        │   └── film/
        │       ├── adapter/in/rest/
// highlight-added
        │       │   └── FilmRestControllerTest.java
        │       └── domain/port/in/
// highlight-added
        │           └── FindByIdPortInImplTest.java
        └── test/
            └── util/
// highlight-added
                └── ApiResponseMatchers.java`}
  </CollapsibleCodeBlock>
);

const FileTreeKt = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`// highlight-modified
├── build.gradle.kts
├── src/main/kotlin/.../spring_kotlin/
│   └── config/advice/
// highlight-modified
│       └── ControllerAdvice.kt
└── src/test/kotlin/.../spring_kotlin/
    ├── config/
    │   ├── advice/
// highlight-added
    │   │   └── ControllerAdviceTest.kt
    │   └── log/
// highlight-added
    │       └── LoggingIntegrationTest.kt
    ├── sakila/film/
    │   ├── adapter/in/rest/
// highlight-added
    │   │   └── FilmRestControllerTest.kt
    │   └── domain/port/in/
// highlight-added
    │       └── FindByIdPortInImplTest.kt
    ├── test/util/
// highlight-added
    │   └── MockMvcResultMatchersDsl.kt
    └── SpringKotlinApplicationTests.kt`}
  </CollapsibleCodeBlock>
);

const FileTreeGroovy = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`// highlight-modified
├── build.gradle
├── src
│   ├── main
│   │   └── groovy
│   │       └── dev
│   │           └── pollito
│   │               └── spring_groovy
│   │                   └── config
│   │                       └── advice
// highlight-modified
│   │                           └── ControllerAdvice.groovy
│   └── test
│       └── groovy
│           └── dev
│               └── pollito
│                   └── spring_groovy
│                       ├── config
│                       │   ├── advice
// highlight-added
│                       │   │   └── ControllerAdviceSpec.groovy
│                       │   └── log
// highlight-added
│                       │       └── LoggingIntegrationSpec.groovy
│                       ├── sakila
│                       │   └── film
│                       │       ├── adapter
│                       │       │   └── in
│                       │       │       └── rest
// highlight-added
│                       │       │           └── FilmRestControllerSpec.groovy
│                       │       └── domain
│                       │           └── port
│                       │               └── in
// highlight-added
│                       │                   └── FindByIdPortInImplSpec.groovy
│                       ├── SpringGroovyApplicationTests.groovy
│                       └── test
│                           └── util
// highlight-added
│                               └── ApiResponseMatchers.groovy`}
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
      <TabItem value="groovy" label="Groovy">
        <FileTreeGroovy />
      </TabItem>
    </Tabs>
  </FileTreeInfo>
);

const BuildGradleJava = () => (
  <CollapsibleCodeBlock language="groovy" title="build.gradle">
    {`plugins {
  id 'java'
  id 'org.springframework.boot' version '4.0.1'
  id 'io.spring.dependency-management' version '1.1.7'
  id 'com.diffplug.spotless' version '8.1.0'
  id 'org.openapi.generator' version '7.17.0'
// highlight-added
  id 'jacoco'
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

// highlight-added-start
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
}
// highlight-added-end

tasks.named('test') {
  useJUnitPlatform()
// highlight-added-start
  jvmArgs '-XX:+EnableDynamicAgentLoading'
  jvmArgumentProviders.add({
    def mockitoAgent = configurations.testRuntimeClasspath.resolvedConfiguration
        .resolvedArtifacts
        .find { it.name == 'mockito-core' }
        ?.file
    mockitoAgent ? ["-javaagent:\${mockitoAgent}"] : []
  } as CommandLineArgumentProvider)
  finalizedBy jacocoTestReport
// highlight-added-end
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
}`}
  </CollapsibleCodeBlock>
);

const BuildGradleKts = () => (
  <CollapsibleCodeBlock language="kts" title="build.gradle.kts">
    {`plugins {
  kotlin("jvm") version "2.2.21"
  kotlin("plugin.spring") version "2.2.21"
  id("org.springframework.boot") version "4.0.1"
  id("io.spring.dependency-management") version "1.1.7"
  id("com.diffplug.spotless") version "8.1.0"
  kotlin("kapt") version "2.3.0"
  id("org.openapi.generator") version "7.17.0"
// highlight-added
  jacoco
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

// highlight-added-start
  testImplementation("com.ninja-squad:springmockk:5.0.1")
  testImplementation("io.mockk:mockk:1.14.7")
// highlight-added-end
}

kotlin {
  compilerOptions {
    freeCompilerArgs.addAll("-Xjsr305=strict", "-Xannotation-default-target=param-property")
  }
}

// highlight-added-start
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

tasks.named("check") { dependsOn(tasks.jacocoTestCoverageVerification) }
// highlight-added-end

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

tasks.named("clean") { doFirst { delete(openApiGeneratedSourcesDir) } }`}
  </CollapsibleCodeBlock>
);

const BuildGradleSpock = () => (
  <CollapsibleCodeBlock language="groovy" title="build.gradle">
    {`plugins {
  id 'groovy'
  id 'org.springframework.boot' version '4.0.1'
  id 'io.spring.dependency-management' version '1.1.7'
  id 'com.diffplug.spotless' version '8.1.0'
  id 'org.openapi.generator' version '7.17.0'
// highlight-added
  id 'jacoco'
}

group = 'dev.pollito'
version = '0.0.1-SNAPSHOT'
description = 'Demo project for Spring Boot with Groovy'

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
  implementation 'org.apache.groovy:groovy'
  developmentOnly 'org.springframework.boot:spring-boot-devtools'
  annotationProcessor 'org.springframework.boot:spring-boot-configuration-processor'
  testImplementation 'org.springframework.boot:spring-boot-starter-actuator-test'
  testImplementation 'org.springframework.boot:spring-boot-starter-webmvc-test'
  testRuntimeOnly 'org.junit.platform:junit-platform-launcher'

  implementation 'org.aspectj:aspectjtools:1.9.25.1'
  implementation 'org.springframework.boot:spring-boot-starter-opentelemetry'

  implementation 'io.swagger.core.v3:swagger-annotations:2.2.41'
  implementation 'org.openapitools:jackson-databind-nullable:0.2.8'
  implementation 'org.springframework.boot:spring-boot-starter-validation'

  implementation 'org.modelmapper:modelmapper:3.2.6'
  
// highlight-added-start
  testImplementation 'org.spockframework:spock-core:2.4-groovy-5.0'
  testImplementation 'org.spockframework:spock-spring:2.4-groovy-5.0'
}

configurations.testImplementation {
  exclude group: 'org.mockito'
}

tasks.named('test') {
  useJUnitPlatform()
  finalizedBy jacocoTestReport
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

              // Groovy Internal Artifacts
              '**/*$*_closure*',
              '**/*__*$*',
              '**/*__*',

              // Application entry point
              '**/*Application*',

              // Domain models (POJOs)
              '**/domain/model/**',

              // ModelMapper
              '**/config/mapper/**',
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
    }
  }
}

tasks.named('check') {
  dependsOn jacocoTestCoverageVerification
}
// highlight-added-end

tasks.named('test') {
  useJUnitPlatform()
}

spotless {
  groovy {
    importOrder()
    removeSemicolons()
    greclipse().configFile('greclipse.properties')
    excludeJava()
  }
  groovyGradle {
    target '*.gradle'
    greclipse().configFile('greclipse.properties')
  }
}

tasks.named("build") {
  dependsOn 'spotlessGroovyApply'
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
}`}
  </CollapsibleCodeBlock>
);

export const BuildGradle = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <BuildGradleJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <BuildGradleKts />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <BuildGradleSpock />
    </TabItem>
  </Tabs>
);

const FindByIdPortInImplTestJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/sakila/film/domain/port/in/FindByIdPortInImplTest.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.sakila.film.domain.port.in;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class FindByIdPortInImplTest {
  @InjectMocks private FindByIdPortInImpl findByIdPortIn;

  @Test
  void findByIdReturnsADomainModel() {
    assertNotNull(findByIdPortIn.findById(1));
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const FindByIdPortInImplTestKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/sakila/film/domain/port/in/FindByIdPortInImplTest.kt"
  >
    {`// highlight-added-start
package dev.pollito.spring_kotlin.sakila.film.domain.port.\`in\`

import io.mockk.impl.annotations.InjectMockKs
import io.mockk.junit5.MockKExtension
import kotlin.test.Test
import kotlin.test.assertNotNull
import org.junit.jupiter.api.extension.ExtendWith

@ExtendWith(MockKExtension::class)
class FindByIdPortInImplTest {
  @InjectMockKs private lateinit var findByIdPortInImpl: FindByIdPortInImpl

  @Test
  fun \`findById returns a domain model\`() {
    assertNotNull(findByIdPortInImpl.findById(1))
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const FindByIdPortInImplSpec = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/sakila/film/domain/port/in/FindByIdPortInImplSpec.groovy"
  >
    {`// highlight-added-start
package dev.pollito.spring_groovy.sakila.film.domain.port.in

import spock.lang.Specification
import spock.lang.Subject

class FindByIdPortInImplSpec extends Specification {
  @Subject FindByIdPortInImpl findByIdPortIn = new FindByIdPortInImpl()

  def "findById returns a domain model"() {
    when: "findById is called"
    def result = findByIdPortIn.findById(1)

    then: "a domain model is returned"
    result != null
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const FindByIdPortInTests = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <FindByIdPortInImplTestJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <FindByIdPortInImplTestKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <FindByIdPortInImplSpec />
    </TabItem>
  </Tabs>
);

export const ApiResponseMatchersJavaCode = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/test/util/ApiResponseMatchers.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.test.util;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.ResultMatcher;

public final class ApiResponseMatchers {

  private ApiResponseMatchers() {}

  public static ResultMatcher hasStandardApiResponseFields(
      String expectedInstance, HttpStatus expectedStatus) {
    return result -> {
      jsonPath("$.instance").value(expectedInstance).match(result);
      jsonPath("$.status").value(expectedStatus.value()).match(result);
      jsonPath("$.timestamp").exists().match(result);
      jsonPath("$.trace").exists().match(result);
    };
  }

  public static ResultMatcher hasErrorFields(HttpStatus expectedStatus) {
    return result -> jsonPath("$.title").value(expectedStatus.getReasonPhrase()).match(result);
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const ApiResponseMatchersKtCode = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/test/util/MockMvcResultMatchersDsl.kt"
  >
    {`// highlight-added-start
package dev.pollito.spring_kotlin.test.util

import org.springframework.http.HttpStatus
import org.springframework.test.web.servlet.MockMvcResultMatchersDsl

fun MockMvcResultMatchersDsl.hasStandardApiResponseFields(
    expectedInstance: String,
    expectedStatus: HttpStatus,
) {
  jsonPath("$.instance") { value(expectedInstance) }
  jsonPath("$.status") { value(expectedStatus.value()) }
  jsonPath("$.timestamp") { exists() }
  jsonPath("$.trace") { exists() }
}

fun MockMvcResultMatchersDsl.hasErrorFields(extectedStatus: HttpStatus) {
  jsonPath("$.title") { value(extectedStatus.reasonPhrase) }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const ApiResponseMatchersGroovyCode = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/test/util/ApiResponseMatchers.groovy"
  >
    {`// highlight-added-start
package dev.pollito.spring_groovy.test.util

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath

import org.springframework.http.HttpStatus
import org.springframework.test.web.servlet.ResultMatcher

trait ApiResponseMatchers {

  ResultMatcher hasStandardApiResponseFields(String expectedInstance, HttpStatus expectedStatus) {
    { result ->
      jsonPath('$.instance').value(expectedInstance).match(result)
      jsonPath('$.status').value(expectedStatus.value()).match(result)
      jsonPath('$.timestamp').exists().match(result)
      jsonPath('$.trace').exists().match(result)
    } as ResultMatcher
  }

  ResultMatcher hasErrorFields(HttpStatus expectedStatus) {
    { result ->
      jsonPath('$.title').value(expectedStatus.reasonPhrase).match(result)
    } as ResultMatcher
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const FilmRestControllerTestJavaCode = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/sakila/film/adapter/in/rest/FilmRestControllerTest.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.sakila.film.adapter.in.rest;

import static dev.pollito.spring_java.test.util.ApiResponseMatchers.hasErrorFields;
import static dev.pollito.spring_java.test.util.ApiResponseMatchers.hasStandardApiResponseFields;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import dev.pollito.spring_java.config.advice.ControllerAdvice;
import dev.pollito.spring_java.sakila.film.domain.model.Film;
import dev.pollito.spring_java.sakila.film.domain.port.in.FindByIdPortIn;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.context.bean.override.mockito.MockitoSpyBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(FilmRestController.class)
@Import({ControllerAdvice.class, FilmRestMapperImpl.class})
class FilmRestControllerTest {

  private static final String FILMS_PATH = "/api/films";
  private static final String FILM_BY_ID_TEMPLATE = FILMS_PATH + "/{id}";

  @SuppressWarnings("unused")
  @Autowired
  private MockMvc mockMvc;

  @SuppressWarnings("unused")
  @MockitoBean
  private FindByIdPortIn findByIdPortIn;

  @SuppressWarnings("unused")
  @MockitoSpyBean
  private FilmRestMapper mapper;

  private static String filmPath(Integer id) {
    return FILMS_PATH + "/" + id;
  }

  @Test
  void findByIdReturnsOK() throws Exception {
    Integer filmId = 1;
    Film film = mock(Film.class);
    when(film.getId()).thenReturn(filmId);

    when(findByIdPortIn.findById(anyInt())).thenReturn(film);

    mockMvc
        .perform(get(FILM_BY_ID_TEMPLATE, filmId).accept(APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(content().contentType(APPLICATION_JSON))
        .andExpect(hasStandardApiResponseFields(filmPath(filmId), OK))
        .andExpect(jsonPath("$.data.id").value(filmId));
  }

  @Test
  void findByIdWithInvalidIdReturnsBAD_REQUEST() throws Exception {
    Integer invalidId = 0;
    HttpStatus status = BAD_REQUEST;
    mockMvc
        .perform(get(FILM_BY_ID_TEMPLATE, invalidId).accept(APPLICATION_JSON))
        .andExpect(hasStandardApiResponseFields(filmPath(invalidId), status))
        .andExpect(hasErrorFields(status));
  }

  @Test
  void findAllReturnsINTERNAL_SERVER_ERROR() throws Exception {
    HttpStatus status = INTERNAL_SERVER_ERROR;
    mockMvc
        .perform(get(FILMS_PATH).accept(APPLICATION_JSON))
        .andExpect(hasStandardApiResponseFields(FILMS_PATH, status))
        .andExpect(hasErrorFields(status));
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const FilmRestControllerTestKtCode = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/sakila/film/adapter/in/rest/FilmRestControllerTest.kt"
  >
    {`// highlight-added-start
package dev.pollito.spring_kotlin.sakila.film.adapter.\`in\`.rest

import com.ninjasquad.springmockk.MockkBean
import dev.pollito.spring_kotlin.config.advice.ControllerAdvice
import dev.pollito.spring_kotlin.sakila.film.domain.model.Film
import dev.pollito.spring_kotlin.sakila.film.domain.port.\`in\`.FindByIdPortIn
import dev.pollito.spring_kotlin.test.util.hasErrorFields
import dev.pollito.spring_kotlin.test.util.hasStandardApiResponseFields
import io.mockk.every
import io.mockk.mockk
import kotlin.test.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest
import org.springframework.context.annotation.Import
import org.springframework.http.HttpStatus.BAD_REQUEST
import org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR
import org.springframework.http.HttpStatus.OK
import org.springframework.http.MediaType.APPLICATION_JSON
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get

@ExtendWith(SpringExtension::class)
@WebMvcTest(FilmRestController::class)
@Import(ControllerAdvice::class, FilmRestMapperImpl::class)
class FilmRestControllerTest {
  companion object {
    private const val API_FILMS = "/api/films"
  }

  @MockkBean private lateinit var findByIdPortIn: FindByIdPortIn
  @Autowired private lateinit var mockMvc: MockMvc

  @Test
  fun \`findById returns OK\`() {
    val filmId = 1
    val film = mockk<Film>(relaxed = true)
    every { film.id } returns filmId
    every { findByIdPortIn.findById(filmId) } returns film

    mockMvc
        .get("$API_FILMS/$filmId") { accept = APPLICATION_JSON }
        .andExpect {
          status { isOk() }
          jsonPath("$.data.id") { value(filmId) }
          hasStandardApiResponseFields("$API_FILMS/$filmId", OK)
        }
  }

  @Test
  fun \`findById with invalid id returns BAD_REQUEST\`() {
    val invalidId = 0L

    mockMvc
        .get("$API_FILMS/$invalidId") { accept = APPLICATION_JSON }
        .andExpect {
          status { isBadRequest() }
          hasStandardApiResponseFields("$API_FILMS/$invalidId", BAD_REQUEST)
          hasErrorFields(BAD_REQUEST)
        }
  }

  @Test
  fun \`findAll returns INTERNAL_SERVER_ERROR\`() {
    mockMvc
        .get(API_FILMS) { accept = APPLICATION_JSON }
        .andExpect {
          status { isInternalServerError() }
          hasStandardApiResponseFields(API_FILMS, INTERNAL_SERVER_ERROR)
          hasErrorFields(INTERNAL_SERVER_ERROR)
        }
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const FilmRestControllerSpecGroovyCode = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/sakila/film/adapter/in/rest/FilmRestControllerSpec.groovy"
  >
    {`// highlight-added-start
package dev.pollito.spring_groovy.sakila.film.adapter.in.rest

import static org.springframework.http.HttpStatus.*
import static org.springframework.http.MediaType.APPLICATION_JSON
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

import dev.pollito.spring_groovy.config.advice.ControllerAdvice
import dev.pollito.spring_groovy.config.mapper.ModelMapperConfig
import dev.pollito.spring_groovy.sakila.film.domain.model.Film
import dev.pollito.spring_groovy.sakila.film.domain.port.in.FindByIdPortIn
import dev.pollito.spring_groovy.test.util.ApiResponseMatchers
import org.spockframework.spring.SpringBean
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest
import org.springframework.context.annotation.Import
import org.springframework.test.web.servlet.MockMvc
import spock.lang.Specification

@WebMvcTest(FilmRestController)
@Import([ControllerAdvice, FilmRestMapper, ModelMapperConfig])
class FilmRestControllerSpec extends Specification implements ApiResponseMatchers {

  private static final String FILMS_PATH = "/api/films"
  private static final String FILM_BY_ID_TEMPLATE = FILMS_PATH + "/{id}"

  @Autowired
  MockMvc mockMvc

  @SpringBean
  FindByIdPortIn findByIdPortIn = Mock()

  private static String filmPath(Integer id) {
    "\${FILMS_PATH}/\${id}"
  }

  def "findById returns OK"() {
    given: "a mocked domain model and primary port behavior"
    def filmId = 1
    def film = Stub(Film) {getId() >> filmId}
    findByIdPortIn.findById(filmId) >> film

    when: "findById is requested"
    def result = mockMvc.perform(
        get(FILM_BY_ID_TEMPLATE, filmId)
        .accept(APPLICATION_JSON)
        )

    then: "response is OK"
    result
        .andExpect(status().isOk())
        .andExpect(content().contentType(APPLICATION_JSON))
        .andExpect(hasStandardApiResponseFields(filmPath(filmId), OK))
        .andExpect(jsonPath('$.data.id').value(filmId))
  }

  def "findById with invalid id returns BAD_REQUEST"() {
    given: "an invalid film id"
    def invalidId = 0

    when: "findById is requested"
    def result = mockMvc.perform(
        get(FILM_BY_ID_TEMPLATE, invalidId)
        .accept(APPLICATION_JSON)
        )

    then: "response is BAD_REQUEST"
    result
        .andExpect(hasStandardApiResponseFields(filmPath(invalidId), BAD_REQUEST))
        .andExpect(hasErrorFields(BAD_REQUEST))
  }

  def "findAll returns INTERNAL_SERVER_ERROR"() {
    when: "findAll is requested"
    def result = mockMvc.perform(
        get(FILMS_PATH)
        .accept(APPLICATION_JSON)
        )

    then: "response is INTERNAL_SERVER_ERROR"
    result
        .andExpect(hasStandardApiResponseFields(FILMS_PATH, INTERNAL_SERVER_ERROR))
        .andExpect(hasErrorFields(INTERNAL_SERVER_ERROR))
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const FilmRestControllerTests = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <FilmRestControllerTestJavaCode />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <FilmRestControllerTestKtCode />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <FilmRestControllerSpecGroovyCode />
    </TabItem>
  </Tabs>
);

const TestErrorsLogJava = () => (
  <CollapsibleCodeBlock language="log" title="Terminal">
    {`JSON path "$.status"
Expected :400
Actual   :500
<Click to see difference>

java.lang.AssertionError: JSON path "$.status" expected:<400> but was:<500>
	at org.springframework.test.util.AssertionErrors.fail(AssertionErrors.java:62)
	at org.springframework.test.util.AssertionErrors.assertEquals(AssertionErrors.java:129)
	at org.springframework.test.util.JsonPathExpectationsHelper.assertValue(JsonPathExpectationsHelper.java:172)
	at org.springframework.test.web.servlet.result.JsonPathResultMatchers.lambda$value$2(JsonPathResultMatchers.java:111)
	at dev.pollito.spring_java.test.util.ApiResponseMatchers.lambda$hasStandardApiResponseFields$0(ApiResponseMatchers.java:19)
	at org.springframework.test.web.servlet.MockMvc$1.andExpect(MockMvc.java:212)
	at dev.pollito.spring_java.sakila.film.adapter.in.rest.FilmControllerTest.whenFindByIdWithInvalidId_thenReturnsBadRequest(FilmControllerTest.java:72)`}
  </CollapsibleCodeBlock>
);

const TestErrorLogKt = () => (
  <CollapsibleCodeBlock language="log" title="Application logs">
    {`Status
Expected :400
Actual   :500
<Click to see difference>

java.lang.AssertionError: Status expected:<400> but was:<500>
	at org.springframework.test.util.AssertionErrors.fail(AssertionErrors.java:62)
	at org.springframework.test.util.AssertionErrors.assertEquals(AssertionErrors.java:129)
	at org.springframework.test.web.servlet.result.StatusResultMatchers.lambda$matcher$0(StatusResultMatchers.java:600)
	at org.springframework.test.web.servlet.MockMvc$1.andExpect(MockMvc.java:212)
	at org.springframework.test.web.servlet.result.StatusResultMatchersDsl.isBadRequest(StatusResultMatchersDsl.kt:243)
	at dev.pollito.spring_kotlin.sakila.film.adapter.in.rest.FilmControllerTest.when_find_by_invalid_id_then_returns_bad_request$lambda$1$0(FilmControllerTest.kt:63)
	at org.springframework.test.web.servlet.MockMvcResultMatchersDsl.status(MockMvcResultMatchersDsl.kt:97)
	at dev.pollito.spring_kotlin.sakila.film.adapter.in.rest.FilmControllerTest.when_find_by_invalid_id_then_returns_bad_request$lambda$1(FilmControllerTest.kt:63)`}
  </CollapsibleCodeBlock>
);

const TestErrorLogGroovy = () => (
  <CollapsibleCodeBlock language="log" title="Terminal">
    {`Condition failed with Exception:

result .andExpect(hasStandardApiResponseFields(filmPath(invalidId), BAD_REQUEST)) .andExpect(hasErrorFields(BAD_REQUEST))
|       |         |                            |         |           |
|       |         |                            |         0           400 BAD_REQUEST
|       |         |                            /api/films/0
|       |         dev.pollito.spring_groovy.test.util.ApiResponseMatchers$Trait$Helper$_hasStandardApiResponseFields_closure1@11577ab8
|       java.lang.AssertionError: JSON path "$.status" expected:<400> but was:<500>
|       	at org.springframework.test.util.AssertionErrors.fail(AssertionErrors.java:62)
|       	at org.springframework.test.util.AssertionErrors.assertEquals(AssertionErrors.java:129)
|       	at org.springframework.test.util.JsonPathExpectationsHelper.assertValue(JsonPathExpectationsHelper.java:172)
|       	at org.springframework.test.web.servlet.result.JsonPathResultMatchers.lambda$value$2(JsonPathResultMatchers.java:111)
|       	at dev.pollito.spring_groovy.test.util.ApiResponseMatchers$Trait$Helper.hasStandardApiResponseFields_closure1(ApiResponseMatchers.groovy:13)
|       	at org.springframework.test.web.servlet.MockMvc$1.andExpect(MockMvc.java:212)
|       	at dev.pollito.spring_groovy.sakila.film.adapter.in.rest.FilmControllerSpec.when findById with invalid id then returns bad request(FilmControllerSpec.groovy:75)
<org.springframework.test.web.servlet.MockMvc$1@73fe7483 val$mvcResult=inaccessible this$0=inaccessible>`}
  </CollapsibleCodeBlock>
);

export const TestErrorLog = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <TestErrorsLogJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <TestErrorLogKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <TestErrorLogGroovy />
    </TabItem>
  </Tabs>
);

const ControllerAdviceJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/config/advice/ControllerAdvice.java"
  >
    {`package dev.pollito.spring_java.config.advice;

import static io.opentelemetry.api.trace.Span.current;
import static java.time.OffsetDateTime.now;
import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.ResponseEntity.status;

import dev.pollito.spring_java.generated.model.Error;
import jakarta.servlet.http.HttpServletRequest;
// highlight-added
import jakarta.validation.ConstraintViolationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@RestControllerAdvice
@RequiredArgsConstructor
@Slf4j
public class ControllerAdvice {
  private final HttpServletRequest request;

  private @NonNull ResponseEntity<Error> buildProblemDetail(
      @NonNull Exception e, @NonNull HttpStatus status) {
    String exceptionSimpleName = e.getClass().getSimpleName();
    String logMessage = "{} being handled";

    switch (status.series()) {
      case SERVER_ERROR -> log.error(logMessage, exceptionSimpleName, e);
      case CLIENT_ERROR -> log.warn(logMessage, exceptionSimpleName, e);
      default -> log.info(logMessage, exceptionSimpleName, e);
    }

    return status(status)
        .body(
            new Error()
                .detail(e.getLocalizedMessage())
                .instance(request.getRequestURI())
                .status(status.value())
                .timestamp(now())
                .title(status.getReasonPhrase())
                .trace(current().getSpanContext().getTraceId()));
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<Error> handle(Exception e) {
    return buildProblemDetail(e, INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(NoResourceFoundException.class)
  public ResponseEntity<Error> handle(NoResourceFoundException e) {
    return buildProblemDetail(e, NOT_FOUND);
  }

// highlight-added-start
  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<Error> handle(ConstraintViolationException e) {
    return buildProblemDetail(e, BAD_REQUEST);
  }
// highlight-added-end
}`}
  </CollapsibleCodeBlock>
);

const ControllerAdviceKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/config/advice/ControllerAdvice.kt"
  >
    {`package dev.pollito.spring_kotlin.config.advice

import dev.pollito.spring_kotlin.generated.model.Error
import io.github.oshai.kotlinlogging.KotlinLogging
import io.opentelemetry.api.trace.Span.current
import jakarta.servlet.http.HttpServletRequest
// highlight-added
import jakarta.validation.ConstraintViolationException
import java.time.OffsetDateTime.now
import org.springframework.http.HttpStatus
// highlight-added
import org.springframework.http.HttpStatus.BAD_REQUEST
import org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR
import org.springframework.http.HttpStatus.NOT_FOUND
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.status
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.resource.NoResourceFoundException

private val log = KotlinLogging.logger {}

@RestControllerAdvice
class ControllerAdvice(private val request: HttpServletRequest) {

  private fun buildProblemDetail(e: Exception, status: HttpStatus): ResponseEntity<Error> {
    val exceptionSimpleName = e.javaClass.simpleName
    val logMessage = "\$exceptionSimpleName being handled"

    when {
      status.is5xxServerError -> log.error(e) { logMessage }
      status.is4xxClientError -> log.warn(e) { logMessage }
      else -> log.info(e) { logMessage }
    }

    return status(status)
        .body(
            Error(
                detail = e.localizedMessage,
                instance = request.requestURI,
                timestamp = now(),
                title = status.reasonPhrase,
                trace = current().spanContext.traceId,
                status = status.value(),
            )
        )
  }

  @ExceptionHandler(Exception::class)
  fun handle(e: Exception): ResponseEntity<Error> {
    return buildProblemDetail(e, INTERNAL_SERVER_ERROR)
  }

  @ExceptionHandler(NoResourceFoundException::class)
  fun handle(e: NoResourceFoundException): ResponseEntity<Error> {
    return buildProblemDetail(e, NOT_FOUND)
  }

// highlight-added-start
  @ExceptionHandler(ConstraintViolationException::class)
  fun handle(e: ConstraintViolationException): ResponseEntity<Error> {
    return buildProblemDetail(e, BAD_REQUEST)
  }
// highlight-added-end
}`}
  </CollapsibleCodeBlock>
);

const ControllerAdviceGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/config/advice/ControllerAdvice.groovy"
  >
    {`package dev.pollito.spring_groovy.config.advice

import static java.time.OffsetDateTime.now
// highlight-added
import static org.springframework.http.HttpStatus.BAD_REQUEST
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.Series.CLIENT_ERROR
import static org.springframework.http.HttpStatus.Series.SERVER_ERROR

import dev.pollito.spring_groovy.generated.model.Error
import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import io.opentelemetry.api.trace.Span
import jakarta.servlet.http.HttpServletRequest
// highlight-added
import jakarta.validation.ConstraintViolationException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.resource.NoResourceFoundException

@RestControllerAdvice
@Slf4j
@CompileStatic
class ControllerAdvice {

  private final HttpServletRequest request

  ControllerAdvice(HttpServletRequest request) {
    this.request = request
  }

  private ResponseEntity<Error> buildProblemDetail(Exception e, HttpStatus status) {
    def exceptionSimpleName = e.class.simpleName
    def logMessage = "\${exceptionSimpleName} being handled"

    switch (status.series()) {
      case SERVER_ERROR:
        log.error(logMessage, e)
        break
      case CLIENT_ERROR:
        log.warn(logMessage, e)
        break
      default:
        log.info(logMessage, e)
        break
    }

    ResponseEntity.status(status)
        .body(
        new Error(
        detail: e.localizedMessage,
        instance: request.requestURI,
        timestamp: now(),
        title: status.reasonPhrase,
        trace: Span.current().spanContext.traceId,
        status: status.value(),
        )
        )
  }

  @ExceptionHandler(Exception.class)
  ResponseEntity<Error> handle(Exception e) {
    buildProblemDetail(e, INTERNAL_SERVER_ERROR)
  }

  @ExceptionHandler(NoResourceFoundException)
  ResponseEntity<Error> handle(NoResourceFoundException e) {
    buildProblemDetail(e, NOT_FOUND)
  }

// highlight-added-start
  @ExceptionHandler(ConstraintViolationException)
  ResponseEntity<Error> handle(ConstraintViolationException e) {
    buildProblemDetail(e, BAD_REQUEST)
  }
// highlight-added-end
}`}
  </CollapsibleCodeBlock>
);

export const ControllerAdvice = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <ControllerAdviceJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <ControllerAdviceKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <ControllerAdviceGroovy />
    </TabItem>
  </Tabs>
);

const ControllerAdviceTestJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/config/advice/ControllerAdviceTest.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.config.advice;

import static dev.pollito.spring_java.test.util.ApiResponseMatchers.hasErrorFields;
import static dev.pollito.spring_java.test.util.ApiResponseMatchers.hasStandardApiResponseFields;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpStatus.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import java.util.Set;
import java.util.stream.Stream;
import org.jspecify.annotations.NonNull;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.resource.NoResourceFoundException;

class ControllerAdviceTest {

  private MockMvc mockMvc;
  private final HttpServletRequest request = mock(HttpServletRequest.class);

  @RestController
  @RequestMapping("/fake")
  private static class FakeController {

    @GetMapping("/not-found")
    @SuppressWarnings("unused")
    public void throwNoResourceFoundException() throws NoResourceFoundException {
      throw new NoResourceFoundException(GET, "/fake", "no-resource-found");
    }

    @GetMapping("/error")
    @SuppressWarnings("unused")
    public void throwException() throws Exception {
      throw new Exception("Test exception");
    }

    @GetMapping("/bad-request")
    @SuppressWarnings("unused")
    public void throwConstraintViolationException() {
      throw new ConstraintViolationException("Constraint violation", Set.of());
    }
  }

  @BeforeEach
  void setUp() {
    mockMvc =
        standaloneSetup(new FakeController())
            .setControllerAdvice(new ControllerAdvice(request))
            .build();
  }

  static @NonNull Stream<Arguments> testCases() {
    return Stream.of(
        Arguments.of("/fake/not-found", NOT_FOUND),
        Arguments.of("/fake/error", INTERNAL_SERVER_ERROR),
        Arguments.of("/fake/bad-request", BAD_REQUEST));
  }

  @ParameterizedTest
  @MethodSource("testCases")
  void exceptionHandlingReturnsCorrectStatus(String path, @NonNull HttpStatus expectedStatus)
      throws Exception {
    when(request.getRequestURI()).thenReturn(path);
    mockMvc
        .perform(get(path))
        .andExpect(status().is(expectedStatus.value()))
        .andExpect(hasStandardApiResponseFields(path, expectedStatus))
        .andExpect(hasErrorFields(expectedStatus));
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const ControllerAdviceTestKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/config/advice/ControllerAdviceTest.kt"
  >
    {`// highlight-added-start
package dev.pollito.spring_kotlin.config.advice

import dev.pollito.spring_kotlin.test.util.hasErrorFields
import dev.pollito.spring_kotlin.test.util.hasStandardApiResponseFields
import io.mockk.every
import io.mockk.mockk
import jakarta.servlet.http.HttpServletRequest
import jakarta.validation.ConstraintViolationException
import java.util.stream.Stream
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.Arguments
import org.junit.jupiter.params.provider.MethodSource
import org.springframework.http.HttpMethod.GET
import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatus.*
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.servlet.resource.NoResourceFoundException

class ControllerAdviceTest {

  private lateinit var mockMvc: MockMvc
  private val request = mockk<HttpServletRequest>()

  @RestController
  @RequestMapping("/fake")
  class FakeController {

    @GetMapping("/not-found")
    fun throwNoResourceFoundException() {
      throw NoResourceFoundException(GET, "/fake/not-found", "no-resource-found")
    }

    @GetMapping("/error")
    fun throwException() {
      throw Exception("Test exception")
    }

    @GetMapping("/bad-request")
    fun throwConstraintViolationException() {
      throw ConstraintViolationException("Constraint violation", emptySet())
    }
  }

  companion object {
    @JvmStatic
    fun testCases(): Stream<Arguments> =
        Stream.of(
            Arguments.of("/fake/not-found", NOT_FOUND),
            Arguments.of("/fake/error", INTERNAL_SERVER_ERROR),
            Arguments.of("/fake/bad-request", BAD_REQUEST),
        )
  }

  @BeforeEach
  fun setUp() {
    mockMvc =
        standaloneSetup(FakeController()).setControllerAdvice(ControllerAdvice(request)).build()
  }

  @ParameterizedTest(name = "{1}")
  @MethodSource("testCases")
  fun \`exception handling returns correct status\`(expectedInstance: String, status: HttpStatus) {
    every { request.requestURI } returns expectedInstance

    mockMvc.get(expectedInstance).andExpect {
      status { isEqualTo(status.value()) }
      hasStandardApiResponseFields(expectedInstance, status)
      hasErrorFields(status)
    }
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const ControllerAdviceSpec = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/config/advice/ControllerAdviceSpec.groovy"
  >
    {`// highlight-added-start
package dev.pollito.spring_groovy.config.advice

import static org.springframework.http.HttpMethod.GET
import static org.springframework.http.HttpStatus.*
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup

import dev.pollito.spring_groovy.test.util.ApiResponseMatchers
import jakarta.servlet.http.HttpServletRequest
import jakarta.validation.ConstraintViolationException
import org.springframework.test.web.servlet.MockMvc
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.servlet.resource.NoResourceFoundException
import spock.lang.Specification
import spock.lang.Unroll

class ControllerAdviceSpec extends Specification implements ApiResponseMatchers {
  MockMvc mockMvc
  HttpServletRequest request = Mock()

  @RestController
  @RequestMapping("/fake")
  static class FakeController {

    @GetMapping("/not-found")
    @SuppressWarnings("unused")
    static void throwNoResourceFoundException() throws NoResourceFoundException {
      throw new NoResourceFoundException(GET, "/fake", "no-resource-found")
    }

    @GetMapping("/error")
    @SuppressWarnings("unused")
    static void throwException() throws Exception {
      throw new Exception("Test exception")
    }

    @GetMapping("/bad-request")
    @SuppressWarnings("unused")
    static void throwConstraintViolationException() {
      throw new ConstraintViolationException("Constraint violation", Set.of())
    }
  }

  def setup() {
    mockMvc = standaloneSetup(new FakeController())
        .setControllerAdvice(new ControllerAdvice(request))
        .build()
  }

  @Unroll
  def "#exceptionType returns #httpStatus"() {
    given:
    request.getRequestURI() >> endpoint

    expect:
    mockMvc.perform(get(endpoint))
        .andExpect(status().is(httpStatus.value()))
        .andExpect(hasStandardApiResponseFields(endpoint, httpStatus))
        .andExpect(hasErrorFields(httpStatus))

    where:
    endpoint            | httpStatus            || exceptionType
    "/fake/not-found"   | NOT_FOUND             || "NoResourceFoundException"
    "/fake/error"       | INTERNAL_SERVER_ERROR || "Exception"
    "/fake/bad-request" | BAD_REQUEST           || "ConstraintViolationException"
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const ControllerAdviceTests = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <ControllerAdviceTestJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <ControllerAdviceTestKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <ControllerAdviceSpec />
    </TabItem>
  </Tabs>
);

const LoggingIntegrationTestJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/config/log/LoggingIntegrationTest.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.config.log;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import dev.pollito.spring_java.sakila.film.domain.model.Film;
import dev.pollito.spring_java.sakila.film.domain.port.in.FindByIdPortIn;
import org.jspecify.annotations.NonNull;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.system.CapturedOutput;
import org.springframework.boot.test.system.OutputCaptureExtension;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(OutputCaptureExtension.class)
class LoggingIntegrationTest {

  private static final String FILM_BY_ID_PATH = "/api/films/{id}";

  @SuppressWarnings("unused")
  @Autowired
  private MockMvc mockMvc;

  @SuppressWarnings("unused")
  @MockitoBean
  private FindByIdPortIn findByIdPortIn;

  @Test
  void whenRequestThenAllLoggingComponentsWorkTogether(@NonNull CapturedOutput output)
      throws Exception {
    Integer filmId = 1;
    Film film = mock(Film.class);
    when(film.getId()).thenReturn(filmId);
    when(findByIdPortIn.findById(filmId)).thenReturn(film);

    mockMvc
        .perform(
            get(FILM_BY_ID_PATH, filmId)
                .accept(APPLICATION_JSON)
                .header("Authorization", "Bearer secret-token")
                .header("X-Api-Key", "my-secret-key"))
        .andExpect(status().isOk());

    String logOutput = output.getOut();

    assertLogFilterOutput(logOutput);
    assertLogAspectOutput(logOutput);
    assertMaskingPatternLayoutOutput(logOutput);
    assertTraceIdFilterOutput(logOutput);
  }

  private void assertLogFilterOutput(@NonNull String logOutput) {
    assert logOutput.contains(">>>> Method: GET; URI: /api/films/1")
        : "LogFilter should log request details";
    assert logOutput.contains("<<<< Response Status: 200") : "LogFilter should log response status";
  }

  private void assertLogAspectOutput(@NonNull String logOutput) {
    assert logOutput.contains("findById(..)] Args:") : "LogAspect should log method args";
    assert logOutput.contains("findById(..)] Response:") : "LogAspect should log response";
  }

  private void assertMaskingPatternLayoutOutput(@NonNull String logOutput) {
    assert !logOutput.contains("secret-token")
        : "MaskingPatternLayout should mask Authorization value";
    assert !logOutput.contains("my-secret-key")
        : "MaskingPatternLayout should mask X-Api-Key value";
    assert logOutput.contains("Authorization: ****")
        : "MaskingPatternLayout should show masked Authorization";
    assert logOutput.contains("X-Api-Key: ****")
        : "MaskingPatternLayout should show masked X-Api-Key";
  }

  private void assertTraceIdFilterOutput(@NonNull String logOutput) {
    assert logOutput.contains("trace_id=") : "TraceIdFilter should add trace_id to MDC";
    assert logOutput.contains("span_id=") : "TraceIdFilter should add span_id to MDC";
    assert logOutput.contains("trace_flags=") : "TraceIdFilter should add trace_flags to MDC";
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const LoggingIntegrationTestKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/config/log/LoggingIntegrationTest.kt"
  >
    {`// highlight-added-start
package dev.pollito.spring_kotlin.config.log

import com.ninjasquad.springmockk.MockkBean
import dev.pollito.spring_kotlin.sakila.film.domain.model.Film
import dev.pollito.spring_kotlin.sakila.film.domain.port.\`in\`.FindByIdPortIn
import io.mockk.every
import io.mockk.mockk
import kotlin.test.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.system.CapturedOutput
import org.springframework.boot.test.system.OutputCaptureExtension
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc
import org.springframework.http.MediaType.APPLICATION_JSON
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(OutputCaptureExtension::class)
class LoggingIntegrationTest {

  companion object {
    private const val FILM_BY_ID_PATH = "/api/films/{id}"
  }

  @Autowired private lateinit var mockMvc: MockMvc
  @MockkBean private lateinit var findByIdPortIn: FindByIdPortIn

  @Test
  fun \`when request then all logging components work together\`(output: CapturedOutput) {
    val filmId = 1
    val film = mockk<Film>(relaxed = true)
    every { film.id } returns filmId
    every { findByIdPortIn.findById(filmId) } returns film

    mockMvc
        .get(FILM_BY_ID_PATH, filmId) {
          accept(APPLICATION_JSON)
          header("Authorization", "Bearer secret-token")
          header("X-Api-Key", "my-secret-key")
        }
        .andExpect { status { isOk() } }

    val logOutput = output.out

    assertLogFilterOutput(logOutput)
    assertLogAspectOutput(logOutput)
    assertMaskingPatternLayoutOutput(logOutput)
    assertTraceIdFilterOutput(logOutput)
  }

  private fun assertLogFilterOutput(logOutput: String) {
    assert(logOutput.contains(">>>> Method: GET; URI: /api/films/1")) {
      "LogFilter should log request details"
    }
    assert(logOutput.contains("<<<< Response Status: 200")) {
      "LogFilter should log response status"
    }
  }

  private fun assertLogAspectOutput(logOutput: String) {
    assert(logOutput.contains("findById(..)] Args:")) { "LogAspect should log method args" }
    assert(logOutput.contains("findById(..)] Response:")) { "LogAspect should log response" }
  }

  private fun assertMaskingPatternLayoutOutput(logOutput: String) {
    assert(!logOutput.contains("secret-token")) {
      "MaskingPatternLayout should mask Authorization value"
    }
    assert(!logOutput.contains("my-secret-key")) {
      "MaskingPatternLayout should mask X-Api-Key value"
    }
    assert(logOutput.contains("Authorization: ****")) {
      "MaskingPatternLayout should show masked Authorization"
    }
    assert(logOutput.contains("X-Api-Key: ****")) {
      "MaskingPatternLayout should show masked X-Api-Key"
    }
  }

  private fun assertTraceIdFilterOutput(logOutput: String) {
    assert(logOutput.contains("trace_id=")) { "TraceIdFilter should add trace_id to MDC" }
    assert(logOutput.contains("span_id=")) { "TraceIdFilter should add span_id to MDC" }
    assert(logOutput.contains("trace_flags=")) { "TraceIdFilter should add trace_flags to MDC" }
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const LoggingIntegrationSpec = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/config/log/LoggingIntegrationSpec.groovy"
  >
    {`// highlight-added-start
package dev.pollito.spring_groovy.config.log

import static org.springframework.http.MediaType.APPLICATION_JSON
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

import dev.pollito.spring_groovy.sakila.film.domain.model.Film
import dev.pollito.spring_groovy.sakila.film.domain.port.in.FindByIdPortIn
import org.spockframework.spring.SpringBean
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc
import org.springframework.test.web.servlet.MockMvc
import spock.lang.Specification

@SpringBootTest
@AutoConfigureMockMvc
class LoggingIntegrationSpec extends Specification {

  static final String FILM_BY_ID_PATH = "/api/films/{id}"

  @Autowired
  MockMvc mockMvc

  @SpringBean
  FindByIdPortIn findByIdPortIn = Stub()

  ByteArrayOutputStream outputCapture
  PrintStream originalOut
  PrintStream originalErr

  def setup() {
    outputCapture = new ByteArrayOutputStream()
    originalOut = System.out
    originalErr = System.err
    def printStream = new PrintStream(outputCapture)
    System.setOut(printStream)
    System.setErr(printStream)
  }

  def cleanup() {
    System.setOut(originalOut)
    System.setErr(originalErr)
  }

  def "when request then all logging components work together"() {
    given:
    def filmId = 1
    def film = Stub(Film) {getId() >> filmId}
    findByIdPortIn.findById(filmId) >> film

    when:
    mockMvc.perform(
        get(FILM_BY_ID_PATH, filmId)
        .accept(APPLICATION_JSON)
        .header("Authorization", "Bearer secret-token")
        .header("X-Api-Key", "my-secret-key"))
        .andExpect(status().isOk())

    then: "LogFilter logs request and response details"
    def logOutput = outputCapture.toString()
    logOutput.contains(">>>> Method: GET; URI: /api/films/1")
    logOutput.contains("<<<< Response Status: 200")

    and: "LogAspect logs method args and response"
    logOutput.contains("findById(..)] Args:")
    logOutput.contains("findById(..)] Response:")

    and: "MaskingPatternLayout masks sensitive headers"
    !logOutput.contains("secret-token")
    !logOutput.contains("my-secret-key")
    logOutput.contains("Authorization: ****")
    logOutput.contains("X-Api-Key: ****")

    and: "TraceIdFilter adds trace information to MDC"
    logOutput.contains("trace_id=")
    logOutput.contains("span_id=")
    logOutput.contains("trace_flags=")
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const LoggingIntegrationTests = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <LoggingIntegrationTestJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <LoggingIntegrationTestKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <LoggingIntegrationSpec />
    </TabItem>
  </Tabs>
);

export const JacocoReportJava = () => (
  <JacocoCoverageTable
    data={[
      {
        name: 'dev.pollito.spring_java.config.advice',
        instructionCoverage: 93,
        branchCoverage: 66,
        missedComplexity: 1,
        totalComplexity: 7,
        missedLines: 1,
        totalLines: 18,
        missedMethods: 0,
        totalMethods: 5,
        missedClasses: 0,
        totalClasses: 1,
      },
      {
        name: 'dev.pollito.spring_java.config.log',
        instructionCoverage: 93,
        branchCoverage: 52,
        missedComplexity: 9,
        totalComplexity: 31,
        missedLines: 4,
        totalLines: 62,
        missedMethods: 1,
        totalMethods: 22,
        missedClasses: 0,
        totalClasses: 4,
      },
      {
        name: 'dev.pollito.spring_java.sakila.film.adapter.in.rest',
        instructionCoverage: 100,
        branchCoverage: undefined,
        missedComplexity: 0,
        totalComplexity: 2,
        missedLines: 0,
        totalLines: 7,
        missedMethods: 0,
        totalMethods: 2,
        missedClasses: 0,
        totalClasses: 1,
      },
      {
        name: 'dev.pollito.spring_java.sakila.film.domain.port.in',
        instructionCoverage: 100,
        branchCoverage: undefined,
        missedComplexity: 0,
        totalComplexity: 2,
        missedLines: 0,
        totalLines: 10,
        missedMethods: 0,
        totalMethods: 2,
        missedClasses: 0,
        totalClasses: 1,
      },
      {
        name: 'Total',
        instructionCoverage: 94,
        branchCoverage: 55,
        missedComplexity: 10,
        totalComplexity: 42,
        missedLines: 5,
        totalLines: 97,
        missedMethods: 1,
        totalMethods: 31,
        missedClasses: 0,
        totalClasses: 7,
        isTotal: true,
      },
    ]}
  />
);

export const JacocoReportKt = () => (
  <JacocoCoverageTable
    data={[
      {
        name: 'dev.pollito.spring_kotlin.config.advice',
        instructionCoverage: 91,
        branchCoverage: 75,
        missedComplexity: 3,
        totalComplexity: 12,
        missedLines: 1,
        totalLines: 21,
        missedMethods: 2,
        totalMethods: 10,
        missedClasses: 0,
        totalClasses: 2,
      },
      {
        name: 'dev.pollito.spring_kotlin.config.log',
        instructionCoverage: 93,
        branchCoverage: 57,
        missedComplexity: 15,
        totalComplexity: 38,
        missedLines: 3,
        totalLines: 56,
        missedMethods: 3,
        totalMethods: 24,
        missedClasses: 0,
        totalClasses: 6,
      },
      {
        name: 'dev.pollito.spring_kotlin.sakila.film.adapter.in.rest',
        instructionCoverage: 100,
        branchCoverage: undefined,
        missedComplexity: 0,
        totalComplexity: 3,
        missedLines: 0,
        totalLines: 13,
        missedMethods: 0,
        totalMethods: 3,
        missedClasses: 0,
        totalClasses: 1,
      },
      {
        name: 'dev.pollito.spring_kotlin.sakila.film.domain.port.in',
        instructionCoverage: 100,
        branchCoverage: undefined,
        missedComplexity: 0,
        totalComplexity: 2,
        missedLines: 0,
        totalLines: 9,
        missedMethods: 0,
        totalMethods: 2,
        missedClasses: 0,
        totalClasses: 1,
      },
      {
        name: 'Total',
        instructionCoverage: 93,
        branchCoverage: 59,
        missedComplexity: 18,
        totalComplexity: 55,
        missedLines: 4,
        totalLines: 99,
        missedMethods: 5,
        totalMethods: 39,
        missedClasses: 0,
        totalClasses: 10,
        isTotal: true,
      },
    ]}
  />
);

export const JacocoReportGroovy = () => (
  <JacocoCoverageTable
    data={[
      {
        name: 'dev.polito.spring_groovy.config.advice',
        instructionCoverage: 94,
        branchCoverage: 75,
        missedComplexity: 1,
        totalComplexity: 8,
        missedLines: 2,
        totalLines: 24,
        missedMethods: 0,
        totalMethods: 6,
        missedClasses: 0,
        totalClasses: 1,
      },
      {
        name: 'dev.polito.spring_groovy.config.log',
        instructionCoverage: 93,
        branchCoverage: 58,
        missedComplexity: 15,
        totalComplexity: 30,
        missedLines: 4,
        totalLines: 47,
        missedMethods: 1,
        totalMethods: 13,
        missedClasses: 0,
        totalClasses: 4,
      },
      {
        name: 'dev.polito.spring_groovy.sakila.film.adapter.in.rest',
        instructionCoverage: 100,
        branchCoverage: undefined,
        missedComplexity: 0,
        totalComplexity: 5,
        missedLines: 0,
        totalLines: 16,
        missedMethods: 0,
        totalMethods: 5,
        missedClasses: 0,
        totalClasses: 2,
      },
      {
        name: 'dev.polito.spring_groovy.sakila.film.domain.port.in',
        instructionCoverage: 100,
        branchCoverage: undefined,
        missedComplexity: 0,
        totalComplexity: 1,
        missedLines: 0,
        totalLines: 8,
        missedMethods: 0,
        totalMethods: 1,
        missedClasses: 0,
        totalClasses: 1,
      },
      {
        name: 'Total',
        instructionCoverage: 95,
        branchCoverage: 60,
        missedComplexity: 19,
        totalComplexity: 47,
        missedLines: 6,
        totalLines: 96,
        missedMethods: 1,
        totalMethods: 25,
        missedClasses: 0,
        totalClasses: 8,
        isTotal: true,
      },
    ]}
  />
);
