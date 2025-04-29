---
sidebar_position: 5
---

# Usa el código generado

Hasta ahora usamos el [OpenAPI Generator Gradle Plugin](https://github.com/OpenAPITools/openapi-generator/tree/master/modules/openapi-generator-gradle-plugin) para generar la representación de la OpenAPI Specification (nuestro contrato) en código Java.

<div>
  <img src={require('@site/static/img/contract-driven-development/build.png').default} alt="build" />
</div>

Pero todavía no estamos usando nada de ese código en nuestra aplicación. Cambiemos eso.

## Implementar la interfaz de API generada

Vamos a reescribir el `Controller` para que implemente la interfaz de API generada.

1. **Eliminá toda la lógica de negocio**. Debería quedar medio vacío, así:

    ```java title="src/main/java/dev/pollito/users_manager/adapter/in/rest/UserController.java"
    package dev.pollito.users_manager.adapter.in.rest;

    import lombok.RequiredArgsConstructor;
    import org.springframework.web.bind.annotation.RestController;

    @RestController
    @RequiredArgsConstructor
    public class UserController {
    }
    ```

2. **Implementá la interfaz generada** y seleccioná los métodos a sobrescribir. Si usas IntelliJ IDEA, presionando `CTRL+O` en cualquier parte de la clase, vas a ver un popup que te pregunta qué métodos sobrescribir.

    <div>
       <img src={require('@site/static/img/contract-driven-development/override.png').default} alt="sobrescribir" />
    </div>

    Nos interesan `findAll()` y `findById(id:Long)`.

    Ahora el controlador debería verse algo así:

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

    Hacé clic derecho en la clase principal → Run. Luego andá a [http://localhost:8080/users](http://localhost:8080/users). Deberías obtener `501 NOT IMPLEMENTED`.

    <div>
      <img src={require('@site/static/img/contract-driven-development/501NotImplemented.png').default} alt="501 Not Implemented" />
    </div>

    Vamos a devolver una lista de Usuarios hardcodeada una vez más.

3. **Inyectá `Service` y `Mapper` de nuevo** y usalos en `findAll()`.

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

    Vas a notar que el IDE nos tira este error:

    ```log
    no instance(s) of type variable(s) exist so that List<UserResponseDTO> conforms to List<User>
    inference variable T has incompatible bounds:
    equality constraints: List<User>
    lower bounds: List<UserResponseDTO>
    ```

    Eso es porque **antes** de usar [OpenAPI Generator Gradle Plugin](https://github.com/OpenAPITools/openapi-generator/tree/master/modules/openapi-generator-gradle-plugin), `UserController` devuelve `UserResponseDTO` (el DTO que escribimos a mano).

    <div>
      <img src={require('@site/static/img/contract-driven-development/before-generation.png').default} alt="antes de la generación" />
    </div>

    _Otras carpetas se omiten por simplicidad._

    Pero **ahora** con [OpenAPI Generator Gradle Plugin](https://github.com/OpenAPITools/openapi-generator/tree/master/modules/openapi-generator-gradle-plugin), `UserController` está implementando `UsersApi`, así que debe devolver el DTO generado (`User`).

    <div>
      <img src={require('@site/static/img/contract-driven-development/after-generation.png').default} alt="después de la generación" />
    </div>

    _Otras carpetas se omiten por simplicidad._

4. **Haz que `UserMapper` mapee al DTO generado**.

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

   * Si te sale un error del IDE que dice `incompatible return type`, hacé un `clean` y `build`.
   * Durante la construcción, puede que te salga una advertencia:

       ```log
       warning: Unmapped target properties: "address, company, phone, profilePictureUrl, website". dev.pollito.users_manager.adapter.in.rest.dto.User map(User u);
       ```

       Eso está bien. Vamos a mapear esos valores más adelante.

Hacé clic derecho en la clase principal → Run. Luego andá a [http://localhost:8080/users](http://localhost:8080/users). Deberías obtener la lista con el usuario hardcodeado de nuevo.

<div>
  <img src={require('@site/static/img/contract-driven-development/response.png').default} alt="respuesta" />
</div>

## Próximos pasos

Acá te dejo algo de tarea:

* Creá un método `User findUserById(Long id)` en `UserService`, implementalo en `UserServiceImpl`, y llamalo en el método `ResponseEntity<User> findById(Long id)` de `UserController`.
   * En el método `User findUserById(Long id)` de `UserServiceImpl`, sentite libre de lanzar una `NotImplementedException`. Vamos a hacer una implementación adecuada más adelante.

       ```java title="src/main/java/dev/pollito/users_manager/domain/service/UserServiceImpl.java"
       @Override
       public User findUserById(Long id) {
        throw new NotImplementedException();
       }
       ```

* Commiteá el progreso hasta ahora:

    ```bash
    git add .
    git commit -m "usando código de primary adapter generado a partir de una openapi specification"
    ```