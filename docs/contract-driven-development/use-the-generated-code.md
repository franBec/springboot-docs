---
sidebar_position: 5
---

# Use The Generated Code

## Delete The Model We Previously Wrote

If we go to `src/main/java/dev/pollito/users_manager/model/User.java`, we will find the following error:

![duplicated](img/duplicated.png)

That is because the openapi-generator plugin already created a `User` class at the same path, but in the build folder.

* **We want to use the generated class instead**, so delete the class (and the whole `model` package) we created by hand.

## Implement The Generated API Interface

Right now the `controller` looks like this:

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

Let's rewrite it so we implement the generated API Interface

1. **Delete all business logic**. The `controller` should look kinda empty, like this:

    ```java
    package dev.pollito.users_manager.controller;
    
    import dev.pollito.users_manager.api.UsersApi;
    import dev.pollito.users_manager.service.UserService;
    import lombok.RequiredArgsConstructor;
    import org.springframework.web.bind.annotation.RestController;
    
    @RestController
    @RequiredArgsConstructor
    public class UserController implements UsersApi {
      private final UserService userService;
    }
    ```

2. **Implement the generated interface**.

    ```java
    package dev.pollito.users_manager.controller;
    
    import dev.pollito.users_manager.api.UsersApi;
    import dev.pollito.users_manager.service.UserService;
    import lombok.RequiredArgsConstructor;
    import org.springframework.web.bind.annotation.RestController;
    
    @RestController
    @RequiredArgsConstructor
    public class UserController implements UsersApi {
      private final UserService userService;
    }
    ```

3. **Select methods to override**: If you are using IntelliJ IDEA, by pressing `CTRL+O` anywhere in the class, you'll see a popup asking which methods to override.
    
    ![override.png](img/override.png)
    
    Select those we are interested in: `findAll` and `findById`
    
    Now the controller should look something like this:
    
    ```java
    package dev.pollito.users_manager.controller;
    
    import dev.pollito.users_manager.api.UsersApi;
    import dev.pollito.users_manager.model.User;
    import dev.pollito.users_manager.model.Users;
    import dev.pollito.users_manager.service.UserService;
    import lombok.RequiredArgsConstructor;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.RestController;
    
    import java.util.List;
    
    @RestController
    @RequiredArgsConstructor
    public class UserController implements UsersApi {
      private final UserService userService;
    
      @Override
      public ResponseEntity<Users> findAll(Integer pageNumber, Integer pageSize, List<String> pageSort) {
        return UsersApi.super.findAll(pageNumber, pageSize, pageSort);
      }
    
      @Override
      public ResponseEntity<User> findById(Long id) {
        return UsersApi.super.findById(id);
      }
    }
    ```

Right-click the main class → Run. Then go to [http://localhost:8080/users](http://localhost:8080/users). You should get `501 NOT IMPLEMENTED`.

![501NotImplemented.png](img/501NotImplemented.png)

Let's return a hardcoded list of Users once again.

## Rewrite The Service

Considering that the `service` is only returning a hardcoded user, I consider best to delete its content and redo it.

1. Rewrite the `UserService` interface so it resembles what the `controller` gives and expects:

    ```java
    package dev.pollito.users_manager.service;
    
    import dev.pollito.users_manager.model.User;
    import dev.pollito.users_manager.model.Users;
    import java.util.List;
    
    public interface UserService {
      Users findAll(Integer pageNumber, Integer pageSize, List<String> pageSort);
    
      User findById(Long id);
    }
    ```

2. Rewrite the interface implementation `UserServiceImpl` with some hardcoded logic:

    ```java
    package dev.pollito.users_manager.service.impl;
    
    import dev.pollito.users_manager.model.User;
    import dev.pollito.users_manager.model.Users;
    import dev.pollito.users_manager.service.UserService;
    import java.util.List;
    import org.springframework.stereotype.Service;
    
    @Service
    public class UserServiceImpl implements UserService {
    
      private static final User USER_1 =
          new User().id(1L).name("Leanne Graham").username("Bret").email("Sincere@april.biz");
    
      @Override
      public Users findAll(Integer pageNumber, Integer pageSize, List<String> pageSort) {
        return new Users().content(List.of(USER_1));
      }
    
      @Override
      public User findById(Long id) {
        return USER_1;
      }
    }
    ```

3. In `UserController`, call the `UserService` methods:

    ```java
    package dev.pollito.users_manager.controller;
    
    import dev.pollito.users_manager.api.UsersApi;
    import dev.pollito.users_manager.model.User;
    import dev.pollito.users_manager.model.Users;
    import dev.pollito.users_manager.service.UserService;
    import java.util.List;
    import lombok.RequiredArgsConstructor;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.RestController;
    
    @RestController
    @RequiredArgsConstructor
    public class UserController implements UsersApi {
      private final UserService userService;
    
      @Override
      public ResponseEntity<Users> findAll(
          Integer pageNumber, Integer pageSize, List<String> pageSort) {
        return ResponseEntity.ok(userService.findAll(pageNumber, pageSize, pageSort));
      }
    
      @Override
      public ResponseEntity<User> findById(Long id) {
        return ResponseEntity.ok(userService.findById(id));
      }
    }
    ```

Right-click the main class → Run. Then go to [http://localhost:8080/users](http://localhost:8080/users). You should get once again the list with the hardcoded user.

![response.png](img/response.png)

Commit the progress so far.

```bash
git add .
git commit -m "generated spring code from an openapi specification"
```