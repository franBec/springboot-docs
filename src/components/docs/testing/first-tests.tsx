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
│   │   ├── LogFilter.java                  │ 🔴 @SpringBootTest (single test)
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
│   │   ├── LogFilter.kt                    │ 🔴 @SpringBootTest (single test)
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
├── SpringGroovyApplication.groovy            ← 🔴 @SpringBootTest (context loads)
├── config/
│   ├── advice/
│   │   └── ControllerAdvice.groovy           ← 🔶 Standalone MockMvc
│   ├── log/
│   │   ├── LogAspect.groovy                  ┐
│   │   ├── LogFilter.groovy                  │ 🔴 @SpringBootTest (single test)
│   │   ├── MaskingPatternLayout.groovy       │
│   │   └── TraceIdFilter.groovy              ┘
│   └── mapper/
│       └── ModelMapperConfig.groovy          ← ⚪ Ignored (Config)
└── sakila/
    └── film/
        ├── adapter/in/rest/
        │   ├── FilmRestMapper.groovy         ┐
        │   └── FilmRestController.groovy     ┘ 🟡 @WebMvcTest (single test)
        └── domain/
            ├── model/
            │   └── Film.groovy               ← ⚪ Ignored (POJO)
            └── port/in/
                ├── FindByIdPortIn.groovy     ← ⚪ Ignored (Interface)
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
    │   └── config/advice/
// highlight-modified
    │       └── ControllerAdvice.java
    └── test/java/.../spring_java/
// highlight-added
        ├── SanityCheckSpringBootTest.java
        ├── config/advice/
// highlight-added
        │   └── ControllerAdviceMockMvcTest.java
        ├── sakila/film/
        │   ├── adapter/in/rest/
// highlight-added
        │   │   └── FilmRestControllerMockMvcTest.java
        │   └── domain/port/in/
// highlight-added
        │       └── FindByIdPortInImplTest.java
        └── test/util/
// highlight-added
            └── MockMvcResultMatchers.java`}
  </CollapsibleCodeBlock>
);

const FileTreeKt = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`// highlight-modified
├── build.gradle.kts
└── src/
    ├── main/kotlin/.../spring_kotlin/
    │   └── config/advice/
// highlight-modified
    │       └── ControllerAdvice.kt
    └── test/kotlin/.../spring_kotlin/
// highlight-added
        ├── SanityCheckSpringBootTest.kt
        ├── config/advice/
// highlight-added
        │   └── ControllerAdviceMockMvcTest.kt
        ├── sakila/film/
        │   ├── adapter/in/rest/
// highlight-added
        │   │   └── FilmRestControllerMockMvcTest.kt
        │   └── domain/port/in/
// highlight-added
        │       └── FindByIdPortInImplTest.kt
        └── test/util/
// highlight-added
            └── MockMvcResultMatchersDsl.kt`}
  </CollapsibleCodeBlock>
);

const FileTreeGroovy = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`// highlight-modified
├── build.gradle
└── src/
    ├── main/groovy/.../spring_groovy/
    │   └── config/advice/
// highlight-modified
    │       └── ControllerAdvice.groovy
    └── test/groovy/.../spring_groovy/
// highlight-added
        ├── SanityCheckSpringBootSpec.groovy
        ├── config/advice/
// highlight-added
        │   └── ControllerAdviceMockMvcSpec.groovy
        ├── sakila/film/
        │   ├── adapter/in/rest/
// highlight-added
        │   │   └── FilmRestControllerMockMvcSpec.groovy
        │   └── domain/port/in/
// highlight-added
        │       └── FindByIdPortInImplSpec.groovy
        └── test/util/
// highlight-added
            └── MockMvcResultMatchersTrait.groovy`}
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
  // ...
// highlight-added
  id 'jacoco'
}
// ...
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
// ...`}
  </CollapsibleCodeBlock>
);

