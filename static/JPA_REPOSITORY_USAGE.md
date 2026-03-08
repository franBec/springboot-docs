# JPA Repository Usage

This document explains how Spring Data JPA repositories are used across the three modules (`spring_java`, `spring_kotlin`, `spring_groovy`). The focus is on wiring and usage — not on how JPA entities are generated from the Sakila schema.

---

## application-dev.yaml — Datasource / SQL / JPA / H2 Setup

Each module has an `application-dev.yaml` that activates when the `dev` Spring profile is active. All three are structurally identical; only the `spring.application.name` differs.

```yaml
# src/main/resources/application-dev.yaml
spring:
  application:
    name: spring_java          # spring_kotlin / spring_groovy in their respective modules
  datasource:
    url: jdbc:h2:mem:sakila;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE
    driver-class-name: org.h2.Driver
    username: sa
    password:
  sql:
    init:
      mode: always
      schema-locations: classpath:sakila-schema.sql
      data-locations: classpath:sakila-data.sql
  jpa:
    database-platform: org.hibernate.dialect.H2Dialect
    hibernate:
      ddl-auto: none           # schema is managed by sql.init, not Hibernate
    show-sql: true
    properties:
      hibernate:
        format_sql: true
  h2:
    console:
      enabled: true
      path: /h2-console
      settings:
        web-allow-others: false
```

Key decisions:
- **In-memory H2** (`jdbc:h2:mem:sakila`) — no external database needed for local development.
- **`ddl-auto: none`** — Hibernate does not create or alter tables; the schema is fully controlled by `sakila-schema.sql`.
- **`sql.init.mode: always`** — Spring runs both the schema and data SQL scripts on every startup.
- `spring_kotlin` additionally sets `jpa.open-in-view: false` to disable the open-session-in-view anti-pattern.

---

## Hexagonal Architecture: Domain → Secondary Port → Secondary Adapter

The three modules follow the same hexagonal architecture. JPA sits entirely outside the domain layer, reachable only through a port interface.

```
REST Request
  └─► FilmRestController          (adapter/in/rest)
        └─► FindByIdPortIn        (domain/port/in  — interface)
              └─► FindByIdPortInImpl  (@Service)
                    └─► FindByIdPortOut   (domain/port/out — interface)   ← secondary port
                          └─► FindByIdPortOutImpl  (@Service)             ← secondary port impl
                                ├─► FilmJpaRepository.findById(id)        ← secondary adapter (Spring Data JPA)
                                └─► FilmJpaMapper.convert(entity)         ← entity → domain model
```

### Secondary Port — `FindByIdPortOut`

The domain layer defines **what** it needs without knowing how it is fulfilled:

```java
// spring_java
public interface FindByIdPortOut {
    Film findById(Integer id);
}
```
```kotlin
// spring_kotlin
interface FindByIdPortOut {
    fun findById(id: Int): Film
}
```
```groovy
// spring_groovy
interface FindByIdPortOut {
    Film findById(Integer id)
}
```

### Secondary Adapter — `FilmJpaRepository`

`FilmJpaRepository` is the true secondary adapter: it is the concrete mechanism that fulfills the contract defined by the secondary port. Spring Data JPA generates a full repository implementation at runtime from this minimal interface — no custom query methods are needed beyond the inherited `findById`:

```java
// spring_java — adapter/out/jpa/FilmJpaRepository.java
public interface FilmJpaRepository extends JpaRepository<Film, Integer> {}
```
```kotlin
// spring_kotlin — adapter/out/jpa/FilmJpaRepository.kt
interface FilmJpaRepository : JpaRepository<Film, Int>
```
```groovy
// spring_groovy — adapter/out/jpa/FilmJpaRepository.groovy
interface FilmJpaRepository extends JpaRepository<Film, Integer>{}
```

The `Film` type parameter is the **generated JPA entity** (`dev.pollito.{module}.generated.entity.Film`), not the domain model.

### Secondary Port Implementation — `FindByIdPortOutImpl`

This class implements `FindByIdPortOut` and orchestrates the secondary adapter. It lives in `domain/port/out/` alongside the interface it implements, but imports directly from `adapter/out/jpa/`.

```java
// spring_java
@Service
@RequiredArgsConstructor
public class FindByIdPortOutImpl implements FindByIdPortOut {
    private final FilmJpaRepository repository;
    private final FilmJpaMapper mapper;

    @Override
    public Film findById(Integer id) {
        return mapper.convert(repository.findById(id).orElseThrow());
    }
}
```
```kotlin
// spring_kotlin
@Service
class FindByIdPortOutImpl(
    private val repository: FilmJpaRepository,
    private val mapper: FilmJpaMapper,
) : FindByIdPortOut {
    override fun findById(id: Int): Film = mapper.convert(repository.findById(id).orElseThrow())
}
```
```groovy
// spring_groovy
@Service
@CompileStatic
class FindByIdPortOutImpl implements FindByIdPortOut {
    private final FilmJpaRepository repository
    private final FilmJpaMapper mapper

    FindByIdPortOutImpl(FilmJpaRepository repository, FilmJpaMapper mapper) {
        this.repository = repository
        this.mapper = mapper
    }

    @Override
    Film findById(Integer id) {
        mapper.convert(repository.findById(id).orElseThrow())
    }
}
```

