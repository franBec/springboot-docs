---
sidebar_position: 2
---

# Normaliza los Errores Devueltos

## La Consistencia Es Importante

Una de las cosas más frustrantes al consumir un microservicio es que los errores que devuelve no son consistentes. En el trabajo, he visto varios escenarios como:

* `service.com/users/-1` devuelve:

    ```json
    {
      "errorDescription": "User not found",
      "cause": "BAD REQUEST"
    }
    ```

* pero `service.com/product/-1` devuelve:

    ```json
    {
      "message": "not found",
      "error": 404
    }
    ```

La consistencia se fue por la ventana, y se complica aún más cuando aparecen errores dentro de un 200 OK. No queremos ser ese tipo de dev: vamos a hacer un manejo de errores correcto con [@RestControllerAdvice](https://www.bezkoder.com/spring-boot-restcontrolleradvice/) y [ProblemDetail](https://www.baeldung.com/spring-boot-return-errors-problemdetail).

`@RestControllerAdvice` actúa como un "coordinador de errores" central para tu aplicación.

* Es un único lugar donde podés definir cómo se traducen todos los errores, excepciones o escenarios inesperados en respuestas.
* En lugar de esparcir la lógica de manejo de errores en cada controller, esta herramienta hace que cada error —ya sea por una búsqueda de usuario, una consulta de producto o un bug interno— siga las mismas reglas y formato.

`ProblemDetail` es una "plantilla de error" estandarizada que estructura las respuestas de forma clara y consistente. Pensalo como un formulario pre-diseñado que se completa para cada error:

* Qué tipo de error ocurrió (por ej., "user_not_found")
* Un título legible para humanos (por ej., "Resource Not Found")
* El código HTTP de estado (por ej., 404)
* Detalles adicionales (por ej., "User ID -1 does not exist")

Juntos, estas herramientas garantizan que tu microservicio nunca confunda a los clientes con formatos de error distintos. Incluso los casos extremos o errores no previstos se envuelven en la misma estructura predecible.

Creemos una clase con `@RestControllerAdvice`: en `src/main/java/dev/pollito/users_manager/controller/advice`, creá `ControllerAdvice.java`.

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
    return problemDetail(e, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
```

Si visitamos una URI que no exista (como [http://localhost:8080](http://localhost:8080)), ahora vamos a recibir un error estandarizado:

<div>
  <img src={require('@site/static/img/optional-but-recommended-features/standarized-error.png').default} alt="standarized error" />
</div>

## Agregando Más Handlers

En este momento, capaz estés pensando

> Pero No static resource debería ser 404 en lugar de 500

Y a eso le digo, sí, tenés toda la razón y me gustaría que hubiera una manera de implementar ese comportamiento por defecto. Pero con esta normalización de errores, todo es 500 a menos que se especifique explícitamente lo contrario. Creo que el intercambio vale la pena.

Para hacer que un `No static resource` sea 404, agregá en la clase `@RestControllerAdvice` un nuevo método `@ExceptionHandler(NoResourceFoundException.class)`. El resultado final se ve así:

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

Ahora, al solicitar [http://localhost:8080](http://localhost:8080) obtendremos el nuevo comportamiento esperado:

<div>
  <img src={require('@site/static/img/optional-but-recommended-features/expected404.png').default} alt="expected 404" />
</div>

## Handlers Comunes Que Podrías Necesitar

Acá te dejo algunas excepciones comunes que quizá quieras manejar:

| Excepción                             | Descripción                                                                                    | Ejemplo                                                   | Notas                                           |
|---------------------------------------|------------------------------------------------------------------------------------------------|-----------------------------------------------------------|-------------------------------------------------|
| `ConstraintViolationException`        | Los parámetros/campos de la petición fallan en la validación (`@NotNull`, `@Size`, `@Pattern`) | El body de la solicitud no tiene un campo obligatorio     | Requiere Jakarta EE (se agregará más adelante)  |
| `MethodArgumentTypeMismatchException` | Un parámetro de la petición no puede convertirse al tipo esperado                              | El controller espera un `Integer` pero recibe un `String` |                                                 |
| `NoResourceFoundException`            | Se intenta acceder a un recurso MVC de Spring que no existe                                    | Acceder a un endpoint indefinido                          |                                                 |
| `NoSuchElementException`              | Se llamó a `Optional.get()` en un `Optional` vacío                                             | Buscar un usuario por ID que no existe                    |                                                 |
| `PropertyReferenceException`          | Se usó una propiedad inválida en una consulta del repositorio Spring Data                      | Ordenar por un campo que no existe                        | Requiere Spring Data (se agregará más adelante) |

El resultado final hasta ahora se ve así:

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

Commiteá el progreso realizado hasta ahora.

```bash
git add .
git commit -m "error handling"
```