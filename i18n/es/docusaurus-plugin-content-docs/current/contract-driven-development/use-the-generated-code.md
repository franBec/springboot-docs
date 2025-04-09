---
sidebar_position: 5
---

# Usa el código generado

## Borra el modelo que escribimos anteriormente

Si vamos a `src/main/java/dev/pollito/users_manager/model/User.java` vamos a encontrar el siguiente error:

<div>
  <img src={require('@site/static/img/contract-driven-development/duplicated.png').default} alt="duplicated" />
</div>

Eso es porque el plugin openapi-generator ya creó una clase `User` en la misma ruta, pero en la carpeta de build.

* **Queremos usar la clase generada en su lugar**, así que borra la clase (y todo el paquete `model`) que creamos a mano.

## Implementa la interfaz api generada

Ahora mismo el `controller` se ve así:

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

Reescribámoslo para que implementemos la interfaz API generada:

1. **Borra toda la lógica de negocio**. El `controller` debería quedar medio vacío, así:

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

2. **Implementa la interfaz generada**.

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

3. **Selecciona los métodos a sobrescribir**: Si estás usando IntelliJ IDEA, presioná `CTRL+O` en cualquier parte de la clase y verás un popup preguntándote qué métodos sobrescribir.

   <div>
      <img src={require('@site/static/img/contract-driven-development/override.png').default} alt="override" />
   </div>

   Seleccioná los que nos interesan: `findAll` y `findById`.

   Ahora el controller debería quedar algo así:

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

Hacé clic derecho en la clase principal → Run. Luego andá a [http://localhost:8080/users](http://localhost:8080/users). Deberías obtener `501 NOT IMPLEMENTED`.

<div>
  <img src={require('@site/static/img/contract-driven-development/501NotImplemented.png').default} alt="501 Not Implemented" />
</div>

Vamos a retornar una lista hardcodeada de usuarios nuevamente.

## Reescribe el service

Considerando que el `service` solo retorna un usuario hardcodeado, lo mejor es borrar su contenido y reescribirlo.

1. Reescribí la interfaz `UserService` para que se parezca a lo que el `controller` da y espera:

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

2. Reescribí la implementación de la interfaz, `UserServiceImpl`, con algo de lógica hardcodeada:

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

3. En `UserController`, llamá a los métodos de `UserService`:

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

Hacé clic derecho en la clase principal → Run. Luego andá a [http://localhost:8080/users](http://localhost:8080/users). Deberías obtener nuevamente la lista con el usuario hardcodeado.

<div>
  <img src={require('@site/static/img/contract-driven-development/response.png').default} alt="response" />
</div>

## Agrega un manejador para ConstraintViolationException

En [Generate Code From The Contract](/contract-driven-development/generate-code-from-the-contract) agregamos la dependencia [Swagger Core Jakarta](https://mvnrepository.com/artifact/io.swagger.core.v3/swagger-core-jakarta). Eso nos da acceso para manejar `ConstraintViolationException`.

En `src/main/java/dev/pollito/users_manager/controller/advice/ControllerAdvice.java`, agregá un manejador con `@ExceptionHandler(ConstraintViolationException.class)`.

```java
package dev.pollito.users_manager.controller.advice;

import io.opentelemetry.api.trace.Span;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.NoSuchElementException;

import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
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
}
```

Hacé clic derecho en la clase principal → Run. Luego andá a una URL con un query param inválido, como [http://localhost:8080/users?pageSize=-1](http://localhost:8080/users?pageSize=-1). Deberías obtener la siguiente respuesta:

<div>
  <img src={require('@site/static/img/contract-driven-development/ConstraintViolationException.png').default} alt="ConstraintViolationException" />
</div>

### ¿Por qué el mensaje detail está en español?

Spring Boot utiliza automáticamente el header Accept-Language de la petición HTTP para determinar el idioma de la respuesta. Si tu navegador envía `Accept-Language: es` (como en mi caso), los mensajes de excepción de Spring (por ej., errores de validación) se localizan a español usando bundles de mensajes.

<div>
  <img src={require('@site/static/img/contract-driven-development/lang.png').default} alt="lang" />
</div>

* Los mensajes de excepción deben tener traducciones en los bundles de mensajes de tu aplicación (`messages.properties`, `messages_es.properties`, etc.). Si no existe traducción para el idioma solicitado, Spring recurre al idioma por defecto (usualmente inglés).

Commiteá el progreso hasta ahora.

```bash
git add .
git commit -m "generated spring code from an openapi specification"
```