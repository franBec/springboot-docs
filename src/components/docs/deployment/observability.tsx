import { CollapsibleCodeBlock } from '@site/src/components/collapsible-code-block';
import ZoomContainer from '@site/src/components/zoom-container';
import Mermaid from '@theme/Mermaid';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

const BuildGradleJava = () => (
  <CollapsibleCodeBlock language="groovy" title="build.gradle">
    {`plugins {
  id 'java'
  id 'org.springframework.boot' version '4.0.1'
  id 'io.spring.dependency-management' version '1.1.7'
  id 'com.diffplug.spotless' version '8.1.0'
  id 'org.openapi.generator' version '7.17.0'
  id 'jacoco'
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

// highlight-added
  implementation 'io.micrometer:micrometer-registry-prometheus:1.17.0-M2'
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
}`}
  </CollapsibleCodeBlock>
);

const BuildGradleKts = () => (
  <CollapsibleCodeBlock language="kotlin" title="build.gradle.kts">
    {`plugins {
  kotlin("jvm") version "2.2.21"
  kotlin("plugin.spring") version "2.2.21"
  id("org.springframework.boot") version "4.0.1"
  id("io.spring.dependency-management") version "1.1.7"
  id("com.diffplug.spotless") version "8.1.0"
  kotlin("kapt") version "2.3.0"
  id("org.openapi.generator") version "7.17.0"
  jacoco
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

// highlight-added
  implementation("io.micrometer:micrometer-registry-prometheus:1.17.0-M2")
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
}`}
  </CollapsibleCodeBlock>
);

const BuildGradleGroovy = () => (
  <CollapsibleCodeBlock language="groovy" title="build.gradle">
    {`plugins {
  id 'groovy'
  id 'org.springframework.boot' version '4.0.1'
  id 'io.spring.dependency-management' version '1.1.7'
  id 'com.diffplug.spotless' version '8.1.0'
  id 'org.openapi.generator' version '7.17.0'
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

  testImplementation 'org.spockframework:spock-core:2.4-groovy-5.0'
  testImplementation 'org.spockframework:spock-spring:2.4-groovy-5.0'

// highlight-added
  implementation 'io.micrometer:micrometer-registry-prometheus:1.17.0-M2'
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
`}
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
      <BuildGradleGroovy />
    </TabItem>
  </Tabs>
);

