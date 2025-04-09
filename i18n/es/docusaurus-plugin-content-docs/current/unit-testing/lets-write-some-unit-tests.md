---
sidebar_position: 4
---

# Vamos a escribir algunas pruebas unitarias

## Crea las clases de prueba

Ve a `src/main/java/dev/pollito/users_manager/controller/UserController.java` y presiona `ctrl+intro` sobre el nombre de la clase. En el menú emergente, selecciona Create test.

<div>
  <img src={require('@site/static/img/unit-testing/create-test.png').default} alt="create test" />
</div>

En el siguiente menú emergente, deja todo como por defecto.

<div>
  <img src={require('@site/static/img/unit-testing/test-options.png').default} alt="test options" />
</div>

Ahora deberías tener una nueva clase vacía creada en `src/test/java/dev/pollito/users_manager/controller/UserControllerTest.java`.

<div>
  <img src={require('@site/static/img/unit-testing/empty-test.png').default} alt="empty test" />
</div>

Repite este proceso para `src/main/java/dev/pollito/users_manager/controller/advice/ControllerAdvice.java`, `src/main/java/dev/pollito/users_manager/service/impl/UserApiCacheServiceImpl.java` y `src/main/java/dev/pollito/users_manager/service/impl/UserServiceImpl.java`. Al final, tu directorio de tests debería verse algo así:

<div>
  <img src={require('@site/static/img/unit-testing/test-directory.png').default} alt="test directory" />
</div>

## Escribe las pruebas

No existe una única forma correcta de escribir tests unitarios. Estos son los que yo hice:

### ControllerAdviceTest.java

`src/test/java/dev/pollito/users_manager/controller/advice/ControllerAdviceTest.java`

```java
package dev.pollito.users_manager.controller.advice;

import exception.JsonPlaceholderException;
import jakarta.validation.ConstraintViolationException;
import org.jetbrains.annotations.Contract;
import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.NoSuchElementException;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

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

    @Contract(pure = true)
    private static @NotNull Stream<HttpStatus> httpStatusProvider() {
        return Stream.of(HttpStatus.BAD_REQUEST, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ParameterizedTest
    @MethodSource("httpStatusProvider")
    void whenJsonPlaceholderExceptionThenReturnProblemDetail(@NotNull HttpStatus httpStatus) {
        JsonPlaceholderException e = mock(JsonPlaceholderException.class);
        when(e.getStatus()).thenReturn(httpStatus.value());

        problemDetailAssertions(controllerAdvice.handle(e), e, httpStatus);
    }
}
```

Esta clase de tests verifica el manejo de excepciones en tu aplicación. Revisa que:

* Cada tipo de excepción (`NoResourceFoundException`, `NoSuchElementException`, etc.) se traduzca correctamente en los códigos HTTP y detalles de problema adecuados.
* Los detalles de problema incluyan propiedades requeridas como la timestamp y el trace.
* El manejo de `JsonPlaceholderException` funcione con diferentes estados HTTP (usando tests parametrizados).
* Se usa un método auxiliar para evitar repetir código de aserciones.

### UserControllerTest.java

`src/test/java/dev/pollito/users_manager/controller/UserControllerTest.java`

```java
package dev.pollito.users_manager.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import dev.pollito.users_manager.model.User;
import dev.pollito.users_manager.model.Users;
import dev.pollito.users_manager.service.UserService;
import java.util.Collections;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {
  @InjectMocks private UserController userController;
  @Mock private UserService userService;

  @Test
  void whenFindAllThenReturnOk() {
    when(userService.findAll(anyInt(), anyInt(), anyList(), anyString()))
        .thenReturn(mock(Users.class));
    ResponseEntity<Users> response = userController.findAll(0, 0, Collections.emptyList(), "");
    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertNotNull(response);
  }

  @Test
  void whenFindByIdThenReturnOK() {
    when(userService.findById(anyLong())).thenReturn(mock(User.class));
    ResponseEntity<User> response = userController.findById(1L);
    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertNotNull(response.getBody());
  }
}
```