const BuildGradleKts = () => (
  <CollapsibleCodeBlock language="kts" title="build.gradle.kts">
    {`plugins {
  // ...
// highlight-added
  jacoco
}
// ...
dependencies {
  // ...
// highlight-added-start
  testImplementation("com.ninja-squad:springmockk:5.0.1")
  testImplementation("io.mockk:mockk:1.14.7")
// highlight-added-end
}
// ...
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
// ...`}
  </CollapsibleCodeBlock>
);

const BuildGradleSpock = () => (
  <CollapsibleCodeBlock language="groovy" title="build.gradle">
    {`plugins {
  // ...
// highlight-added
  id 'jacoco'
}
// ...
dependencies {
// ...  
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
// ...`}
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

export const MockMvcResultMatchersJavaCode = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/test/util/MockMvcResultMatchers.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.test.util;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.ResultMatcher;

public final class MockMvcResultMatchers {

  private MockMvcResultMatchers() {}

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

export const MockMvcResultMatchersKtCode = () => (
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

export const MockMvcResultMatchersTraitGroovyCode = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/test/util/MockMvcResultMatchersTrait.groovy"
  >
    {`// highlight-added-start
package dev.pollito.spring_groovy.test.util

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath

import org.springframework.http.HttpStatus
import org.springframework.test.web.servlet.ResultMatcher

trait MockMvcResultMatchersTrait {

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

const FilmRestControllerMockMvcTestJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/sakila/film/adapter/in/rest/FilmRestControllerMockMvcTest.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.sakila.film.adapter.in.rest;

import static dev.pollito.spring_java.test.util.MockMvcResultMatchers.hasErrorFields;
import static dev.pollito.spring_java.test.util.MockMvcResultMatchers.hasStandardApiResponseFields;
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
class FilmRestControllerMockMvcTest {

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

const FilmRestControllerMockMvcTestKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/sakila/film/adapter/in/rest/FilmRestControllerMockMvcTest.kt"
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
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest
import org.springframework.context.annotation.Import
import org.springframework.http.HttpStatus.BAD_REQUEST
import org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR
import org.springframework.http.HttpStatus.OK
import org.springframework.http.MediaType.APPLICATION_JSON
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get

@WebMvcTest(FilmRestController::class)
@Import(ControllerAdvice::class, FilmRestMapperImpl::class)
class FilmRestControllerMockMvcTest {
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

const FilmRestControllerMockMvcSpecGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/sakila/film/adapter/in/rest/FilmRestControllerMockMvcSpec.groovy"
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
import dev.pollito.spring_groovy.test.util.MockMvcResultMatchersTrait
import org.spockframework.spring.SpringBean
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest
import org.springframework.context.annotation.Import
import org.springframework.test.web.servlet.MockMvc
import spock.lang.Specification

@WebMvcTest(FilmRestController)
@Import([ControllerAdvice, FilmRestMapper, ModelMapperConfig])
class FilmRestControllerMockMvcSpec extends Specification implements MockMvcResultMatchersTrait {

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
      <FilmRestControllerMockMvcTestJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <FilmRestControllerMockMvcTestKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <FilmRestControllerMockMvcSpecGroovy />
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
	at dev.pollito.spring_java.test.util.MockMvcResultMatchers.lambda$hasStandardApiResponseFields$0(MockMvcResultMatchers.java:19)
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
|       |         dev.pollito.spring_groovy.test.util.MockMvcResultMatchersTrait$Trait$Helper$_hasStandardApiResponseFields_closure1@11577ab8
|       java.lang.AssertionError: JSON path "$.status" expected:<400> but was:<500>
|       	at org.springframework.test.util.AssertionErrors.fail(AssertionErrors.java:62)
|       	at org.springframework.test.util.AssertionErrors.assertEquals(AssertionErrors.java:129)
|       	at org.springframework.test.util.JsonPathExpectationsHelper.assertValue(JsonPathExpectationsHelper.java:172)
|       	at org.springframework.test.web.servlet.result.JsonPathResultMatchers.lambda$value$2(JsonPathResultMatchers.java:111)
|       	at dev.pollito.spring_groovy.test.util.MockMvcResultMatchersTrait$Trait$Helper.hasStandardApiResponseFields_closure1(MockMvcResultMatchersTrait.groovy:13)
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
    {`// ...
// highlight-added
import jakarta.validation.ConstraintViolationException;
// ...
public class ControllerAdvice {
  // ...
// highlight-added-start
  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<Error> handle(ConstraintViolationException e) {
    // ...
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
    {`// ...
// highlight-added
import jakarta.validation.ConstraintViolationException
// ...
class ControllerAdvice(private val request: HttpServletRequest) {
  // ...
// highlight-added-start
  @ExceptionHandler(ConstraintViolationException::class)
  fun handle(e: ConstraintViolationException): ResponseEntity<Error> {
    // ...
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
    {`// ...
// highlight-added
import jakarta.validation.ConstraintViolationException
// ...
class ControllerAdvice {
  // ...
// highlight-added-start
  @ExceptionHandler(ConstraintViolationException)
  ResponseEntity<Error> handle(ConstraintViolationException e) {
    // ...
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

const ControllerAdviceMockMvcTestJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/config/advice/ControllerAdviceMockMvcTest.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.config.advice;

import static dev.pollito.spring_java.test.util.MockMvcResultMatchers.hasErrorFields;
import static dev.pollito.spring_java.test.util.MockMvcResultMatchers.hasStandardApiResponseFields;
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

class ControllerAdviceMockMvcTest {

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

const ControllerAdviceMockMvcTestKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/config/advice/ControllerAdviceMockMvcTest.kt"
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

class ControllerAdviceMockMvcTest {

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

const ControllerAdviceMockMvcSpecGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/config/advice/ControllerAdviceMockMvcSpec.groovy"
  >
    {`// highlight-added-start
package dev.pollito.spring_groovy.config.advice

import static org.springframework.http.HttpMethod.GET
import static org.springframework.http.HttpStatus.*
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup

import dev.pollito.spring_groovy.test.util.MockMvcResultMatchersTrait
import jakarta.servlet.http.HttpServletRequest
import jakarta.validation.ConstraintViolationException
import org.springframework.test.web.servlet.MockMvc
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.servlet.resource.NoResourceFoundException
import spock.lang.Specification
import spock.lang.Unroll

class ControllerAdviceMockMvcSpec extends Specification implements MockMvcResultMatchersTrait {
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
      <ControllerAdviceMockMvcTestJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <ControllerAdviceMockMvcTestKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <ControllerAdviceMockMvcSpecGroovy />
    </TabItem>
  </Tabs>
);

const SanityCheckSpringBootTestJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/SanityCheckSpringBootTest.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java;

import static java.util.regex.Pattern.compile;
import static java.util.regex.Pattern.quote;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;
import org.jspecify.annotations.NonNull;
import org.jspecify.annotations.Nullable;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.system.CapturedOutput;
import org.springframework.boot.test.system.OutputCaptureExtension;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.HttpMethod;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(OutputCaptureExtension.class)
class SanityCheckSpringBootTest {

  @SuppressWarnings("unused")
  @Autowired
  private MockMvc mockMvc;

  record TestCase(
      @NonNull HttpMethod method,
      @NonNull String url,
      @NonNull List<Object> pathParams,
      @NonNull Map<String, String> headers,
      @NonNull Map<String, String> queryParams,
      @Nullable String requestBody) {}

  static @NonNull Stream<TestCase> sanityCheckTestCases() {
    return Stream.of(
        new TestCase(
            HttpMethod.GET,
            "/api/films/{id}",
            List.of(1),
            /* we don't have yet any endpoint with sensible headers to mask, so let's use this one for now */
            Map.of("Authorization", "Bearer secret-token", "X-Api-Key", "my-secret-key"),
            Collections.emptyMap(),
            null));
  }

  private MockHttpServletRequestBuilder buildRequest(
      @NonNull HttpMethod method, @NonNull String url, @NonNull List<Object> pathParams) {
    Object[] params = pathParams.toArray();
    return switch (method.name()) {
      case "GET" -> get(url, params);
      case "POST" -> post(url, params);
      case "PUT" -> put(url, params);
      case "PATCH" -> patch(url, params);
      case "DELETE" -> delete(url, params);
      default -> throw new IllegalArgumentException("Unsupported HTTP method: " + method);
    };
  }

  private String resolvePathParameters(@NonNull String url, @NonNull List<Object> pathParams) {
    String resolved = url;
    for (Object param : pathParams) {
      resolved = resolved.replaceFirst("\\{[^}]+}", String.valueOf(param));
    }
    return resolved;
  }

  private long countMatches(@NonNull String text, @NonNull String regex) {
    return compile(regex).matcher(text).results().count();
  }

  private void assertLogFilterOutput(
      @NonNull String logOutput, @NonNull HttpMethod method, @NonNull String url) {
    String methodAndUri = String.format(">>>> Method: %s; URI: %s", method.name(), url);
    assert countMatches(
                logOutput, quote(methodAndUri) + "; QueryString: [^;\\n]*; Headers: \\{[^\\n]*}")
            == 1
        : "LogFilter should log request details with method, URI, QueryString, and Headers exactly once";
    assert countMatches(logOutput, "<<<< Response Status: \\d+") == 1
        : "LogFilter should log response status exactly once";
  }

  private void assertLogAspectOutput(@NonNull String logOutput) {
    assert countMatches(logOutput, "\\[[\\w.]+\\([..]*\\)] Args: \\[") == 1
        : "LogAspect should log args with format [ClassName.methodName(..)] Args: [...] exactly once";
    assert countMatches(logOutput, "\\[[\\w.]+\\([..]*\\)] Response: <") == 1
        : "LogAspect should log response with format [ClassName.methodName(..)] Response: <...> exactly once";
  }

  private void assertMaskingPatternLayoutOutput(@NonNull String logOutput) {
    if (logOutput.contains("Authorization:") || logOutput.contains("X-Api-Key:")) {
      assert !logOutput.contains("secret-token")
          : "MaskingPatternLayout should mask Authorization value";
      assert !logOutput.contains("my-secret-key")
          : "MaskingPatternLayout should mask X-Api-Key value";
      assert logOutput.contains("Authorization: ****")
          : "MaskingPatternLayout should show masked Authorization";
      assert logOutput.contains("X-Api-Key: ****")
          : "MaskingPatternLayout should show masked X-Api-Key";
    }
  }

  private void assertTraceIdFilterOutput(@NonNull String logOutput) {
    assert logOutput.matches("(?s).*(trace_id=|trace_id=[a-f0-9]{32}).*")
        : "TraceIdFilter should add trace_id to MDC (if present, must be exactly 32 hex characters)";
    assert logOutput.matches("(?s).*(span_id=|span_id=[a-f0-9]{16}).*")
        : "TraceIdFilter should add span_id to MDC (if present, must be exactly 16 hex characters)";
    assert logOutput.matches("(?s).*trace_flags=(|00|01).*")
        : "TraceIdFilter should add trace_flags to MDC (empty, 00, or 01)";
  }

  @ParameterizedTest
  @MethodSource("sanityCheckTestCases")
  void sanityCheck(@NonNull TestCase testCase, @NonNull CapturedOutput output) throws Exception {
    MockHttpServletRequestBuilder requestBuilder =
        buildRequest(testCase.method(), testCase.url(), testCase.pathParams());

    testCase.headers().forEach(requestBuilder::header);
    testCase.queryParams().forEach(requestBuilder::param);
    if (testCase.requestBody() != null) {
      requestBuilder.content(testCase.requestBody()).contentType(APPLICATION_JSON);
    }

    mockMvc.perform(requestBuilder.accept(APPLICATION_JSON));
    String logOutput = output.getOut();

    assertLogFilterOutput(
        logOutput, testCase.method(), resolvePathParameters(testCase.url(), testCase.pathParams()));
    assertLogAspectOutput(logOutput);
    assertMaskingPatternLayoutOutput(logOutput);
    assertTraceIdFilterOutput(logOutput);
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const SanityCheckSpringBootTestKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/SanityCheckSpringBootTest.kt"
  >
    {`// highlight-added-start
package dev.pollito.spring_kotlin

import java.util.regex.Pattern
import java.util.regex.Pattern.compile
import org.junit.jupiter.api.extension.ExtendWith
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.MethodSource
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.system.CapturedOutput
import org.springframework.boot.test.system.OutputCaptureExtension
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc
import org.springframework.http.HttpMethod
import org.springframework.http.MediaType.APPLICATION_JSON
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.delete
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.patch
import org.springframework.test.web.servlet.post
import org.springframework.test.web.servlet.put

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(OutputCaptureExtension::class)
class SanityCheckSpringBootTest {

  @Autowired private lateinit var mockMvc: MockMvc

  data class TestCase(
      val method: HttpMethod,
      val url: String,
      val pathParams: List<Any> = emptyList(),
      val headers: Map<String, String> = emptyMap(),
      val queryParams: Map<String, String> = emptyMap(),
      val requestBody: String? = null,
  )

  companion object {
    @JvmStatic
    fun sanityCheckTestCases(): List<TestCase> =
        listOf(
            TestCase(
                method = HttpMethod.GET,
                url = "/api/films/{id}",
                pathParams = listOf(1),
                headers =
                    mapOf(
                        "Authorization" to "Bearer secret-token",
                        "X-Api-Key" to "my-secret-key",
                    ),
            )
        )
  }

  private fun resolvePathParameters(url: String, pathParams: List<Any>): String {
    var resolved = url
    for (param in pathParams) {
      resolved = resolved.replaceFirst("\\{[^}]+}".toRegex(), param.toString())
    }
    return resolved
  }

  private fun countMatches(text: String, regex: String): Long =
      compile(regex).matcher(text).results().count()

  private fun assertLogFilterOutput(logOutput: String, method: HttpMethod, url: String) {
    val methodAndUri = ">>>> Method: \${method.name()}; URI: \$url"
    assert(
        countMatches(
            logOutput,
            Pattern.quote(methodAndUri) + "; QueryString: [^;\\n]*; Headers: \\{[^\\n]*}",
        ) == 1L
    ) {
      "LogFilter should log request details with method, URI, QueryString, and Headers exactly once"
    }
    assert(countMatches(logOutput, "<<<< Response Status: \\d+") == 1L) {
      "LogFilter should log response status exactly once"
    }
  }

  private fun assertLogAspectOutput(logOutput: String) {
    assert(countMatches(logOutput, "\\[[\\w.]+\\([..]*\\)] Args: \\[") == 1L) {
      "LogAspect should log args with format [ClassName.methodName(..)] Args: [...] exactly once"
    }
    assert(countMatches(logOutput, "\\[[\\w.]+\\([..]*\\)] Response: <") == 1L) {
      "LogAspect should log response with format [ClassName.methodName(..)] Response: <...> exactly once"
    }
  }

  private fun assertMaskingPatternLayoutOutput(logOutput: String) {
    if (logOutput.contains("Authorization:") || logOutput.contains("X-Api-Key:")) {
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
  }

  private fun assertTraceIdFilterOutput(logOutput: String) {
    assert(logOutput.matches(Regex("(?s).*(trace_id=|trace_id=[a-f0-9]{32}).*"))) {
      "TraceIdFilter should add trace_id to MDC (if present, must be exactly 32 hex characters)"
    }
    assert(logOutput.matches(Regex("(?s).*(span_id=|span_id=[a-f0-9]{16}).*"))) {
      "TraceIdFilter should add span_id to MDC (if present, must be exactly 16 hex characters)"
    }
    assert(logOutput.matches(Regex("(?s).*trace_flags=(|00|01).*"))) {
      "TraceIdFilter should add trace_flags to MDC (empty, 00, or 01)"
    }
  }

  @ParameterizedTest
  @MethodSource("sanityCheckTestCases")
  fun sanityCheck(testCase: TestCase, output: CapturedOutput) {
    val resolvedUrl = resolvePathParameters(testCase.url, testCase.pathParams)
    val params = testCase.pathParams.toTypedArray()

    mockMvc.perform(
        testCase.method,
        testCase.url,
        params,
        testCase.headers,
        testCase.queryParams,
        testCase.requestBody,
    )

    val logOutput = output.out

    assertLogFilterOutput(logOutput, testCase.method, resolvedUrl)
    assertLogAspectOutput(logOutput)
    assertMaskingPatternLayoutOutput(logOutput)
    assertTraceIdFilterOutput(logOutput)
  }

  private fun MockMvc.perform(
      method: HttpMethod,
      url: String,
      pathParams: Array<Any>,
      headers: Map<String, String>,
      queryParams: Map<String, String>,
      requestBody: String?,
  ) {
    when (method.name()) {
      "GET" ->
          get(url, *pathParams) {
            accept = APPLICATION_JSON
            headers.forEach { (k, v) -> header(k, v) }
            queryParams.forEach { (k, v) -> param(k, v) }
          }
      "POST" ->
          post(url, *pathParams) {
            accept = APPLICATION_JSON
            headers.forEach { (k, v) -> header(k, v) }
            queryParams.forEach { (k, v) -> param(k, v) }
            requestBody?.let {
              content = it
              contentType = APPLICATION_JSON
            }
          }
      "PUT" ->
          put(url, *pathParams) {
            accept = APPLICATION_JSON
            headers.forEach { (k, v) -> header(k, v) }
            queryParams.forEach { (k, v) -> param(k, v) }
            requestBody?.let {
              content = it
              contentType = APPLICATION_JSON
            }
          }
      "PATCH" ->
          patch(url, *pathParams) {
            accept = APPLICATION_JSON
            headers.forEach { (k, v) -> header(k, v) }
            queryParams.forEach { (k, v) -> param(k, v) }
            requestBody?.let {
              content = it
              contentType = APPLICATION_JSON
            }
          }
      "DELETE" ->
          delete(url, *pathParams) {
            accept = APPLICATION_JSON
            headers.forEach { (k, v) -> header(k, v) }
            queryParams.forEach { (k, v) -> param(k, v) }
          }
      else -> throw IllegalArgumentException("Unsupported HTTP method: $method")
    }
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const SanityCheckSpringBootSpecGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/SanityCheckSpringBootSpec.groovy"
  >
    {`// highlight-added-start
package dev.pollito.spring_groovy

import static java.util.regex.Pattern.compile
import static java.util.regex.Pattern.quote
import static org.springframework.http.MediaType.APPLICATION_JSON
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc
import org.springframework.http.HttpMethod
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder
import spock.lang.Specification
import spock.lang.Unroll

@SpringBootTest
@AutoConfigureMockMvc
class SanityCheckSpringBootSpec extends Specification {

  @Autowired
  MockMvc mockMvc

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

  private static MockHttpServletRequestBuilder buildRequest(HttpMethod method, String url, List<Object> pathParams) {
    Object[] params = pathParams.toArray()
    switch (method.name()) {
      case "GET": return get(url, params)
      case "POST": return post(url, params)
      case "PUT": return put(url, params)
      case "PATCH": return patch(url, params)
      case "DELETE": return delete(url, params)
      default: throw new IllegalArgumentException("Unsupported HTTP method: \${method}")
    }
  }

  private static String resolvePathParameters(String url, List<Object> pathParams) {
    String resolved = url
    for (param in pathParams) {
      resolved = resolved.replaceFirst('\\{[^}]+}', String.valueOf(param))
    }
    resolved
  }

  private static long countMatches(String text, String regex) {
    compile(regex).matcher(text).results().count()
  }

  private static void assertLogFilterOutput(String logOutput, HttpMethod method, String url) {
    String methodAndUri = ">>>> Method: \${method.name()}; URI: \${url}"
    assert countMatches(
    logOutput, quote(methodAndUri) + '; QueryString: [^;\\n]*; Headers: \\{[^\\n]*}') == 1:
    'LogFilter should log request details with method, URI, QueryString, and Headers exactly once'
    assert countMatches(logOutput, '<<<< Response Status: \\d+') == 1:
    'LogFilter should log response status exactly once'
  }

  private static void assertLogAspectOutput(String logOutput) {
    assert countMatches(logOutput, '\\[[\\w.]+\\([..]*\\)] Args: ') == 1:
    'LogAspect should log args with format [ClassName.methodName(..)] Args: ... exactly once'
    assert countMatches(logOutput, '\\[[\\w.]+\\([..]*\\)] Response: <') == 1:
    'LogAspect should log response with format [ClassName.methodName(..)] Response: <...> exactly once'
  }

  private static void assertMaskingPatternLayoutOutput(String logOutput) {
    if (logOutput.contains('Authorization:') || logOutput.contains('X-Api-Key:')) {
      assert !logOutput.contains('secret-token'):
      'MaskingPatternLayout should mask Authorization value'
      assert !logOutput.contains('my-secret-key'):
      'MaskingPatternLayout should mask X-Api-Key value'
      assert logOutput.contains('Authorization: ****'):
      'MaskingPatternLayout should show masked Authorization'
      assert logOutput.contains('X-Api-Key: ****'):
      'MaskingPatternLayout should show masked X-Api-Key'
    }
  }

  private static void assertTraceIdFilterOutput(String logOutput) {
    assert logOutput ==~ /(?s).*(trace_id=|trace_id=[a-f0-9]{32}).*/
    assert logOutput ==~ /(?s).*(span_id=|span_id=[a-f0-9]{16}).*/
    assert logOutput ==~ /(?s).*trace_flags=(|00|01).*/
  }

  @Unroll
  def "sanityCheck #method #url"() {
    given:
    def requestBuilder = buildRequest(method, url, pathParams)
    headers.each { k, v -> requestBuilder.header(k, v) }
    queryParams.each { k, v -> requestBuilder.param(k, v) }
    if (requestBody != null) {
      requestBuilder.content(requestBody).contentType(APPLICATION_JSON)
    }

    when:
    mockMvc.perform(requestBuilder.accept(APPLICATION_JSON))

    then:
    def logOutput = outputCapture.toString()
    assertLogFilterOutput(logOutput, method, resolvePathParameters(url, pathParams))
    assertLogAspectOutput(logOutput)
    assertMaskingPatternLayoutOutput(logOutput)
    assertTraceIdFilterOutput(logOutput)

    // Reset output capture for next iteration
    outputCapture.reset()

    where:
    method         | url               | pathParams | headers                                                                          | queryParams       | requestBody
    HttpMethod.GET | "/api/films/{id}" | [1]        | ["Authorization": "Bearer secret-token", "X-Api-Key": "my-secret-key"] as Map   | [:] as Map        | null
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const SanityCheckSpringBootTests = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <SanityCheckSpringBootTestJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <SanityCheckSpringBootTestKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <SanityCheckSpringBootSpecGroovy />
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
