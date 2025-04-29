---
sidebar_position: 3
---

# Creating Your First Endpoint

Finally, let’s get our hands dirty. We’ll create a simple endpoint that returns a user: when we visit [http://localhost:8080/users](http://localhost:8080/users), we should get something like this:

```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz"
  }
]
```

## Step 0: Initialize Git

```bash
git init
git add .
git commit -m "Initial commit"
```

## Step 1: Add a Formatter (Spotless)

* **Add the plugin** in the plugins section (usually at the start of `build.gradle`):

    ```groovy title="build.gradle"
    id 'com.diffplug.spotless' version '6.25.0'
    ```

* **Add Spotless configuration** (bottom of `build.gradle`). The following is my personal preference:

    ```groovy title="build.gradle"
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
            greclipse()
        }
    }
    ```
  For further info about configurations, check [Spotless GitHub repository](https://github.com/diffplug/spotless).

* **Auto-format on every build**, by adding a new task:

    ```groovy title="build.gradle"
    tasks.named("build") {
        dependsOn 'spotlessApply'
        dependsOn 'spotlessGroovyGradleApply'
    }
    ```

* Now that everything is set up, **run the Build Task**.
* Save the changes made so far:

    ```bash
    git add .
    git commit -m "spotless"
    ```

## Step 2: Create the User Model

A **model** is a blueprint for your data — it defines the structure of the information your application handles.

<div>
   <img src={require('@site/static/img/lets-create-a-spring-boot-project/hexagonal-arch-domain-model-user.png').default} alt="hexagonal arch domain model user" />
</div>

_Other folders are omitted for simplicity._

Create `User.java`.

```java title="src/main/java/com/dev/pollito/users_manager/domain/model/User.java"
package dev.pollito.users_manager.domain.model;

import static lombok.AccessLevel.PRIVATE;

import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Builder
@Data
@FieldDefaults(level = PRIVATE)
public class User {
  Long id;
  String name;
  String username;
  String email;
}
```

**We’ll use Lombok to avoid boilerplate code**. Lombok automatically generates repetitive Java code at compile time.

* If your IDE doesn’t have the Lombok plugin installed, you’ll see compilation errors. Check [Optimizing IntelliJ IDEA with Plugins (for Java)](/prior-recommended-knowledge/ide#optimizing-intellij-idea-with-plugins-for-java) to find how to add the Lombok plugin.

## Step 3: Create the Primary Port and its Implementation

* `UserSevice` is the Primary Port, defining user operations.
* `UserSeviceImpl` is the implementation, containing domain logic.

<div>
   <img src={require('@site/static/img/lets-create-a-spring-boot-project/hexagonal-arch-service-and-impl.png').default} alt="hexagonal arch service and impl.png" />
</div>

_Other folders are omitted for simplicity._

Create `UserService.java`.

```java title="src/main/java/dev/pollito/users_manager/domain/port/in/UserService.java"
package dev.pollito.users_manager.domain.port.in;

import dev.pollito.users_manager.domain.model.User;
import java.util.List;

public interface UserService {
  List<User> getUsers();
}
```

Create `UserServiceImpl.java`.

```java title="src/main/java/dev/pollito/users_manager/domain/service/UserServiceImpl.java"
package dev.pollito.users_manager.domain.service;

import dev.pollito.users_manager.domain.model.User;
import dev.pollito.users_manager.domain.port.in.UserService;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
  private static final User USER_1 =
      User.builder()
          .id(1L)
          .name("Leanne Graham")
          .username("Bret")
          .email("Sincere@april.biz")
          .build();

  @Override
  public List<User> getUsers() {
    return List.of(USER_1);
  }
}
```

* At the moment we are going to return a hardcoded user.
* `@Service` tells Spring _here is an implementation of `UserService`_.
* `@Override` indicates that the method `public List<User> getUsers()` fulfills the interface’s contract.

## Step 4: Create the Primary Adapter

* The controller acts as a primary adapter, converting HTTP requests to calls on the domain service.
* The domain model is not exposed directly to the clients; instead, [DTOs are used](https://www.baeldung.com/java-dto-pattern).

<div>
   <img src={require('@site/static/img/lets-create-a-spring-boot-project/hexagonal-arch-adapter-in-rest.png').default} alt="hexagonal arch adapter in rest.png" />
</div>

_Other folders are omitted for simplicity._

Create `UserResponseDTO.java`. It contains the data to be returned as a response.

```java title="src/main/java/dev/pollito/users_manager/adapter/in/rest/dto/UserResponseDTO.java"
package dev.pollito.users_manager.adapter.in.rest.dto;

import static lombok.AccessLevel.PRIVATE;

import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = PRIVATE)
public class UserResponseDTO {
  Long id;
  String name;
  String username;
  String email;
}
```

Create `UserMapper.java`. It converts between domain models and DTOs.

```java title="src/main/java/dev/pollito/users_manager/adapter/in/rest/mapper/UserMapper.java"
package dev.pollito.users_manager.adapter.in.rest.dto;

import static java.util.Objects.isNull;

import dev.pollito.users_manager.domain.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
  public UserResponseDTO map(User user) {
    if (isNull(user)) {
      return null;
    }

    return UserResponseDTO.builder()
        .id(user.getId())
        .name(user.getName())
        .username(user.getUsername())
        .email(user.getEmail())
        .build();
  }
}
```

Create `UserController.java`. It acts as a primary adapter that converts HTTP requests to service calls.

```java title="src/main/java/dev/pollito/users_manager/adapter/in/rest/UserController.java"
package dev.pollito.users_manager.adapter.in.rest;

import dev.pollito.users_manager.adapter.in.rest.dto.UserResponseDTO;
import dev.pollito.users_manager.adapter.in.rest.mapper.UserMapper;
import dev.pollito.users_manager.domain.port.in.UserService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;
  private final UserMapper userMapper;

  @GetMapping
  public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
    return ResponseEntity.ok(userService.getUsers().stream().map(userMapper::map).toList());
  }
}
```

* Controller only depends on the service interface (port), not its implementation.
* Mapping logic is extracted to a separate mapper class.
* Domain objects are not leaked to the API clients.

## Run the Application

Right-click the main class → Run. Then go to [http://localhost:8080/users](http://localhost:8080/users).

<div>
  <img src={require('@site/static/img/lets-create-a-spring-boot-project/req-res.gif').default} alt="request response" />
</div>

<div>
  <img src={require('@site/static/img/lets-create-a-spring-boot-project/users.png').default} alt="users" />
</div>

Congratulations! Your Spring Boot app is up, running, and exposing an endpoint. Commit the progress so far.

```bash
git add .
git commit -m "/users returns hardcoded user"
```