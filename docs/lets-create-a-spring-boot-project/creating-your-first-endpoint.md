---
sidebar_position: 5
---

# Creating Your First Endpoint

Finally, let’s get our hands dirty. We’ll create a simple endpoint that returns a user: when we visit [http://localhost:8080/users](http://localhost:8080/users), we should get something like this:

<div>
  <img src={require('@site/static/img/lets-create-a-spring-boot-project/users.png').default} alt="users" />
</div>

## Step 0: Initialize Git

```bash
git init
git add .
git commit -m "Initial commit"
```

## Step 1: Add A Formatter (Spotless)

* In your `build.gradle`, **add the plugin** in the plugins section (usually at the start of the file):

    ```groovy
    id 'com.diffplug.spotless' version '6.25.0'
    ```

* **Configure** Spotless at the bottom of `build.gradle`, the following is my personal preference:

    ```groovy
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
  For further info about configurations, check [Spotless GItHub repository](https://github.com/diffplug/spotless).

* **Auto-format on every build**, by adding a new task:

    ```groovy
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

## Step 2: Create The User Model

A **model** is a blueprint for your data — it defines the structure of the information your application handles. In this case, a User with id, name, username, and email.

In `src/main/java/com/dev/pollito/users_manager/model`, create `User.java`.

```java
package dev.pollito.users_manager.model;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
  Long id;
  String name;
  String username;
  String email;
}
```

* I’ve found this folder “model” under the folder controller, service, utils, or even named dto (referring to the [DTO pattern](https://www.baeldung.com/java-dto-pattern)).
  * Don’t worry much about it, later down the road we will find a way to automatically generate this kind of classes, and we will not have to write them (unless needed).
* **We’ll use Lombok to avoid boilerplate code**. Lombok automatically generates repetitive Java code at compile time.
  * If your IDE doesn’t have the Lombok plugin installed, you’ll see compilation errors. Check [Optimizing IntelliJ IDEA With Plugins](/lets-create-a-spring-boot-project/lets-talk-about-ides#optimizing-intellij-idea-with-plugins) to find how to add the Lombok plugin.

## Step 3: Create The UserService

### Create The Interface

In `src/main/java/dev/pollito/users_manager/service`, create `UserService.java`.

```java
package dev.pollito.users_manager.service;

import dev.pollito.users_manager.model.User;
import java.util.List;

public interface UserService {
  List<User> getUsers();
}
```

### Create The Implementation

In `src/main/java/dev/pollito/users_manager/service/impl`, create `UserServiceImpl.java`.

```java
package dev.pollito.users_manager.service.impl;

import dev.pollito.users_manager.model.User;
import dev.pollito.users_manager.service.UserService;
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
* `@Service` tells Spring: "Here is an implementation of `UserService`"
* `@Override` indicates that the method `public List<User> getUsers()` fulfills the interface’s "contract"

## Step 4: Create The UserController

In `src/main/java/dev/pollito/users_manager/controller`, create `UserController.java`.

```java
package dev.pollito.users_manager.controller;

import dev.pollito.users_manager.model.User;
import dev.pollito.users_manager.service.UserService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;

  @GetMapping("/users")
  public List<User> getUsers() {
    return userService.getUsers();
  }
}
```

Notice that we declare the interface UserService, and not the implementation UserServiceImpl.

* The Controller doesn’t care how `UserService` works—it just wants the users list.
* Spring Boot will look for implementations of `UserService`, will find only one (`UserServiceImpl.java`), and will call the `getUsers()` method.

## Run The Application

Right-click the main class → Run. Then go to [http://localhost:8080/users](http://localhost:8080/users).

<div>
  <img src={require('@site/static/img/lets-create-a-spring-boot-project/users.png').default} alt="users" />
</div>

Congratulations! Your Spring Boot app is up, running, and exposing an endpoint. Commit the progress so far.

```bash
git add .
git commit -m "/users returns hardcoded user"
```