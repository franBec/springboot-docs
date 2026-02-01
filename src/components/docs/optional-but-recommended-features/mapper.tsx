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
                        │                   └── FilmMapper.java
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
                        │                   └── FilmMapper.kt
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

const BuildGradleJava = () => (
  <CollapsibleCodeBlock language="groovy" title="build.gradle">
    {`plugins {
  id 'java'
  id 'org.springframework.boot' version '4.0.1'
  id 'io.spring.dependency-management' version '1.1.7'
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
}`}
  </CollapsibleCodeBlock>
);

const BuildGradleKt = () => (
  <CollapsibleCodeBlock language="kts" title="build.gradle.kts">
    {`plugins {
  kotlin("jvm") version "2.2.21"
  kotlin("plugin.spring") version "2.2.21"
  id("org.springframework.boot") version "4.0.1"
  id("io.spring.dependency-management") version "1.1.7"
  id("com.diffplug.spotless") version "8.1.0"
// highlight-added
  kotlin("kapt") version "2.3.0"
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

kotlin {
  compilerOptions {
    freeCompilerArgs.addAll("-Xjsr305=strict", "-Xannotation-default-target=param-property")
  }
}

tasks.withType<Test> { useJUnitPlatform() }

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
}`}
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

export const MapperSpringConfig = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <MapperSpringConfigJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <MapperSpringConfigKt />
    </TabItem>
  </Tabs>
);

const FilmMapperJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/sakila/film/adapter/in/rest/FilmMapper.java"
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
public interface FilmMapper extends Converter<Film, FilmResponse> {
  @Override
  FilmResponse convert(@Nullable Film source);
// highlight-added-end
}`}
  </CollapsibleCodeBlock>
);

const FilmMapperKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/sakila/film/adapter/in/rest/FilmMapper.kt"
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
interface FilmMapper : Converter<Film, FilmResponse> {
  override fun convert(source: Film): FilmResponse
// highlight-added-end
}`}
  </CollapsibleCodeBlock>
);

export const FilmMapper = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <FilmMapperJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <FilmMapperKt />
    </TabItem>
  </Tabs>
);
