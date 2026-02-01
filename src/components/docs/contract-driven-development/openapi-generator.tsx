import { CollapsibleCodeBlock } from '@site/src/components/collapsible-code-block';
import { FileTreeInfo } from '@site/src/components/file-tree-info';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

const FileTreeJava = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`
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
    │   │               │   ├── advice
// highlight-modified
    │   │               │   │   └── ControllerAdvice.java
    │   │               │   └── ...
    │   │               ├── sakila
    │   │               │   └── film
    │   │               │       ├── adapter
    │   │               │       │   └── in
    │   │               │       │       └── rest
    │   │               │       │           ├── dto
// highlight-removed
    │   │               │       │           │   └── FilmResponse.java
// highlight-modified-start
    │   │               │       │           ├── FilmMapper.java
    │   │               │       │           └── FilmRestController.java
// highlight-modified-end
    │   │               │       └── ...
    │   │               └── ...
    │   └── ...
    └── ...`}
  </CollapsibleCodeBlock>
);

const FileTreeKt = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`
// highlight-modified
├── build.gradle.kts
├── ...
└── src
    ├── main
    │   ├── java
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_kotlin
    │   │               ├── config
    │   │               │   ├── advice
// highlight-modified
    │   │               │   │   └── ControllerAdvice.kt
    │   │               │   └── ...
    │   │               ├── sakila
    │   │               │   └── film
    │   │               │       ├── adapter
    │   │               │       │   └── in
    │   │               │       │       └── rest
    │   │               │       │           ├── dto
// highlight-removed
    │   │               │       │           │   └── FilmResponse.kt
// highlight-modified-start
    │   │               │       │           ├── FilmMapper.kt
    │   │               │       │           └── FilmRestController.kt
// highlight-modified-end
    │   │               │       └── ...
    │   │               └── ...
    │   └── ...
    └── ...`}
  </CollapsibleCodeBlock>
);

const FileTreeGroovy = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`// highlight-modified
├── build.gradle
├── ...
└── src
    ├── main
    │   ├── groovy
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_groovy
    │   │               ├── config
    │   │               │   ├── advice
// highlight-modified
    │   │               │   │   └── ControllerAdvice.groovy
    │   │               │   ├── ...
    │   │               │   └── mapper
// highlight-added
    │   │               │       └── ModelMapperConfig.groovy
    │   │               ├── sakila
    │   │               │   └── film
    │   │               │       ├── adapter
    │   │               │       │   └── in
    │   │               │       │       └── rest
    │   │               │       │           ├── dto
// highlight-removed
    │   │               │       │           │   └── FilmResponse.groovy
// highlight-modified-start
    │   │               │       │           ├── FilmMapper.groovy
    │   │               │       │           └── FilmRestController.groovy
// highlight-modified-end
    │   │               │       └── ...
    │   │               └── ...
    │   └── ...
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
      <TabItem value="groovy" label="Groovy">
        <FileTreeGroovy />
      </TabItem>
    </Tabs>
  </FileTreeInfo>
);

export const JavaBuildGradle = () => (
  <CollapsibleCodeBlock language="groovy" title="build.gradle">
    {`plugins {
  id 'java'
  id 'org.springframework.boot' version '4.0.1'
  id 'io.spring.dependency-management' version '1.1.7'
  id 'com.diffplug.spotless' version '8.1.0'
// highlight-added
  id 'org.openapi.generator' version '7.17.0'
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
  implementation 'org.jetbrains:annotations:26.0.2-1'
  implementation 'org.springframework.boot:spring-boot-starter-opentelemetry'

// highlight-added-start
  implementation 'io.swagger.core.v3:swagger-annotations:2.2.41'
  implementation 'org.openapitools:jackson-databind-nullable:0.2.8'
  implementation 'org.springframework.boot:spring-boot-starter-validation'
// highlight-added-end
}

