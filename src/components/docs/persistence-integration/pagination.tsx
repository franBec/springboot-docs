import {CollapsibleCodeBlock} from "@site/src/components/collapsible-code-block";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import {FileTreeInfo} from "@site/src/components/file-tree-info";
import ZoomContainer from '@site/src/components/zoom-container';
import Mermaid from '@theme/Mermaid';

const BuildGradleGroovy = () => (
  <CollapsibleCodeBlock language="groovy" title="build.gradle">
    {`// ...
dependencies {
  //...
// highlight-added
  implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:3.0.2'
}
// ...
openApiGenerate {
  // ...
  configOptions = [
    // ...
// highlight-added
    useSpringDataPageable     : "true",
  ]
}
// ...`}
  </CollapsibleCodeBlock>
)

const BuildGradleKts = () => (
  <CollapsibleCodeBlock language="kts" title="build.gradle.kts">
    {`// ...
dependencies {
  //...
// highlight-added
  implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:3.0.2")
}
// ...
tasks.register<org.openapitools.generator.gradle.plugin.tasks.GenerateTask>("generateOpenApi") {
  // ...
  configOptions.set(
      mapOf(
          // ...
// highlight-added
          "useSpringDataPageable" to "true",
      )
  )
}
// ...`}
  </CollapsibleCodeBlock>
)

export const BuildGradle = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <BuildGradleGroovy />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <BuildGradleKts />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <BuildGradleGroovy />
    </TabItem>
  </Tabs>
);

const FilmRestControllerJava = () => (
  <CollapsibleCodeBlock language="java" title="java/dev/pollito/spring_java/sakila/film/adapter/in/rest/FilmRestController.java">
    {`// ...
// highlight-added-start
import dev.pollito.spring_java.sakila.film.domain.port.in.FindAllPortIn;
import org.springframework.data.domain.Pageable;
// highlight-added-end
// ...
public class FilmRestController implements FilmsApi {
// highlight-added
  private final FindAllPortIn findAllPortIn;
  // ...
  @Override
// highlight-added-start
  public ResponseEntity<FilmListResponse> findAll(Pageable pageable) {
    return ok(
        new FilmListResponse()
            .data(mapper.convert(findAllPortIn.findAll(pageable)))
            .instance(request.getRequestURI())
            .timestamp(now())
            .trace(current().getSpanContext().getTraceId())
            .status(OK.value()));
// highlight-added-end
  }
  // ...
}`}
  </CollapsibleCodeBlock>
)

const FilmRestControllerKt = () => (
  <CollapsibleCodeBlock language="kt" title="kotlin/dev/pollito/spring_kotlin/sakila/film/adapter/in/rest/FilmRestController.kt">
    {`// ...
// highlight-added-start
import dev.pollito.spring_kotlin.sakila.film.domain.port.\`in\`.FindAllPortIn
import org.springframework.data.domain.Pageable
// highlight-added-end
// ...
class FilmRestController(
// highlight-added
    private val findAllPortIn: FindAllPortIn,
    // ...
) : FilmsApi {
// highlight-added-start
  override fun findAll(pageable: Pageable): ResponseEntity<FilmListResponse> {
    return ok(
        FilmListResponse(
            data = mapper.convert(findAllPortIn.findAll(pageable)),
            instance = request.requestURI,
            timestamp = now(),
            trace = current().spanContext.traceId,
            status = OK.value(),
        )
    )
// highlight-added-end
  }
  // ...
}`}
  </CollapsibleCodeBlock>
)

const FilmRestControllerGroovy = () => (
  <CollapsibleCodeBlock language="groovy" title="groovy/dev/pollito/spring_groovy/sakila/film/adapter/in/rest/FilmRestController.groovy">
    {`// ...
// highlight-added-start
import dev.pollito.spring_groovy.sakila.film.domain.port.in.FindAllPortIn
import org.springframework.data.domain.Pageable
// highlight-added-end
// ...
class FilmRestController implements FilmsApi {
// highlight-added
  FindAllPortIn findAllPortIn
  // ...
  @Override
// highlight-added-start
  ResponseEntity<FilmListResponse> findAll(Pageable pageable) {
    ok(
        new FilmListResponse(
        data: mapper.convert(findAllPortIn.findAll(pageable)),
        instance: request.requestURI,
        timestamp: now(),
        trace: Span.current().spanContext.traceId,
        status: OK.value()
        )
        )
// highlight-added-end
  }
  // ...
}`}
  </CollapsibleCodeBlock>
)

export const FilmRestController = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <FilmRestControllerJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <FilmRestControllerKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <FilmRestControllerGroovy />
    </TabItem>
  </Tabs>
)

const FilmRestMapperJava = () => (
  <CollapsibleCodeBlock language="java" title="java/dev/pollito/spring_java/sakila/film/adapter/in/rest/FilmRestMapper.java">
    {`// ...
// highlight-added-start
import dev.pollito.spring_java.generated.model.FilmListResponseAllOfData;
import org.springframework.data.domain.Page;
// highlight-added-end
// ...
public interface FilmRestMapper
    extends Converter<Film, dev.pollito.spring_java.generated.model.Film> {
  // ...
// highlight-added
  FilmListResponseAllOfData convert(Page<Film> filmPageable);
}`}
  </CollapsibleCodeBlock>
)

const FilmRestMapperKt = () => (
  <CollapsibleCodeBlock language="kt" title="kotlin/dev/pollito/spring_kotlin/sakila/film/adapter/in/rest/FilmRestMapper.kt">
    {`// ...
// highlight-added-start
import dev.pollito.spring_kotlin.generated.model.FilmListResponseAllOfData
import org.mapstruct.Mapping
import org.springframework.data.domain.Page
// highlight-added-end
// ...
interface FilmRestMapper : Converter<Film, dev.pollito.spring_kotlin.generated.model.Film> {
  // ...
// highlight-added-start
  fun filmListToFilmList(list: List<Film>): List<dev.pollito.spring_kotlin.generated.model.Film>

  @Mapping(
      target = "content",
      expression =
          "java(source.hasContent() ? filmListToFilmList(source.getContent()) : java.util.Collections.emptyList())",
  )
  fun convert(source: Page<Film>): FilmListResponseAllOfData
// highlight-added-end
}`}
  </CollapsibleCodeBlock>
)

