---
sidebar_position: 3
---

# Normalizar errores

En el laburo, tengo un montón de escenarios como:

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

La consistencia en los errores se fue por la ventana, y empeora con errores dentro de respuestas 200 OK. Vos no querés ser ese tipo de dev: vamos a hacer un manejo de errores adecuado con [@RestControllerAdvice](https://www.bezkoder.com/spring-boot-restcontrolleradvice/) y [ProblemDetail](https://www.baeldung.com/spring-boot-return-errors-problemdetail).

## Manejo de errores

`@RestControllerAdvice` actúa como un "coordinador central de errores" para tu aplicación.

* Es un solo lugar donde podés definir cómo todos los errores, excepciones o escenarios inesperados se traducen en respuestas.
* En lugar de dispersar la lógica de manejo de errores por cada controlador, esta herramienta asegura que cada error —ya sea por una búsqueda de usuario, producto o un bug interno— siga las mismas reglas y formato.

`ProblemDetail` es una "plantilla de error" estandarizada que estructura las respuestas de manera clara y consistente. Pensalo como un formulario prediseñado que cada error completa:

* Qué tipo de error ocurrió (por ejemplo, "user_not_found").
* Un título legible para humanos (por ejemplo, "Recurso no encontrado").
* El código de estado HTTP (por ejemplo, 404).
* Detalles adicionales (por ejemplo, "El ID de usuario -1 no existe").

Juntos, estas herramientas aseguran que tu microservicio nunca confunda a los clientes con formatos de error inconsistentes. Incluso los casos extremos o errores imprevistos se envuelven en la misma estructura predecible.

Las clases `@RestControllerAdvice` en la Arquitectura Hexagonal tienen sentido que estén en la carpeta `/adapter/in`. Sin embargo, podés encontrarlas en `/config` para indicar que es una preocupación transversal.

Creemos una clase `@RestControllerAdvice`.

```java title="src/main/java/dev/pollito/users_manager/config/advice/ControllerAdvice.java"
package dev.pollito.users_manager.adapter.in.rest.advice;

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
  @NotNull private static ProblemDetail buildProblemDetail(@NotNull Exception e, HttpStatus status) {
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

  @ExceptionHandler(NoResourceFoundException.class)
  public ProblemDetail handle(@NotNull NoResourceFoundException e) {
    return buildProblemDetail(e, HttpStatus.NOT_FOUND);
  }
}
```

Si visitamos una uri que no existe (como [http://localhost:8080](http://localhost:8080)), ahora vamos a obtener un error estandarizado:

<div>
  <img src={require('@site/static/img/optional-but-recommended-features/standarized-error.png').default} alt="error estándar" />
</div>

## Agregando más manejadores

Ahora mismo podrías estar pensando

> Pero "No static resource" debería ser 404 en lugar de 500.

A lo que yo te digo, sí, tenés toda la razón, y desearía que hubiera una forma de implementar ese comportamiento por defecto. Pero con esta normalización de errores, todo es un 500 a menos que digas explícitamente lo contrario. Creo que la compensación vale la pena.

Para que "No static resource" sea un 404, agregá en la clase `@RestControllerAdvice` un nuevo método `@ExceptionHandler(NoResourceFoundException.class)`.

```java
@ExceptionHandler(NoResourceFoundException.class)
public ProblemDetail handle(@NotNull NoResourceFoundException e) {
  return buildProblemDetail(e, HttpStatus.NOT_FOUND);
}
```

Ahora, al pedir a [http://localhost:8080](http://localhost:8080) obtenemos el nuevo comportamiento esperado:

<div>
  <img src={require('@site/static/img/optional-but-recommended-features/expected404.png').default} alt="404 esperado" />
</div>

Commiteá el progreso hasta ahora.

```bash
git add .
git commit -m "manejo de errores"
```

## Manejadores comunes que podrías necesitar

Acá tenés algunas excepciones comunes que quizás quieras manejar:

| Excepción                             | Descripción                                                                                 | Ejemplo                                                    | Notas                                      |
|---------------------------------------|---------------------------------------------------------------------------------------------|------------------------------------------------------------|--------------------------------------------|
| `ConstraintViolationException`        | Los parámetros/campos de la petición fallan la validación (`@NotNull`, `@Size`, `@Pattern`) | Cuerpo de la petición sin un campo requerido               | Requiere Jakarta EE (se agregará después)  |
| `MethodArgumentTypeMismatchException` | El parámetro de la petición no se puede convertir al tipo esperado                          | El controlador espera un `Integer` pero recibe un `String` |                                            |
| `NoResourceFoundException`            | La petición accede a un recurso de Spring MVC que no existe                                 | Acceder a un endpoint no definido                          |                                            |
| `NoSuchElementException`              | Se llama a `Optional.get()` en un `Optional` vacío                                          | Buscar un usuario por ID que no existe                     |                                            |
| `PropertyReferenceException`          | Se usa una propiedad inválida en una consulta de repositorio de Spring Data                 | Ordenar por un campo que no existe                         | Requiere Spring Data (se agregará después) |