const ApplicationYamlJava = () => (
  <CollapsibleCodeBlock language="yaml" title="resources/application.yaml">
    {`spring:
  application:
    name: spring_java
// highlight-added-start
management:
  endpoints:
    web:
      exposure:
        include: health,info,prometheus,metrics
  endpoint:
    health:
      show-details: always
    metrics:
      enabled: true
    prometheus:
      enabled: true
  prometheus:
    metrics:
      export:
        enabled: true
  metrics:
    distribution:
      percentiles-histogram:
        http:
          server:
            requests: true
    tags:
      application: \${spring.application.name}
  tracing:
    sampling:
      probability: 1.0
  otlp:
    tracing:
      endpoint: http://tempo:4318/v1/traces
    metrics:
      export:
        enabled: false

logging:
  pattern:
    level: "trace_id=%mdc{traceId} span_id=%mdc{spanId} trace_flags=%mdc{traceFlags} %p"
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const ApplicationYamlKt = () => (
  <CollapsibleCodeBlock language="yaml" title="resources/application.yaml">
    {`spring:
  application:
    name: spring_kotlin
// highlight-added-start
management:
  endpoints:
    web:
      exposure:
        include: health,info,prometheus,metrics
  endpoint:
    health:
      show-details: always
    metrics:
      enabled: true
    prometheus:
      enabled: true
  prometheus:
    metrics:
      export:
        enabled: true
  metrics:
    distribution:
      percentiles-histogram:
        http:
          server:
            requests: true
    tags:
      application: \${spring.application.name}
  tracing:
    sampling:
      probability: 1.0
  otlp:
    tracing:
      endpoint: http://tempo:4318/v1/traces
    metrics:
      export:
        enabled: false

logging:
  pattern:
    level: "trace_id=%mdc{traceId} span_id=%mdc{spanId} trace_flags=%mdc{traceFlags} %p"
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const ApplicationYamlGroovy = () => (
  <CollapsibleCodeBlock language="yaml" title="resources/application.yaml">
    {`spring:
  application:
    name: spring_groovy
// highlight-added-start
management:
  endpoints:
    web:
      exposure:
        include: health,info,prometheus,metrics
  endpoint:
    health:
      show-details: always
    metrics:
      enabled: true
    prometheus:
      enabled: true
  prometheus:
    metrics:
      export:
        enabled: true
  metrics:
    distribution:
      percentiles-histogram:
        http:
          server:
            requests: true
    tags:
      application: \${spring.application.name}
  tracing:
    sampling:
      probability: 1.0
  otlp:
    tracing:
      endpoint: http://tempo:4318/v1/traces
    metrics:
      export:
        enabled: false

logging:
  pattern:
    level: "trace_id=%mdc{traceId} span_id=%mdc{spanId} trace_flags=%mdc{traceFlags} %p"
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const ApplicationYaml = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <ApplicationYamlJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <ApplicationYamlKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <ApplicationYamlGroovy />
    </TabItem>
  </Tabs>
);

export const DockerComposeObservability = () => (
  <CollapsibleCodeBlock language="yaml" title="docker-compose.yml">
    {`services:
  spring-java:
    build:
      context: .
      dockerfile: spring_java/Dockerfile
    container_name: spring-java
    ports:
      - "8081:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    restart: unless-stopped
// highlight-added-start
    depends_on:
      - tempo
    networks:
      - monitoring
// highlight-added-end

  spring-kotlin:
    build:
      context: .
      dockerfile: spring_kotlin/Dockerfile
    container_name: spring-kotlin
    ports:
      - "8082:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    restart: unless-stopped
// highlight-added-start
    depends_on:
      - tempo
    networks:
      - monitoring
// highlight-added-end

  spring-groovy:
    build:
      context: .
      dockerfile: spring_groovy/Dockerfile
    container_name: spring-groovy
    ports:
      - "8083:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    restart: unless-stopped
// highlight-added-start
    depends_on:
      - tempo
    networks:
      - monitoring

  prometheus:
    build:
      context: .
      dockerfile: observability/prometheus.Dockerfile
    container_name: prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--storage.tsdb.retention.time=15d'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--web.enable-lifecycle'
    volumes:
      - prometheus-data:/prometheus
    ports:
      - "9090:9090"
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:9090/-/healthy"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    networks:
      - monitoring

  loki:
    build:
      context: .
      dockerfile: observability/loki.Dockerfile
    container_name: loki
    ports:
      - "3100:3100"
    volumes:
      - loki-data:/loki
    command: -config.file=/etc/loki/local-config.yaml
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:3100/ready"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    networks:
      - monitoring

  promtail:
    build:
      context: .
      dockerfile: observability/promtail.Dockerfile
    container_name: promtail
    volumes:
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - /var/run/docker.sock:/var/run/docker.sock
    command: -config.file=/etc/promtail/config.yml
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:9080/ready"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    depends_on:
      - loki
    networks:
      - monitoring

  tempo:
    build:
      context: .
      dockerfile: observability/tempo.Dockerfile
    container_name: tempo
    ports:
      - "3200:3200"
      - "4317:4317"
      - "4318:4318"
    volumes:
      - tempo-data:/tmp/tempo
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:3200/ready"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    networks:
      - monitoring

  grafana:
    build:
      context: .
      dockerfile: observability/grafana.Dockerfile
    container_name: grafana
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=admin
      - GF_USERS_ALLOW_SIGN_UP=false
    ports:
      - "3000:3000"
    volumes:
      - grafana-data:/var/lib/grafana
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    depends_on:
      - prometheus
      - loki
      - tempo
    networks:
      - monitoring

networks:
  monitoring:
    driver: bridge

volumes:
  prometheus-data:
    driver: local
  loki-data:
    driver: local
  grafana-data:
    driver: local
  tempo-data:
    driver: local
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const LokiDockerfile = () => (
  <CollapsibleCodeBlock
    language="dockerfile"
    title="observability/loki.Dockerfile"
  >
    {`// highlight-added-start
FROM alpine:latest AS builder

RUN mkdir -p /loki/chunks /loki/rules

FROM grafana/loki:3.5.10

COPY --from=builder --chown=10001:10001 /loki /loki
COPY observability/loki-config.yml /etc/loki/local-config.yaml

USER 10001
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const LokiConfig = () => (
  <CollapsibleCodeBlock language="yaml" title="observability/loki-config.yml">
    {`// highlight-added-start
auth_enabled: false

server:
  http_listen_port: 3100
  grpc_listen_port: 9096

common:
  instance_addr: 127.0.0.1
  path_prefix: /loki
  storage:
    filesystem:
      chunks_directory: /loki/chunks
      rules_directory: /loki/rules
  replication_factor: 1
  ring:
    kvstore:
      store: inmemory

query_range:
  results_cache:
    cache:
      embedded_cache:
        enabled: true
        max_size_mb: 100

schema_config:
  configs:
    - from: 2020-10-24
      store: tsdb
      object_store: filesystem
      schema: v13
      index:
        prefix: index_
        period: 24h

ruler:
  alertmanager_url: http://localhost:9093

compactor:
  working_directory: /loki/compactor
  compaction_interval: 10m
  retention_enabled: true
  retention_delete_delay: 2h
  retention_delete_worker_count: 150
  delete_request_store: filesystem

limits_config:
  retention_period: 360h # 15 days, matches Prometheus and Tempo

# By default, Loki will send anonymous usage data to Grafana.
# This can be disabled by setting this to false
analytics:
  reporting_enabled: false
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const PromtailDockerfile = () => (
  <CollapsibleCodeBlock
    language="dockerfile"
    title="observability/promtail.Dockerfile"
  >
    {`// highlight-added-start
FROM grafana/promtail:3.5.10
COPY observability/promtail-config.yml /etc/promtail/config.yml
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const PromtailConfig = () => (
  <CollapsibleCodeBlock
    language="yaml"
    title="observability/promtail-config.yml"
  >
    {`// highlight-added-start
server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  - job_name: containers
    docker_sd_configs:
      - host: unix:///var/run/docker.sock
        refresh_interval: 5s
    relabel_configs:
      - source_labels: ['__meta_docker_container_label_com_docker_compose_service']
        target_label: compose_service
      - source_labels: ['compose_service']
        regex: 'spring-.*'
        action: keep
      - source_labels: ['compose_service']
        regex: 'spring-(.*)'
        target_label: compose_service
        replacement: 'spring_\${1}'
    pipeline_stages:
      - regex:
          expression: 'trace_id=\\S+ span_id=\\S+ trace_flags=\\S+ (?P<type>\\w+) \\S+ ---'
      - labels:
          type:
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const TempoDockerfile = () => (
  <CollapsibleCodeBlock
    language="dockerfile"
    title="observability/tempo.Dockerfile"
  >
    {`// highlight-added-start
FROM alpine:latest AS builder

RUN mkdir -p /tmp/tempo/blocks /tmp/tempo/wal /tmp/tempo/generator/wal && \\
    chown -R 10001:10001 /tmp/tempo

FROM grafana/tempo:2.10.0

COPY --from=builder --chown=10001:10001 /tmp/tempo /tmp/tempo
COPY observability/tempo.yml /etc/tempo/tempo.yml

CMD ["-config.file=/etc/tempo/tempo.yml"]
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const TempoConfig = () => (
  <CollapsibleCodeBlock language="yaml" title="observability/tempo.yml">
    {`// highlight-added-start
auth_enabled: false

server:
  http_listen_port: 3200

distributor:
  receivers:
    otlp:
      protocols:
        grpc:
          endpoint: "0.0.0.0:4317"
        http:
          endpoint: "0.0.0.0:4318"

ingester:
  max_block_duration: 5m
  trace_idle_period: 10s
  max_block_bytes: 1_000_000

storage:
  trace:
    backend: local
    wal:
      path: /tmp/tempo/wal
    local:
      path: /tmp/tempo/blocks

query_frontend:
  search:
    duration_slo: 5s
    throughput_bytes_slo: 1.073741824e+09

metrics_generator:
  registry:
    external_labels:
      source: tempo
  storage:
    path: /tmp/tempo/generator/wal

overrides:
  defaults:
    metrics_generator:
      processors: [service-graphs, span-metrics]

usage_report:
  reporting_enabled: false
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const PrometheusDockerfile = () => (
  <CollapsibleCodeBlock
    language="dockerfile"
    title="observability/prometheus.Dockerfile"
  >
    {`// highlight-added-start
FROM prom/prometheus:v3.9.1
COPY observability/prometheus.yml /etc/prometheus/prometheus.yml
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const PrometheusConfig = () => (
  <CollapsibleCodeBlock language="yaml" title="observability/prometheus.yml">
    {`// highlight-added-start
global:
  scrape_interval: 60s
  evaluation_interval: 60s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['prometheus:9090']

  - job_name: 'spring-java'
    static_configs:
      - targets: ['spring-java:8080']
    metrics_path: '/actuator/prometheus'

  - job_name: 'spring-kotlin'
    static_configs:
      - targets: ['spring-kotlin:8080']
    metrics_path: '/actuator/prometheus'

  - job_name: 'spring-groovy'
    static_configs:
      - targets: ['spring-groovy:8080']
    metrics_path: '/actuator/prometheus'
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const GrafanaDockerfile = () => (
  <CollapsibleCodeBlock
    language="dockerfile"
    title="observability/grafana.Dockerfile"
  >
    {`// highlight-added-start
FROM grafana/grafana:11.6.11
COPY observability/grafana/datasources /etc/grafana/provisioning/datasources
COPY observability/grafana/dashboards/dashboards.yml /etc/grafana/provisioning/dashboards/dashboards.yml
COPY observability/grafana/dashboards/*.json /var/lib/grafana/dashboards/
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const GrafanaDatasources = () => (
  <CollapsibleCodeBlock
    language="yaml"
    title="observability/grafana/datasources/datasources.yml"
  >
    {`// highlight-added-start
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    uid: prometheus
    isDefault: true
    editable: false
    jsonData:
      httpMethod: POST
      manageAlerts: true
      exemplarTraceIdDestinations:
        - datasourceUid: tempo
          name: TraceID
          urlDisplayLabel: "View Trace"

  - name: Loki
    type: loki
    access: proxy
    url: http://loki:3100
    uid: loki
    editable: false
    jsonData:
      derivedFields:
        - name: TraceID
          matcherRegex: "trace_id=(\\w+)"
          url: "\$\${__value.raw}"
          datasourceUid: tempo
          urlDisplayLabel: "View Trace"

  - name: Tempo
    type: tempo
    access: proxy
    url: http://tempo:3200
    uid: tempo
    editable: false
    jsonData:
      nodeGraph:
        enabled: true
      tracesToLogs:
        datasourceUid: loki
        filterByTraceID: true
        filterBySpanID: false
        tags:
          - service.name
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const GrafanaDashboards = () => (
  <CollapsibleCodeBlock
    language="yaml"
    title="observability/grafana/dashboards/dashboards.yml"
  >
    {`// highlight-added-start
apiVersion: 1

providers:
  - name: 'default'
    orgId: 1
    folder: ''
    type: file
    disableDeletion: false
    updateIntervalSeconds: 10
    allowUiUpdates: false
    options:
      path: /var/lib/grafana/dashboards
      foldersFromFilesStructure: false
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const ArchitectureFlowchart = () => (
  <ZoomContainer height="400px">
    <Mermaid
      value={`flowchart LR
    subgraph SpringApps["Spring Boot Applications"]
        Java["spring-java"]
        Kotlin["spring-kotlin"]
        Groovy["spring-groovy"]
    end

    subgraph DataCollection["Data Collection"]
        Micrometer["Micrometer<br/>(Metrics)"]
        OTLP["OTLP Exporter<br/>(Traces)"]
        Promtail["Promtail<br/>(Logs)"]
    end

    subgraph TelemetryBackends["Telemetry Backends"]
        Prometheus["Prometheus<br/>(Metrics)"]
        Tempo["Tempo<br/>(Traces)"]
        Loki["Loki<br/>(Logs)"]
    end

    subgraph Visualization["Visualization"]
        Grafana["Grafana Dashboards"]
    end

    Java --> Micrometer
    Kotlin --> Micrometer
    Groovy --> Micrometer

    Java --> OTLP
    Kotlin --> OTLP
    Groovy --> OTLP

    Java -.->|Docker Logs| Promtail
    Kotlin -.->|Docker Logs| Promtail
    Groovy -.->|Docker Logs| Promtail

    Micrometer --> Prometheus
    OTLP --> Tempo
    Promtail --> Loki

    Prometheus --> Grafana
    Tempo --> Grafana
    Loki --> Grafana

    style SpringApps fill:#e8f4f8,stroke:#666,stroke-width:2px,color:#333
    style DataCollection fill:#f0f0f0,stroke:#666,stroke-width:2px,color:#333
    style TelemetryBackends fill:#e8f8e8,stroke:#666,stroke-width:2px,color:#333
    style Visualization fill:#fff4e6,stroke:#666,stroke-width:2px,color:#333`}
    />
  </ZoomContainer>
);
