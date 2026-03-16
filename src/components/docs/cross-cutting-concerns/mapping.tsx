import { CollapsibleCodeBlock } from '@site/src/components/collapsible-code-block';
import { FileTreeInfo } from '@site/src/components/file-tree-info';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

const FileTreeJava = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`// highlight-modified
├── build.gradle
└── src
    └── main
        └── java
            └── dev
                └── pollito
                    └── spring_java
                        ├── config
                        │   └── mapper
// highlight-added
                        │       └── MapperSpringConfig.java
                        ├── sakila
                        │   └── film
                        │       └── adapter
                        │           └── in
                        │               └── rest
                        │                   ├── ...
// highlight-modified
                        │                   └── FilmRestMapper.java
                        └── ...`}
  </CollapsibleCodeBlock>
);

const FileTreeKt = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`// highlight-modified
├── build.gradle.kts
└── src
    └── main
        └── kotlin
            └── dev
                └── pollito
                    └── spring_kotlin
                        ├── config
                        │   └── mapper
// highlight-added
                        │       └── MapperSpringConfig.kt
                        ├── sakila
                        │   └── film
                        │       └── adapter
                        │           └── in
                        │               └── rest
                        │                   ├── ...
// highlight-modified
                        │                   └── FilmRestMapper.kt
                        └── ...`}
  </CollapsibleCodeBlock>
);

const FileTreeGroovy = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`// highlight-modified
├── build.gradle
└── src
    └── main
        └── groovy
            └── dev
                └── pollito
                    └── spring_groovy
                        ├── config
                        │   └── mapper
// highlight-added
                        │       └── ModelMapperConfig.groovy
                        ├── sakila
                        │   └── film
                        │       └── adapter
                        │           └── in
                        │               └── rest
                        │                   ├── ...
// highlight-modified
                        │                   └── FilmRestMapper.groovy
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

const BuildGradleJava = () => (
  <CollapsibleCodeBlock language="groovy" title="build.gradle">
    {`// ...
dependencies {
  // ...
// highlight-added-start
  def mapstructVersion = '1.6.3'
  def mapstructSpringExtensionsVersion = '2.0.0'
  implementation "org.mapstruct:mapstruct:\${mapstructVersion}"
  annotationProcessor "org.mapstruct:mapstruct-processor:\${mapstructVersion}"
  implementation "org.mapstruct.extensions.spring:mapstruct-spring-annotations:\${mapstructSpringExtensionsVersion}"
  annotationProcessor "org.mapstruct.extensions.spring:mapstruct-spring-extensions:\${mapstructSpringExtensionsVersion}"
  testImplementation "org.mapstruct.extensions.spring:mapstruct-spring-test-extensions:\${mapstructSpringExtensionsVersion}"
  testAnnotationProcessor "org.mapstruct.extensions.spring:mapstruct-spring-extensions:\${mapstructSpringExtensionsVersion}"
// highlight-added-end
}
// ...`}
  </CollapsibleCodeBlock>
);

const BuildGradleKt = () => (
  <CollapsibleCodeBlock language="kts" title="build.gradle.kts">
    {`plugins {
  // ...
// highlight-added
  kotlin("kapt") version "2.3.0"
}
// ...
dependencies {
  // ...
// highlight-added-start
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
// highlight-added-end
}
// ...`}
  </CollapsibleCodeBlock>
);

const BuildGradleGroovy = () => (
  <CollapsibleCodeBlock language="groovy" title="build.gradle">
    {`// ...
dependencies {
  // ...
// highlight-added
  implementation 'org.modelmapper:modelmapper:3.2.6'
}
// ...`}
  </CollapsibleCodeBlock>
);

export const BuildGradle = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <BuildGradleJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <BuildGradleKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <BuildGradleGroovy />
    </TabItem>
  </Tabs>
);

const MapperSpringConfigJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/config/mapper/MapperSpringConfig.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.config.mapper;

import org.mapstruct.MapperConfig;
import org.mapstruct.extensions.spring.SpringMapperConfig;

