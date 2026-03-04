import { CollapsibleCodeBlock } from '@site/src/components/collapsible-code-block';
import { FileTreeInfo } from '@site/src/components/file-tree-info';
import ZoomContainer from '@site/src/components/zoom-container';
import Mermaid from '@theme/Mermaid';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export const FilmJson = () => (
  <CollapsibleCodeBlock language="json">
    {`{
  "id": 42,
  "title": "ACADEMY DINOSAUR",
  "description": "A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies",
  "releaseYear": 2006,
  "rating": "PG",
  "length": 86,
  "language": "English"
}`}
  </CollapsibleCodeBlock>
);

const FileTreeJava = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`// highlight-modified
├── build.gradle
 // highlight-added
├── greclipse.properties
├── ...
└── src
    ├── main
    │   ├── java
    │   │   └── dev/pollito/spring_java/sakila
    │   │       ├── film
    │   │       │   ├── adapter
    │   │       │   │   └── in
    │   │       │   │       └── rest
    │   │       │   │           ├── dto
// highlight-added-start
    │   │       │   │           │   └── FilmResponse.java
    │   │       │   │           ├── FilmRestMapper.java
    │   │       │   │           └── FilmRestController.java
// highlight-added-end
    │   │       │   └── domain
    │   │       │       ├── model
// highlight-added
    │   │       │       │   └── Film.java
    │   │       │       └── port
    │   │       │           └── in
// highlight-added-start
    │   │       │               ├── FindByIdPortIn.java
    │   │       │               └── FindByIdPortInImpl.java
// highlight-added-end
    │   │       └── ...
    │   └── resources
    │       └── ...
    └── test
        └── ...`}
  </CollapsibleCodeBlock>
);

const FileTreeKt = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`// highlight-modified
├── build.gradle.kts
├── ...
└── src
    ├── main
    │   ├── kotlin
    │   │   └── dev/pollito/spring_kotlin/sakila
    │   │       ├── film
    │   │       │   ├── adapter
    │   │       │   │   └── in
    │   │       │   │       └── rest
    │   │       │   │           ├── dto
// highlight-added-start
    │   │       │   │           │   └── FilmResponse.kt
    │   │       │   │           ├── FilmRestMapper.kt
    │   │       │   │           └── FilmRestController.kt
// highlight-added-end
    │   │       │   └── domain
    │   │       │       ├── model
// highlight-added
    │   │       │       │   └── Film.kt
    │   │       │       └── port
    │   │       │           └── in
// highlight-added-start
    │   │       │               ├── FindByIdPortIn.kt
    │   │       │               └── FindByIdPortInImpl.kt
// highlight-added-end
    │   │       └── ...
    │   └── resources
    │       └── ...
    └── test
        └── ...`}
  </CollapsibleCodeBlock>
);

const FileTreeGroovy = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`// highlight-modified
├── build.gradle
// highlight-added
├── greclipse.properties
├── ...
└── src
    ├── main
    │   ├── groovy
    │   │   └── dev/pollito/spring_groovy/sakila
    │   │       ├── film
    │   │       │   ├── adapter
    │   │       │   │   └── in
    │   │       │   │       └── rest
    │   │       │   │           ├── dto
// highlight-added-start
    │   │       │   │           │   └── FilmResponse.groovy
    │   │       │   │           ├── FilmRestMapper.groovy
    │   │       │   │           └── FilmRestController.groovy
// highlight-added-end
    │   │       │   └── domain
    │   │       │       ├── model
// highlight-added
    │   │       │       │   └── Film.groovy
    │   │       │       └── port
    │   │       │           └── in
// highlight-added-start
    │   │       │               ├── FindByIdPortIn.groovy
    │   │       │               └── FindByIdPortInImpl.groovy
// highlight-added-end
    │   │       └── ...
    │   └── resources
    │       └── ...
    └── test
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

export const GreclipseProperties = () => (
  <CollapsibleCodeBlock language="properties" title="greclipse.properties">
    {`// highlight-added-start
