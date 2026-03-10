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
        │                                   └── FindByIdPortOutImplIntegrationTest.java
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
        │                                   └── FindByIdPortOutImplIntegrationTest.kt
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
        │                                   └── FindByIdPortOutImplIntegrationSpec.groovy
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

const ApplicationDevYamlJava = () => (
  <CollapsibleCodeBlock language="yaml" title="resources/application-dev.yaml">
    {`spring:
  application:
    name: spring_java
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
management:
  otlp:
    metrics:
      export:
        enabled: false`}
  </CollapsibleCodeBlock>
);

const ApplicationDevYamlKt = () => (
  <CollapsibleCodeBlock language="yaml" title="resources/application-dev.yaml">
    {`spring:
  application:
    name: spring_kotlin
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
management:
  otlp:
    metrics:
      export:
        enabled: false`}
  </CollapsibleCodeBlock>
);

const ApplicationDevYamlGroovy = () => (
  <CollapsibleCodeBlock language="yaml" title="resources/application-dev.yaml">
    {`spring:
  application:
    name: spring_groovy
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
management:
  otlp:
    metrics:
      export:
        enabled: false`}
  </CollapsibleCodeBlock>
);

export const ApplicationYamlDev = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <ApplicationDevYamlJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <ApplicationDevYamlKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <ApplicationDevYamlGroovy />
    </TabItem>
  </Tabs>
);