tasks.named('test') {
  useJUnitPlatform()
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

// highlight-added-start
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
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const KotlinBuildGradle = () => (
  <CollapsibleCodeBlock language="kts" title="build.gradle.kts">
    {`plugins {
  kotlin("jvm") version "2.2.21"
  kotlin("plugin.spring") version "2.2.21"
  id("org.springframework.boot") version "4.0.1"
  id("io.spring.dependency-management") version "1.1.7"
  id("com.diffplug.spotless") version "8.1.0"
  kotlin("kapt") version "2.3.0"
// highlight-added
  id("org.openapi.generator") version "7.17.0"
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

// highlight-added-start
  val swaggerCoreVersion = "2.2.41"
  implementation("io.swagger.core.v3:swagger-annotations:$swaggerCoreVersion")
  implementation("io.swagger.core.v3:swagger-models:$swaggerCoreVersion")
  implementation("org.springframework.boot:spring-boot-starter-validation")
// highlight-added-end
}

kotlin {
  compilerOptions {
    freeCompilerArgs.addAll("-Xjsr305=strict", "-Xannotation-default-target=param-property")
  }
}

tasks.withType<Test> { useJUnitPlatform() }

configure<com.diffplug.gradle.spotless.SpotlessExtension> {
  kotlin {
// highlight-added-start
    target("src/**/*.kt")
    targetExclude("build/**/*.kt")
// highlight-added-end
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

// highlight-added-start
val openApiSpecPath = "\$projectDir/src/main/resources/openapi.yaml"
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
  apiPackage.set("\$basePackage.api")
  modelPackage.set("\$basePackage.model")

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

kotlin.sourceSets["main"].kotlin.srcDir("\$openApiGeneratedSourcesDir/src/main/kotlin")

tasks.named("compileKotlin") { dependsOn("generateOpenApi") }

tasks.withType<org.jetbrains.kotlin.gradle.internal.KaptGenerateStubsTask> {
  dependsOn("generateOpenApi")
}

tasks.named("clean") { doFirst { delete(openApiGeneratedSourcesDir) } }
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const GroovyBuildGradle = () => (
  <CollapsibleCodeBlock language="groovy" title="build.gradle">
    {`plugins {
  id 'groovy'
  id 'org.springframework.boot' version '4.0.1'
  id 'io.spring.dependency-management' version '1.1.7'
  id 'com.diffplug.spotless' version '8.1.0'
// highlight-added
  id 'org.openapi.generator' version '7.17.0'
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

// highlight-added-start
  implementation 'io.swagger.core.v3:swagger-annotations:2.2.41'
  implementation 'org.openapitools:jackson-databind-nullable:0.2.8'
  implementation 'org.springframework.boot:spring-boot-starter-validation'

  implementation 'org.modelmapper:modelmapper:3.2.6'
// highlight-added-end
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

// highlight-added-start
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
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const GroovyModelMapperConfig = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/config/mapper/ModelMapperConfig.groovy"
  >
    {`// highlight-added-start
package dev.pollito.spring_groovy.config.mapper

import groovy.transform.CompileStatic
import org.modelmapper.ModelMapper
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
@CompileStatic
class ModelMapperConfig {
  @Bean
  ModelMapper modelMapper() {
    new ModelMapper()
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const JavaRestController = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/sakila/film/adapter/in/rest/FilmRestController.java"
  >
    {`package dev.pollito.spring_java.sakila.film.adapter.in.rest;

// highlight-added-start
import static io.opentelemetry.api.trace.Span.current;
import static java.time.OffsetDateTime.now;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.ResponseEntity.ok;

import dev.pollito.spring_java.generated.api.FilmsApi;
import dev.pollito.spring_java.generated.model.FilmListResponse;
// highlight-added-end
// highlight-modified
import dev.pollito.spring_java.generated.model.FilmResponse;
import dev.pollito.spring_java.sakila.film.domain.port.in.FindByIdPortIn;
// highlight-added
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
// highlight-added
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
// highlight-modified
public class FilmRestController implements FilmsApi {
  private final FindByIdPortIn findByIdPortIn;
  private final FilmMapper filmMapper;
// highlight-added-start
  private final HttpServletRequest request;

  @Override
  public ResponseEntity<FilmListResponse> findAll() {
    throw new UnsupportedOperationException();
  }

  @Override
  public ResponseEntity<FilmResponse> findById(Long id) {
    return ok(
        new FilmResponse()
            .data(filmMapper.convert(findByIdPortIn.findById(id)))
            .instance(request.getRequestURI())
            .timestamp(now())
            .trace(current().getSpanContext().getTraceId())
            .status(OK.value()));
// highlight-added-end
  }
}`}
  </CollapsibleCodeBlock>
);

const KotlinRestController = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/sakila/film/adapter/in/rest/FilmRestController.kt"
  >
    {`package dev.pollito.spring_kotlin.sakila.film.adapter.\`in\`.rest

// highlight-added-start
import dev.pollito.spring_kotlin.generated.api.FilmsApi
import dev.pollito.spring_kotlin.generated.model.FilmListResponse
// highlight-added-end
// highlight-modified
import dev.pollito.spring_kotlin.generated.model.FilmResponse
import dev.pollito.spring_kotlin.sakila.film.domain.port.\`in\`.FindByIdPortIn
// highlight-added-start
import io.opentelemetry.api.trace.Span.current
import jakarta.servlet.http.HttpServletRequest
import java.time.OffsetDateTime.now
import org.springframework.http.HttpStatus.OK
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
// highlight-added-end
import org.springframework.web.bind.annotation.RestController

@RestController
class FilmRestController(
    private val findByIdPortIn: FindByIdPortIn,
    private val filmMapper: FilmMapper,
// highlight-added-start
    private val request: HttpServletRequest,
) : FilmsApi {
  override fun findAll(): ResponseEntity<FilmListResponse> {
    TODO("Not yet implemented")
  }

  override fun findById(id: Long): ResponseEntity<FilmResponse> {
    return ok(
        FilmResponse(
            data = filmMapper.convert(findByIdPortIn.findById(id)),
            instance = request.requestURI,
            timestamp = now(),
            trace = current().spanContext.traceId,
            status = OK.value(),
        )
    )
// highlight-added-end
  }
}`}
  </CollapsibleCodeBlock>
);

const GroovyRestController = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/sakila/film/adapter/in/rest/FilmController.groovy"
  >
    {`package dev.pollito.spring_groovy.sakila.film.adapter.in.rest

// highlight-added-start
import static java.time.OffsetDateTime.now
import static org.springframework.http.HttpStatus.OK
import static org.springframework.http.ResponseEntity.ok

import dev.pollito.spring_groovy.generated.api.FilmsApi
import dev.pollito.spring_groovy.generated.model.FilmListResponse
// highlight-added-end
// highlight-modified
import dev.pollito.spring_groovy.generated.model.FilmResponse
import dev.pollito.spring_groovy.sakila.film.domain.port.in.FindByIdPortIn
import groovy.transform.CompileStatic
// highlight-added-start
import io.opentelemetry.api.trace.Span
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.ResponseEntity
// highlight-added-end
import org.springframework.web.bind.annotation.RestController

@RestController
@CompileStatic
// highlight-modified
class FilmRestController implements FilmsApi {
  FindByIdPortIn findByIdPortIn
// highlight-added-start
  FilmMapper filmMapper
  HttpServletRequest request
// highlight-added-end

// highlight-modified
  FilmRestController(FindByIdPortIn findByIdPortIn, FilmMapper filmMapper, HttpServletRequest request) {
    this.findByIdPortIn = findByIdPortIn
// highlight-added-start
    this.filmMapper = filmMapper
    this.request = request
  }

  @Override
  ResponseEntity<FilmListResponse> findAll() {
    throw new UnsupportedOperationException()
  }

  @Override
  ResponseEntity<FilmResponse> findById(Long id) {
    ok(
        new FilmResponse(
        data: filmMapper.convert(findByIdPortIn.findById(id)),
        instance: request.requestURI,
        timestamp: now(),
        trace: Span.current().spanContext.traceId,
        status: OK.value()
        )
        )
// highlight-added-end
  }
}`}
  </CollapsibleCodeBlock>
);

export const RestController = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <JavaRestController />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <KotlinRestController />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <GroovyRestController />
    </TabItem>
  </Tabs>
);

const JavaMapper = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/sakila/film/adapter/in/rest/FilmMapper.java"
  >
    {`package dev.pollito.spring_java.sakila.film.adapter.in.rest;

import dev.pollito.spring_java.config.mapper.MapperSpringConfig;
import dev.pollito.spring_java.sakila.film.domain.model.Film;
import org.jspecify.annotations.Nullable;
import org.mapstruct.Mapper;
import org.springframework.core.convert.converter.Converter;

@Mapper(config = MapperSpringConfig.class)
// highlight-modified
public interface FilmMapper extends Converter<Film, dev.pollito.spring_java.generated.model.Film> {
  @Override
// highlight-modified
  dev.pollito.spring_java.generated.model.Film convert(@Nullable Film source);
}`}
  </CollapsibleCodeBlock>
);