@MapperConfig(componentModel = "spring")
@SpringMapperConfig(
conversionServiceAdapterPackage = "dev.pollito.spring_java.config.mapper")
public interface MapperSpringConfig {}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const MapperSpringConfigKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/config/mapper/MapperSpringConfig.kt"
  >
    {`// highlight-added-start
package dev.pollito.spring_kotlin.config.mapper

import org.mapstruct.MapperConfig
import org.mapstruct.extensions.spring.SpringMapperConfig

@MapperConfig(componentModel = "spring")
@SpringMapperConfig(conversionServiceAdapterPackage = "dev.pollito.spring_kotlin.config.mapper")
interface MapperSpringConfig {}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const ModelMapperConfigGroovy = () => (
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

export const MapperConfig = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <MapperSpringConfigJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <MapperSpringConfigKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <ModelMapperConfigGroovy />
    </TabItem>
  </Tabs>
);

const FilmRestMapperJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/sakila/film/adapter/in/rest/FilmRestMapper.java"
  >
    {`package dev.pollito.spring_java.sakila.film.adapter.in.rest;

// highlight-added
import dev.pollito.spring_java.config.mapper.MapperSpringConfig;
import dev.pollito.spring_java.sakila.film.adapter.in.rest.dto.FilmResponse;
import dev.pollito.spring_java.sakila.film.domain.model.Film;
// highlight-added-start
import org.jspecify.annotations.Nullable;
import org.mapstruct.Mapper;
import org.springframework.core.convert.converter.Converter;
// highlight-added-end

// highlight-added-start
@Mapper(config = MapperSpringConfig.class)
public interface FilmRestMapper extends Converter<Film, FilmResponse> {
  @Override
  FilmResponse convert(@Nullable Film source);
// highlight-added-end
}`}
  </CollapsibleCodeBlock>
);

const FilmRestMapperKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/sakila/film/adapter/in/rest/FilmRestMapper.kt"
  >
    {`package dev.pollito.spring_kotlin.sakila.film.adapter.\`in\`.rest

// highlight-added
import dev.pollito.spring_kotlin.config.mapper.MapperSpringConfig
import dev.pollito.spring_kotlin.sakila.film.adapter.\`in\`.rest.dto.FilmResponse
import dev.pollito.spring_kotlin.sakila.film.domain.model.Film
// highlight-added-start
import org.mapstruct.Mapper
import org.springframework.core.convert.converter.Converter
// highlight-added-end

// highlight-added-start
@Mapper(config = MapperSpringConfig::class)
interface FilmRestMapper : Converter<Film, FilmResponse> {
  override fun convert(source: Film): FilmResponse
// highlight-added-end
}`}
  </CollapsibleCodeBlock>
);

const FilmRestMapperGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/sakila/film/adapter/in/rest/FilmRestMapper.groovy"
  >
    {`package dev.pollito.spring_groovy.sakila.film.adapter.in.rest

import dev.pollito.spring_groovy.sakila.film.adapter.in.rest.dto.FilmResponse
import dev.pollito.spring_groovy.sakila.film.domain.model.Film
import groovy.transform.CompileStatic
// highlight-added-start
import org.modelmapper.ModelMapper
import org.springframework.stereotype.Component

@Component
@CompileStatic
class FilmRestMapper {
  private final ModelMapper mapper

  FilmRestMapper(ModelMapper mapper) {
    this.mapper = mapper
  }

  FilmResponse convert(Film source) {
    mapper.map(source, FilmResponse)
  }
// highlight-added-end
}`}
  </CollapsibleCodeBlock>
);

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
);

export const FilmRestControllerGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/sakila/film/adapter/in/rest/FilmRestController.groovy"
  >
    {`// ...
class FilmRestController {
  FindByIdPortIn findByIdPortIn
// highlight-added
  FilmRestMapper mapper

// highlight-modified
  FilmRestController(FindByIdPortIn findByIdPortIn, FilmRestMapper mapper) {
    this.findByIdPortIn = findByIdPortIn
// highlight-added
    this.mapper = mapper
  }

  @GetMapping("/{id}")
  FilmResponse findById(@PathVariable("id") Integer id) {
// highlight-modified
    mapper.convert(findByIdPortIn.findById(id))
  }
}`}
  </CollapsibleCodeBlock>
);
