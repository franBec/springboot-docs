---
sidebar_position: 4
---

# Database Integration

Currently, the application retrieves user data from [\{JSON\} Placeholder /users endpoint](https://jsonplaceholder.typicode.com/users), but lacks profile picture URLs (`profilePictureUrl` is null).

<div>
  <img src={require('@site/static/img/persistence-integration/response.png').default} alt="response" />
</div>

We need to enhance the application to retrieve and store profile picture URLs in a database. We'll implement this using an H2 in-memory database.

## Add Dependencies

We need [H2 Database Engine](https://mvnrepository.com/artifact/com.h2database/h2) and [Spring Boot Starter Data JPA](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-data-jpa). Add them in the `build.gradle` dependencies section:

```groovy
runtimeOnly 'com.h2database:h2:2.3.232'
implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
```

## Mock Data

This is the representation of the store profile picture URLs in a database.
* The name of this file must be `data.sql`. If not, H2 won't be able to provide the mocked data.

```sql title="src/main/resources/data.sql"
-- Create users table
CREATE TABLE IF NOT EXISTS public.USERMETADATA (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    profile_picture_url VARCHAR(255) NOT NULL
);

-- Inserting into the public.USERMETADATA table
INSERT INTO public.USERMETADATA (user_id, profile_picture_url) VALUES (1, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png');
INSERT INTO public.USERMETADATA (user_id, profile_picture_url) VALUES (2, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png');
INSERT INTO public.USERMETADATA (user_id, profile_picture_url) VALUES (3, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png');
INSERT INTO public.USERMETADATA (user_id, profile_picture_url) VALUES (4, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png');
INSERT INTO public.USERMETADATA (user_id, profile_picture_url) VALUES (5, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png');
INSERT INTO public.USERMETADATA (user_id, profile_picture_url) VALUES (6, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png');
INSERT INTO public.USERMETADATA (user_id, profile_picture_url) VALUES (7, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png');
INSERT INTO public.USERMETADATA (user_id, profile_picture_url) VALUES (8, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png');
INSERT INTO public.USERMETADATA (user_id, profile_picture_url) VALUES (9, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png');
INSERT INTO public.USERMETADATA (user_id, profile_picture_url) VALUES (10, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png');
```

##  H2 Properties

Add H2 properties in `application.yml`. The result should look like this:

```yaml title="src/main/resources/application.yml"
jsonplaceholder:
  baseUrl: https://jsonplaceholder.typicode.com/
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

## Secondary Port

<div>
  <img src={require('@site/static/img/persistence-integration/hexagonal-arch-secondary-port.png').default} alt="hexagonal architecture secondary port" />
</div>

_Other folders are omitted for simplicity._

```java title="src/main/java/dev/pollito/users_manager/domain/port/out/UserMetadataRepository.java"
package dev.pollito.users_manager.domain.port.out;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface UserMetadataRepository {
  Map<Long, Optional<String>> findProfilePictureUrlByIds(List<Long> ids);
}
```

The method `findProfilePictureUrlByIds` is designed to fetch multiple users' profile pictures efficiently in a single operation.

* The caller would provide a list of user IDs and receive a map where each ID is mapped to an Optional containing either the profile picture URL (if metadata exists for that user) or `Empty Optional` (if no metadata exists).
* This batch retrieval pattern helps avoid [N+1 query problems](https://planetscale.com/blog/what-is-n-1-query-problem-and-how-to-solve-it) when displaying lists of users with their profile pictures.

## Secondary Adapter (JPA)


### Why I Don't Recommend Generating Entities Classes

Even though there is a way to generate these entity classes in the Java/JPA/Spring Boot ecosystem ([Hibernate Tools Maven Plugin](https://mvnrepository.com/artifact/org.hibernate/hibernate-tools-maven-plugin), analogous to OpenAPI generators for API clients/servers), **is not recommended due to lower reliability**:

* It requires a connection to the database, as it relies on live database introspection. In almost all projects I worked at, developers don't have a connection to the database (that is reserved to the testing and production environments).
* The generated entity classes are usually a great starting point, but you will almost certainly need to review and potentially tweak them:
  * Complex relationships (especially `ManyToMany` with join tables) may not be mapped correctly.
  * The generated names might not perfectly match your Java naming conventions (e.g., `USER_TABLE` -> `UserTable` instead of `User`).
  * Database types may not be mapped to the desired Java types (e.g., `TIMESTAMP` to Instant or `LocalDateTime`).

### Create the Entity

<div>
  <img src={require('@site/static/img/persistence-integration/hexagonal-arch-secondary-adapter-entity.png').default} alt="hexagonal architecture secondary adapter entity" />
</div>

_Other folders are omitted for simplicity._

```java title="src/main/java/dev/pollito/users_manager/adapter/out/jpa/entity/UserMetadataJpaEntity.java"
package dev.pollito.users_manager.adapter.out.jpa.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "USERMETADATA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserMetadataJpaEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  Long id;

  @Column(name = "user_id", unique = true, nullable = false)
  Long userId;

  @Column(name = "profile_picture_url", nullable = false)
  String profilePictureUrl;
}
```

### Extend JpaRepository

<div>
  <img src={require('@site/static/img/persistence-integration/hexagonal-arch-secondary-adapter-repository.png').default} alt="hexagonal architecture secondary adapter repository" />
</div>

_Other folders are omitted for simplicity._

```java title="src/main/java/dev/pollito/users_manager/adapter/out/jpa/repository/UserMetadataJpaRepository.java"
package dev.pollito.users_manager.adapter.out.jpa.repository;

import dev.pollito.users_manager.adapter.out.jpa.entity.UserMetadataJpaEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserMetadataJpaRepository extends JpaRepository<UserMetadataJpaEntity, Long> {
  List<UserMetadataJpaEntity> findByUserIdIn(List<Long> userIds);
}
```

While Spring Data JPA can automatically generate methods for simple queries, `findByUserIdIn` needs to be explicitly defined because Spring Data JPA generates query methods based on naming conventions.

* Spring parses the method name (`findByUserIdIn`) to understand you want to find entities where the userId field values match those in the provided collection

If you need a more specific or complex search than what `JpaRepository` can figure out from just a method name, the [@Query annotation](https://www.baeldung.com/spring-data-jpa-query) allow you to give custom instructions written in a database-like language ([JPQL](https://www.baeldung.com/spring-data-jpa-query), which looks a lot like SQL).

### Implement the Secondary Port

```java title="src/main/java/dev/pollito/users_manager/adapter/out/jpa/UserMetadataRepositoryImpl.java"
package dev.pollito.users_manager.adapter.out.jpa;

import static java.util.Optional.ofNullable;
import static java.util.function.UnaryOperator.identity;
import static java.util.stream.Collectors.toMap;

import dev.pollito.users_manager.adapter.out.jpa.entity.UserMetadataJpaEntity;
import dev.pollito.users_manager.adapter.out.jpa.repository.UserMetadataJpaRepository;
import dev.pollito.users_manager.domain.port.out.UserMetadataRepository;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserMetadataRepositoryImpl implements UserMetadataRepository {
  private final UserMetadataJpaRepository userMetadataJpaRepository;

  @Override
  public Map<Long, Optional<String>> findProfilePictureUrlByIds(List<Long> ids) {
    Map<Long, UserMetadataJpaEntity> entityMap =
        userMetadataJpaRepository.findByUserIdIn(ids).stream()
            .collect(toMap(UserMetadataJpaEntity::getUserId, identity()));

    return ids.stream()
        .collect(
            toMap(
                id -> id,
                id ->
                    ofNullable(entityMap.get(id))
                        .map(UserMetadataJpaEntity::getProfilePictureUrl)));
  }
}
```

This class maintains the contract defined by the Secondary Port interface while hiding the JPA implementation details from the service layer.

### Why Doesn't This Implementation Need a Mapper?

In the current implementation, we don't need a mapper because we're only extracting a single `String` property (`profilePictureUrl`) and returning it wrapped in an `Optional`.

If we were implementing something like this instead:

```java
public interface UserMetadataRepository {
  Map<Long, Optional<UserMetadata>> findUserMetadataByIds(List<Long> ids);
}
```

Where UserMetadata is a domain model object, we would need a mapper to:

* **Transform Entity to Domain**: Convert UserMetadataJpaEntity → UserMetadata domain object
* **Isolate Domain From Persistence**: Ensure domain objects don't contain any JPA-specific details
* **Apply Business Rules**: Handle any business logic during the transformation
* **Type Conversion**: Manage different property types or structure between entity and domain models

In a larger application following strict hexagonal architecture, some teams might still create a mapper for consistency and to prepare for future extensions. But for the current narrow use case, direct property access is pragmatic and clean.

## Use the Secondary Port

Modify `UserServiceImpl` so the application uses the repository.

```java title="src/main/java/dev/pollito/users_manager/domain/service/UserServiceImpl.java"
package dev.pollito.users_manager.domain.service;

import dev.pollito.users_manager.domain.model.User;
import dev.pollito.users_manager.domain.port.in.UserService;
import dev.pollito.users_manager.domain.port.out.UserApiClient;
import dev.pollito.users_manager.domain.port.out.UserMetadataRepository;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
  private final UserApiClient userApiClient;
  private final UserMetadataRepository userMetadataRepository;

  @Override
  public List<User> findAll() {
    List<User> users = userApiClient.findAll();
    Map<Long, Optional<String>> profilePictureUrls =
        userMetadataRepository.findProfilePictureUrlByIds(users.stream().map(User::getId).toList());
    users.forEach(
        user -> profilePictureUrls.get(user.getId()).ifPresent(user::setProfilePictureUrl));
    return users;
  }

  @Override
  public User findById(Long id) {
    User user = userApiClient.findById(id).orElseThrow();
    userMetadataRepository
        .findProfilePictureUrlByIds(List.of(id))
        .get(id)
        .ifPresent(user::setProfilePictureUrl);
    return user;
  }
}
```

## Run the Application

Right-click the main class → Run. Then go to [http://localhost:8080/users](http://localhost:8080/users).

```mermaid
sequenceDiagram
    participant Client
    participant LogFilter
    participant Rest as UserController
    participant Aspect as LogAspect
    participant Service as UserServiceImpl
    participant ApiClient as UserApiClientImpl
    participant ExternalApi as "External API (UserApi)"
    participant Repo as UserMetadataRepositoryImpl
    participant Database as "Database (UserMetadataJpaRepository)"

    Client->>LogFilter: HTTP GET /users
    activate LogFilter
    Note over LogFilter: Log Request Details

    LogFilter->>Rest: Forward Request
    activate Rest

    Aspect-->>Rest: @Before controller method logging

    Rest->>Service: findAll()
    activate Service

    Service->>ApiClient: findAll()
    activate ApiClient

    Aspect-->>ApiClient: @Before API client method logging

    ApiClient->>ExternalApi: GET /users (via Feign)
    activate ExternalApi
    ExternalApi-->>ApiClient: List<ExternalUser>
    deactivate ExternalApi

    Aspect-->>ApiClient: @AfterReturning API client method logging

    Note over ApiClient: Map ExternalUser to DomainUser

    ApiClient-->>Service: List<DomainUser>
    deactivate ApiClient

    Note over Service: Extract User IDs

    Service->>Repo: findProfilePictureUrlByIds(List<Long> ids)
    activate Repo

    Repo->>Database: SELECT profile_picture_url FROM USERMETADATA WHERE user_id IN (...)
    activate Database
    Database-->>Repo: List<UserMetadataJpaEntity>
    deactivate Database

    Note over Repo: Process results into Map<Long, Optional<String>>

    Repo-->>Service: Map<Long, Optional<String>> profilePictureUrls
    deactivate Repo

    Note over Service: Merge profilePictureUrls into DomainUser objects

    Service-->>Rest: List<DomainUser>
    deactivate Service

    Aspect-->>Rest: @AfterReturning controller method logging

    Note over Rest: Map DomainUser to RestUserDto

    Rest-->>LogFilter: ResponseEntity<List<RestUserDto>> (HTTP 200 OK)
    deactivate Rest

    Note over LogFilter: Log Response Details

    LogFilter-->>Client: HTTP 200 OK Response
    deactivate LogFilter