`repository.findById(id).orElseThrow()` throws `NoSuchElementException` when no record is found. This is caught by `ControllerAdvice`, which maps it to an HTTP `404 NOT_FOUND` response. See the [Error handling](#error-handling--nonosuchelementexception-→-404) section below.

---

## Files Involved

| Layer | spring_java | spring_kotlin | spring_groovy |
|---|---|---|---|
| Config | `application-dev.yaml` | `application-dev.yaml` | `application-dev.yaml` |
| Domain model | `domain/model/Film.java` | `domain/model/Film.kt` | `domain/model/Film.groovy` |
| Secondary port | `domain/port/out/FindByIdPortOut.java` | `domain/port/out/FindByIdPortOut.kt` | `domain/port/out/FindByIdPortOut.groovy` |
| Secondary port impl | `domain/port/out/FindByIdPortOutImpl.java` | `domain/port/out/FindByIdPortOutImpl.kt` | `domain/port/out/FindByIdPortOutImpl.groovy` |
| Secondary adapter | `adapter/out/jpa/FilmJpaRepository.java` | `adapter/out/jpa/FilmJpaRepository.kt` | `adapter/out/jpa/FilmJpaRepository.groovy` |
| JPA mapper | `adapter/out/jpa/FilmJpaMapper.java` | `adapter/out/jpa/FilmJpaMapper.kt` | `adapter/out/jpa/FilmJpaMapper.groovy` |
| Mapper config | `config/mapper/MapperSpringConfig.java` | `config/mapper/MapperSpringConfig.kt` | `config/mapper/ModelMapperConfig.groovy` |
| Exception handler | `config/advice/ControllerAdvice.java` | `config/advice/ControllerAdvice.kt` | `config/advice/ControllerAdvice.groovy` |

All paths are relative to `src/main/java(kotlin/groovy)/dev/pollito/{module}/sakila/film/`.

### Mapper library differences

`spring_java` and `spring_kotlin` use **MapStruct** (annotation-processor-based, compile-time). The mapper interface extends Spring's `Converter<EntityFilm, DomainFilm>` and is registered automatically via `MapperSpringConfig`.

`spring_groovy` uses **ModelMapper** (runtime reflection) because Groovy has limited annotation processor support. The mapper is a regular `@Component` class that configures a `TypeMap` in its constructor.

### SQL resource files

Both `src/main/resources/` and `src/test/resources/` contain `sakila-schema.sql` and `sakila-data.sql`. The schema file is identical in both locations (187 lines). The data file differs significantly:

| File | Location | Lines | Purpose |
|---|---|---|---|
| `sakila-schema.sql` | `main/resources` | 187 | Full Sakila DDL |
| `sakila-schema.sql` | `test/resources` | 187 | Same file, identical content |
| `sakila-data.sql` | `main/resources` | ~47,400 | Full Sakila dataset |
| `sakila-data.sql` | `test/resources` | 238 | Reduced dataset sufficient for tests |

The test data file is kept small intentionally: `@DataJpaTest` runs these scripts before every test class that declares `@Sql`, so loading 47k lines on every test run would be unnecessarily slow.

---

## Test Approach

### Integration test — `@DataJpaTest`

Tests targeting the JPA layer use `@DataJpaTest`, a Spring slice that loads only JPA infrastructure (repositories, entity manager, datasource) without the full application context.

A separate `application-test.yaml` in `src/test/resources/` configures the test database:

```yaml
# src/test/resources/application-test.yaml
spring:
  datasource:
    url: jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1
    driver-class-name: org.h2.Driver
    username: sa
    password:
  jpa:
    database-platform: org.hibernate.dialect.H2Dialect
    hibernate:
      ddl-auto: none
    show-sql: true
    open-in-view: false        # spring_kotlin only; disables open-session-in-view in tests
  sql:
    init:
      mode: never              # scripts loaded per-test-class via @Sql, not on startup
```

`open-in-view: false` appears in `spring_kotlin`'s `application-test.yaml` (and in its `application-dev.yaml`) but not in the Java or Groovy equivalents. The setting is relevant to JPA tests because `@DataJpaTest` does start a JPA context, and open-session-in-view can cause subtle lazy-loading differences between test and production behaviour.

The test class for each module:

```java
// spring_java — FindByIdPortOutImplIntegrationTest.java
@DataJpaTest
@ActiveProfiles("test")
@Import({FindByIdPortOutImpl.class, FilmJpaMapperImpl.class})
@Sql(
    scripts = {"/sakila-schema.sql", "/sakila-data.sql"},
    executionPhase = BEFORE_TEST_CLASS)
class FindByIdPortOutImplIntegrationTest {

    @Autowired
    private FindByIdPortOut findByIdPortOut;

    @ParameterizedTest
    @CsvSource({"1, 2006", "10, "})
    void findById_whenFilmExists_shouldReturnFilm(Integer filmId, Integer expectedYear) {
        Film result = findByIdPortOut.findById(filmId);

        assertNotNull(result);
        assertEquals(filmId, result.getId());
        assertEquals(expectedYear, result.getReleaseYear());
    }
}
```
```kotlin
// spring_kotlin — FindByIdPortOutImplIntegrationTest.kt
@DataJpaTest
@ActiveProfiles("test")
@Import(FindByIdPortOutImpl::class, FilmJpaMapperImpl::class)
@Sql(
    scripts = ["/sakila-schema.sql", "/sakila-data.sql"],
    executionPhase = BEFORE_TEST_CLASS,
)
class FindByIdPortOutImplIntegrationTest {

    @Autowired private lateinit var findByIdPortOut: FindByIdPortOut

    @ParameterizedTest
    @CsvSource("1, 2006", "10, ")
    fun `findById when film exists should return film`(filmId: Int, expectedYear: Int?) {
        val result = findByIdPortOut.findById(filmId)

        Assertions.assertNotNull(result)
        Assertions.assertEquals(filmId, result.id)
        Assertions.assertEquals(expectedYear, result.releaseYear)
    }
}
```
```groovy
// spring_groovy — FindByIdPortOutImplIntegrationSpec.groovy
@DataJpaTest
@ActiveProfiles("test")
@Import([FindByIdPortOutImpl, FilmJpaMapper, ModelMapperConfig])
@Sql(scripts = ["/sakila-schema.sql", "/sakila-data.sql"], executionPhase = BEFORE_TEST_CLASS)
class FindByIdPortOutImplIntegrationSpec extends Specification {

    @Autowired
    FindByIdPortOut findByIdPortOut

    @Unroll
    def "findById(#filmId) returns a film with releaseYear=#expectedYear"() {
        expect:
        assertFilm(findByIdPortOut.findById(filmId), filmId, expectedYear)

        where:
        filmId | expectedYear
        1      | 2006
        10     | null
    }

    @CompileStatic
    private static void assertFilm(Object film, int filmId, Integer expectedYear) {
        DomainFilm result = (DomainFilm) film
        assertNotNull(result)
        assertEquals(filmId, result.id)
        assertEquals(expectedYear, result.releaseYear)
    }
}
```

Key points common to all three:
- `@DataJpaTest` — loads only the JPA slice; no web layer, no full context.
- `@ActiveProfiles("test")` — picks up `application-test.yaml` with `sql.init.mode: never`.
- `@Import(...)` — manually imports `FindByIdPortOutImpl` and the mapper; `@DataJpaTest` does not component-scan outside the JPA slice.
- `@Sql(executionPhase = BEFORE_TEST_CLASS)` — schema and data scripts run once before all methods in the class, not before each individual test.
- The test autowires `FindByIdPortOut` (the interface), not the concrete implementation, staying true to the port abstraction.

The `@Import` list differs by module: Java/Kotlin import `FilmJpaMapperImpl` (the MapStruct-generated class), while Groovy imports `FilmJpaMapper` directly plus `ModelMapperConfig` to supply the `ModelMapper` bean.

### Unit test — mocked secondary port

`FindByIdPortInImpl` (the primary port implementation) is tested in isolation by mocking `FindByIdPortOut`. These tests have no database involvement:

| Module | Framework | Mock style |
|---|---|---|
| `spring_java` | JUnit 5 + Mockito | `@Mock`, `when(...).thenReturn(...)` |
| `spring_kotlin` | JUnit 5 + MockK | `@MockK`, `every { ... } returns ...` |
| `spring_groovy` | Spock | `Mock()`, `>>` stubbing |

---

## Error Handling — `NoSuchElementException` → 404

`FindByIdPortOutImpl` calls `repository.findById(id).orElseThrow()`. When the requested film does not exist, `Optional.orElseThrow()` raises a `NoSuchElementException`. Rather than catching it inside the adapter, each module's `ControllerAdvice` handles it globally and maps it to an HTTP `404 NOT_FOUND`:

```java
// spring_java — config/advice/ControllerAdvice.java
@ExceptionHandler(NoSuchElementException.class)
public ResponseEntity<Error> handle(NoSuchElementException e) {
    return buildProblemDetail(e, NOT_FOUND);
}
```
```kotlin
// spring_kotlin — config/advice/ControllerAdvice.kt
@ExceptionHandler(NoSuchElementException::class)
fun handle(e: NoSuchElementException): ResponseEntity<Error> {
    return buildProblemDetail(e, NOT_FOUND)
}
```
```groovy
// spring_groovy — config/advice/ControllerAdvice.groovy
@ExceptionHandler(NoSuchElementException)
ResponseEntity<Error> handle(NoSuchElementException e) {
    buildProblemDetail(e, NOT_FOUND)
}
```

This keeps the secondary port implementation free of HTTP concerns — `FindByIdPortOutImpl` simply lets the exception propagate; the web layer decides how to represent it.
