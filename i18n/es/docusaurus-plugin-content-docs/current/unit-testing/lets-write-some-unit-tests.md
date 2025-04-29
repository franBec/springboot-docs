---
sidebar_position: 4
---

# Escribamos algunos unit tests

## Creá los tests

Andá a `src/main/java/dev/pollito/users_manager/adapter/in/rest/UserController.java`, y hacé `ctrl+intro` sobre el nombre de la clase. En el menú emergente, seleccioná `Create test`.

<div>
  <img src={require('@site/static/img/unit-testing/create-test.png').default} alt="crear test" />
</div>

En el siguiente menú emergente, dejá todo por defecto.

<div>
  <img src={require('@site/static/img/unit-testing/test-options.png').default} alt="opciones de test" />
</div>

Ahora deberías tener una nueva clase vacía creada en `src/test/java/dev/pollito/users_manager/adapter/in/rest/UserControllerTest.java`.

Repetí este proceso para todas las clases que quieras testear.

## Cómo testear

No hay una única forma correcta de escribir unit tests. Acá te muestro cómo testeo clases basándome en su rol.

### Clases de Rest Controller Advice

Estas clases de test deberían verificar el manejo de excepciones. Chequean que:

* Cada tipo de excepción (`NoResourceFoundException`, `NoSuchElementException`, etc.) se traduce correctamente a códigos de estado HTTP y detalles de problema apropiados.
* Los detalles del problema incluyen propiedades requeridas como timestamp y stack trace.

```java title="src/test/java/dev/pollito/users_manager/config/advice/ControllerAdviceTest.java"
package dev.pollito.users_manager.config.advice;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.springframework.http.HttpStatus.*;

import java.util.NoSuchElementException;
import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@ExtendWith(MockitoExtension.class)
class ControllerAdviceTest {
  @InjectMocks private ControllerAdvice controllerAdvice;

  private static void problemDetailAssertions(
      @NotNull ProblemDetail response, @NotNull Exception e, @NotNull HttpStatus httpStatus) {
    assertEquals(httpStatus.value(), response.getStatus());
    assertEquals(e.getClass().getSimpleName(), response.getTitle());
    assertNotNull(response.getProperties());
    assertNotNull(response.getProperties().get("timestamp"));
    assertNotNull(response.getProperties().get("trace"));
  }

  @Test
  void givenException_whenHandle_thenReturnsProblemDetail() {
    Exception e = mock(Exception.class);
    problemDetailAssertions(controllerAdvice.handle(e), e, INTERNAL_SERVER_ERROR);
  }

  @Test
  void givenMethodArgumentTypeMismatchException_whenHandle_thenReturnsProblemDetail() {
    MethodArgumentTypeMismatchException e = mock(MethodArgumentTypeMismatchException.class);
    problemDetailAssertions(controllerAdvice.handle(e), e, BAD_REQUEST);
  }

  @Test
  void givenNoResourceFoundException_whenHandle_thenReturnsProblemDetail() {
    NoResourceFoundException e = mock(NoResourceFoundException.class);
    problemDetailAssertions(controllerAdvice.handle(e), e, NOT_FOUND);
  }

  @Test
  void givenNoSuchElementException_whenHandle_thenReturnsProblemDetail() {
    NoSuchElementException e = mock(NoSuchElementException.class);
    problemDetailAssertions(controllerAdvice.handle(e), e, NOT_FOUND);
  }
}
```

### Clases de Controller

Estas clases de test se enfocan en los endpoints REST. Chequean los códigos de estado de las respuestas y confirman que las respuestas no son nulas.

Usualmente:

* Mockean las inyecciones de dependencia del servicio para aislar la responsabilidad del controlador.
* Usan [@Spy](https://www.baeldung.com/mockito-spy) en los mappers para usar la funcionalidad de mapeo real mientras mockean otras dependencias.

```java title="src/test/java/dev/pollito/users_manager/adapter/in/rest/UserControllerTest.java"
package dev.pollito.users_manager.adapter.in.rest;

import static java.util.Collections.emptyList;
import static org.junit.jupiter.api.Assertions.*;
import static org.mapstruct.factory.Mappers.getMapper;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.http.HttpStatus.OK;

import dev.pollito.users_manager.adapter.in.rest.dto.User;
import dev.pollito.users_manager.adapter.in.rest.mapper.UserMapper;
import dev.pollito.users_manager.domain.port.in.UserService;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {
  @InjectMocks private UserController userController;
  @Mock private UserService userService;

  @SuppressWarnings("unused")
  @Spy
  private UserMapper userMapper = getMapper(UserMapper.class);

  @Test
  void shouldReturnOk_whenFindAll() {
    when(userService.findAll()).thenReturn(emptyList());
    ResponseEntity<List<User>> response = userController.findAll();
    assertEquals(OK, response.getStatusCode());
    assertNotNull(response.getBody());
  }

  @Test
  void shouldReturnOk_whenFindById() {
    when(userService.findUserById(anyLong()))
        .thenReturn(mock(dev.pollito.users_manager.domain.model.User.class));
    ResponseEntity<User> response = userController.findById(1L);
    assertEquals(OK, response.getStatusCode());
    assertNotNull(response.getBody());
  }
}
```

### Clases de implementación de servicio

Estas clases de test deberían ser las más completas, porque verifican tu lógica de negocio.

* Las clases que testean el comportamiento de las implementaciones de servicio son las que van a cambiar más a menudo.

Por el momento tenemos poca lógica, así que los tests son básicos.

```java title="src/test/java/dev/pollito/users_manager/domain/service/UserServiceImplTest.java"
package dev.pollito.users_manager.domain.service;

import static org.junit.jupiter.api.Assertions.*;

import org.apache.commons.lang3.NotImplementedException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {
  @InjectMocks private UserServiceImpl userService;

  @Test
  void shouldReturnUsersList_whenFindAll() {
    assertNotNull(userService.findAll());
  }

  @Test
  void shouldThrowNotImplementedException_whenFindUserById() {
    assertThrows(NotImplementedException.class, () -> userService.findUserById(-1L));
  }
}
```

Commiteá el progreso hasta ahora.

```bash
git add .
git commit -m "unit tests"
```