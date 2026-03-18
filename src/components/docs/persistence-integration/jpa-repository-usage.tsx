import { CollapsibleCodeBlock } from '@site/src/components/collapsible-code-block';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { FileTreeInfo } from '@site/src/components/file-tree-info';
import ZoomContainer from '@site/src/components/zoom-container';
import Mermaid from '@theme/Mermaid';

const FileTreeJava = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`├── ...
└── src
    ├── main
    │   ├── java
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_java
    │   │               ├── config
    │   │               │   └── advice
// highlight-modified
    │   │               │       └── ControllerAdvice.java
    │   │               └── sakila
    │   │                   └── film
    │   │                       ├── adapter
    │   │                       │   └── out
    │   │                       │       └── jpa
// highlight-added-start
    │   │                       │           ├── FilmJpaMapper.java
    │   │                       │           └── FilmJpaRepository.java
// highlight-added-end
    │   │                       └── domain
    │   │                           ├── model/...
    │   │                           └── port
    │   │                               └── out
// highlight-added-start
    │   │                                   ├── FindByIdPortOut.java
    │   │                                   └── FindByIdPortOutImpl.java
// highlight-added-end
    │   └── resources
// highlight-modified
    │       ├── application-dev.yaml
    │       ├── ...
// highlight-added
    │       └── sakila-schema.sql
    └── test
        ├── java
        │   └── dev
        │       └── pollito
        │           └── spring_java
// highlight-modified
        │               ├── SanityCheckSpringBootTest.java
        │               ├── config
        │               │   └── advice
// highlight-modified
        │               │       └── ControllerAdviceTest.java
        │               └── sakila
        │                   └── film
        │                       └── domain
        │                           └── port
        │                               ├── in
// highlight-modified
        │                               │   └── FindByIdPortInImplTest.java
        │                               └── out
// highlight-added
        │                                   └── FindByIdPortOutImplDataJpaTest.java
        └── resources
// highlight-added-start
            ├── application-test.yaml
            ├── sakila-data.sql
            └── sakila-schema.sql
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const FileTreeKt = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`├── ...
└── src
    ├── main
    │   ├── kotlin
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_kotlin
    │   │               ├── config
    │   │               │   └── advice
// highlight-modified
    │   │               │       └── ControllerAdvice.kt
    │   │               └── sakila
    │   │                   └── film
    │   │                       ├── adapter
    │   │                       │   └── out
    │   │                       │       └── jpa
// highlight-added-start
    │   │                       │           ├── FilmJpaMapper.kt
    │   │                       │           └── FilmJpaRepository.kt
// highlight-added-end
    │   │                       └── domain
    │   │                           ├── model/...
    │   │                           └── port
    │   │                               └── out
// highlight-added-start
    │   │                                   ├── FindByIdPortOut.kt
    │   │                                   └── FindByIdPortOutImpl.kt
// highlight-added-end
    │   └── resources
// highlight-modified
    │       ├── application-dev.yaml
    │       ├── ...
// highlight-added
    │       └── sakila-schema.sql
    └── test
        ├── kotlin
        │   └── dev
        │       └── pollito
        │           └── spring_kotlin
// highlight-modified
        │               ├── SanityCheckSpringBootTest.kt
        │               ├── config
        │               │   └── advice
// highlight-modified
        │               │       └── ControllerAdviceTest.kt
        │               └── sakila
        │                   └── film
        │                       └── domain
        │                           └── port
        │                               ├── in
// highlight-modified
        │                               │   └── FindByIdPortInImplTest.kt
        │                               └── out
// highlight-added
        │                                   └── FindByIdPortOutImplDataJpaTest.kt
        └── resources
