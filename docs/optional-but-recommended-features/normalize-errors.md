---
sidebar_position: 2
---

# Normalize Errors Returned

## Consistency Is Important

One of the most annoying things when consuming a microservice is that the errors it returns are not consistent. At work, I have plenty of scenarios like:

* `service.com/users/-1` returns:

    ```json
    {
    "errorDescription": "User not found",
    "cause": "BAD REQUEST"
    }
    ```

* but `service.com/product/-1` returns:

    ```json
    {
    "message": "not found",
    "error": 404
    }
    ```

Consistency just flew out of the window there, and it gets worse with errors inside 200OK. We don’t want to be that kind of dev: we are going to do proper error handling with [@RestControllerAdvice](https://www.bezkoder.com/spring-boot-restcontrolleradvice/) and [ProblemDetail](https://www.baeldung.com/spring-boot-return-errors-problemdetail).

`@RestControllerAdvice` acts like a central "error coordinator" for your application.

* It’s a single place where you can define how all errors, exceptions, or unexpected scenarios get translated into responses.
* Instead of scattering error-handling logic across every controller, this tool ensures every error—whether from a user lookup, product search, or internal bug—follows the same rules and format.

`ProblemDetail` is a standardized "error template" that structures responses in a clear, consistent way. Think of it as a pre-designed form that every error fills out:

* What type of error occurred (e.g., "user_not_found")
* A human-readable title (e.g., "Resource Not Found")
* The HTTP status code (e.g., 404)
* Additional details (e.g., "User ID -1 does not exist")

Together, these tools ensure your microservice never confuses clients with mismatched error formats. Even edge cases or unanticipated errors get wrapped into the same predictable structure

Let’s create a `@RestControllerAdvice` class: In `src/main/java/dev/pollito/users_manager/controller/advice`, create `ControllerAdvice.java.`

```java
package dev.pollito.users_manager.controller.advice;

import io.opentelemetry.api.trace.Span;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

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
    return buildProblemDetail(e, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
```

If we visit an uri that doesn't exist (like [http://localhost:8080](http://localhost:8080)), we will now get a standardized error:

![standarized-error.png](img/standarized-error.png)

## Adding More Handlers

Right now you could be thinking

> But No static resource should be 404 instead of 500

To which I say, yes you’re totally right and I wish there was a way to implement that behaviour by default. But with this normalization of errors, everything is a 500 unless you explicitly say otherwise. I think the trade-off is worth it.

For making `No static resource` a 404, add in the `@RestControllerAdvice` class a new `@ExceptionHandler(NoResourceFoundException.class)` method. The final result looks like this:

```java
package dev.pollito.users_manager.controller.advice;

import io.opentelemetry.api.trace.Span;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
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
}
```

Now when requesting to [http://localhost:8080](http://localhost:8080) we get the new expected behaviour:

![expected404.png](img/expected404.png)

## Common Handlers You May Need

Here are some common exceptions that you may want to handle:

| Exception                             | Description                                                                 | Example                                            | Notes                                    |
|---------------------------------------|-----------------------------------------------------------------------------|----------------------------------------------------|------------------------------------------|
| `ConstraintViolationException`        | Request parameters/fields fail validation (`@NotNull`, `@Size`, `@Pattern`) | Request body missing a required field              | Requires Jakarta EE (to be added later)  |
| `MethodArgumentTypeMismatchException` | Request parameter cannot be converted to expected type                      | Controller expects `Integer` but receives `String` |                                          |
| `NoResourceFoundException`            | Request accesses non-existent Spring MVC resource                           | Accessing an undefined endpoint                    |                                          |
| `NoSuchElementException`              | `Optional.get()` called on empty `Optional`                                 | Looking for non-existent user by ID                |                                          |
| `PropertyReferenceException`          | Invalid property used in Spring Data repository query                       | Sorting by non-existent field                      | Requires Spring Data (to be added later) |

The final result so far looks like this:

```java
package dev.pollito.users_manager.controller.advice;

import io.opentelemetry.api.trace.Span;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.NoSuchElementException;

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
}
```

As always, commit the progress so far.

```bash
git add .
git commit -m "error handling"
```

Now, let’s explore an interesting way of thinking (and writing) endpoints.