Esta clase prueba los endpoints REST en tu controller, enfocándose en:

* Verificar que el controller devuelva respuestas HTTP 200 OK cuando todo sale bien.
* Probar que los endpoints `findAll` y `findById` retornen respuestas adecuadas.
* Utilizar un mock de `UserService` para aislar la responsabilidad del controller.
* Comprobar los códigos de estado de las respuestas y confirmar que no sean nulas.

### UserApiCacheServiceImplTest.java

`src/test/java/dev/pollito/users_manager/service/impl/UserApiCacheServiceImplTest.java`

```java
package dev.pollito.users_manager.service.impl;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.typicode.jsonplaceholder.api.UserApi;
import com.typicode.jsonplaceholder.model.User;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class UserApiCacheServiceImplTest {
  @InjectMocks private UserApiCacheServiceImpl userApiCacheService;
  @Mock private UserApi userApi;

  @Test
  void whenGetUsersThenReturnListOfUsers() {
    when(userApi.getUsers()).thenReturn(List.of(mock(User.class)));
    assertFalse(userApiCacheService.getUsers().isEmpty());
  }
}
```

Un test sencillo que verifica tu servicio de cache para la API externa:

* Prueba que cuando la API externa (`UserApi`) devuelve datos, tu servicio de cache los retorne correctamente.
* Confirma que el servicio transforma las respuestas de la API en datos útiles para tu aplicación.
* Usa un enfoque minimalista, centrado solo en la funcionalidad esencial.

### UserServiceImplTest.java

`src/test/java/dev/pollito/users_manager/service/impl/UserServiceImplTest.java`. Puse los mocks en una clase de utilidad separada `src/test/java/dev/pollito/users_manager/MockData.java`

```java
package dev.pollito.users_manager.service.impl;

import static dev.pollito.users_manager.MockData.USERS;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

import dev.pollito.users_manager.mapper.UserMapper;
import dev.pollito.users_manager.model.Users;
import dev.pollito.users_manager.service.UserApiCacheService;
import java.util.List;
import java.util.NoSuchElementException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mapstruct.factory.Mappers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {
  @InjectMocks private UserServiceImpl userService;
  @Mock private UserApiCacheService userApiCacheService;

  @SuppressWarnings("unused")
  @Spy
  private UserMapper userMapper = Mappers.getMapper(UserMapper.class);

  @BeforeEach
  void setUp() {
    when(userApiCacheService.getUsers()).thenReturn(USERS);
  }

  @Test()
  void whenGetUsersThenReturnUserList() {
    Users response = userService.findAll(0, 10, null, null);
    assertEquals(10, response.getTotalElements());
    assertNotNull(response.getPageable());
    assertEquals(0, response.getPageable().getPageNumber());
    assertEquals(10, response.getPageable().getPageSize());
    assertEquals(1, response.getContent().getFirst().getId());
    assertEquals(10, response.getContent().getLast().getId());
  }

  @Test()
  void whenGetUsersDescThenReturnUserListDesc() {
    Users response = userService.findAll(0, 10, List.of("id:desc"), null);
    assertEquals(10, response.getContent().getFirst().getId());
    assertEquals(1, response.getContent().getLast().getId());
  }

  @Test
  void whenGetUsersWithQThenReturnSubList() {
    Users lePage0 = userService.findAll(0, 5, null, "le");
    assertEquals(5, lePage0.getContent().size());
    assertEquals(7, lePage0.getTotalElements());

    Users lePage1 = userService.findAll(1, 5, null, "le");
    assertEquals(2, lePage1.getContent().size());
    assertEquals(7, lePage1.getTotalElements());

    Users biz = userService.findAll(0, 10, null, "biz");
    assertEquals(3, biz.getContent().size());
    assertEquals(3, biz.getTotalElements());
  }

  @Test
  void whenSortByPropertyThenReturnSortedList() {
    Users sortByEmail = userService.findAll(0, 10, List.of("email"), null);
    assertEquals("Chaim_McDermott@dana.io", sortByEmail.getContent().getFirst().getEmail());
    assertEquals("Telly.Hoeger@billy.biz", sortByEmail.getContent().getLast().getEmail());

    Users sortByName = userService.findAll(0, 10, List.of("name"), null);
    assertEquals("Chelsey Dietrich", sortByName.getContent().getFirst().getName());
    assertEquals("Patricia Lebsack", sortByName.getContent().getLast().getName());

    Users sortByUsername = userService.findAll(0, 10, List.of("username"), null);
    assertEquals("Antonette", sortByUsername.getContent().getFirst().getUsername());
    assertEquals("Samantha", sortByUsername.getContent().getLast().getUsername());

    Users sortBySamePropertyTwice = userService.findAll(0,10,List.of("id:asc","id:asc"),null);
    assertEquals(1, sortBySamePropertyTwice.getContent().getFirst().getId());
    assertEquals(10, sortBySamePropertyTwice.getContent().getLast().getId());
  }

  @Test
  void whenGetUserThenReturnUser() {
    assertNotNull(userService.findById(1L));
  }

  @Test
  void whenGetUserThatDoesntExistThenThrowException() {
    assertThrows(NoSuchElementException.class, () -> userService.findById(-1L));
  }
}
```