const KotlinMapper = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/sakila/film/adapter/in/rest/FilmMapper.kt"
  >
    {`package dev.pollito.spring_kotlin.sakila.film.adapter.\`in\`.rest

import dev.pollito.spring_kotlin.config.mapper.MapperSpringConfig
import dev.pollito.spring_kotlin.sakila.film.domain.model.Film
import org.mapstruct.Mapper
import org.springframework.core.convert.converter.Converter

@Mapper(config = MapperSpringConfig::class)
// highlight-modified-start
interface FilmMapper : Converter<Film, dev.pollito.spring_kotlin.generated.model.Film> {
  override fun convert(source: Film): dev.pollito.spring_kotlin.generated.model.Film
// highlight-modified-end
}`}
  </CollapsibleCodeBlock>
);

const GroovyMapper = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/sakila/film/adapter/in/rest/mapper/FilmMapper.groovy"
  >
    {`
// highlight-added-start
package dev.pollito.spring_groovy.sakila.film.adapter.in.rest.mapper

import dev.pollito.spring_groovy.sakila.film.domain.model.Film
import groovy.transform.CompileStatic
import org.modelmapper.ModelMapper
import org.springframework.stereotype.Component

@Component
@CompileStatic
class FilmMapper {
  private final ModelMapper modelMapper

  FilmMapper(ModelMapper modelMapper) {
    this.modelMapper = modelMapper
  }

  dev.pollito.spring_groovy.generated.model.Film convert(Film source) {
    if (!source) return null

    def target = modelMapper.map(source, dev.pollito.spring_groovy.generated.model.Film)

    if (source.rating) {
      target.rating = dev.pollito.spring_groovy.generated.model.Film.RatingEnum.fromValue(source.rating)
    }

    target
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const Mapper = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <JavaMapper />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <KotlinMapper />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <GroovyMapper />
    </TabItem>
  </Tabs>
);

const JavaRestControllerAdvice = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/config/advice/ControllerAdvice.java"
  >
    {`package dev.pollito.spring_java.config.advice;

import static io.opentelemetry.api.trace.Span.current;
// highlight-added
import static java.time.OffsetDateTime.now;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;
// highlight-added
import static org.springframework.http.ResponseEntity.status;

// highlight-added-start
import dev.pollito.spring_java.generated.model.Error;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
// highlight-added-end
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.http.HttpStatus;
// highlight-added
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@RestControllerAdvice
// highlight-added
@RequiredArgsConstructor
@Slf4j
public class ControllerAdvice {
// highlight-added
  private final HttpServletRequest request;

// highlight-modified
  private @NonNull ResponseEntity<Error> buildProblemDetail(
      @NonNull Exception e, @NonNull HttpStatus status) {
    String exceptionSimpleName = e.getClass().getSimpleName();
    String logMessage = "{} being handled";

    switch (status.series()) {
      case SERVER_ERROR -> log.error(logMessage, exceptionSimpleName, e);
      case CLIENT_ERROR -> log.warn(logMessage, exceptionSimpleName, e);
      default -> log.info(logMessage, exceptionSimpleName, e);
    }

// highlight-added-start
    return status(status)
        .body(
            new Error()
                .detail(e.getLocalizedMessage())
                .instance(request.getRequestURI())
                .status(status.value())
                .timestamp(now())
                .title(status.getReasonPhrase())
                .trace(current().getSpanContext().getTraceId()));
// highlight-added-end
  }

  @ExceptionHandler(Exception.class)
// highlight-modified
  public ResponseEntity<Error> handle(Exception e) {
    return buildProblemDetail(e, INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(NoResourceFoundException.class)
// highlight-modified
  public ResponseEntity<Error> handle(NoResourceFoundException e) {
    return buildProblemDetail(e, NOT_FOUND);
  }
}`}
  </CollapsibleCodeBlock>
);

const KtRestControllerAdvice = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/config/advice/ControllerAdvice.kt"
  >
    {`package dev.pollito.spring_kotlin.config.advice

// highlight-added
import dev.pollito.spring_kotlin.generated.model.Error
import io.github.oshai.kotlinlogging.KotlinLogging
import io.opentelemetry.api.trace.Span.current
// highlight-added-start
import jakarta.servlet.http.HttpServletRequest
import java.time.OffsetDateTime.now
// highlight-added-end
import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR
import org.springframework.http.HttpStatus.NOT_FOUND
// highlight-added-start
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.status
// highlight-added-end
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.resource.NoResourceFoundException

private val log = KotlinLogging.logger {}

@RestControllerAdvice
// highlight-modified
class ControllerAdvice(private val request: HttpServletRequest) {

// highlight-modified
  private fun buildProblemDetail(e: Exception, status: HttpStatus): ResponseEntity<Error> {
    val exceptionSimpleName = e.javaClass.simpleName
    val logMessage = "$exceptionSimpleName being handled"

    when {
      status.is5xxServerError -> log.error(e) { logMessage }
      status.is4xxClientError -> log.warn(e) { logMessage }
      else -> log.info(e) { logMessage }
    }

// highlight-added-start
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
// highlight-added-end
  }

  @ExceptionHandler(Exception::class)
// highlight-modified
  fun handle(e: Exception): ResponseEntity<Error> {
    return buildProblemDetail(e, INTERNAL_SERVER_ERROR)
  }

  @ExceptionHandler(NoResourceFoundException::class)
// highlight-modified
  fun handle(e: NoResourceFoundException): ResponseEntity<Error> {
    return buildProblemDetail(e, NOT_FOUND)
  }
}`}
  </CollapsibleCodeBlock>
);

const GroovyRestControllerAdvice = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/config/advice/ControllerAdvice.groovy"
  >
    {`package dev.pollito.spring_groovy.config.advice

// highlight-added
import static java.time.OffsetDateTime.now
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.Series.CLIENT_ERROR
import static org.springframework.http.HttpStatus.Series.SERVER_ERROR

// highlight-added
import dev.pollito.spring_groovy.generated.model.Error
import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import io.opentelemetry.api.trace.Span
// highlight-added
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.HttpStatus
// highlight-added
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.resource.NoResourceFoundException

@RestControllerAdvice
@Slf4j
@CompileStatic
class ControllerAdvice {
// highlight-added-start
  private final HttpServletRequest request

  ControllerAdvice(HttpServletRequest request) {
    this.request = request
  }
// highlight-added-end

// highlight-modified
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

// highlight-added-start
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
// highlight-added-end
  }

  @ExceptionHandler(Exception.class)
// highlight-modified
  ResponseEntity<Error> handle(Exception e) {
    buildProblemDetail(e, INTERNAL_SERVER_ERROR)
  }

  @ExceptionHandler(NoResourceFoundException)
// highlight-modified
  ResponseEntity<Error> handle(NoResourceFoundException e) {
    buildProblemDetail(e, NOT_FOUND)
  }
}`}
  </CollapsibleCodeBlock>
);

export const RestControllerAdvice = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <JavaRestControllerAdvice />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <KtRestControllerAdvice />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <GroovyRestControllerAdvice />
    </TabItem>
  </Tabs>
);

export const Terminal = () => (
  <CollapsibleCodeBlock language="log" title="Terminal">
    {`pollito in @ springboot-demo-projects  $ curl -s http://localhost:8080/api/films/42 | jq
{
  "instance": "/api/films/42",
  "status": 200,
  "timestamp": "2026-02-19T16:41:30.343577085Z",
  "trace": "0342323f19e37da6b13a009854548007",
  "data": {
    "description": "A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies",
    "id": 42,
    "language": "English",
    "lengthMinutes": 86,
    "rating": "PG",
    "releaseYear": 2006,
    "title": "ACADEMY DINOSAUR"
  }
}`}
  </CollapsibleCodeBlock>
);
