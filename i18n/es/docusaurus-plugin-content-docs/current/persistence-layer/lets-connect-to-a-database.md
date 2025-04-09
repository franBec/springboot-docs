---
sidebar_position: 5
---

# Conectémonos a una base de datos

En lugar de obtener los datos de los usuarios desde una fuente externa, vamos a obtenerlos de una base de datos que funciona en memoria.

## Agregar dependencias

Vamos a utilizar [H2 Database Engine](https://mvnrepository.com/artifact/com.h2database/h2) y [Spring Boot Starter Data JPA](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-data-jpa). En tu `build.gradle`, agregá las dependencias en la sección `dependencies`:

```groovy
runtimeOnly 'com.h2database:h2:2.3.232'
implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
```

## Agregar un manejador para PropertyReferenceException

La dependencia [Spring Boot Starter Data JPA](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-data-jpa) nos permite manejar `PropertyReferenceException`.

En `src/main/java/dev/pollito/users_manager/controller/advice/ControllerAdvice.java`, agregá un manejador con `@ExceptionHandler(PropertyReferenceException.class)`.

```java
package dev.pollito.users_manager.controller.advice;

import io.opentelemetry.api.trace.Span;
import jakarta.validation.ConstraintViolationException;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.NoSuchElementException;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@RestControllerAdvice
@Slf4j
public class ControllerAdvice {

  @NotNull private static ProblemDetail problemDetail(@NotNull Exception e, HttpStatus status) {
    String exceptionSimpleName = e.getClass().getSimpleName();
    log.error("{} being handled", exceptionSimpleName, e);
    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(status, e.getLocalizedMessage());
    problemDetail.setTitle(exceptionSimpleName);
    problemDetail.setProperty("timestamp", DateTimeFormatter.ISO_INSTANT.format(Instant.now()));
    problemDetail.setProperty("trace", Span.current().getSpanContext().getTraceId());
    return problemDetail;
  }

  @ExceptionHandler(Exception.class)
  public ProblemDetail handle(@NotNull Exception e) {
    return problemDetail(e, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(NoResourceFoundException.class)
  public ProblemDetail handle(@NotNull NoResourceFoundException e) {
    return problemDetail(e, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(MethodArgumentTypeMismatchException.class)
  public ProblemDetail handle(@NotNull MethodArgumentTypeMismatchException e) {
    return problemDetail(e, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(NoSuchElementException.class)
  public ProblemDetail handle(@NotNull NoSuchElementException e) {
    return problemDetail(e, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ProblemDetail handle(@NotNull ConstraintViolationException e) {
    return problemDetail(e, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(PropertyReferenceException.class)
  public ProblemDetail handle(@NotNull PropertyReferenceException e) {
    return problemDetail(e, HttpStatus.BAD_REQUEST);
  }
}
```

También agregá una prueba unitaria en `src/test/java/dev/pollito/users_manager/controller/advice/ControllerAdviceTest.java`.

```java
package dev.pollito.users_manager.controller.advice;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

import jakarta.validation.ConstraintViolationException;
import java.util.NoSuchElementException;
import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@ExtendWith(MockitoExtension.class)
class ControllerAdviceTest {
  @InjectMocks ControllerAdvice controllerAdvice;

  private static void problemDetailAssertions(
      @NotNull ProblemDetail response, @NotNull Exception e, @NotNull HttpStatus httpStatus) {
    assertEquals(httpStatus.value(), response.getStatus());
    assertEquals(e.getClass().getSimpleName(), response.getTitle());
    assertNotNull(response.getProperties());
    assertNotNull(response.getProperties().get("timestamp"));
    assertNotNull(response.getProperties().get("trace"));
  }

  @Test
  void whenNoResourceFoundExceptionThenReturnProblemDetail() {
    NoResourceFoundException e = mock(NoResourceFoundException.class);
    problemDetailAssertions(controllerAdvice.handle(e), e, HttpStatus.NOT_FOUND);
  }

  @Test
  void whenNoSuchElementExceptionThenReturnProblemDetail() {
    NoSuchElementException e = mock(NoSuchElementException.class);
    problemDetailAssertions(controllerAdvice.handle(e), e, HttpStatus.NOT_FOUND);
  }

  @Test
  void whenMethodArgumentTypeMismatchExceptionThenReturnProblemDetail() {
    MethodArgumentTypeMismatchException e = mock(MethodArgumentTypeMismatchException.class);
    problemDetailAssertions(controllerAdvice.handle(e), e, HttpStatus.BAD_REQUEST);
  }

  @Test
  void whenConstraintViolationExceptionThenReturnProblemDetail() {
    ConstraintViolationException e = mock(ConstraintViolationException.class);
    problemDetailAssertions(controllerAdvice.handle(e), e, HttpStatus.BAD_REQUEST);
  }

  @Test
  void whenExceptionThenReturnProblemDetail() {
    Exception e = mock(Exception.class);
    problemDetailAssertions(controllerAdvice.handle(e), e, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @Test
  void whenPropertyReferenceExceptionThenReturnProblemDetail() {
    PropertyReferenceException e = mock(PropertyReferenceException.class);
    problemDetailAssertions(controllerAdvice.handle(e), e, HttpStatus.BAD_REQUEST);
  }
}
```

## Acerca de las entidades

### Por qué no recomiendo generar clases de entidades

Aunque existe una forma de generar estas clases de entidades en el ecosistema Java/JPA/Spring Boot ([Hibernate Tools Maven Plugin](https://mvnrepository.com/artifact/org.hibernate/hibernate-tools-maven-plugin), similar a los generadores de OpenAPI para clientes/servicios de API), considero que no es confiable:

* Requiere una conexión a la base de datos, ya que se basa en una introspección en vivo. En casi todos los proyectos en los que trabajé, los desarrolladores no tienen acceso directo a la base de datos, la cual está reservada para entornos de testing y producción.
* Las clases de entidad generadas suelen ser un muy buen punto de partida, pero casi con seguridad vas a necesitar revisarlas y, potencialmente, ajustarlas:
    * Las relaciones complejas (especialmente ManyToMany con tablas asociativas) pueden no mapearse correctamente.
    * Los nombres generados podrían no coincidir perfectamente con las convenciones de nomenclatura de Java (por ejemplo, USER_TABLE -> UserTable en lugar de User).
    * Los tipos de datos de la base de datos pueden no mapearse a los tipos de Java deseados (por ejemplo, TIMESTAMP a Instant o LocalDateTime).

Confiar únicamente en la generación automática de entidades **no se recomienda**.

### Crear las entidades

- En `src/main/java/dev/pollito/users_manager/entity`, creá `Company.java`.

    ```java
    package dev.pollito.users_manager.entity;
    
    import jakarta.persistence.Column;
    import jakarta.persistence.Entity;
    import jakarta.persistence.GeneratedValue;
    import jakarta.persistence.GenerationType;
    import jakarta.persistence.Id;
    import jakarta.persistence.Table;
    import java.io.Serializable;
    import lombok.AccessLevel;
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;
    import lombok.experimental.FieldDefaults;
    
    @Entity
    @Table(name = "companies")
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public class Company implements Serializable {
    
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      @Column(name = "id")
      Long id;
    
      @Column(name = "name")
      String name;
    
      @Column(name = "catch_phrase")
      String catchPhrase;
    
      @Column(name = "bs")
      String bs;
    }
    ```

- En `src/main/java/dev/pollito/users_manager/entity`, creá `Geo.java`.

    ```java
    package dev.pollito.users_manager.entity;
    
    import jakarta.persistence.Column;
    import jakarta.persistence.Entity;
    import jakarta.persistence.GeneratedValue;
    import jakarta.persistence.GenerationType;
    import jakarta.persistence.Id;
    import jakarta.persistence.Table;
    import java.io.Serializable;
    import lombok.AccessLevel;
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;
    import lombok.experimental.FieldDefaults;
    
    @Entity
    @Table(name = "geolocalizations")
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public class Geo implements Serializable {
    
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      @Column(name = "id")
      Long id;
    
      @Column(name = "lat")
      String lat;
    
      @Column(name = "lng")
      String lng;
    }
    ```

- En `src/main/java/dev/pollito/users_manager/entity`, creá `Address.java`.

    ```java
    package dev.pollito.users_manager.entity;
    
    import jakarta.persistence.CascadeType;
    import jakarta.persistence.Column;
    import jakarta.persistence.Entity;
    import jakarta.persistence.GeneratedValue;
    import jakarta.persistence.GenerationType;
    import jakarta.persistence.Id;
    import jakarta.persistence.JoinColumn;
    import jakarta.persistence.OneToOne;
    import jakarta.persistence.Table;
    import java.io.Serializable;
    import lombok.AccessLevel;
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;
    import lombok.experimental.FieldDefaults;
    
    @Entity
    @Table(name = "addresses")
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public class Address implements Serializable {
    
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      @Column(name = "id")
      Long id;
    
      @Column(name = "street")
      String street;
    
      @Column(name = "suite")
      String suite;
    
      @Column(name = "city")
      String city;
    
      @Column(name = "zipcode")
      String zipcode;
    
      @OneToOne(cascade = CascadeType.ALL)
      @JoinColumn(name = "geo_id", referencedColumnName = "id")
      Geo geo;
    }
    ```
- En `src/main/java/dev/pollito/users_manager/entity`, creá `User.java`.

    ```java
    package dev.pollito.users_manager.entity;
    
    import jakarta.persistence.CascadeType;
    import jakarta.persistence.Column;
    import jakarta.persistence.Entity;
    import jakarta.persistence.GeneratedValue;
    import jakarta.persistence.GenerationType;
    import jakarta.persistence.Id;
    import jakarta.persistence.JoinColumn;
    import jakarta.persistence.OneToOne;
    import jakarta.persistence.Table;
    import java.io.Serializable;
    import java.time.LocalDateTime;
    import lombok.AccessLevel;
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;
    import lombok.experimental.FieldDefaults;
    
    @Entity
    @Table(name = "users")
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public class User implements Serializable {
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      @Column(name = "id")
      Long id;
    
      @Column(name = "creation_time", nullable = false, updatable = false)
      final LocalDateTime creationTime = LocalDateTime.now();
    
      @Column(name = "name", nullable = false)
      String name;
    
      @Column(name = "username", nullable = false)
      String username;
    
      @Column(name = "email", nullable = false)
      String email;
    
      @Column(name = "phone")
      String phone;
    
      @Column(name = "website")
      String website;
    
      @OneToOne(cascade = CascadeType.ALL)
      @JoinColumn(name = "address_id", referencedColumnName = "id")
      Address address;
    
      @OneToOne(cascade = CascadeType.ALL)
      @JoinColumn(name = "company_id", referencedColumnName = "id")
      Company company;
    }
    ```

Estas relaciones pueden no ser apropiadas en un escenario real (por ejemplo, una `Company` sólo podría estar asociada a un único `User`, o no podrías tener dos `User` con la misma `Address`), pero son lo suficientemente buenas para mantener nuestro proyecto simple y funcional.

## Datos de prueba

En `src/main/resources`, creá `data.sql`.

```sql
-- Create geolocalizations table
CREATE TABLE IF NOT EXISTS geolocalizations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lat VARCHAR(20) NOT NULL,
    lng VARCHAR(20) NOT NULL
);

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    catch_phrase VARCHAR(255),
    bs VARCHAR(255)
);

-- Create addresses table
CREATE TABLE IF NOT EXISTS addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    street VARCHAR(100) NOT NULL,
    suite VARCHAR(50),
    city VARCHAR(100) NOT NULL,
    zipcode VARCHAR(20),
    geo_id INT,
    FOREIGN KEY (geo_id) REFERENCES geolocalizations(id)
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    creation_time TIMESTAMP,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    website VARCHAR(100),
    address_id INT,
    company_id INT,
    FOREIGN KEY (address_id) REFERENCES addresses(id),
    FOREIGN KEY (company_id) REFERENCES companies(id)
);

-- Inserting into the geolocalizations table
INSERT INTO geolocalizations (lat, lng) VALUES ('-37.3159', '81.1496');
INSERT INTO geolocalizations (lat, lng) VALUES ('-43.9509', '-34.4618');
INSERT INTO geolocalizations (lat, lng) VALUES ('-68.6102', '-47.0653');
INSERT INTO geolocalizations (lat, lng) VALUES ('29.4572', '-164.2990');
INSERT INTO geolocalizations (lat, lng) VALUES ('-31.8129', '62.5342');
INSERT INTO geolocalizations (lat, lng) VALUES ('-71.4197', '71.7478');
INSERT INTO geolocalizations (lat, lng) VALUES ('24.8918', '21.8984');
INSERT INTO geolocalizations (lat, lng) VALUES ('-14.3990', '-120.7677');
INSERT INTO geolocalizations (lat, lng) VALUES ('24.6463', '-168.8889');
INSERT INTO geolocalizations (lat, lng) VALUES ('-38.2386', '57.2232');

-- Inserting into the company table
INSERT INTO companies (name, catch_phrase, bs) VALUES ('Romaguera-Crona', 'Multi-layered client-server neural-net', 'harness real-time e-markets');
INSERT INTO companies (name, catch_phrase, bs) VALUES ('Deckow-Crist', 'Proactive didactic contingency', 'synergize scalable supply-chains');
INSERT INTO companies (name, catch_phrase, bs) VALUES ('Romaguera-Jacobson', 'Face to face bifurcated interface', 'e-enable strategic applications');
INSERT INTO companies (name, catch_phrase, bs) VALUES ('Robel-Corkery', 'Multi-tiered zero tolerance productivity', 'transition cutting-edge web services');
INSERT INTO companies (name, catch_phrase, bs) VALUES ('Keebler LLC', 'User-centric fault-tolerant solution', 'revolutionize end-to-end systems');
INSERT INTO companies (name, catch_phrase, bs) VALUES ('Considine-Lockman', 'Synchronised bottom-line interface', 'e-enable innovative applications');
INSERT INTO companies (name, catch_phrase, bs) VALUES ('Johns Group', 'Configurable multimedia task-force', 'generate enterprise e-tailers');
INSERT INTO companies (name, catch_phrase, bs) VALUES ('Abernathy Group', 'Implemented secondary concept', 'e-enable extensible e-tailers');
INSERT INTO companies (name, catch_phrase, bs) VALUES ('Yost and Sons', 'Switchable contextually-based project', 'aggregate real-time technologies');
INSERT INTO companies (name, catch_phrase, bs) VALUES ('Hoeger LLC', 'Centralized empowering task-force', 'target end-to-end models');

-- Inserting into the address table
INSERT INTO addresses (street, suite, city, zipcode, geo_id) VALUES ('Kulas Light', 'Apt. 556', 'Gwenborough', '92998-3874', 1);
INSERT INTO addresses (street, suite, city, zipcode, geo_id) VALUES ('Victor Plains', 'Suite 879', 'Wisokyburgh', '90566-7771', 2);
INSERT INTO addresses (street, suite, city, zipcode, geo_id) VALUES ('Douglas Extension', 'Suite 847', 'McKenziehaven', '59590-4157', 3);
INSERT INTO addresses (street, suite, city, zipcode, geo_id) VALUES ('Hoeger Mall', 'Apt. 692', 'South Elvis', '53919-4257', 4);
INSERT INTO addresses (street, suite, city, zipcode, geo_id) VALUES ('Skiles Walks', 'Suite 351', 'Roscoeview', '33263', 5);
INSERT INTO addresses (street, suite, city, zipcode, geo_id) VALUES ('Norberto Crossing', 'Apt. 950', 'South Christy', '23505-1337', 6);
INSERT INTO addresses (street, suite, city, zipcode, geo_id) VALUES ('Rex Trail', 'Suite 280', 'Howemouth', '58804-1099', 7);
INSERT INTO addresses (street, suite, city, zipcode, geo_id) VALUES ('Ellsworth Summit', 'Suite 729', 'Aliyaview', '45169', 8);
INSERT INTO addresses (street, suite, city, zipcode, geo_id) VALUES ('Dayna Park', 'Suite 449', 'Bartholomebury', '76495-3109', 9);
INSERT INTO addresses (street, suite, city, zipcode, geo_id) VALUES ('Kattie Turnpike', 'Suite 198', 'Lebsackbury', '31428-2261', 10);

-- Inserting into the user table
INSERT INTO users (name, creation_time, username, email, phone, website, address_id, company_id) VALUES ('Leanne Graham', '2023-11-01T08:30:00', 'Bret', 'Sincere@april.biz', '1-770-736-8031 x56442', 'hildegard.org', 1, 1);
INSERT INTO users (name, creation_time, username, email, phone, website, address_id, company_id) VALUES ('Ervin Howell', '2023-11-02T10:15:00', 'Antonette', 'Shanna@melissa.tv', '010-692-6593 x09125', 'anastasia.net', 2, 2);
INSERT INTO users (name, creation_time, username, email, phone, website, address_id, company_id) VALUES ('Clementine Bauch', '2023-11-03T12:00:00', 'Samantha', 'Nathan@yesenia.net', '1-463-123-4447', 'ramiro.info', 3, 3);
INSERT INTO users (name, creation_time, username, email, phone, website, address_id, company_id) VALUES ('Patricia Lebsack', '2023-11-04T14:30:00', 'Karianne', 'Julianne.OConner@kory.org', '493-170-9623 x156', 'kale.biz', 4, 4);
INSERT INTO users (name, creation_time, username, email, phone, website, address_id, company_id) VALUES ('Chelsey Dietrich', '2023-11-05T16:45:00', 'Kamren', 'Lucio_Hettinger@annie.ca', '(254)954-1289', 'demarco.info', 5, 5);
INSERT INTO users (name, creation_time, username, email, phone, website, address_id, company_id) VALUES ('Mrs. Dennis Schulist', '2023-11-06T18:10:00', 'Leopoldo_Corkery', 'Karley_Dach@jasper.info', '1-477-935-8478 x6430', 'ola.org', 6,6 );
INSERT INTO users (name, creation_time, username, email, phone, website, address_id, company_id) VALUES ('Kurtis Weissnat', '2023-11-07T09:00:00', 'Elwyn.Skiles', 'Telly.Hoeger@billy.biz', '210.067.6132', 'elvis.io', 7, 7);
INSERT INTO users (name, creation_time, username, email, phone, website, address_id, company_id) VALUES ('Nicholas Runolfsdottir V', '2023-11-08T13:20:00', 'Maxime_Nienow', 'Sherwood@rosamond.me', '586.493.6943 x140', 'jacynthe.com', 8, 8);
INSERT INTO users (name, creation_time, username, email, phone, website, address_id, company_id) VALUES ('Glenna Reichert', '2023-11-09T11:05:00', 'Delphine', 'Chaim_McDermott@dana.io', '(775)976-6794 x41206', 'conrad.com', 9, 9);
INSERT INTO users (name, creation_time, username, email, phone, website, address_id, company_id) VALUES ('Clementina DuBuque', '2023-11-10T08:45:00', 'Moriah.Stanton', 'Rey.Padberg@karina.biz', '024-648-3804', 'ambrose.net', 10, 10);
```

* Estos son los datos de nuestros usuarios.
* Es muy importante que el nombre de este archivo sea `data.sql`. Si no, H2 no podrá proporcionar los datos simulados.

## Agregar propiedades de H2 en application.yml

En `src/main/resources/application.yml`, necesitamos agregar algunas propiedades para que H2 funcione. Después de agregarlas, debería quedar así:

```yaml
logging:
  level:
    org.hibernate.SQL: DEBUG
spring:
  application:
    name: users_manager
  datasource:
    url: jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE;AUTO_RECONNECT=TRUE;INIT=CREATE SCHEMA IF NOT EXISTS PUBLIC
    username: sa
    password: password
    driverClassName: org.h2.Driver
  h2:
    console.enabled: true
  jpa:
    database-platform: org.hibernate.dialect.H2Dialect
    defer-datasource-initialization: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.H2Dialect
```

## Crear un JpaRepository

En `src/main/java/dev/pollito/users_manager/repository`, creá `UserRepository.java`.

```java
package dev.pollito.users_manager.repository;

import dev.pollito.users_manager.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
  @Query(
      "SELECT u FROM User u "
          + "WHERE (:q IS NULL OR "
          + "LOWER(u.name) LIKE LOWER(CONCAT('%', :q, '%')) OR "
          + "LOWER(u.username) LIKE LOWER(CONCAT('%', :q, '%')) OR "
          + "LOWER(u.email) LIKE LOWER(CONCAT('%', :q, '%')))")
  Page<User> findAllByQueryContainingIgnoreCase(Pageable pageable, @Param("q") String q);
}
```

### ¿Qué es la anotación @Query?

A veces, necesitás una búsqueda más específica o compleja de lo que `JpaRepository` puede deducir sólo a partir del nombre del método.

* La anotación `@Query` es como darle a tu asistente instrucciones muy específicas y personalizadas, escritas en un lenguaje parecido al de la base de datos ([JPQL](https://www.baeldung.com/spring-data-jpa-query), que se parece mucho a SQL).
* Le estás diciendo a Spring exactamente cómo querés que encuentre los datos, en lugar de dejar que adivine.

### ¿Qué hace el método findAllByQueryContainingIgnoreCase?

* Le pasás dos cosas:
    * `pageRequest`: Le indica qué página de resultados querés y cuántos resultados por página (más adelante se explica Page).
    * `q`: Esta es tu palabra clave de búsqueda (como "john", "admin" o "example.com").
* El método utiliza las instrucciones personalizadas de la anotación `@Query` para:
    * Revisar todos los registros de User en tu base de datos.
    * Chequear si la palabra clave q aparece en el nombre, el username o el email del usuario.
    * Ignorar si las letras son mayúsculas o minúsculas (así que buscar "john" encontrará "John", "JOHN", "john", etc.).
* Si no proporcionás una palabra clave (q es nulo o vacío), simplemente te devolverá todos los usuarios (se ajusta a la parte de `:q IS NULL`).
* Finalmente, devuelve los usuarios encontrados, organizados en la página solicitada.

### ¿Qué es Page?

Pensá en `Page` como una única página de resultados de búsqueda en Google o Amazon. No contiene todos los resultados posibles, sino solo un grupo más pequeño (por ejemplo, 20 usuarios).

Un objeto `Page` tiene dos componentes principales:

1. La **lista real de objetos User** para la página que pediste.
2. Información adicional sobre la paginación, como:
    * ¿Cuántos usuarios en total coincidieron con la búsqueda?
    * ¿Cuántas páginas hay en total?
    * ¿Qué número de página es esta?
    * ¿Hay una página siguiente disponible?
    * ¿Hay una página anterior disponible?

## Crear un mapper

En `src/main/java/dev/pollito/users_manager/mapper`, creá `UserMapper.java`.

```java
package dev.pollito.users_manager.mapper;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

import dev.pollito.users_manager.model.User;
import dev.pollito.users_manager.model.Users;
import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;

@Mapper(componentModel = SPRING)
public interface UserMapper {
  User map(dev.pollito.users_manager.entity.User user);

  Users map(Page<dev.pollito/users_manager/entity/User> userPage);
}
```

## Crear una clase utilitaria para mapear la lógica de parámetros de consulta en lógica de paginación

En `src/main/java/dev/pollito/users_manager/util`, creá `PageUtil.java`.

```java
package dev.pollito.users_manager.util;

import java.util.List;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class PageUtil {
  private PageUtil() {}

  public static @NotNull Pageable createPageable(int page, int size, @NotNull List<String> sort) {
    Sort combinedSort = Sort.unsorted();
    boolean hasIdSort = false;

    for (String sortField : sort) {
      String[] sortParams = sortField.split(":");
      Sort.Direction direction =
          (sortParams.length > 1 && "desc".equalsIgnoreCase(sortParams[1]))
              ? Sort.Direction.DESC
              : Sort.Direction.ASC;

      if ("id".equalsIgnoreCase(sortParams[0])) {
        hasIdSort = true;
      }

      combinedSort = combinedSort.and(Sort.by(direction, sortParams[0]));
    }

    if (!hasIdSort) {
      combinedSort = combinedSort.and(Sort.by(Sort.Direction.ASC, "id"));
    }

    return PageRequest.of(page, size, combinedSort);
  }
}
```

## Escribir la lógica del servicio

En `src/main/java/dev/pollito/users_manager/service/impl/UserServiceImpl.java`, reescribí la lógica de negocio para obtener los datos de los usuarios desde `UserRepository`. Debería quedar algo así:

```java
package dev.pollito.users_manager.service.impl;

import static dev.pollito.users_manager.util.PageUtil.createPageable;

import dev.pollito.users_manager.mapper.UserMapper;
import dev.pollito.users_manager.model.User;
import dev.pollito.users_manager.model.Users;
import dev.pollito.users_manager.repository.UserRepository;
import dev.pollito/users_manager.service.UserService;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final UserMapper userMapper;

  @Override
  public Users findAll(Integer pageNumber, Integer pageSize, List<String> pageSort, String q) {
    return userMapper.map(
        userRepository.findAllByQueryContainingIgnoreCase(
            createPageable(pageNumber, pageSize, pageSort), q));
  }

  @Override
  public User findById(Long id) {
    return userMapper.map(userRepository.findById(id).orElseThrow());
  }
}
```

Comparado con obtener los datos de usuarios desde una fuente externa mediante Feign Client API, esta implementación del servicio es mucho más limpia, ya que toda la paginación y el ordenamiento ahora son responsabilidad del repositorio.

Hacé clic derecho en la clase principal → Ejecutar. Luego, andá a [http://localhost:8080/users](http://localhost:8080/users). Todo debería funcionar exactamente igual.

## Hacé algunas pruebas

Escribamos pruebas unitarias para `UserServiceImpl`. En `src/test/java/dev/pollito/users_manager/service/impl`, creá `UserServiceImplTest.java`.

```java
package dev.pollito.users_manager.service.impl;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

import dev.pollito.users_manager.entity.User;
import dev.pollito.users_manager.mapper.UserMapper;
import dev.pollito.users_manager.repository.UserRepository;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mapstruct.factory.Mappers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {
  @InjectMocks private UserServiceImpl userService;
  @Mock private UserRepository userRepository;

  @SuppressWarnings("unused")
  @Spy
  private UserMapper userMapper = Mappers.getMapper(UserMapper.class);

  @Test
  void whenFindAllThenReturnUsers() {
    when(userRepository.findAllByQueryContainingIgnoreCase(any(Pageable.class), anyString()))
        .thenReturn((new PageImpl<>(List.of(), PageRequest.of(0, 10), 0)));
    assertNotNull(userService.findAll(0, 1, Collections.emptyList(), ""));
  }

  @Test
  void whenGetUserThenReturnUser() {
    when(userRepository.findById(anyLong())).thenReturn(Optional.of(new User()));
    assertNotNull(userService.findById(1L));
  }
}
```

Commiteá el progreso hasta ahora.

```bash
git add .
git commit -m "persistence layer"
```