```

1. **Client request:** A `Client` initiates the process by sending an HTTP GET request to the `/users` endpoint.
2. **Logging filter:** The request is first intercepted by the `LogFilter`, which logs details about the incoming request and then passes it along.
3. **Controller entry:** The request reaches the `UserController`, which is responsible for handling API requests.
4. **Aspect logging (before controller):** The `LogAspect` logs that the `UserController.findAll()` method is being called.
5. **Delegate to service:** The `UserController` delegates the core business logic to the `UserServiceImpl` by calling its `findAll()` method.
6. **Service logic (fetch base data):** The `UserServiceImpl` needs the base user data. It calls the `UserApiClientImpl`'s `findAll()` method.
7. **Aspect logging (before API client):** The `LogAspect` logs the call to `UserApiClientImpl.findAll()`.
8. **External API call:** The `UserApiClientImpl` makes an actual network call to the *External API* using its Feign client interface (`UserApi`) to retrieve a list of users in the external API's format (`List<ExternalUser>`).
9. **External API response:** The External API responds with the user data.
10. **Aspect logging (after API client):** The `LogAspect` logs the response received from the `UserApiClientImpl` (before mapping).
11. **Mapping (external to domain):** *Within* the `UserApiClientImpl`, the data from the external API (`List<ExternalUser>`) is mapped to the application's internal `List<DomainUser>` model using `AdapterOutRestUserMapper`.
12. **Service logic (fetch metadata):** The `UserServiceImpl` now has the base user data. It extracts the user IDs from the `List<DomainUser>`. To get profile pictures, it calls the `UserMetadataRepositoryImpl`'s `findProfilePictureUrlByIds()` method, passing the extracted IDs.
13. **Database query:** The `UserMetadataRepositoryImpl` interacts with the *Database* using its `UserMetadataJpaRepository` to query for profile picture URLs associated with the provided user IDs.
14. **Database response:** The `Database` returns the matching user metadata entities (`List<UserMetadataJpaEntity>`).
15. **Processing database results:** *Within* the `UserMetadataRepositoryImpl`, the raw database results are processed and transformed into a `Map<Long, Optional<String>>`, mapping user IDs to their optional profile picture URLs.
16. **Service logic (merge data):** The `UserServiceImpl` takes the `List<DomainUser>` and the `profilePictureUrls` map and merges the data. It iterates through the users and sets the `profilePictureUrl` on each `DomainUser` object if a URL is found in the map for that user's ID. The enriched `List<DomainUser>` is then returned to the `UserController`.
17. **Aspect logging (after controller):** The `LogAspect` logs the list of domain users returned by the `UserServiceImpl` to the `UserController`.
18. **Mapping (domain to REST DTO):** *Within* the `UserController`, the `List<DomainUser>` is mapped to the `List<RestUserDto>` format suitable for the API response using the `AdapterInRestUserMapper`.
19. **Build response:** The `UserController` creates a `ResponseEntity` containing the `List<RestUserDto>` and the HTTP status (200 OK). This response is returned.
20. **Logging filter:** The response passes back through the `LogFilter`, which logs the response status and other details.
21. **Client response:** Finally, the `LogFilter` sends the complete HTTP response back to the `Client`.

<div>
  <img src={require('@site/static/img/persistence-integration/response-complete.png').default} alt="response complete" />
</div>

Congratulations! Your Spring Boot app is:

* Up and running.
* Getting users' information from an external source.
* Complementing users' information by querying a database.

Commit the progress so far.

```bash
git add .
git commit -m "database integration"
```

## Next Steps

### Update Unit Tests

If you want mutation testing to apply to the newly created `UserMetadataRepositoryImpl`, you need to add its location to the `pitest` configuration in `build.gradle`.

```groovy title="build.gradle"
pitest {
	junit5PluginVersion = '1.2.1'
	outputFormats = ['HTML']
	targetClasses = [
		"${project.group}.${project.name}.adapter.in.rest.*".toString(),
		"${project.group}.${project.name}.adapter.out.rest.*".toString(),
		"${project.group}.${project.name}.adapter.out.jpa.*".toString(),
		"${project.group}.${project.name}.config.advice.*".toString(),
		"${project.group}.${project.name}.domain.service.*".toString(),
	]
	excludedClasses = [
		// exclude all subpackages in adapter.in.rest, such as mappers and openApi generated code
		"${project.group}.${project.name}.adapter.in.rest.*.*".toString(),
		// exclude all subpackages in adapter.out.rest, such as mappers
		"${project.group}.${project.name}.adapter.out.rest.*.*".toString(),
		// exclude all subpackages in adapter.out.jpa, such as entities
		"${project.group}.${project.name}.adapter.out.jpa.*.*".toString(),
	]
	targetTests = [
		"${project.group}.${project.name}.*".toString()
	]
	timestampedReports = false
	useClasspathFile = true
}
```