const FilmRestMapperGroovy = () => (
  <CollapsibleCodeBlock language="groovy" title="groovy/dev/pollito/spring_groovy/sakila/film/adapter/in/rest/FilmRestMapper.groovy">
    {`// ...
// highlight-added-start
import dev.pollito.spring_groovy.generated.model.FilmListResponseAllOfData
import dev.pollito.spring_groovy.generated.model.Pageable as PageableDto
import org.springframework.data.domain.Page
// highlight-added-end
// ...
class FilmRestMapper {
  // ...
// highlight-added-start
  FilmListResponseAllOfData convert(Page<DomainFilm> source) {
    new FilmListResponseAllOfData(
        content: source.content.collect { convert(it) },
        pageable: new PageableDto(
        pageNumber: source.pageable.pageNumber,
        pageSize: source.pageable.pageSize,
        ),
        totalElements: (int) source.totalElements,
        totalPages: source.totalPages,
        )
  }
// highlight-added-end
}`}
  </CollapsibleCodeBlock>
)

export const FilmRestMapper = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <FilmRestMapperJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <FilmRestMapperKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <FilmRestMapperGroovy />
    </TabItem>
  </Tabs>
)

const FilmJpaMapperJava = () => (
  <CollapsibleCodeBlock language="java" title="java/dev/pollito/spring_java/sakila/film/adapter/out/jpa/FilmJpaMapper.java">
    {`// ...
// highlight-added-start
import static java.util.Objects.requireNonNull;
import org.jspecify.annotations.NonNull;
import org.springframework.data.domain.Page;
// highlight-added-end
// ...
public interface FilmJpaMapper
    extends Converter<dev.pollito.spring_java.generated.entity.Film, Film> {
  // ...
// highlight-added-start
  default Page<Film> convert(@NonNull Page<dev.pollito.spring_java.generated.entity.Film> source) {
    return source.map(it -> requireNonNull(this.convert(it)));
  }
// highlight-added-end
}`}
  </CollapsibleCodeBlock>
)

const FilmJpaMapperKt = () => (
  <CollapsibleCodeBlock language="kt" title="kotlin/dev/pollito/spring_kotlin/sakila/film/adapter/out/jpa/FilmJpaMapper.kt">
    {`// ...
// highlight-added
import org.springframework.data.domain.Page
// ...
interface FilmJpaMapper : Converter<dev.pollito.spring_kotlin.generated.entity.Film, Film> {
  //...
// highlight-added-start
  fun convert(source: Page<dev.pollito.spring_kotlin.generated.entity.Film>): Page<Film> =
      source.map { convert(it) }
// highlight-added-end
}`}
  </CollapsibleCodeBlock>
)

const FilmJpaMapperGroovy = () => (
  <CollapsibleCodeBlock language="groovy" title="groovy/dev/pollito/spring_groovy/sakila/film/adapter/out/jpa/FilmJpaMapper.groovy">
    {`// ...
// highlight-added
import org.springframework.data.domain.Page
// ...
class FilmJpaMapper {
    // ...
// highlight-added-start
    Page<DomainFilm> convert(Page<EntityFilm> source) {
        source.map { convert(it as EntityFilm) }
    }
// highlight-added-end
}`}
  </CollapsibleCodeBlock>
)

export const FilmJpaMapper = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <FilmJpaMapperJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <FilmJpaMapperKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <FilmJpaMapperGroovy />
    </TabItem>
  </Tabs>
)