export const SakilaSchema = () => (
  <CollapsibleCodeBlock language="sql" title="resources/sakila-schema.sql">
    {`// highlight-added-start
CREATE USER IF NOT EXISTS "SA" SALT 'f5e66a2f36519569' HASH '40c5f0ccb9a5d48c8b0d1848c77bb5da7bc5bc8d200823efabfa0dd72260364e' ADMIN;
CREATE CACHED TABLE "PUBLIC"."ACTOR"(
    "ACTOR_ID" SMALLINT NOT NULL,
    "FIRST_NAME" VARCHAR(45) NOT NULL,
    "LAST_NAME" VARCHAR(45) NOT NULL,
    "LAST_UPDATE" TIMESTAMP NOT NULL
);   
ALTER TABLE "PUBLIC"."ACTOR" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_3" PRIMARY KEY("ACTOR_ID");   
-- 200 +/- SELECT COUNT(*) FROM PUBLIC.ACTOR;  

CREATE CACHED TABLE "PUBLIC"."ADDRESS"(
    "ADDRESS_ID" SMALLINT NOT NULL,
    "ADDRESS" VARCHAR(50) NOT NULL,
    "ADDRESS2" VARCHAR(50),
    "DISTRICT" VARCHAR(20) NOT NULL,
    "CITY_ID" SMALLINT NOT NULL,
    "POSTAL_CODE" VARCHAR(10),
    "PHONE" VARCHAR(20) NOT NULL,
    "LAST_UPDATE" TIMESTAMP NOT NULL
);     
ALTER TABLE "PUBLIC"."ADDRESS" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_E" PRIMARY KEY("ADDRESS_ID");               
-- 603 +/- SELECT COUNT(*) FROM PUBLIC.ADDRESS;

CREATE INDEX "PUBLIC"."IDX_FK_CITY_ID" ON "PUBLIC"."ADDRESS"("CITY_ID");    
CREATE CACHED TABLE "PUBLIC"."CATEGORY"(
    "CATEGORY_ID" TINYINT NOT NULL,
    "NAME" VARCHAR(25) NOT NULL,
    "LAST_UPDATE" TIMESTAMP NOT NULL
);          
ALTER TABLE "PUBLIC"."CATEGORY" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_31" PRIMARY KEY("CATEGORY_ID");            
-- 16 +/- SELECT COUNT(*) FROM PUBLIC.CATEGORY;

CREATE CACHED TABLE "PUBLIC"."COUNTRY"(
    "COUNTRY_ID" SMALLINT NOT NULL,
    "COUNTRY" VARCHAR(50) NOT NULL,
    "LAST_UPDATE" TIMESTAMP NOT NULL
);        
ALTER TABLE "PUBLIC"."COUNTRY" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_63" PRIMARY KEY("COUNTRY_ID");              
-- 109 +/- SELECT COUNT(*) FROM PUBLIC.COUNTRY;

CREATE CACHED TABLE "PUBLIC"."LANGUAGE"(
    "LANGUAGE_ID" TINYINT NOT NULL,
    "NAME" VARCHAR(20) NOT NULL,
    "LAST_UPDATE" TIMESTAMP NOT NULL
);          
ALTER TABLE "PUBLIC"."LANGUAGE" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_C" PRIMARY KEY("LANGUAGE_ID");             
-- 6 +/- SELECT COUNT(*) FROM PUBLIC.LANGUAGE; 

CREATE CACHED TABLE "PUBLIC"."CITY"(
    "CITY_ID" SMALLINT NOT NULL,
    "CITY" VARCHAR(50) NOT NULL,
    "COUNTRY_ID" SMALLINT NOT NULL,
    "LAST_UPDATE" TIMESTAMP NOT NULL
);             
ALTER TABLE "PUBLIC"."CITY" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_1" PRIMARY KEY("CITY_ID");     
-- 600 +/- SELECT COUNT(*) FROM PUBLIC.CITY;   

CREATE CACHED TABLE "PUBLIC"."CUSTOMER"(
    "CUSTOMER_ID" SMALLINT NOT NULL,
    "STORE_ID" TINYINT NOT NULL,
    "FIRST_NAME" VARCHAR(45) NOT NULL,
    "LAST_NAME" VARCHAR(45) NOT NULL,
    "EMAIL" VARCHAR(50),
    "ADDRESS_ID" SMALLINT NOT NULL,
    "ACTIVE" BOOLEAN NOT NULL,
    "CREATE_DATE" TIMESTAMP NOT NULL,
    "LAST_UPDATE" TIMESTAMP NOT NULL
);          
ALTER TABLE "PUBLIC"."CUSTOMER" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_5" PRIMARY KEY("CUSTOMER_ID");             
-- 599 +/- SELECT COUNT(*) FROM PUBLIC.CUSTOMER;               

CREATE CACHED TABLE "PUBLIC"."FILM"(
    "FILM_ID" SMALLINT NOT NULL,
    "TITLE" VARCHAR(255) NOT NULL,
    "DESCRIPTION" LONGVARCHAR,
    "RELEASE_YEAR" DATE,
    "LANGUAGE_ID" TINYINT NOT NULL,
    "ORIGINAL_LANGUAGE_ID" TINYINT,
    "RENTAL_DURATION" TINYINT NOT NULL,
    "RENTAL_RATE" DECIMAL(4, 2) NOT NULL,
    "LENGTH" SMALLINT,
    "REPLACEMENT_COST" DECIMAL(5, 2) NOT NULL,
    "RATING" VARCHAR(5),
    "SPECIAL_FEATURES" VARCHAR(54),
    "LAST_UPDATE" TIMESTAMP NOT NULL
);          
ALTER TABLE "PUBLIC"."FILM" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_2" PRIMARY KEY("FILM_ID");     
-- 1000 +/- SELECT COUNT(*) FROM PUBLIC.FILM;  

CREATE INDEX "PUBLIC"."IDX_TITLE" ON "PUBLIC"."FILM"("TITLE"); 
CREATE CACHED TABLE "PUBLIC"."STORE"(
    "STORE_ID" TINYINT NOT NULL,
    "MANAGER_STAFF_ID" TINYINT NOT NULL,
    "ADDRESS_ID" SMALLINT NOT NULL,
    "LAST_UPDATE" TIMESTAMP NOT NULL
);    
ALTER TABLE "PUBLIC"."STORE" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_4" PRIMARY KEY("STORE_ID");   
-- 2 +/- SELECT COUNT(*) FROM PUBLIC.STORE;    

CREATE CACHED TABLE "PUBLIC"."INVENTORY"(
    "INVENTORY_ID" INTEGER NOT NULL SELECTIVITY 100,
    "FILM_ID" SMALLINT NOT NULL SELECTIVITY 20,
    "STORE_ID" TINYINT NOT NULL SELECTIVITY 1,
    "LAST_UPDATE" TIMESTAMP NOT NULL SELECTIVITY 1
);            
ALTER TABLE "PUBLIC"."INVENTORY" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_2D" PRIMARY KEY("INVENTORY_ID");          
-- 4581 +/- SELECT COUNT(*) FROM PUBLIC.INVENTORY;             

CREATE CACHED TABLE "PUBLIC"."STAFF"(
    "STAFF_ID" TINYINT NOT NULL,
    "FIRST_NAME" VARCHAR(45) NOT NULL,
    "LAST_NAME" VARCHAR(45) NOT NULL,
    "ADDRESS_ID" SMALLINT NOT NULL,
    "PICTURE" LONGVARBINARY,
    "EMAIL" VARCHAR(50),
    "STORE_ID" TINYINT NOT NULL,
    "ACTIVE" BOOLEAN NOT NULL,
    "USERNAME" VARCHAR(16) NOT NULL,
    "PASSWORD" VARCHAR(40),
    "LAST_UPDATE" TIMESTAMP NOT NULL
);         
ALTER TABLE "PUBLIC"."STAFF" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_4B" PRIMARY KEY("STAFF_ID");  
-- 2 +/- SELECT COUNT(*) FROM PUBLIC.STAFF;    

CREATE CACHED TABLE "PUBLIC"."RENTAL"(
    "RENTAL_ID" INTEGER NOT NULL SELECTIVITY 100,
    "RENTAL_DATE" TIMESTAMP NOT NULL SELECTIVITY 99,
    "INVENTORY_ID" INTEGER NOT NULL SELECTIVITY 42,
    "CUSTOMER_ID" SMALLINT NOT NULL SELECTIVITY 5,
    "RETURN_DATE" TIMESTAMP SELECTIVITY 99,
    "STAFF_ID" TINYINT NOT NULL SELECTIVITY 1,
    "LAST_UPDATE" TIMESTAMP NOT NULL SELECTIVITY 1
);          
ALTER TABLE "PUBLIC"."RENTAL" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_8" PRIMARY KEY("RENTAL_ID"); 
-- 16044 +/- SELECT COUNT(*) FROM PUBLIC.RENTAL;               

CREATE CACHED TABLE "PUBLIC"."FILM_ACTOR"(
    "ACTOR_ID" SMALLINT NOT NULL SELECTIVITY 3,
    "FILM_ID" SMALLINT NOT NULL SELECTIVITY 42,
    "LAST_UPDATE" TIMESTAMP NOT NULL SELECTIVITY 1
);               
ALTER TABLE "PUBLIC"."FILM_ACTOR" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_7" PRIMARY KEY("ACTOR_ID", "FILM_ID");   
-- 5462 +/- SELECT COUNT(*) FROM PUBLIC.FILM_ACTOR;            

CREATE CACHED TABLE "PUBLIC"."FILM_CATEGORY"(
    "FILM_ID" SMALLINT NOT NULL,
    "CATEGORY_ID" TINYINT NOT NULL,
    "LAST_UPDATE" TIMESTAMP NOT NULL
);     
ALTER TABLE "PUBLIC"."FILM_CATEGORY" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_4E" PRIMARY KEY("CATEGORY_ID", "FILM_ID");            
-- 1000 +/- SELECT COUNT(*) FROM PUBLIC.FILM_CATEGORY;         

CREATE CACHED TABLE "PUBLIC"."PAYMENT"(
    "PAYMENT_ID" SMALLINT NOT NULL SELECTIVITY 100,
    "CUSTOMER_ID" SMALLINT NOT NULL SELECTIVITY 3,
    "STAFF_ID" TINYINT NOT NULL SELECTIVITY 1,
    "RENTAL_ID" INTEGER SELECTIVITY 99,
    "AMOUNT" DECIMAL(5, 2) NOT NULL SELECTIVITY 1,
    "PAYMENT_DATE" TIMESTAMP NOT NULL SELECTIVITY 98,
    "LAST_UPDATE" TIMESTAMP NOT NULL SELECTIVITY 2
);           
ALTER TABLE "PUBLIC"."PAYMENT" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_F" PRIMARY KEY("PAYMENT_ID");               
-- 16049 +/- SELECT COUNT(*) FROM PUBLIC.PAYMENT;              

ALTER TABLE "PUBLIC"."FILM" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_20" FOREIGN KEY("LANGUAGE_ID") REFERENCES "PUBLIC"."LANGUAGE"("LANGUAGE_ID") NOCHECK;          
ALTER TABLE "PUBLIC"."FILM_ACTOR" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_798" FOREIGN KEY("ACTOR_ID") REFERENCES "PUBLIC"."ACTOR"("ACTOR_ID") NOCHECK;            
ALTER TABLE "PUBLIC"."INVENTORY" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_2DA8" FOREIGN KEY("FILM_ID") REFERENCES "PUBLIC"."FILM"("FILM_ID") NOCHECK;               
ALTER TABLE "PUBLIC"."PAYMENT" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_FBE7" FOREIGN KEY("RENTAL_ID") REFERENCES "PUBLIC"."RENTAL"("RENTAL_ID") NOCHECK;           
ALTER TABLE "PUBLIC"."CUSTOMER" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_52" FOREIGN KEY("ADDRESS_ID") REFERENCES "PUBLIC"."ADDRESS"("ADDRESS_ID") NOCHECK;         
ALTER TABLE "PUBLIC"."PAYMENT" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_FBE" FOREIGN KEY("CUSTOMER_ID") REFERENCES "PUBLIC"."CUSTOMER"("CUSTOMER_ID") NOCHECK;      
ALTER TABLE "PUBLIC"."RENTAL" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_8F" FOREIGN KEY("STAFF_ID") REFERENCES "PUBLIC"."STAFF"("STAFF_ID") NOCHECK; 
ALTER TABLE "PUBLIC"."ADDRESS" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_E6" FOREIGN KEY("CITY_ID") REFERENCES "PUBLIC"."CITY"("CITY_ID") NOCHECK;   
ALTER TABLE "PUBLIC"."CUSTOMER" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_52C" FOREIGN KEY("STORE_ID") REFERENCES "PUBLIC"."STORE"("STORE_ID") NOCHECK;              
ALTER TABLE "PUBLIC"."FILM" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_20E" FOREIGN KEY("ORIGINAL_LANGUAGE_ID") REFERENCES "PUBLIC"."LANGUAGE"("LANGUAGE_ID") NOCHECK;
ALTER TABLE "PUBLIC"."FILM_CATEGORY" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_4E8" FOREIGN KEY("FILM_ID") REFERENCES "PUBLIC"."FILM"("FILM_ID") NOCHECK;            
ALTER TABLE "PUBLIC"."STORE" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_4B90" FOREIGN KEY("ADDRESS_ID") REFERENCES "PUBLIC"."ADDRESS"("ADDRESS_ID") NOCHECK;          
ALTER TABLE "PUBLIC"."STAFF" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_4B8C" FOREIGN KEY("STORE_ID") REFERENCES "PUBLIC"."STORE"("STORE_ID") NOCHECK;
ALTER TABLE "PUBLIC"."FILM_CATEGORY" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_4E85" FOREIGN KEY("CATEGORY_ID") REFERENCES "PUBLIC"."CATEGORY"("CATEGORY_ID") NOCHECK;               
ALTER TABLE "PUBLIC"."RENTAL" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_8FD" FOREIGN KEY("CUSTOMER_ID") REFERENCES "PUBLIC"."CUSTOMER"("CUSTOMER_ID") NOCHECK;       
ALTER TABLE "PUBLIC"."RENTAL" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_8FDE" FOREIGN KEY("INVENTORY_ID") REFERENCES "PUBLIC"."INVENTORY"("INVENTORY_ID") NOCHECK;   
ALTER TABLE "PUBLIC"."FILM_ACTOR" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_79" FOREIGN KEY("FILM_ID") REFERENCES "PUBLIC"."FILM"("FILM_ID") NOCHECK;
ALTER TABLE "PUBLIC"."INVENTORY" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_2DA" FOREIGN KEY("STORE_ID") REFERENCES "PUBLIC"."STORE"("STORE_ID") NOCHECK;             
ALTER TABLE "PUBLIC"."STAFF" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_4B8" FOREIGN KEY("ADDRESS_ID") REFERENCES "PUBLIC"."ADDRESS"("ADDRESS_ID") NOCHECK;           
ALTER TABLE "PUBLIC"."PAYMENT" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_FB" FOREIGN KEY("STAFF_ID") REFERENCES "PUBLIC"."STAFF"("STAFF_ID") NOCHECK;
ALTER TABLE "PUBLIC"."STORE" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_4B9" FOREIGN KEY("MANAGER_STAFF_ID") REFERENCES "PUBLIC"."STAFF"("STAFF_ID") NOCHECK;         
ALTER TABLE "PUBLIC"."CITY" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_1F" FOREIGN KEY("COUNTRY_ID") REFERENCES "PUBLIC"."COUNTRY"("COUNTRY_ID") NOCHECK;             
// highlight-added-end`}
  </CollapsibleCodeBlock>
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

const ApplicationTestYamlJava = () => (
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

const ApplicationTestYamlGroovy = () => (
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

export const ApplicationTestYaml = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <ApplicationTestYamlJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <ApplicationTestYamlKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <ApplicationTestYamlGroovy />
    </TabItem>
  </Tabs>
);

const PortOutImplIntegrationTestJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/sakila/film/domain/port/out/FindByIdPortOutImplIntegrationTest.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.sakila.film.domain.port.out;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_CLASS;

import dev.pollito.spring_java.sakila.film.adapter.out.jpa.FilmJpaMapperImpl;
import dev.pollito.spring_java.sakila.film.domain.model.Film;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
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
class FindByIdPortOutImplIntegrationTest {

  @SuppressWarnings("unused")
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
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const PortOutImplIntegrationTestKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/sakila/film/domain/port/out/FindByIdPortOutImplIntegrationTest.kt"
  >
    {`// highlight-added-start
package dev.pollito.spring_kotlin.sakila.film.domain.port.out

import dev.pollito.spring_kotlin.sakila.film.adapter.out.jpa.FilmJpaMapperImpl
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.CsvSource
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
class FindByIdPortOutImplIntegrationTest {

  @Autowired private lateinit var findByIdPortOut: FindByIdPortOut

  @ParameterizedTest
  @CsvSource("1, 2006", "10, ")
  fun \`findById when film exists should return film\`(filmId: Int, expectedYear: Int?) {
    val result = findByIdPortOut.findById(filmId)

    Assertions.assertNotNull(result)
    Assertions.assertEquals(filmId, result.id)
    Assertions.assertEquals(expectedYear, result.releaseYear)
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const PortOutImplIntegrationSpecGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/sakila/film/domain/port/out/FindByIdPortOutImplIntegrationSpec.groovy"
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
import spock.lang.Unroll

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
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const PortOutImplIntegrationTest = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <PortOutImplIntegrationTestJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <PortOutImplIntegrationTestKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <PortOutImplIntegrationSpecGroovy />
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
    {`package dev.pollito.spring_java.config.advice;

import static io.opentelemetry.api.trace.Span.current;
import static java.time.OffsetDateTime.now;
import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.ResponseEntity.status;

import dev.pollito.spring_java.generated.model.Error;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
// highlight-added
import java.util.NoSuchElementException;
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

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<Error> handle(ConstraintViolationException e) {
    return buildProblemDetail(e, BAD_REQUEST);
  }

// highlight-added-start
  @ExceptionHandler(NoSuchElementException.class)
  public ResponseEntity<Error> handle(NoSuchElementException e) {
    return buildProblemDetail(e, NOT_FOUND);
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
    {`package dev.pollito.spring_kotlin.config.advice

import dev.pollito.spring_kotlin.generated.model.Error
import io.github.oshai.kotlinlogging.KotlinLogging
import io.opentelemetry.api.trace.Span.current
import jakarta.servlet.http.HttpServletRequest
import jakarta.validation.ConstraintViolationException
import java.time.OffsetDateTime.now
import org.springframework.http.HttpStatus
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
    val logMessage = "$exceptionSimpleName being handled"

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

  @ExceptionHandler(ConstraintViolationException::class)
  fun handle(e: ConstraintViolationException): ResponseEntity<Error> {
    return buildProblemDetail(e, BAD_REQUEST)
  }

// highlight-added-start
  @ExceptionHandler(NoSuchElementException::class)
  fun handle(e: NoSuchElementException): ResponseEntity<Error> {
    return buildProblemDetail(e, NOT_FOUND)
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

  @ExceptionHandler(ConstraintViolationException)
  ResponseEntity<Error> handle(ConstraintViolationException e) {
    buildProblemDetail(e, BAD_REQUEST)
  }

// highlight-added-start
  @ExceptionHandler(NoSuchElementException)
  ResponseEntity<Error> handle(NoSuchElementException e) {
    buildProblemDetail(e, NOT_FOUND)
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
    {`package dev.pollito.spring_java.config.advice;

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
// highlight-added
import java.util.NoSuchElementException;
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

// highlight-added-start
    @GetMapping("/no-such-element")
    @SuppressWarnings("unused")
    public void throwNoSuchElementException() {
      throw new NoSuchElementException("No such element");
    }
// highlight-added-end
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
        Arguments.of("/fake/bad-request", BAD_REQUEST),
// highlight-added
        Arguments.of("/fake/no-such-element", NOT_FOUND));
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
}`}
  </CollapsibleCodeBlock>
);

const ControllerAdviceTestKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/config/advice/ControllerAdviceTest.kt"
  >
    {`package dev.pollito.spring_kotlin.config.advice

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
            Arguments.of("/fake/not-found", NOT_FOUND),
            Arguments.of("/fake/error", INTERNAL_SERVER_ERROR),
            Arguments.of("/fake/bad-request", BAD_REQUEST),
// highlight-added
            Arguments.of("/fake/no-such-element", NOT_FOUND),
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
}`}
  </CollapsibleCodeBlock>
);

const ControllerAdviceSpecGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/config/advice/ControllerAdviceSpec.groovy"
  >
    {`package dev.pollito.spring_groovy.config.advice

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

// highlight-added-start
    @GetMapping("/no-such-element")
    @SuppressWarnings("unused")
    static void throwNoSuchElementException() {
      throw new NoSuchElementException("No such element")
    }
// highlight-added-end
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
    endpoint                | httpStatus            || exceptionType
    "/fake/not-found"       | NOT_FOUND             || "NoResourceFoundException"
    "/fake/error"           | INTERNAL_SERVER_ERROR || "Exception"
    "/fake/bad-request"     | BAD_REQUEST           || "ConstraintViolationException"
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