// highlight-added-start
            ├── application-test.yaml
            ├── sakila-data.sql
            └── sakila-schema.sql
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const FileTreeGroovy = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`├── ...
└── src
    ├── main
    │   ├── groovy
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_groovy
    │   │               ├── config
    │   │               │   └── advice
// highlight-modified
    │   │               │       └── ControllerAdvice.groovy
    │   │               └── sakila
    │   │                   └── film
    │   │                       ├── adapter
    │   │                       │   └── out
    │   │                       │       └── jpa
// highlight-added-start
    │   │                       │           ├── FilmJpaMapper.groovy
    │   │                       │           └── FilmJpaRepository.groovy
// highlight-added-end
    │   │                       └── domain
    │   │                           ├── model/...
    │   │                           └── port
    │   │                               └── out
// highlight-added-start
    │   │                                   ├── FindByIdPortOut.groovy
    │   │                                   └── FindByIdPortOutImpl.groovy
// highlight-added-end
    │   └── resources
// highlight-modified
    │       ├── application-dev.yaml
    │       ├── ...
// highlight-added
    │       └── sakila-schema.sql
    └── test
        ├── groovy
        │   └── dev
        │       └── pollito
        │           └── spring_groovy
// highlight-modified
        │               ├── SanityCheckSpringBootSpec.groovy
        │               ├── config
        │               │   └── advice
// highlight-modified
        │               │       └── ControllerAdviceSpec.groovy
        │               └── sakila
        │                   └── film
        │                       └── domain
        │                           └── port
        │                               ├── in
// highlight-modified
        │                               │   └── FindByIdPortInImplSpec.groovy
        │                               └── out
// highlight-added
        │                                   └── FindByIdPortOutImplDataJpaSpec.groovy
        └── resources
// highlight-added-start
            ├── application-test.yaml
            ├── sakila-data.sql
            └── sakila-schema.sql
// highlight-added-end`}
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

const ApplicationDevYamlJavaAndGroovy = () => (
  <CollapsibleCodeBlock language="yaml" title="resources/application-dev.yaml">
    {`# ...
// highlight-added-start
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
      ddl-auto: none
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
// highlight-added-end
# ...`}
  </CollapsibleCodeBlock>
);

const ApplicationDevYamlKt = () => (
  <CollapsibleCodeBlock language="yaml" title="resources/application-dev.yaml">
    {`# ...
// highlight-added-start
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
      ddl-auto: none
    show-sql: true
    open-in-view: false
    properties:
      hibernate:
        format_sql: true
  h2:
    console:
      enabled: true
      path: /h2-console
      settings:
        web-allow-others: false
// highlight-added-end
# ...`}
  </CollapsibleCodeBlock>
);

export const ApplicationYamlDev = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <ApplicationDevYamlJavaAndGroovy />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <ApplicationDevYamlKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <ApplicationDevYamlJavaAndGroovy />
    </TabItem>
  </Tabs>
);

const PortOutJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/sakila/film/domain/port/out/FindByIdPortOut.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.sakila.film.domain.port.out;

import dev.pollito.spring_java.sakila.film.domain.model.Film;