```java
package dev.pollito.users_manager;

import com.typicode.jsonplaceholder.model.User;
import java.util.List;

public class MockData {
  private MockData() {}

  private static final User USER_1 =
      new User().id(1).name("Leanne Graham").username("Bret").email("Sincere@april.biz");

  private static final User USER_2 =
      new User().id(2).name("Ervin Howell").username("Antonette").email("Shanna@melissa.tv");

  private static final User USER_3 =
      new User().id(3).name("Clementine Bauch").username("Samantha").email("Nathan@yesenia.net");

  private static final User USER_4 =
      new User()
          .id(4)
          .name("Patricia Lebsack")
          .username("Karianne")
          .email("Julianne.OConner@kory.org");

  private static final User USER_5 =
      new User()
          .id(5)
          .name("Chelsey Dietrich")
          .username("Kamren")
          .email("Lucio_Hettinger@annie.ca");

  private static final User USER_6 =
      new User()
          .id(6)
          .name("Mrs. Dennis Schulist")
          .username("Leopoldo_Corkery")
          .email("Karley_Dach@jasper.info");

  private static final User USER_7 =
      new User()
          .id(7)
          .name("Kurtis Weissnat")
          .username("Elwyn.Skiles")
          .email("Telly.Hoeger@billy.biz");

  private static final User USER_8 =
      new User()
          .id(8)
          .name("Nicholas Runolfsdottir V")
          .username("Maxime_Nienow")
          .email("Sherwood@rosamond.me");

  private static final User USER_9 =
      new User()
          .id(9)
          .name("Glenna Reichert")
          .username("Delphine")
          .email("Chaim_McDermott@dana.io");

  private static final User USER_10 =
      new User()
          .id(10)
          .name("Clementina DuBuque")
          .username("Moriah.Stanton")
          .email("Rey.Padberg@karina.biz");

  public static final List<User> USERS =
      List.of(USER_1, USER_2, USER_3, USER_4, USER_5, USER_6, USER_7, USER_8, USER_9, USER_10);
}
```

Esta clase de tests es la suite más completa que verifica la lógica de negocio:

* Prueba la funcionalidad de paginación (tamaño de página, número de página).
* Verifica que el ordenamiento funcione (tanto ascendente como descendente).
* Testea el filtrado por cadena de consulta en las propiedades del usuario.
* Asegura que el manejo de errores funcione de forma correcta (lanza `NoSuchElementException` para usuarios inexistentes).
* Utiliza un spy en el mapper de MapStruct para usar la funcionalidad real de mapeo, mientras se mockean otras dependencias.
* Reutiliza los datos de prueba de la clase `MockData` separada.

Commiteá el progreso hasta ahora.

```bash
git add .
git commit -m "unit tests"
```