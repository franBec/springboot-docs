---
sidebar_position: 4
---

# Let's Write Some Unit Tests

## Create the Tests

Go to `src/main/java/dev/pollito/users_manager/adapter/in/rest/UserController.java`, and do `ctrl+intro` on the name of the class. On the pop-up menu, select `Create test`.

<div>
  <img src={require('@site/static/img/unit-testing/create-test.png').default} alt="create test" />
</div>

In the next pop-up menu, leave everything as default.

<div>
  <img src={require('@site/static/img/unit-testing/test-options.png').default} alt="test options" />
</div>

Now you should have a new empty class created in `src/test/java/dev/pollito/users_manager/adapter/in/rest/UserControllerTest.java`.

Repeat this process for as many classes as you want to test.

## How to Test

There's not one true correct way of writing unit tests. Here is how I test classes based on their role.

### Rest Controller Advice classes

These test classes should verify the exception handling. They check that:

* Each type of exception (`NoResourceFoundException`, `NoSuchElementException`, etc.) is properly translated into appropriate HTTP status codes and problem details.
* The problem details include required properties like timestamp and stack trace.

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

### Controller Classes

These test classes focus on the REST endpoints. They check response status codes and confirm responses are not null.

They usually:

* Mock service dependency injections to isolate the controller's responsibility.
* Use [@Spy](https://www.baeldung.com/mockito-spy) on mappers to use real mapping functionality while mocking other dependencies.

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

### Service Implementation Classes

These test classes should be the most comprehensive ones because they verify your business logic.

* Classes that test the behavior of service implementations are the ones that will change more often.

Right now we have little logic, so the tests are basic.

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

Commit the progress so far.

```bash
git add .
git commit -m "unit tests"
```