public interface FindByIdPortOut {
  Film findById(Integer id);
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const PortOutKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/sakila/film/domain/port/out/FindByIdPortOut.kt"
  >
    {`// highlight-added-start
package dev.pollito.spring_kotlin.sakila.film.domain.port.out

import dev.pollito.spring_kotlin.sakila.film.domain.model.Film

interface FindByIdPortOut {
  fun findById(id: Int): Film
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const PortOutGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/sakila/film/domain/port/out/FindByIdPortOut.groovy"
  >
    {`// highlight-added-start
package dev.pollito.spring_groovy.sakila.film.domain.port.out

import dev.pollito.spring_groovy.sakila.film.domain.model.Film

interface FindByIdPortOut {
  Film findById(Integer id)
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const PortOut = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <PortOutJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <PortOutKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <PortOutGroovy />
    </TabItem>
  </Tabs>
);

const JpaMapperJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/sakila/film/adapter/out/jpa/FilmJpaMapper.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.sakila.film.adapter.out.jpa;

import dev.pollito.spring_java.config.mapper.MapperSpringConfig;
import dev.pollito.spring_java.sakila.film.domain.model.Film;
import java.time.LocalDate;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.core.convert.converter.Converter;

@Mapper(config = MapperSpringConfig.class)
public interface FilmJpaMapper
    extends Converter<dev.pollito.spring_java.generated.entity.Film, Film> {

  @Override
  @Mapping(target = "id", source = "filmId")
  @Mapping(target = "language", source = "languageByLanguageId.name")
  Film convert(dev.pollito.spring_java.generated.entity.Film source);

  default Integer mapReleaseYear(LocalDate releaseYear) {
    return releaseYear != null ? releaseYear.getYear() : null;
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const JpaMapperKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/sakila/film/adapter/out/jpa/FilmJpaMapper.kt"
  >
    {`// highlight-added-start
package dev.pollito.spring_kotlin.sakila.film.adapter.out.jpa

import dev.pollito.spring_kotlin.config.mapper.MapperSpringConfig
import dev.pollito.spring_kotlin.sakila.film.domain.model.Film
import java.time.LocalDate
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.springframework.core.convert.converter.Converter

@Mapper(config = MapperSpringConfig::class)
interface FilmJpaMapper : Converter<dev.pollito.spring_kotlin.generated.entity.Film, Film> {

  @Mapping(target = "id", source = "filmId")
  @Mapping(target = "language", source = "languageByLanguageId.name")
  override fun convert(source: dev.pollito.spring_kotlin.generated.entity.Film): Film

  fun mapReleaseYear(releaseYear: LocalDate?): Int? = releaseYear?.year
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const JpaMapperGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/sakila/film/adapter/out/jpa/FilmJpaMapper.groovy"
  >
    {`// highlight-added-start
package dev.pollito.spring_groovy.sakila.film.adapter.out.jpa

import dev.pollito.spring_groovy.generated.entity.Film as EntityFilm
import dev.pollito.spring_groovy.sakila.film.domain.model.Film as DomainFilm
import groovy.transform.CompileStatic
import org.modelmapper.ModelMapper
import org.modelmapper.TypeMap
import org.springframework.stereotype.Component

@Component
@CompileStatic
class FilmJpaMapper {
    private final ModelMapper mapper
    private TypeMap<EntityFilm, DomainFilm> typeMap

    FilmJpaMapper(ModelMapper mapper) {
        this.mapper = mapper
        configureTypeMap()
    }

    private void configureTypeMap() {
        typeMap = mapper.createTypeMap(EntityFilm, DomainFilm)
        typeMap.addMappings { mapping ->
            mapping.skip(DomainFilm::setReleaseYear)
            mapping.map({ src -> src.filmId }, DomainFilm::setId)
            mapping.map({ src -> src.languageByLanguageId.name }, DomainFilm::setLanguage)
        }
        typeMap.setPostConverter { ctx ->
            DomainFilm destination = ctx.destination
            destination.releaseYear = ctx.source.releaseYear?.year
            destination
        }
    }

    DomainFilm convert(EntityFilm source) {
        mapper.map(source, DomainFilm)
    }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const JpaMapper = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <JpaMapperJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <JpaMapperKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <JpaMapperGroovy />
    </TabItem>
  </Tabs>
);

const JpaRepositoryInterfaceJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/sakila/film/adapter/out/jpa/FilmJpaRepository.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.sakila.film.adapter.out.jpa;

import dev.pollito.spring_java.generated.entity.Film;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FilmJpaRepository extends JpaRepository<Film, Integer> {}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const JpaRepositoryInterfaceKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/sakila/film/adapter/out/jpa/FilmJpaRepository.kt"
  >
    {`// highlight-added-start
package dev.pollito.spring_kotlin.sakila.film.adapter.out.jpa

import dev.pollito.spring_kotlin.generated.entity.Film
import org.springframework.data.jpa.repository.JpaRepository

interface FilmJpaRepository : JpaRepository<Film, Int>
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const JpaRepositoryInterfaceGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/sakila/film/adapter/out/jpa/FilmJpaRepository.groovy"
  >
    {`// highlight-added-start
package dev.pollito.spring_groovy.sakila.film.adapter.out.jpa

import dev.pollito.spring_groovy.generated.entity.Film
import org.springframework.data.jpa.repository.JpaRepository

interface FilmJpaRepository extends JpaRepository<Film, Integer>{}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const JpaRepositoryInterface = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <JpaRepositoryInterfaceJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <JpaRepositoryInterfaceKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <JpaRepositoryInterfaceGroovy />
    </TabItem>
  </Tabs>
);

const PortOutImplJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/sakila/film/domain/port/out/FindByIdPortOutImpl.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.sakila.film.domain.port.out;

import dev.pollito.spring_java.sakila.film.adapter.out.jpa.FilmJpaMapper;
import dev.pollito.spring_java.sakila.film.adapter.out.jpa.FilmJpaRepository;
import dev.pollito.spring_java.sakila.film.domain.model.Film;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const PortOutImplKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/sakila/film/domain/port/out/FindByIdPortOutImpl.kt"
  >
    {`// highlight-added-start
package dev.pollito.spring_kotlin.sakila.film.domain.port.out

import dev.pollito.spring_kotlin.sakila.film.adapter.out.jpa.FilmJpaMapper
import dev.pollito.spring_kotlin.sakila.film.adapter.out.jpa.FilmJpaRepository
import dev.pollito.spring_kotlin.sakila.film.domain.model.Film
import org.springframework.stereotype.Service

@Service
class FindByIdPortOutImpl(
    private val repository: FilmJpaRepository,
    private val mapper: FilmJpaMapper,
) : FindByIdPortOut {
  override fun findById(id: Int): Film = mapper.convert(repository.findById(id).orElseThrow())
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const PortOutImplGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/sakila/film/domain/port/out/FindByIdPortOutImpl.groovy"
  >
    {`// highlight-added-start
package dev.pollito.spring_groovy.sakila.film.domain.port.out

import dev.pollito.spring_groovy.sakila.film.adapter.out.jpa.FilmJpaMapper
import dev.pollito.spring_groovy.sakila.film.adapter.out.jpa.FilmJpaRepository
import dev.pollito.spring_groovy.sakila.film.domain.model.Film
import groovy.transform.CompileStatic
import org.springframework.stereotype.Service

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
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const PortOutImplementation = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <PortOutImplJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <PortOutImplKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <PortOutImplGroovy />
    </TabItem>
  </Tabs>
);

const ApplicationTestYamlJavaAndGroovy = () => (
  <CollapsibleCodeBlock language="yaml" title="resources/application-test.yaml">
    {`// highlight-added-start
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
  sql:
    init:
      mode: never
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const ApplicationTestYamlKt = () => (
  <CollapsibleCodeBlock language="yaml" title="resources/application-test.yaml">
    {`// highlight-added-start
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
    open-in-view: false
  sql:
    init:
      mode: never
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const ApplicationTestYaml = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <ApplicationTestYamlJavaAndGroovy />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <ApplicationTestYamlKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <ApplicationTestYamlJavaAndGroovy />
    </TabItem>
  </Tabs>
);

const PortOutImplDataJpaTestJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/sakila/film/domain/port/out/FindByIdPortOutImplDataJpaTest.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.sakila.film.domain.port.out;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_CLASS;

import dev.pollito.spring_java.sakila.film.adapter.out.jpa.FilmJpaMapperImpl;
import dev.pollito.spring_java.sakila.film.domain.model.Film;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

@DataJpaTest
@ActiveProfiles("test")
@Import({FindByIdPortOutImpl.class, FilmJpaMapperImpl.class})
@Sql(
    scripts = {"/sakila-schema.sql", "/sakila-data.sql"},
    executionPhase = BEFORE_TEST_CLASS)
class FindByIdPortOutImplDataJpaTest {

  @SuppressWarnings("unused")
  @Autowired
  private FindByIdPortOut findByIdPortOut;

  @Test
  void findByIdFindsAnEntityReturnsADomainModel() {
    Integer id = 1;
    Film result = findByIdPortOut.findById(id);

    assertNotNull(result);
    assertEquals(id, result.getId());
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const PortOutImplDataJpaTestKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/sakila/film/domain/port/out/FindByIdPortOutImplDataJpaTest.kt"
  >
    {`// highlight-added-start
package dev.pollito.spring_kotlin.sakila.film.domain.port.out

import dev.pollito.spring_kotlin.sakila.film.adapter.out.jpa.FilmJpaMapperImpl
import kotlin.test.Test
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest
import org.springframework.context.annotation.Import
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.jdbc.Sql
import org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_CLASS

@DataJpaTest
@ActiveProfiles("test")
@Import(FindByIdPortOutImpl::class, FilmJpaMapperImpl::class)
@Sql(
    scripts = ["/sakila-schema.sql", "/sakila-data.sql"],
    executionPhase = BEFORE_TEST_CLASS,
)
class FindByIdPortOutImplDataJpaTest {

  @Autowired private lateinit var findByIdPortOut: FindByIdPortOut

  @Test
  fun \`findById finds an Entity and returns a Domain model\`() {
    val id = 1
    val result = findByIdPortOut.findById(id)

    assertNotNull(result)
    assertEquals(id, result.id)
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const PortOutImplDataJpaSpecGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/sakila/film/domain/port/out/FindByIdPortOutDataJpaSpec.groovy"
  >
    {`// highlight-added-start
package dev.pollito.spring_groovy.sakila.film.domain.port.out

import static org.junit.jupiter.api.Assertions.assertEquals
import static org.junit.jupiter.api.Assertions.assertNotNull
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_CLASS

import dev.pollito.spring_groovy.config.mapper.ModelMapperConfig
import dev.pollito.spring_groovy.sakila.film.adapter.out.jpa.FilmJpaMapper
import dev.pollito.spring_groovy.sakila.film.domain.model.Film as DomainFilm
import groovy.transform.CompileStatic
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest
import org.springframework.context.annotation.Import
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.jdbc.Sql
import spock.lang.Specification

@DataJpaTest
@ActiveProfiles("test")
@Import([FindByIdPortOutImpl, FilmJpaMapper, ModelMapperConfig])
@Sql(scripts = ["/sakila-schema.sql", "/sakila-data.sql"], executionPhase = BEFORE_TEST_CLASS)
class FindByIdPortOutImplDataJpaSpec extends Specification {

  @Autowired
  FindByIdPortOut findByIdPortOut

  def "findById finds an Entity and returns a Domain model"() {
    given:
    def id = 1

    expect:
    assertFilm(findByIdPortOut.findById(id), id)
  }

  @CompileStatic
  private static void assertFilm(Object film, int filmId) {
    DomainFilm result = (DomainFilm) film
    assertNotNull(result)
    assertEquals(filmId, result.id)
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const PortOutImplDataJpaTest = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <PortOutImplDataJpaTestJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <PortOutImplDataJpaTestKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <PortOutImplDataJpaSpecGroovy />
    </TabItem>
  </Tabs>
);

const PortInImplTestJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/sakila/film/domain/port/in/FindByIdPortInImplTest.java"
  >
    {`package dev.pollito.spring_java.sakila.film.domain.port.in;

import static org.junit.jupiter.api.Assertions.*;
// highlight-added-start
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import dev.pollito.spring_java.sakila.film.domain.model.Film;
import dev.pollito.spring_java.sakila.film.domain.port.out.FindByIdPortOut;
// highlight-added-end
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
// highlight-added
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class FindByIdPortInImplTest {
  @InjectMocks private FindByIdPortInImpl findByIdPortIn;
// highlight-added
  @Mock private FindByIdPortOut findByIdPortOut;

  @Test
  void findByIdReturnsADomainModel() {
// highlight-added
    when(findByIdPortOut.findById(anyInt())).thenReturn(mock(Film.class));
    assertNotNull(findByIdPortIn.findById(1));
  }
}`}
  </CollapsibleCodeBlock>
);

const PortInImplTestKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/sakila/film/domain/port/in/FindByIdPortInImplTest.kt"
  >
    {`package dev.pollito.spring_kotlin.sakila.film.domain.port.\`in\`

// highlight-added-start
import dev.pollito.spring_kotlin.sakila.film.domain.port.out.FindByIdPortOut
import io.mockk.every
// highlight-added-end
import io.mockk.impl.annotations.InjectMockKs
// highlight-added
import io.mockk.impl.annotations.MockK
import io.mockk.junit5.MockKExtension
// highlight-added
import io.mockk.mockk
import kotlin.test.Test
import kotlin.test.assertNotNull
import org.junit.jupiter.api.extension.ExtendWith

@ExtendWith(MockKExtension::class)
class FindByIdPortInImplTest {
// highlight-added
  @MockK private lateinit var findByIdPortOut: FindByIdPortOut
  @InjectMockKs private lateinit var findByIdPortInImpl: FindByIdPortInImpl

  @Test
  fun \`findById returns a domain model\`() {
// highlight-added
    every { findByIdPortOut.findById(any()) } returns mockk()
    assertNotNull(findByIdPortInImpl.findById(1))
  }
}`}
  </CollapsibleCodeBlock>
);

const PortInImplSpecGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/sakila/film/domain/port/in/FindByIdPortInImplSpec.groovy"
  >
    {`package dev.pollito.spring_groovy.sakila.film.domain.port.in

// highlight-added-start
import dev.pollito.spring_groovy.sakila.film.domain.model.Film
import dev.pollito.spring_groovy.sakila.film.domain.port.out.FindByIdPortOut
// highlight-added-end
import spock.lang.Specification
import spock.lang.Subject

class FindByIdPortInImplSpec extends Specification {
// highlight-added
  FindByIdPortOut findByIdPortOut = Mock()
// highlight-modified
  @Subject FindByIdPortInImpl findByIdPortIn = new FindByIdPortInImpl(findByIdPortOut)

  def "findById returns a domain model"() {
// highlight-added-start
    given: "a mocked secondary port behavior"
    findByIdPortOut.findById(_ as Integer) >> Stub(Film)
// highlight-added-end

    when: "findById is called"
    def result = findByIdPortIn.findById(1)

    then: "a domain model is returned"
    result != null
  }
}`}
  </CollapsibleCodeBlock>
);

export const PortInImplTest = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <PortInImplTestJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <PortInImplTestKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <PortInImplSpecGroovy />
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
import java.util.NoSuchElementException;
// ...
public class ControllerAdvice {
  // ...
// highlight-added-start
  @ExceptionHandler(NoSuchElementException.class)
  public ResponseEntity<Error> handle(NoSuchElementException e) {
    // ...
  }
// highlight-added-end
}
`}
  </CollapsibleCodeBlock>
);

const ControllerAdviceKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/config/advice/ControllerAdvice.kt"
  >
    {`// ...
class ControllerAdvice(private val request: HttpServletRequest) {
  // ...
// highlight-added-start
  @ExceptionHandler(NoSuchElementException::class)
  fun handle(e: NoSuchElementException): ResponseEntity<Error> {
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
class ControllerAdvice {
  // ...
// highlight-added-start
  @ExceptionHandler(NoSuchElementException)
  ResponseEntity<Error> handle(NoSuchElementException e) {
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

const ControllerAdviceTestJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/config/advice/ControllerAdviceTest.java"
  >
    {`// ...
// highlight-added
import java.util.NoSuchElementException;
// ...
class ControllerAdviceTest {
  // ...
  private static class FakeController {
// highlight-added-start
    @GetMapping("/no-such-element")
    @SuppressWarnings("unused")
    public void throwNoSuchElementException() {
      throw new NoSuchElementException("No such element");
    }
// highlight-added-end
  }
  // ...
  static @NonNull Stream<Arguments> testCases() {
    return Stream.of(
        // ...
// highlight-added
        Arguments.of("/fake/no-such-element", NOT_FOUND));
  }
  // ...
}`}
  </CollapsibleCodeBlock>
);

const ControllerAdviceTestKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/config/advice/ControllerAdviceTest.kt"
  >
    {`// ...
class ControllerAdviceTest {
  // ...
  class FakeController {
    // ...
// highlight-added-start
    @GetMapping("/no-such-element")
    fun throwNoSuchElementException() {
      throw NoSuchElementException("No such element")
    }
// highlight-added-end
  }

  companion object {
    @JvmStatic
    fun testCases(): Stream<Arguments> =
        Stream.of(
            // ...
// highlight-added
            Arguments.of("/fake/no-such-element", NOT_FOUND),
        )
  }
  // ...
}`}
  </CollapsibleCodeBlock>
);

const ControllerAdviceSpecGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/config/advice/ControllerAdviceSpec.groovy"
  >
    {`// ...
class ControllerAdviceSpec extends Specification implements MockMvcResultMatchersTrait {
  // ...
  static class FakeController {
    // ...
// highlight-added-start
    @GetMapping("/no-such-element")
    @SuppressWarnings("unused")
    static void throwNoSuchElementException() {
      throw new NoSuchElementException("No such element")
    }
// highlight-added-end
  }
  // ...
  @Unroll
  def "#exceptionType returns #httpStatus"() {
    given:
    request.getRequestURI() >> endpoint

    expect:
    // ...

    where:
    endpoint                | httpStatus            || exceptionType
    // ...
// highlight-added
    "/fake/no-such-element" | NOT_FOUND             || "NoSuchElementException"
  }
}`}
  </CollapsibleCodeBlock>
);

export const ControllerAdviceTest = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <ControllerAdviceTestJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <ControllerAdviceTestKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <ControllerAdviceSpecGroovy />
    </TabItem>
  </Tabs>
);

const SanityCheckSpringBootTestJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/SanityCheckSpringBootTest.java"
  >
    {`// ...
// highlight-added-start
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_CLASS;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
// highlight-added-end

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(OutputCaptureExtension.class)
// highlight-added-start
@ActiveProfiles("test")
@Sql(
    scripts = {"/sakila-schema.sql", "/sakila-data.sql"},
    executionPhase = BEFORE_TEST_CLASS)
// highlight-added-end
class SanityCheckSpringBootTest {
// ...
}`}
  </CollapsibleCodeBlock>
);

const SanityCheckSpringBootTestKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/SanityCheckSpringBootTest.kt"
  >
    {`// ...
// highlight-added-start
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.jdbc.Sql
import org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_CLASS
// highlight-added-end

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(OutputCaptureExtension::class)
// highlight-added-start
@ActiveProfiles("test")
@Sql(
    scripts = ["/sakila-schema.sql", "/sakila-data.sql"],
    executionPhase = BEFORE_TEST_CLASS,
)
// highlight-added-end
class SanityCheckSpringBootTest {
// ...
}
`}
  </CollapsibleCodeBlock>
);

const SanityCheckSpringBootSpecGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/SanityCheckSpringBootSpec.groovy"
  >
    {`// ...
// highlight-added-start
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_CLASS
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.jdbc.Sql
// highlight-added-end

@SpringBootTest
@AutoConfigureMockMvc
// highlight-added-start
@ActiveProfiles("test")
@Sql(scripts = ["/sakila-schema.sql", "/sakila-data.sql"], executionPhase = BEFORE_TEST_CLASS)
// highlight-added-end
class SanityCheckSpringBootSpec extends Specification {
// ...
}`}
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

export const RequestFlowSequenceDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
        participant Client
        box Adapter In
            participant FilmRestController
        end
        box Domain
            participant FindByIdPortInImpl
        end
        box Adapter Out
            participant FindByIdPortOutImpl
            participant FilmJpaRepository
            participant FilmJpaMapper
        end
        participant H2 Database

        Client->>FilmRestController: GET /api/films/1
        activate FilmRestController

        FilmRestController->>FindByIdPortInImpl: findById(1)
        activate FindByIdPortInImpl

        FindByIdPortInImpl->>FindByIdPortOutImpl: findById(1)
        activate FindByIdPortOutImpl

        FindByIdPortOutImpl->>FilmJpaRepository: findById(1)
        activate FilmJpaRepository

        FilmJpaRepository->>H2 Database: SELECT * FROM FILM WHERE FILM_ID = 1
        H2 Database-->>FilmJpaRepository: Row data
        
        FilmJpaRepository-->>FindByIdPortOutImpl: FilmEntity
        deactivate FilmJpaRepository

        FindByIdPortOutImpl->>FilmJpaMapper: convert(entity)
        activate FilmJpaMapper
        FilmJpaMapper-->>FindByIdPortOutImpl: Domain Film
        deactivate FilmJpaMapper

        FindByIdPortOutImpl-->>FindByIdPortInImpl: Domain Film
        deactivate FindByIdPortOutImpl

        FindByIdPortInImpl-->>FilmRestController: Domain Film
        deactivate FindByIdPortInImpl

        FilmRestController-->>Client: HTTP 200 OK + JSON body
        deactivate FilmRestController`}
    />
  </ZoomContainer>
);

export const TerminalCurl = () => (
  <CollapsibleCodeBlock language="log" title="Terminal">
    {`$ curl -s http://localhost:8080/api/films/1 | jq
{
  "instance": "/api/films/1",
  "status": 200,
  "timestamp": "2026-03-08T01:49:43.360796324Z",
  "trace": "b7639cc6048c55bd18954a6f61c1c818",
  "data": {
    "description": "A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies",
    "id": 1,
    "language": "English",
     "length": 86,
     "rating": "PG",
     "releaseYear": 2006,
     "title": "ACADEMY DINOSAUR"
   }
 }`}
  </CollapsibleCodeBlock>
);

export const BuildGradleGroovySpotlessExclude = () => (
  <CollapsibleCodeBlock language="groovy" title="build.gradle">
    {`// ...
spotless {
  groovy {
// highlight-added-start
    target 'src/*/groovy/**/*.groovy'
    targetExclude 'build/**/*.groovy', '**/FilmJpaMapper.groovy'
// highlight-added-end
    importOrder()
    removeSemicolons()
    greclipse().configFile('greclipse.properties')
  }
  groovyGradle {
    target '*.gradle'
    greclipse().configFile('greclipse.properties')
  }
}
// ...`}
  </CollapsibleCodeBlock>
);