org.eclipse.jdt.core.formatter.tabulation.char=space
org.eclipse.jdt.core.formatter.tabulation.size=2
org.eclipse.jdt.core.formatter.indentation.size=2
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const BuildGradleJavaSpotless = () => (
  <CollapsibleCodeBlock language="groovy" title="build.gradle">
    {`plugins {
  id 'java'
  id 'org.springframework.boot' version '4.0.1'
  id 'io.spring.dependency-management' version '1.1.7'
  // highlight-added
  id 'com.diffplug.spotless' version '8.1.0'
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
}

tasks.named('test') {
  useJUnitPlatform()
}

// highlight-added-start
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
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const BuildGradleKtsSpotless = () => (
  <CollapsibleCodeBlock language="kts" title="build.gradle.kts">
    {`plugins {
  kotlin("jvm") version "2.2.21"
  kotlin("plugin.spring") version "2.2.21"
  id("org.springframework.boot") version "4.0.1"
  id("io.spring.dependency-management") version "1.1.7"
// highlight-added
  id("com.diffplug.spotless") version "8.1.0"
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
}

kotlin {
  compilerOptions {
    freeCompilerArgs.addAll("-Xjsr305=strict", "-Xannotation-default-target=param-property")
  }
}

tasks.withType<Test> { useJUnitPlatform() }

// highlight-added-start
configure<com.diffplug.gradle.spotless.SpotlessExtension> {
  kotlin { ktfmt() }
  kotlinGradle {
    target("*.gradle.kts")
    ktfmt()
  }
}

tasks.named("build") {
  dependsOn("spotlessKotlinApply")
  dependsOn("spotlessKotlinGradleApply")
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const BuildGradleGroovySpotless = () => (
  <CollapsibleCodeBlock language="groovy" title="build.gradle">
    {`plugins {
  id 'groovy'
  id 'org.springframework.boot' version '4.0.1'
  id 'io.spring.dependency-management' version '1.1.7'
// highlight-added
  id 'com.diffplug.spotless' version '8.1.0'
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
}

tasks.named('test') {
  useJUnitPlatform()
}

// highlight-added-start
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
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const FilmJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/sakila/film/domain/model/Film.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.sakila.film.domain.model;

import static lombok.AccessLevel.*;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = PRIVATE)
public class Film {
  Integer id;
  String title;
  String description;
  Integer releaseYear;
  String rating;
  Integer length;
  String language;
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const FilmKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/sakila/film/domain/model/Film.kt"
  >
    {`// highlight-added-start
package dev.pollito.spring_kotlin.sakila.film.domain.model

data class Film(
    val id: Int,
    val title: String,
    val description: String,
    val releaseYear: Int,
    val rating: String,
    val length: Int,
    val language: String,
)
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const FilmGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/sakila/film/domain/model/Film.groovy"
  >
    {`// highlight-added-start
package dev.pollito.spring_groovy.sakila.film.domain.model

import groovy.transform.Canonical
import groovy.transform.CompileStatic

@Canonical
@CompileStatic
class Film {
  Integer id
  String title
  String description
  Integer releaseYear
  String rating
  Integer length
  String language
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const FindByIdPortInJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/sakila/film/domain/port/in/FindByIdPortIn.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.sakila.film.domain.port.in;

import dev.pollito.spring_java.sakila.film.domain.model.Film;

public interface FindByIdPortIn {
  Film findById(Integer id);
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const FindByIdPortInImplJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/sakila/film/domain/port/in/FindByIdPortInImpl.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.sakila.film.domain.port.in;

import dev.pollito.spring_java.sakila.film.domain.model.Film;
import org.springframework.stereotype.Service;

@Service
public class FindByIdPortInImpl implements FindByIdPortIn {
  @Override
  public Film findById(Integer id) {
    return Film.builder()
        .id(id)
        .title("ACADEMY DINOSAUR")
        .description(
            "A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies")
        .releaseYear(2006)
        .rating("PG")
        .length(86)
        .language("English")
        .build();
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const FindByIdPortInKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/sakila/film/domain/port/in/FindByIdPortIn.kt"
  >
    {`// highlight-added-start
package dev.pollito.spring_kotlin.sakila.film.domain.port.\`in\`

import dev.pollito.spring_kotlin.sakila.film.domain.model.Film

interface FindByIdPortIn {
  fun findById(id: Int): Film
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const FindByIdPortInImplKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/sakila/film/domain/port/in/FindByIdPortInImpl.kt"
  >
    {`// highlight-added-start
package dev.pollito.spring_kotlin.sakila.film.domain.port.\`in\`

import dev.pollito.spring_kotlin.sakila.film.domain.model.Film
import org.springframework.stereotype.Service

@Service
class FindByIdPortInImpl : FindByIdPortIn {
  override fun findById(id: Int): Film {
    return Film(
        id = id,
        title = "ACADEMY DINOSAUR",
        description =
            "A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies",
        releaseYear = 2006,
        rating = "PG",
        length = 86,
        language = "English",
    )
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const FindByIdPortInGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/sakila/film/domain/port/in/FindByIdPortIn.groovy"
  >
    {`// highlight-added-start
package dev.pollito.spring_groovy.sakila.film.domain.port.in

import dev.pollito.spring_groovy.sakila.film.domain.model.Film

interface FindByIdPortIn {
  Film findById(Integer id)
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const FindByIdPortInImplGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/sakila/film/domain/port/in/FindByIdPortInImpl.groovy"
  >
    {`// highlight-added-start
package dev.pollito.spring_groovy.sakila.film.domain.port.in

import dev.pollito.spring_groovy.sakila.film.domain.model.Film
import groovy.transform.CompileStatic
import org.springframework.stereotype.Service

@Service
@CompileStatic
class FindByIdPortInImpl implements FindByIdPortIn {
  @Override
  Film findById(Integer id) {
    new Film(
        id: id,
        title: "ACADEMY DINOSAUR",
        description: "A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies",
        releaseYear: 2006,
        rating: "PG",
        length: 86,
        language: "English"
        )
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const PrimaryPort = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <FindByIdPortInJava />
      <FindByIdPortInImplJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <FindByIdPortInKt />
      <FindByIdPortInImplKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <FindByIdPortInGroovy />
      <FindByIdPortInImplGroovy />
    </TabItem>
  </Tabs>
);

const FilmResponseJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/sakila/film/adapter/in/rest/dto/FilmResponse.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.sakila.film.adapter.in.rest.dto;

import static lombok.AccessLevel.*;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = PRIVATE)
public class FilmResponse {
  Integer id;
  String title;
  String description;
  Integer releaseYear;
  String rating;
  Integer length;
  String language;
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const FilmRestMapperJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/sakila/film/adapter/in/rest/FilmRestMapper.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.sakila.film.adapter.in.rest;

import static java.util.Objects.isNull;

import dev.pollito.spring_java.sakila.film.adapter.in.rest.dto.FilmResponse;
import dev.pollito.spring_java.sakila.film.domain.model.Film;
import org.springframework.stereotype.Component;

@Component
public class FilmRestMapper {
  public FilmResponse convert(Film source) {
    if (isNull(source)) {
      return null;
    }
    return FilmResponse.builder()
        .id(source.getId())
        .title(source.getTitle())
        .description(source.getDescription())
        .releaseYear(source.getReleaseYear())
        .rating(source.getRating())
        .length(source.getLength())
        .language(source.getLanguage())
        .build();
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const FilmRestControllerJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/sakila/film/adapter/in/rest/FilmRestController.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.sakila.film.adapter.in.rest;

import dev.pollito.spring_java.sakila.film.adapter.in.rest.dto.FilmResponse;
import dev.pollito.spring_java.sakila.film.domain.port.in.FindByIdPortIn;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/films")
@RequiredArgsConstructor
public class FilmRestController {
  private final FindByIdPortIn findByIdPortIn;
  private final FilmRestMapper mapper;

  @GetMapping("/{id}")
  public FilmResponse findById(@PathVariable Integer id) {
    return mapper.convert(findByIdPortIn.findById(id));
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const FilmResponseKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/sakila/film/adapter/in/rest/dto/FilmResponse.kt"
  >
    {`// highlight-added-start
package dev.pollito.spring_kotlin.sakila.film.adapter.\`in\`.rest.dto

data class FilmResponse(
    val id: Int,
    val title: String,
    val description: String,
    val releaseYear: Int,
    val rating: String,
    val length: Int,
    val language: String,
)
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const FilmRestMapperKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/sakila/film/adapter/in/rest/FilmRestMapper.kt"
  >
    {`// highlight-added-start
package dev.pollito.spring_kotlin.sakila.film.adapter.\`in\`.rest

import dev.pollito.spring_kotlin.sakila.film.adapter.\`in\`.rest.dto.FilmResponse
import dev.pollito.spring_kotlin.sakila.film.domain.model.Film
import org.springframework.stereotype.Component

@Component
class FilmRestMapper {
  fun convert(source: Film?): FilmResponse? {
    if (source == null) {
      return null
    }
    return FilmResponse(
        id = source.id,
        title = source.title,
        description = source.description,
        releaseYear = source.releaseYear,
        rating = source.rating,
        length = source.length,
        language = source.language,
    )
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const FilmRestControllerKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/sakila/film/adapter/in/rest/FilmRestController.kt"
  >
    {`// highlight-added-start
package dev.pollito.spring_kotlin.sakila.film.adapter.\`in\`.rest

import dev.pollito.spring_kotlin.sakila.film.adapter.\`in\`.rest.dto.FilmResponse
import dev.pollito.spring_kotlin.sakila.film.domain.port.\`in\`.FindByIdPortIn
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/films")
class FilmRestController(
    private val findByIdPortIn: FindByIdPortIn,
    private val mapper: FilmRestMapper,
) {
  @GetMapping("/{id}")
  fun findFilmById(@PathVariable id: Int): FilmResponse? {
    return mapper.convert(findByIdPortIn.findById(id))
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const FilmResponseGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/sakila/film/adapter/in/rest/dto/FilmResponse.groovy"
  >
    {`// highlight-added-start
package dev.pollito.spring_groovy.sakila.film.adapter.in.rest.dto

import groovy.transform.Canonical
import groovy.transform.CompileStatic

@Canonical
@CompileStatic
class FilmResponse {
  Integer id
  String title
  String description
  Integer releaseYear
  String rating
  Integer length
  String language
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const FilmRestMapperGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/sakila/film/adapter/in/rest/FilmRestMapper.groovy"
  >
    {`// highlight-added-start
package dev.pollito.spring_groovy.sakila.film.adapter.in.rest

import dev.pollito.spring_groovy.sakila.film.adapter.in.rest.dto.FilmResponse
import dev.pollito.spring_groovy.sakila.film.domain.model.Film
import groovy.transform.CompileDynamic
import groovy.transform.CompileStatic

@CompileStatic
final class FilmRestMapper {
  private FilmRestMapper() {}

  @CompileDynamic
  static FilmResponse convert(Film source) {
    source ? new FilmResponse(
        source.properties.findAll {
          it.key != 'class'
        }
        ) : null
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const FilmRestControllerGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/sakila/film/adapter/in/rest/FilmRestController.groovy"
  >
    {`// highlight-added-start
package dev.pollito.spring_groovy.sakila.film.adapter.in.rest

import static FilmRestMapper.convert

import dev.pollito.spring_groovy.sakila.film.adapter.in.rest.dto.FilmResponse
import dev.pollito.spring_groovy.sakila.film.domain.port.in.FindByIdPortIn
import groovy.transform.CompileStatic
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/films")
@CompileStatic
class FilmRestController {
  FindByIdPortIn findByIdPortIn

  FilmRestController(FindByIdPortIn findByIdPortIn) {
    this.findByIdPortIn = findByIdPortIn
  }

  @GetMapping("/{id}")
  FilmResponse findById(@PathVariable("id") Integer id) {
    convert(findByIdPortIn.findById(id))
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const PrimaryAdapter = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <FilmResponseJava />
      <FilmRestMapperJava />
      <FilmRestControllerJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <FilmResponseKt />
      <FilmRestMapperKt />
      <FilmRestControllerKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <FilmResponseGroovy />
      <FilmRestMapperGroovy />
      <FilmRestControllerGroovy />
    </TabItem>
  </Tabs>
);

export const Terminal = () => (
  <CollapsibleCodeBlock language="sh" title="Terminal">
    {`pollito in @ springboot-demo-projects  $ curl -s http://localhost:8080/api/films/42 | jq
{
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

export const ApplicationSequenceDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
    participant Client
    participant FilmRestController
    participant FindByIdPortInImpl

    Client->>FilmRestController: GET /api/films/{filmId} Request
    activate FilmRestController

    FilmRestController->>FindByIdPortInImpl: findFilmById()
    activate FindByIdPortInImpl

    FindByIdPortInImpl-->>FilmRestController: Film
    deactivate FindByIdPortInImpl

    Note over FilmRestController: Map Film to FilmResponse using FilmRestMapper

    FilmRestController-->>Client: FilmResponse (HTTP 200 OK)
    deactivate FilmRestController`}
    />
  </ZoomContainer>
);
