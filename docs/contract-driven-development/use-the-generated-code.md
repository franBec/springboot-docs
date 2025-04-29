---
sidebar_position: 5
---

# Use the Generated Code

So far we've used the [OpenAPI Generator Gradle Plugin](https://github.com/OpenAPITools/openapi-generator/tree/master/modules/openapi-generator-gradle-plugin) to generate the representation of the OpenAPI Specification (our contract) in Java code.

<div>
  <img src={require('@site/static/img/contract-driven-development/build.png').default} alt="build" />
</div>

But we are not using any of that code in our application yet. Let's change that.

## Implement the Generated API Interface

Let's rewrite the `Controller` so it implements the generated API Interface.

1. **Delete all business logic**. It should look kinda empty, like this:

   ```java title="src/main/java/dev/pollito/users_manager/adapter/in/rest/UserController.java"
   package dev.pollito.users_manager.adapter.in.rest;
   
   import lombok.RequiredArgsConstructor;
   import org.springframework.web.bind.annotation.RestController;
   
   @RestController
   @RequiredArgsConstructor
   public class UserController {
   }
   ```

2. **Implement the generated interface** and select methods to override. If you are using IntelliJ IDEA, by pressing `CTRL+O` anywhere in the class, you'll see a popup asking which methods to override.
    
   <div>
      <img src={require('@site/static/img/contract-driven-development/override.png').default} alt="override" />
   </div>
    
    We are interested in `findAll()` and `findById(id:Long)`.
    
    Now the controller should look something like this:
    
   ```java title="src/main/java/dev/pollito/users_manager/adapter/in/rest/UserController.java"
   package dev.pollito.users_manager.adapter.in.rest;
   
   import dev.pollito.users_manager.adapter.in.rest.api.UsersApi;
   import dev.pollito.users_manager.adapter.in.rest.dto.User;
   import lombok.RequiredArgsConstructor;
   import org.springframework.http.ResponseEntity;
   import org.springframework.web.bind.annotation.RestController;
   
   import java.util.List;
   
   @RestController
   @RequiredArgsConstructor
   public class UserController implements UsersApi {
     @Override
     public ResponseEntity<List<User>> findAll() {
       return UsersApi.super.findAll();
     }
   
     @Override
     public ResponseEntity<User> findById(Long id) {
       return UsersApi.super.findById(id);
     }
   }
   ```

   Right-click the main class → Run. Then go to [http://localhost:8080/users](http://localhost:8080/users). You should get `501 NOT IMPLEMENTED`.
   
   <div>
     <img src={require('@site/static/img/contract-driven-development/501NotImplemented.png').default} alt="501 Not Implemented" />
   </div>
   
   Let's return a hardcoded list of Users once again.

3. **Inject `Service` and `Mapper` again** and use them in `findAll()`.

   ```java title="src/main/java/dev/pollito/users_manager/adapter/in/rest/UserController.java"
   package dev.pollito.users_manager.adapter.in.rest;
   
   import dev.pollito.users_manager.adapter.in.rest.api.UsersApi;
   import dev.pollito.users_manager.adapter.in.rest.dto.User;
   import dev.pollito.users_manager.adapter.in.rest.mapper.UserMapper;
   import dev.pollito.users_manager.domain.port.in.UserService;
   import lombok.RequiredArgsConstructor;
   import org.springframework.http.ResponseEntity;
   import org.springframework.web.bind.annotation.RestController;
   
   import java.util.List;
   
   @RestController
   @RequiredArgsConstructor
   public class UserController implements UsersApi {
     private final UserService userService;
     private final UserMapper userMapper;
   
     @Override
     public ResponseEntity<List<User>> findAll() {
       return ResponseEntity.ok(userService.findAll().stream().map(userMapper::map).toList());
     }
   
     @Override
     public ResponseEntity<User> findById(Long id) {
       return UsersApi.super.findById(id);
     }
   }
   ```

   You'll notice that the IDE is throwing at us this error:

   ```log
   no instance(s) of type variable(s) exist so that List<UserResponseDTO> conforms to List<User>
   inference variable T has incompatible bounds:
   equality constraints: List<User>
   lower bounds: List<UserResponseDTO>
   ```

   That is because **before** using [OpenAPI Generator Gradle Plugin](https://github.com/OpenAPITools/openapi-generator/tree/master/modules/openapi-generator-gradle-plugin), `UserController` returns `UserResponseDTO` (the DTO we've handwritten).

   <div>
     <img src={require('@site/static/img/contract-driven-development/before-generation.png').default} alt="before generation" />
   </div>
   
   _Other folders are omitted for simplicity._
   
   But **now** with [OpenAPI Generator Gradle Plugin](https://github.com/OpenAPITools/openapi-generator/tree/master/modules/openapi-generator-gradle-plugin), `UserController` is implementing `UsersApi`, so it must return the generated DTO (`User`).

   <div>
     <img src={require('@site/static/img/contract-driven-development/after-generation.png').default} alt="after generation" />
   </div>

   _Other folders are omitted for simplicity._

4. **Make `UserMapper` map to the generated DTO**.

   ```java
   package dev.pollito.users_manager.adapter.in.rest.mapper;
   
   import static org.mapstruct.MappingConstants.ComponentModel.SPRING;
   
   import dev.pollito.users_manager.domain.model.User;
   import org.mapstruct.Mapper;
   
   @Mapper(componentModel = SPRING)
   public interface UserMapper {
     dev.pollito.users_manager.adapter.in.rest.dto.User map(User u);
   }
   ```
   
   * If you get an IDE error saying `incompatible return type`, do a `clean` and `build`.
   * During building, you may get a warning:
   
     ```log
     warning: Unmapped target properties: "address, company, phone, profilePictureUrl, website". dev.pollito.users_manager.adapter.in.rest.dto.User map(User u);
     ```
   
      That's fine. We are going to map those values later down the road.

Right-click the main class → Run. Then go to [http://localhost:8080/users](http://localhost:8080/users). You should get the list with the hardcoded user once again.

<div>
  <img src={require('@site/static/img/contract-driven-development/response.png').default} alt="response" />
</div>

## Next Steps

Here's some homework for you:

* Create a `User findUserById(Long id)` method in `UserService`, implement it in `UserServiceImpl`, and call it in `UserController` `ResponseEntity<User> findById(Long id)` method.
  * In `UserServiceImpl` `User findUserById(Long id)` method, feel free to throw a `NotImplementedException`. We are going to do a proper implementation later down the road.

      ```java title="src/main/java/dev/pollito/users_manager/domain/service/UserServiceImpl.java"
      @Override
      public User findUserById(Long id) {
       throw new NotImplementedException();
      }
      ```

* Commit the progress so far:

   ```bash
   git add .
   git commit -m "using generated primary adapter code from an openapi specification"
   ```