const FindAllPortInJava = () => (
  <CollapsibleCodeBlock language="java" title="java/dev/pollito/spring_java/sakila/film/domain/port/in/FindAllPortIn.java">
    {`// highlight-added-start
package dev.pollito.spring_java.sakila.film.domain.port.in;

import dev.pollito.spring_java.sakila.film.domain.model.Film;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FindAllPortIn {
  Page<Film> findAll(Pageable pageable);
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
)

const FindAllPortInKt = () => (
  <CollapsibleCodeBlock language="kt" title="kotlin/dev/pollito/spring_kotlin/sakila/film/domain/port/in/FindAllPortIn.kt">
    {`// highlight-added-start
package dev.pollito.spring_kotlin.sakila.film.domain.port.\`in\`

import dev.pollito.spring_kotlin.sakila.film.domain.model.Film
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable

interface FindAllPortIn {
  fun findAll(pageable: Pageable): Page<Film>
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
)

const FindAllPortInGroovy = () => (
  <CollapsibleCodeBlock language="groovy" title="groovy/dev/pollito/spring_groovy/sakila/film/domain/port/in/FindAllPortIn.groovy">
    {`// highlight-added-start
package dev.pollito.spring_groovy.sakila.film.domain.port.in

import dev.pollito.spring_groovy.sakila.film.domain.model.Film
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable

interface FindAllPortIn {
  Page<Film> findAll(Pageable pageable)
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
)

export const FindAllPortIn = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <FindAllPortInJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <FindAllPortInKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <FindAllPortInGroovy />
    </TabItem>
  </Tabs>
)

const FindAllPortInImplJava = () => (
  <CollapsibleCodeBlock language="java" title="java/dev/pollito/spring_java/sakila/film/domain/port/in/FindAllPortInImpl.java">
    {`// highlight-added-start
package dev.pollito.spring_java.sakila.film.domain.port.in;

import dev.pollito.spring_java.sakila.film.domain.model.Film;
import dev.pollito.spring_java.sakila.film.domain.port.out.FindAllPortOut;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FindAllPortInImpl implements FindAllPortIn {
  private final FindAllPortOut findAllPortOut;

  @Override
  public Page<Film> findAll(Pageable pageable) {
    return findAllPortOut.findAll(pageable);
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
)

const FindAllPortInImplKt = () => (
  <CollapsibleCodeBlock language="kt" title="kotlin/dev/pollito/spring_kotlin/sakila/film/domain/port/in/FindAllPortInImpl.kt">
    {`// highlight-added-start
package dev.pollito.spring_kotlin.sakila.film.domain.port.\`in\`

import dev.pollito.spring_kotlin.sakila.film.domain.model.Film
import dev.pollito.spring_kotlin.sakila.film.domain.port.out.FindAllPortOut
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service

@Service
class FindAllPortInImpl(private val findAllPortOut: FindAllPortOut) : FindAllPortIn {
  override fun findAll(pageable: Pageable): Page<Film> = findAllPortOut.findAll(pageable)
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
)

const FindAllPortInImplGroovy = () => (
  <CollapsibleCodeBlock language="groovy" title="groovy/dev/pollito/spring_groovy/sakila/film/domain/port/in/FindAllPortInImpl.groovy">
    {`// highlight-added-start
package dev.pollito.spring_groovy.sakila.film.domain.port.in

import dev.pollito.spring_groovy.sakila.film.domain.model.Film
import dev.pollito.spring_groovy.sakila.film.domain.port.out.FindAllPortOut
import groovy.transform.CompileStatic
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service

@Service
@CompileStatic
class FindAllPortInImpl implements FindAllPortIn {
  private final FindAllPortOut findAllPortOut

  FindAllPortInImpl(FindAllPortOut findAllPortOut) {
    this.findAllPortOut = findAllPortOut
  }

  @Override
  Page<Film> findAll(Pageable pageable) {
    findAllPortOut.findAll(pageable)
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
)

export const FindAllPortInImpl = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <FindAllPortInImplJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <FindAllPortInImplKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <FindAllPortInImplGroovy />
    </TabItem>
  </Tabs>
)

const FindAllPortOutJava = () => (
  <CollapsibleCodeBlock language="java" title="java/dev/pollito/spring_java/sakila/film/domain/port/out/FindAllPortOut.java">
    {`// highlight-added-start
package dev.pollito.spring_java.sakila.film.domain.port.out;

import dev.pollito.spring_java.sakila.film.domain.model.Film;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FindAllPortOut {
  Page<Film> findAll(Pageable pageable);
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
)

const FindAllPortOutKt = () => (
  <CollapsibleCodeBlock language="kt" title="kotlin/dev/pollito/spring_kotlin/sakila/film/domain/port/out/FindAllPortOut.kt">
    {`// highlight-added-start
package dev.pollito.spring_kotlin.sakila.film.domain.port.out

import dev.pollito.spring_kotlin.sakila.film.domain.model.Film
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable

interface FindAllPortOut {
  fun findAll(pageable: Pageable): Page<Film>
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
)

const FindAllPortOutGroovy = () => (
  <CollapsibleCodeBlock language="groovy" title="groovy/dev/pollito/spring_groovy/sakila/film/domain/port/out/FindAllPortOut.groovy">
    {`// highlight-added-start
package dev.pollito.spring_groovy.sakila.film.domain.port.out

import dev.pollito.spring_groovy.sakila.film.domain.model.Film
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable

interface FindAllPortOut {
  Page<Film> findAll(Pageable pageable)
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
)

export const FindAllPortOut = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <FindAllPortOutJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <FindAllPortOutKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <FindAllPortOutGroovy />
    </TabItem>
  </Tabs>
)

const FindAllPortOutImplJava = () => (
  <CollapsibleCodeBlock language="java" title="java/dev/pollito/spring_java/sakila/film/domain/port/out/FindAllPortOutImpl.java">
    {`// highlight-added-start
package dev.pollito.spring_java.sakila.film.domain.port.out;

import dev.pollito.spring_java.sakila.film.adapter.out.jpa.FilmJpaMapper;
import dev.pollito.spring_java.sakila.film.adapter.out.jpa.FilmJpaRepository;
import dev.pollito.spring_java.sakila.film.domain.model.Film;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FindAllPortOutImpl implements FindAllPortOut {
  private final FilmJpaRepository repository;
  private final FilmJpaMapper mapper;

  @Override
  public Page<Film> findAll(Pageable pageable) {
    return mapper.convert(repository.findAll(pageable));
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
)

const FindAllPortOutImplKt = () => (
  <CollapsibleCodeBlock language="kt" title="kotlin/dev/pollito/spring_kotlin/sakila/film/domain/port/out/FindAllPortOutImpl.kt">
    {`// highlight-added-start
package dev.pollito.spring_kotlin.sakila.film.domain.port.out

import dev.pollito.spring_kotlin.sakila.film.adapter.out.jpa.FilmJpaMapper
import dev.pollito.spring_kotlin.sakila.film.adapter.out.jpa.FilmJpaRepository
import dev.pollito.spring_kotlin.sakila.film.domain.model.Film
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service

@Service
class FindAllPortOutImpl(
    private val repository: FilmJpaRepository,
    private val mapper: FilmJpaMapper,
) : FindAllPortOut {
  override fun findAll(pageable: Pageable): Page<Film> =
      mapper.convert(repository.findAll(pageable))
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
)

const FindAllPortOutImplGroovy = () => (
  <CollapsibleCodeBlock language="groovy" title="groovy/dev/pollito/spring_groovy/sakila/film/domain/port/out/FindAllPortOutImpl.groovy">
    {`// highlight-added-start
package dev.pollito.spring_groovy.sakila.film.domain.port.out

import dev.pollito.spring_groovy.sakila.film.adapter.out.jpa.FilmJpaMapper
import dev.pollito.spring_groovy.sakila.film.adapter.out.jpa.FilmJpaRepository
import dev.pollito.spring_groovy.sakila.film.domain.model.Film
import groovy.transform.CompileStatic
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service

@Service
@CompileStatic
class FindAllPortOutImpl implements FindAllPortOut {
  private final FilmJpaRepository repository
  private final FilmJpaMapper mapper

  FindAllPortOutImpl(FilmJpaRepository repository, FilmJpaMapper mapper) {
    this.repository = repository
    this.mapper = mapper
  }

  @Override
  Page<Film> findAll(Pageable pageable) {
    mapper.convert(repository.findAll(pageable))
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
)

export const FindAllPortOutImpl = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <FindAllPortOutImplJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <FindAllPortOutImplKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <FindAllPortOutImplGroovy />
    </TabItem>
  </Tabs>
)

export const ApplicationYamlDataWebPageable = () => (
  <CollapsibleCodeBlock language="yaml" title="resources/application-*.yaml">
    {`spring:
// highlight-added-start
  data:
    web:
      pageable:
        default-page-size: 10
        max-page-size: 100
// highlight-added-end
  # ...`}
  </CollapsibleCodeBlock>
)

export const OpenapiYamlPaginationModifications = () => (
  <CollapsibleCodeBlock language="yaml" title="resources/openapi.yaml">
    {`# ...
paths:
  /films:
    get:
// highlight-added
      x-spring-paginated: true
      tags:
        - Films
      operationId: findAll
      summary: List all films
// highlight-added-start
      parameters:
        - name: page
          in: query
          description: Page number (0-based index)
          schema:
            type: integer
            default: 0
            minimum: 0
            maximum: 2147483647
          required: false
        - name: size
          in: query
          description: Number of items per page
          schema:
            type: integer
            default: 10
            minimum: 1
            maximum: 100
          required: false
        - name: sort
          in: query
          description:
            Sort criteria format \`property,asc|desc\`. Multiple sort parameters allowed.
          schema:
            type: array
            items:
              type: string
              example: "name,asc"
          style: form
          explode: true
          required: false
// highlight-added-end
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/FilmListResponse'
        default:
          description: Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
# ...
components:
  schemas:
    # ...
// highlight-added-start
    Page:
      type: object
      description: Sublist of a list of objects. It allows to gain information about the position of it in the containing entire list
      properties:
        content:
          default: []

          items: {}
          type: array
        pageable:
          $ref: "#/components/schemas/Pageable"
        totalElements:
          default: 0
          description: Total number of items that meet the criteria
          example: 10
          type: integer
        totalPages:
          default: 0
          description: Total pages of items that meet the criteria
          example: 10
          type: integer
      required:
        - content
        - pageable
        - totalElements
        - totalPages
    Pageable:
      type: object
      description: Pagination information
      properties:
        pageNumber:
          description: Current page number (starts from 0)
          example: 0
          minimum: 0
          maximum: 2147483647
          type: integer
        pageSize:
          description: Number of items retrieved on this page
          example: 10
          minimum: 0
          maximum: 2147483647
          type: integer
      required:
        - pageNumber
        - pageSize
// highlight-added-end
    FilmListResponse:
      allOf:
        - $ref: '#/components/schemas/ResponseMetadata'
        - type: object
          properties:
            data:
// highlight-added-start
              allOf:
                - $ref: "#/components/schemas/Page"
                - type: object
                  properties:
                    content:
                      default: []
                      items:
                        $ref: "#/components/schemas/Film"
                      type: array
// highlight-added-end
          required:
            - data
`}
  </CollapsibleCodeBlock>
)

const FilmRestControllerMockMvcTestJava = () => (
  <CollapsibleCodeBlock language="java" title="java/dev/pollito/spring_java/sakila/film/adapter/in/rest/FilmRestControllerMockMvcTest.java">
    {`// ...
// highlight-added-start
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
// highlight-added-end
// ...
class FilmRestControllerMockMvcTest {
  // ...
  @Test
// highlight-modified-start
  void findAllReturnsOK() throws Exception {
    when(findAllPortIn.findAll(any(Pageable.class)))
        .thenReturn(new PageImpl<>(List.of(), PageRequest.of(0, 20), 0));
// highlight-modified-end

    mockMvc
        .perform(get(FILMS_PATH).accept(APPLICATION_JSON))
// highlight-added-start
        .andExpect(status().isOk())
        .andExpect(content().contentType(APPLICATION_JSON))
        .andExpect(hasStandardApiResponseFields(FILMS_PATH, OK))
        .andExpect(hasPageFields());
// highlight-added-end
  }
}`}
  </CollapsibleCodeBlock>
)

const FilmRestControllerMockMvcTestKt = () => (
  <CollapsibleCodeBlock language="kt" title="kotlin/dev/pollito/spring_kotlin/sakila/film/adapter/in/rest/FilmRestControllerMockMvcTest.kt">
    {`// ...
// highlight-added-start
import dev.pollito.spring_kotlin.sakila.film.domain.port.\`in\`.FindAllPortIn
import dev.pollito.spring_kotlin.test.util.hasPageFields
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
// highlight-added-end
// ...
class FilmRestControllerMockMvcTest {
  // ...
  @MockkBean private lateinit var findAllPortIn: FindAllPortIn
  // ...
  @Test
// highlight-modified-start
  fun \`findAll returns OK\`() {
    every { findAllPortIn.findAll(any<Pageable>()) } returns
        PageImpl(listOf(), PageRequest.of(0, 20), 0)
// highlight-modified-end

    mockMvc
        .get(API_FILMS) { accept = APPLICATION_JSON }
        .andExpect {
// highlight-modified-start
          status { isOk() }
          hasStandardApiResponseFields(API_FILMS, OK)
          hasPageFields()
// highlight-modified-end
        }
  }
}`}
  </CollapsibleCodeBlock>
)

const FilmRestControllerMockMvcSpec = () => (
  <CollapsibleCodeBlock language="groovy" title="groovy/dev/pollito/spring_groovy/sakila/film/adapter/in/rest/FilmRestControllerMockMvcSpec.groovy">
    {`// ...
// highlight-added-start
import dev.pollito.spring_groovy.sakila.film.domain.port.in.FindAllPortIn
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
// highlight-added-end
// ...
class FilmRestControllerMockMvcSpec extends Specification implements MockMvcResultMatchersTrait {
  // ...
// highlight-added-start
  @SpringBean
  FindAllPortIn findAllPortIn = Mock()
// highlight-added-end
// ...
// highlight-modified-start
  def "findAll returns OK"() {
    given: "a mocked findAll port"
    findAllPortIn.findAll(_ as Pageable) >> new PageImpl([], PageRequest.of(0, 20), 0)
// highlight-modified-end

    when: "findAll is requested"
    def result = mockMvc.perform(
        get(FILMS_PATH)
        .accept(APPLICATION_JSON)
        )

// highlight-modified
    then: "response is OK"
    result
// highlight-added-start
        .andExpect(status().isOk())
        .andExpect(content().contentType(APPLICATION_JSON))
        .andExpect(hasStandardApiResponseFields(FILMS_PATH, OK))
        .andExpect(hasPageFields())
// highlight-added-end
  }
}`}
  </CollapsibleCodeBlock>
)

export const FilmRestControllerMockMvc = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <FilmRestControllerMockMvcTestJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <FilmRestControllerMockMvcTestKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <FilmRestControllerMockMvcSpec />
    </TabItem>
  </Tabs>
)

const FindAllPortInImplTestJava = () => (
  <CollapsibleCodeBlock language="java" title="java/dev/pollito/spring_java/sakila/film/domain/port/in/FindAllPortInImplTest.java">
    {`// highlight-added-start
package dev.pollito.spring_java.sakila.film.domain.port.in;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import dev.pollito.spring_java.sakila.film.domain.port.out.FindAllPortOut;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@ExtendWith(MockitoExtension.class)
class FindAllPortInImplTest {
  @InjectMocks private FindAllPortInImpl findAllPortIn;
  @Mock private FindAllPortOut findAllPortOut;

  @Test
  void findAllReturnsAPage() {
    when(findAllPortOut.findAll(any(Pageable.class)))
        .thenReturn(new PageImpl<>(List.of(), PageRequest.of(0, 20), 0));
    assertNotNull(findAllPortIn.findAll(PageRequest.of(0, 20)));
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
)

const FindAllPortInImplTestKt = () => (
  <CollapsibleCodeBlock language="kt" title="kotlin/dev/pollito/spring_kotlin/sakila/film/domain/port/in/FindAllPortInImplTest.kt">
    {`// highlight-added-start
package dev.pollito.spring_kotlin.sakila.film.domain.port.\`in\`

import dev.pollito.spring_kotlin.sakila.film.domain.port.out.FindAllPortOut
import io.mockk.every
import io.mockk.impl.annotations.InjectMockKs
import io.mockk.impl.annotations.MockK
import io.mockk.junit5.MockKExtension
import kotlin.test.Test
import kotlin.test.assertNotNull
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable

@ExtendWith(MockKExtension::class)
class FindAllPortInImplTest {
  @MockK private lateinit var findAllPortOut: FindAllPortOut
  @InjectMockKs private lateinit var findAllPortInImpl: FindAllPortInImpl

  @Test
  fun \`findAll returns a page\`() {
    every { findAllPortOut.findAll(any<Pageable>()) } returns
        PageImpl(listOf(), PageRequest.of(0, 20), 0)
    assertNotNull(findAllPortInImpl.findAll(PageRequest.of(0, 20)))
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
)

const FindAllPortInImplSpec = () => (
  <CollapsibleCodeBlock language="groovy" title="groovy/dev/pollito/spring_groovy/sakila/film/domain/port/in/FindAllPortInImplSpec.groovy">
    {`// highlight-added-start
package dev.pollito.spring_groovy.sakila.film.domain.port.in

import dev.pollito.spring_groovy.sakila.film.domain.port.out.FindAllPortOut
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import spock.lang.Specification
import spock.lang.Subject

class FindAllPortInImplSpec extends Specification {
  FindAllPortOut findAllPortOut = Mock()
  @Subject FindAllPortInImpl findAllPortIn = new FindAllPortInImpl(findAllPortOut)

  def "findAll returns a page"() {
    given: "a mocked secondary port behavior"
    findAllPortOut.findAll(_ as Pageable) >> new PageImpl([], PageRequest.of(0, 20), 0)

    when: "findAll is called"
    def result = findAllPortIn.findAll(PageRequest.of(0, 20))

    then: "a page is returned"
    result != null
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
)

export const FindAllPortInImplTest = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <FindAllPortInImplTestJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <FindAllPortInImplTestKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <FindAllPortInImplSpec />
    </TabItem>
  </Tabs>
)

const FindAllPortOutImplDataJpaTestJava = () => (
  <CollapsibleCodeBlock language="java" title="java/dev/pollito/spring_java/sakila/film/domain/port/out/FindAllPortOutImplDataJpaTest.java">
    {`// highlight-added-start
package dev.pollito.spring_java.sakila.film.domain.port.out;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_CLASS;

import dev.pollito.spring_java.sakila.film.adapter.out.jpa.FilmJpaMapperImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

@DataJpaTest
@ActiveProfiles("test")
@Import({FindAllPortOutImpl.class, FilmJpaMapperImpl.class})
@Sql(
    scripts = {"/sakila-schema.sql", "/sakila-data.sql"},
    executionPhase = BEFORE_TEST_CLASS)
class FindAllPortOutImplDataJpaTest {

  @SuppressWarnings("unused")
  @Autowired
  private FindAllPortOut findAllPortOut;

  @Test
  void findAll_shouldReturnPagedResults() {
    var result = findAllPortOut.findAll(PageRequest.of(0, 10));

    assertNotNull(result);
    assertFalse(result.isEmpty());
    assertEquals(10, result.getNumberOfElements());
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
)

const FindAllPortOutImplDataJpaTestKt = () => (
  <CollapsibleCodeBlock language="kt" title="kotlin/dev/pollito/spring_kotlin/sakila/film/domain/port/out/FindAllPortOutImplDataJpaTest.kt">
    {`// highlight-added-start
package dev.pollito.spring_kotlin.sakila.film.domain.port.out

import dev.pollito.spring_kotlin.sakila.film.adapter.out.jpa.FilmJpaMapperImpl
import kotlin.test.Test
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertNotNull
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest
import org.springframework.context.annotation.Import
import org.springframework.data.domain.PageRequest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.jdbc.Sql
import org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_CLASS

@DataJpaTest
@ActiveProfiles("test")
@Import(FindAllPortOutImpl::class, FilmJpaMapperImpl::class)
@Sql(
    scripts = ["/sakila-schema.sql", "/sakila-data.sql"],
    executionPhase = BEFORE_TEST_CLASS,
)
class FindAllPortOutImplDataJpaTest {

  @Autowired private lateinit var findAllPortOut: FindAllPortOut

  @Test
  fun \`findAll should return paged results\`() {
    val result = findAllPortOut.findAll(PageRequest.of(0, 10))

    assertNotNull(result)
    assertFalse(result.isEmpty)
    assertEquals(10, result.numberOfElements)
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
)

const FindAllPortOutImplDataJpaSpec = () => (
  <CollapsibleCodeBlock language="groovy" title="groovy/dev/pollito/spring_groovy/sakila/film/domain/port/out/FindAllPortOutImplDataJpaSpec.groovy">
    {`// highlight-added-start
package dev.pollito.spring_groovy.sakila.film.domain.port.out

import static org.junit.jupiter.api.Assertions.assertEquals
import static org.junit.jupiter.api.Assertions.assertFalse
import static org.junit.jupiter.api.Assertions.assertNotNull
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_CLASS

import dev.pollito.spring_groovy.config.mapper.ModelMapperConfig
import dev.pollito.spring_groovy.sakila.film.adapter.out.jpa.FilmJpaMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest
import org.springframework.context.annotation.Import
import org.springframework.data.domain.PageRequest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.jdbc.Sql
import spock.lang.Specification

@DataJpaTest
@ActiveProfiles("test")
@Import([FindAllPortOutImpl, FilmJpaMapper, ModelMapperConfig])
@Sql(scripts = ["/sakila-schema.sql", "/sakila-data.sql"], executionPhase = BEFORE_TEST_CLASS)
class FindAllPortOutImplDataJpaSpec extends Specification {

  @Autowired
  FindAllPortOut findAllPortOut

  def "findAll should return paged results"() {
    when:
    def result = findAllPortOut.findAll(PageRequest.of(0, 10))

    then:
    assertNotNull(result)
    assertFalse(result.isEmpty())
    assertEquals(10, result.numberOfElements)
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
)

export const FindAllPortOutImplDataJpa = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <FindAllPortOutImplDataJpaTestJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <FindAllPortOutImplDataJpaTestKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <FindAllPortOutImplDataJpaSpec />
    </TabItem>
  </Tabs>
)

const MockMvcResultMatchersJava = () => (
  <CollapsibleCodeBlock language="java" title="java/dev/pollito/spring_java/test/util/MockMvcResultMatchers.java">
    {`// ...
public final class MockMvcResultMatchers {
  // ...
// highlight-added-start
  public static ResultMatcher hasPageFields() {
    return result -> {
      jsonPath("$.data.content").isArray().match(result);
      jsonPath("$.data.pageable.pageNumber").isNumber().match(result);
      jsonPath("$.data.pageable.pageSize").isNumber().match(result);
      jsonPath("$.data.totalElements").isNumber().match(result);
      jsonPath("$.data.totalPages").isNumber().match(result);
    };
  }
// highlight-added-end
}`}
  </CollapsibleCodeBlock>
)

const MockMvcResultMatchersDsl = () => (
  <CollapsibleCodeBlock language="kt" title="kotlin/dev/pollito/spring_kotlin/test/util/MockMvcResultMatchersDsl.kt">
    {`// ...
// highlight-added-start
fun MockMvcResultMatchersDsl.hasPageFields() {
  jsonPath("$.data.content") { isArray() }
  jsonPath("$.data.pageable.pageNumber") { isNumber() }
  jsonPath("$.data.pageable.pageSize") { isNumber() }
  jsonPath("$.data.totalElements") { isNumber() }
  jsonPath("$.data.totalPages") { isNumber() }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
)

const MockMvcResultMatchersTrait = () => (
  <CollapsibleCodeBlock language="groovy" title="groovy/dev/pollito/spring_groovy/test/util/MockMvcResultMatchersTrait.groovy">
    {`// ...
trait MockMvcResultMatchersTrait {
  // ...
// highlight-added-start
  ResultMatcher hasPageFields() {
    { result ->
      jsonPath('$.data.content').isArray().match(result as MvcResult)
      jsonPath('$.data.pageable.pageNumber').isNumber().match(result as MvcResult)
      jsonPath('$.data.pageable.pageSize').isNumber().match(result as MvcResult)
      jsonPath('$.data.totalElements').isNumber().match(result as MvcResult)
      jsonPath('$.data.totalPages').isNumber().match(result as MvcResult)
    }
  }
// highlight-added-end
}`}
  </CollapsibleCodeBlock>
)

export const MockMvcResultMatchers = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <MockMvcResultMatchersJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <MockMvcResultMatchersDsl />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <MockMvcResultMatchersTrait />
    </TabItem>
  </Tabs>
)

const SanityCheckSpringBootTestJava = () => (
  <CollapsibleCodeBlock language="java" title="java/dev/pollito/spring_java/SanityCheckSpringBootTest.java">
    {`// ...
class SanityCheckSpringBootTest {
  // ...
  static @NonNull Stream<TestCase> sanityCheckTestCases() {
    return Stream.of(
        // ...
// highlight-added-start
        new TestCase(
            HttpMethod.GET,
            "/api/films",
            Collections.emptyList(),
            Collections.emptyMap(),
            Collections.emptyMap(),
            null)
// highlight-added-end
        );
  }
}`}
  </CollapsibleCodeBlock>
)

const SanityCheckSpringBootTestKt = () => (
  <CollapsibleCodeBlock language="kt" title="kotlin/dev/pollito/spring_kotlin/SanityCheckSpringBootTest.kt">
    {`// ...
class SanityCheckSpringBootTest {
  // ...
  companion object {
    @JvmStatic
    fun sanityCheckTestCases(): List<TestCase> =
        listOf(
            // ...
// highlight-added-start
            TestCase(
                method = HttpMethod.GET,
                url = "/api/films",
            )
// highlight-added-end
        )
  }
}`}
  </CollapsibleCodeBlock>
)

const SanityCheckSpringBootSpec = () => (
  <CollapsibleCodeBlock language="groovy" title="groovy/dev/pollito/spring_groovy/SanityCheckSpringBootSpec.groovy">
    {`// ...
class SanityCheckSpringBootSpec extends Specification {
  // ...
  def "sanityCheck #method #url"() {
    given:
    // ...

    when:
    // ...

    then:
    // ...

    where:
    method         | url               | pathParams | headers                                                                          | queryParams       | requestBody
    // ...
// highlight-added
    HttpMethod.GET | "/api/films"      | []         | [:] as Map                                                                       | [:] as Map        | null
  }
}`}
  </CollapsibleCodeBlock>
)

export const SanityCheckSpringBoot = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <SanityCheckSpringBootTestJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <SanityCheckSpringBootTestKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <SanityCheckSpringBootSpec />
    </TabItem>
  </Tabs>
)

const FileTreeJava = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`├── ...
└── src
    ├── main
    │   ├── java
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_java
    │   │               └── sakila
    │   │                   └── film
    │   │                       ├── adapter
    │   │                       │   ├── in
    │   │                       │   │   └── rest
// highlight-modified-start
    │   │                       │   │       ├── FilmRestController.java
    │   │                       │   │       └── FilmRestMapper.java
// highlight-modified-end
    │   │                       │   └── out
    │   │                       │       └── jpa
// highlight-modified
    │   │                       │           └── FilmJpaMapper.java
    │   │                       └── domain
    │   │                           └── port
    │   │                               ├── in
// highlight-added-start
    │   │                               │   ├── FindAllPortIn.java
    │   │                               │   └── FindAllPortInImpl.java
// highlight-added-end
    │   │                               └── out
// highlight-added-start
    │   │                                   ├── FindAllPortOut.java
    │   │                                   └── FindAllPortOutImpl.java
// highlight-added-end
    │   └── resources
// highlight-modified-start
    │       ├── application.yaml
    │       ├── application-dev.yaml
    │       └── openapi.yaml
// highlight-modified-end
    └── test
        ├── java
        │   └── dev
        │       └── pollito
        │           └── spring_java
// highlight-modified
        │               ├── SanityCheckSpringBootTest.java
        │               ├── sakila
        │               │   └── film
        │               │       ├── adapter
        │               │       │   └── in
        │               │       │       └── rest
// highlight-modified
        │               │       │           └── FilmRestControllerMockMvcTest.java
        │               │       └── domain
        │               │           └── port
        │               │               ├── in
// highlight-added
        │               │               │   └── FindAllPortInImplTest.java
        │               │               └── out
// highlight-added
        │               │                   └── FindAllPortOutImplDataJpaTest.java
        │               └── test
        │                   └── util
// highlight-modified
        │                       └── MockMvcResultMatchers.java
        └── resources
// highlight-modified
            └── application-test.yaml`}
  </CollapsibleCodeBlock>
)

const FileTreeKt = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`├── ...
└── src
    ├── main
    │   ├── kotlin
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_kotlin
    │   │               └── sakila
    │   │                   └── film
    │   │                       ├── adapter
    │   │                       │   ├── in
    │   │                       │   │   └── rest
// highlight-modified-start
    │   │                       │   │       ├── FilmRestController.kt
    │   │                       │   │       └── FilmRestMapper.kt
// highlight-modified-end
    │   │                       │   └── out
    │   │                       │       └── jpa
// highlight-modified
    │   │                       │           └── FilmJpaMapper.kt
    │   │                       └── domain
    │   │                           └── port
    │   │                               ├── in
// highlight-added-start
    │   │                               │   ├── FindAllPortIn.kt
    │   │                               │   └── FindAllPortInImpl.kt
// highlight-added-end
    │   │                               └── out
// highlight-added-start
    │   │                                   ├── FindAllPortOut.kt
    │   │                                   └── FindAllPortOutImpl.kt
// highlight-added-end
    │   └── resources
// highlight-modified-start
    │       ├── application.yaml
    │       ├── application-dev.yaml
    │       └── openapi.yaml
// highlight-modified-end
    └── test
        ├── kotlin
        │   └── dev
        │       └── pollito
        │           └── spring_kotlin
// highlight-modified
        │               ├── SanityCheckSpringBootTest.kt
        │               ├── sakila
        │               │   └── film
        │               │       ├── adapter
        │               │       │   └── in
        │               │       │       └── rest
// highlight-modified
        │               │       │           └── FilmRestControllerMockMvcTest.kt
        │               │       └── domain
        │               │           └── port
        │               │               ├── in
// highlight-added
        │               │               │   └── FindAllPortInImplTest.kt
        │               │               └── out
// highlight-added
        │               │                   └── FindAllPortOutImplDataJpaTest.kt
        │               └── test
        │                   └── util
// highlight-modified
        │                       └── MockMvcResultMatchersDsl.kt
        └── resources
// highlight-modified
            └── application-test.yaml`}
  </CollapsibleCodeBlock>
)

const FileTreeGroovy = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`├── ...
└── src
    ├── main
    │   ├── groovy
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_groovy
    │   │               └── sakila
    │   │                   └── film
    │   │                       ├── adapter
    │   │                       │   ├── in
    │   │                       │   │   └── rest
// highlight-modified-start
    │   │                       │   │       ├── FilmRestController.groovy
    │   │                       │   │       └── FilmRestMapper.groovy
// highlight-modified-end
    │   │                       │   └── out
    │   │                       │       └── jpa
// highlight-modified
    │   │                       │           └── FilmJpaMapper.groovy
    │   │                       └── domain
    │   │                           └── port
    │   │                               ├── in
// highlight-added-start
    │   │                               │   ├── FindAllPortIn.groovy
    │   │                               │   └── FindAllPortInImpl.groovy
// highlight-added-end
    │   │                               └── out
// highlight-added-start
    │   │                                   ├── FindAllPortOut.groovy
    │   │                                   └── FindAllPortOutImpl.groovy
// highlight-added-end
    │   └── resources
// highlight-modified-start
    │       ├── application.yaml
    │       ├── application-dev.yaml
    │       └── openapi.yaml
// highlight-modified-end
    └── test
        ├── groovy
        │   └── dev
        │       └── pollito
        │           └── spring_groovy
// highlight-modified
        │               ├── SanityCheckSpringBootSpec.groovy
        │               ├── sakila
        │               │   └── film
        │               │       ├── adapter
        │               │       │   └── in
        │               │       │       └── rest
// highlight-modified
        │               │       │           └── FilmRestControllerMockMvcSpec.groovy
        │               │       └── domain
        │               │           └── port
        │               │               ├── in
// highlight-added
        │               │               │   └── FindAllPortInImplSpec.groovy
        │               │               └── out
// highlight-added
        │               │                   └── FindAllPortOutImplDataJpaSpec.groovy
        │               └── test
        │                   └── util
// highlight-modified
        │                       └── MockMvcResultMatchersTrait.groovy
        └── resources
// highlight-modified
            └── application-test.yaml`}
  </CollapsibleCodeBlock>
)

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
)

export const RequestFlowSequenceDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
        participant Client
        box Adapter In
            participant FilmRestController
            participant FilmRestMapper
        end
        box Domain
            participant FindAllPortInImpl
        end
        box Adapter Out
            participant FindAllPortOutImpl
            participant FilmJpaRepository
            participant FilmJpaMapper
        end
        participant Database

        Client->>FilmRestController: GET /api/films?page=0&size=10
        activate FilmRestController

        FilmRestController->>FindAllPortInImpl: findAll(pageable)
        activate FindAllPortInImpl

        FindAllPortInImpl->>FindAllPortOutImpl: findAll(pageable)
        activate FindAllPortOutImpl

        FindAllPortOutImpl->>FilmJpaRepository: findAll(pageable)
        activate FilmJpaRepository

        FilmJpaRepository->>Database: SELECT ... FROM FILM LIMIT 10 OFFSET 0
        Database-->>FilmJpaRepository: Page of rows

        FilmJpaRepository-->>FindAllPortOutImpl: Page<FilmEntity>
        deactivate FilmJpaRepository

        FindAllPortOutImpl->>FilmJpaMapper: convert(Page<Entity>)
        activate FilmJpaMapper
        FilmJpaMapper-->>FindAllPortOutImpl: Page<Domain Film>
        deactivate FilmJpaMapper

        FindAllPortOutImpl-->>FindAllPortInImpl: Page<Domain Film>
        deactivate FindAllPortOutImpl

        FindAllPortInImpl-->>FilmRestController: Page<Domain Film>
        deactivate FindAllPortInImpl

        FilmRestController->>FilmRestMapper: convert(Page<Domain Film>)
        activate FilmRestMapper
        FilmRestMapper-->>FilmRestController: FilmListResponseAllOfData
        deactivate FilmRestMapper

        FilmRestController-->>Client: HTTP 200 OK + JSON body
        deactivate FilmRestController`}
    />
  </ZoomContainer>
)

export const Terminal = () => (
  <CollapsibleCodeBlock language="log" title="Terminal">
    {`curl -s http://localhost:8080/api/films | jq

{
  "instance": "/api/films",
  "status": 200,
  "timestamp": "2026-03-19T23:54:21.27581481Z",
  "trace": "8eec221d5225be2bbf461937313a95a9",
  "data": {
    "content": [
      {
        "description": "A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies",
        "id": 1,
        "language": "English",
        "length": 86,
        "rating": "PG",
        "releaseYear": 2006,
        "title": "ACADEMY DINOSAUR"
      },
      {
        "description": "A Astounding Epistle of a Database Administrator And a Explorer who must Find a Car in Ancient China",
        "id": 2,
        "language": "English",
        "length": 48,
        "rating": "G",
        "releaseYear": 2006,
        "title": "ACE GOLDFINGER"
      },
      {
        "description": "A Astounding Reflection of a Lumberjack And a Car who must Sink a Lumberjack in A Baloon Factory",
        "id": 3,
        "language": "English",
        "length": 50,
        "rating": "NC-17",
        "releaseYear": 2006,
        "title": "ADAPTATION HOLES"
      },
      {
        "description": "A Fanciful Documentary of a Frisbee And a Lumberjack who must Chase a Monkey in A Shark Tank",
        "id": 4,
        "language": "English",
        "length": 117,
        "rating": "G",
        "releaseYear": 2006,
        "title": "AFFAIR PREJUDICE"
      },
      {
        "description": "A Fast-Paced Documentary of a Pastry Chef And a Dentist who must Pursue a Forensic Psychologist in The Gulf of Mexico",
        "id": 5,
        "language": "English",
        "length": 130,
        "rating": "G",
        "releaseYear": 2006,
        "title": "AFRICAN EGG"
      },
      {
        "description": "A Intrepid Panorama of a Robot And a Boy who must Escape a Sumo Wrestler in Ancient China",
        "id": 6,
        "language": "English",
        "length": 169,
        "rating": "PG",
        "releaseYear": 2006,
        "title": "AGENT TRUMAN"
      },
      {
        "description": "A Touching Saga of a Hunter And a Butler who must Discover a Butler in A Jet Boat",
        "id": 7,
        "language": "English",
        "length": 62,
        "rating": "PG-13",
        "releaseYear": 2006,
        "title": "AIRPLANE SIERRA"
      },
      {
        "description": "A Epic Tale of a Moose And a Girl who must Confront a Monkey in Ancient India",
        "id": 8,
        "language": "English",
        "length": 54,
        "rating": "R",
        "releaseYear": 2006,
        "title": "AIRPORT POLLOCK"
      },
      {
        "description": "A Thoughtful Panorama of a Database Administrator And a Mad Scientist who must Outgun a Mad Scientist in A Jet Boat",
        "id": 9,
        "language": "English",
        "length": 114,
        "rating": "PG-13",
        "releaseYear": 2006,
        "title": "ALABAMA DEVIL"
      },
      {
        "description": "A Action-Packed Tale of a Man And a Lumberjack who must Reach a Feminist in Ancient China",
        "id": 10,
        "language": "English",
        "length": 63,
        "rating": "NC-17",
        "releaseYear": 2006,
        "title": "ALADDIN CALENDAR"
      }
    ],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 10
    },
    "totalElements": 1000,
    "totalPages": 100
  }
}`}
  </CollapsibleCodeBlock>
)