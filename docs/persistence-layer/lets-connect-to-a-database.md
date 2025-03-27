---
sidebar_position: 5
---

# Let's Connect To A Database

Instead of getting the users data from an outside source, we are going to get it from an in-memory database.

## Add Dependencies

We are going to be using [H2 Database Engine](https://mvnrepository.com/artifact/com.h2database/h2) and [Spring Boot Starter Data JPA](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-data-jpa). In your `build.gradle`, add the dependencies in the `dependencies` section:

```groovy
runtimeOnly 'com.h2database:h2:2.3.232'
implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
```

## Add A PropertyReferenceException Handler

The dependency [Spring Boot Starter Data JPA](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-data-jpa) give us access to handle `PropertyReferenceException`.

In `src/main/java/dev/pollito/users_manager/controller/advice/ControllerAdvice.java`, add a `@ExceptionHandler(PropertyReferenceException.class)` handler.

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

Also add a unit test in `src/test/java/dev/pollito/users_manager/controller/advice/ControllerAdviceTest.java`.

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
## About Entities

### Why I Don't Recommend Generating Entities Classes

Even though there is a way to generate these entities classes in the Java/JPA/Spring Boot ecosystem ([Hibernate Tools Maven Plugin](https://mvnrepository.com/artifact/org.hibernate/hibernate-tools-maven-plugin), analogous to OpenAPI generators for API clients/servers), I consider it unreliable:

* It requires a connection to the database, as it relies on live database introspection. In almost all projects I worked at, developers don't have a connection to the database, that is reserved to the testing and production environments.
* The generated entity classes are usually a very good starting point, but you will almost certainly need to review and potentially tweak them:
  * Complex relationships (especially ManyToMany with join tables) may not be mapped correctly.
  * The generated names might not perfectly match your Java naming conventions (e.g., USER_TABLE -> UserTable instead of User).
  * Database types may not be mapped to the desired Java types (e.g., TIMESTAMP to Instant or LocalDateTime).

Relying purely on automated entity generation **is not recommended due to lower reliability**.

### Create The Entities

- In `src/main/java/dev/pollito/users_manager/entity`, create `Company.java`.

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

- In `src/main/java/dev/pollito/users_manager/entity`, create `Geo.java`.

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

- In `src/main/java/dev/pollito/users_manager/entity`, create `Address.java`.

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
- In `src/main/java/dev/pollito/users_manager/entity`, create `User.java`.

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

These relationships may not be appropriate in a real world scenario (for example, a `Company` can only be associated with only one `User`, or you cannot have two `User` with the same `Address`), but they are good enough to keep our project simple and functional.

## Mock Data

In `src/main/resources`, create `data.sql`.

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

* This is our users' data.
* It is very important that the name of this file is `data.sql`. If not, H2 won't be able to provide the mocked data.

## Add H2 Properties in application.yml

In `src/main/resources/application.yml`, we need to add some properties to make H2 work. After adding, it should look like this:

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

## Create A JpaRepository

In `src/main/java/dev/pollito/users_manager/repository`, create `UserRepository.java`.

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

### What is the @Query annotation?

Sometimes, you need a more specific or complex search than what `JpaRepository` can figure out from just a method name.

* The `@Query` annotation is like giving your assistant very specific, custom instructions written in a database-like language ([JPQL](https://www.baeldung.com/spring-data-jpa-query), which looks a lot like SQL).
* You're telling Spring exactly how you want it to find the data, rather than letting it guess.

### What does this method findAllByQueryContainingIgnoreCase do?

* You give it two things:
  * `pageRequest`: Tells it which page of results you want and how many results per page. (More on Page below).
  * `q`: This is your search keyword (like "john", "admin", or "example.com").
* The method then uses the custom instructions from the `@Query` to:
  * Look through all the User records in your database.
  * Check if the search keyword q appears anywhere within the user's name, username, or email.
  * It ignores whether the letters are uppercase or lowercase (so searching for "john" will find "John", "JOHN", "john", etc.).
* If you don't provide a search keyword (q is null or empty), it will just return all users (matching the `:q IS NULL` part).
* Finally, it returns the found users, organized into the requested page.

### What is Page?

Think of `Page` like a single page of search results on Google or Amazon. It doesn't contain all possible results, just a smaller chunk (e.g., 20 users).

A `Page` object holds two main things:

1. The actual **list of User objects** for the current page you asked for.
2. Extra **information about the pagination**, such as:
   * How many users matched the search in total?
   * How many pages are there in total?
   * What page number is this one?
   * Is there a next page available?
   * Is there a previous page available?

## Create a Mapper

In `src/main/java/dev/pollito/users_manager/mapper`, create `UserMapper.java`.

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

  Users map(Page<dev.pollito.users_manager.entity.User> userPage);
}
```

## Create A Utility Class For Mapping Request Query Param Logic Into Page Logic

In `src/main/java/dev/pollito/users_manager/util`, create `PageUtil.java`.

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

## Write Service Logic

In `src/main/java/dev/pollito/users_manager/service/impl/UserServiceImpl.java`, rewrite the business logic to get the users' data from `UserRepository`. It should look something like this:

```java
package dev.pollito.users_manager.service.impl;

import static dev.pollito.users_manager.util.PageUtil.createPageable;

import dev.pollito.users_manager.mapper.UserMapper;
import dev.pollito.users_manager.model.User;
import dev.pollito.users_manager.model.Users;
import dev.pollito.users_manager.repository.UserRepository;
import dev.pollito.users_manager.service.UserService;
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

Compared to getting the users' data from an outside source with Feign Client API, this service implementation is much cleaner, cause all the pagination and sorting are now the `repository` responsibility.

Right-click the main class → Run. Then go to [http://localhost:8080/users](http://localhost:8080/users). Everything should be working exactly the same.

## Do Some Testing

Let's write back tests on `UserServiceImpl`. In `src/test/java/dev/pollito/users_manager/service/impl`, create `UserServiceImplTest.java`.

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