---
sidebar_position: 5
---

# Configura el API client Feign generado

## 1. Crea una nueva excepción

En `src/main/java/dev/pollito/users_manager/exception`, creá `JsonPlaceholderException.java`.

```java
package exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class JsonPlaceholderException extends RuntimeException {
  private final int status;
}
```

No es necesario crear campos adicionales en la clase; podría estar vacía. Pero acá te dejo algunas cosas que pueden ser útiles más adelante:

* **Status**: Sirve para manejar la excepción, para aplicar distintas lógicas basadas en el status de la respuesta.
* **Una clase de error**:
  * Si la fuente externa que estás integrando tiene una estructura de error definida (o incluso varias), podés definirla como un `Schema` en el archivo `yaml` de la especificación OpenAPI, para que al compilar tengas una clase Java que represente esa estructura de error.
  * Usala cuando lancés la excepción para mapear la estructura de error en una clase Java.

## 2. Maneja la nueva excepción creada

### Lo que no se debe hacer

A menos que tengas lógica de negocio que implique que debés hacer algo cuando falla la llamada al API REST (o alguna otra razón muy importante), **siempre dejá que la excepción se propague**.

No hagas esto:

```java
SomeObject foo(){
  try{
    //código de negocio
    Something something = someClient.getSomething();
    //más código de negocio y eventualmente retorna SomeObject
  }catch(Exception e){
    return null;
  }
}
```

Para más info sobre por qué eso es malo, recomiendo este artículo sobre [manejo de excepciones Fast Fail](https://medium.com/@qbyteconsulting/fast-fail-exception-handling-9bba83f7cce7).

### Lo que se debe hacer

Dejá que la clase `@RestControllerAdvice` se encargue de manejar la excepción propagada.

En este punto, tenés dos opciones:

1. Si no te importa y está bien que sea un `500 INTERNAL ERROR`, no hagas nada.
2. Si te importa, manejá la `Exception`.

Vamos a optar por el escenario 2.

En `src/main/java/dev/pollito/users_manager/controller/advice/ControllerAdvice.java`, agregá un manejador `@ExceptionHandler(JsonPlaceholderException.class)`.

```java
package dev.pollito.users_manager.controller.advice;

import exception.JsonPlaceholderException;
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

  @ExceptionHandler(JsonPlaceholderException.class)
  public ProblemDetail handle(@NotNull JsonPlaceholderException e) {
    return problemDetail(
        e,
        e.getStatus() == HttpStatus.BAD_REQUEST.value()
            ? HttpStatus.BAD_REQUEST
            : HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
```

## 3. Crea una implementación de error decoder

En `src/main/java/dev/pollito/users_manager/errordecoder`, creá `JsonPlaceholderErrorDecoder.java`.

```java
package dev.pollito.users_manager.errordecoder;

import exception.JsonPlaceholderException;
import feign.Response;
import feign.codec.ErrorDecoder;
import org.jetbrains.annotations.NotNull;

public class JsonPlaceholderErrorDecoder implements ErrorDecoder {
  @Override
  public Exception decode(String s, @NotNull Response response) {
    return new JsonPlaceholderException(response.status());
  }
}
```

Acá **podés ser tan creativo como lo requiera la lógica de tu negocio**.

Acá tenés un ejemplo de cómo se vería una implementación de Error Decoder más compleja: el error que obtenés de la llamada al API REST se mapea en una clase de error que es parte de una excepción, para que pueda usarse en otro lugar (probablemente en una clase `@RestControllerAdvice`).

```java
package dev.pollito.users_manager.errordecoder;

import com.fasterxml.jackson.databind.ObjectMapper;
import exception.JsonPlaceholderException;
import feign.Response;
import feign.codec.ErrorDecoder;
import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.io.InputStream;

public class JsonPlaceholderErrorDecoder implements ErrorDecoder {
  @Override
  public Exception decode(String s, @NotNull Response response) {
      try (InputStream body = response.body().asInputStream()) {
          return new JsonPlaceholderException(new ObjectMapper().readValue(body, Error.class));
      } catch (IOException e) {
          return new Default().decode(s, response);
      }
  }
}
```

## 4. Agrega el valor de la URL en application.yml

Si hasta ahora no renombraste `src/main/resources/application.properties`, renombralo a `src/main/resources/application.yml`.

Luego, agregá la URL de la fuente externa que estamos integrando. El resultado final debería verse algo así:

```yaml
jsonplaceholder:
  baseUrl: https://jsonplaceholder.typicode.com/
spring:
  application:
    name: users_manager
```

* Es importante que el nombre de las claves raíz (en este ejemplo, `jsonplaceholder`) esté en **minúsculas**.
  * Si no, más tarde te va a dar el error `Prefix must be in canonical form`.
* El orden en este archivo no importa. A mí me gusta tener todo ordenado alfabéticamente.

## 5. Crea una clase de ConfigurationProperties

Para acceder a la URL que definimos en `src/main/resources/application.yml`, vamos a utilizar una clase [ConfigurationProperties](https://www.baeldung.com/configuration-properties-in-spring-boot).

* Para tu información, hay más formas de acceder a una propiedad de configuración externalizada. La más común que veo es usar [la anotación @Value](https://www.baeldung.com/spring-value-annotation). No la recomiendo mucho porque más adelante, al hacer tests unitarios, terminarías usando [Reflection](https://stackoverflow.com/questions/2811141/is-it-bad-practice-to-use-reflection-in-unit-testing), lo cual en mi opinión personal es una mala práctica.

En `src/main/java/dev/pollito/config/properties`, creá `JsonPlaceholderConfigProperties.java`.

```java
package dev.pollito.users_manager.config.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "jsonplaceholder")
@Data
public class JsonPlaceholderConfigProperties {
  private String baseUrl;
}
```

## 6. Configura el Feign client

En `src/main/java/dev/pollito/api/config`, creá `JsonPlaceholderApiConfig.java`.

```java
package dev.pollito.users_manager.api.config;

import static feign.Logger.Level.FULL;

import com.typicode.jsonplaceholder.api.UserApi;
import dev.pollito.users_manager.config.properties.JsonPlaceholderConfigProperties;
import dev.pollito.users_manager.errordecoder.JsonPlaceholderErrorDecoder;
import feign.Feign;
import feign.gson.GsonDecoder;
import feign.gson.GsonEncoder;
import feign.okhttp.OkHttpClient;
import feign.slf4j.Slf4jLogger;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScans;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScans(
    value = {
      @ComponentScan(
          basePackages = {
            "com.typicode.jsonplaceholder.api",
          })
    })
@RequiredArgsConstructor
public class JsonPlaceholderApiConfig {
  private final JsonPlaceholderConfigProperties jsonPlaceholderConfigProperties;

  @Bean
  public UserApi userApi() {
    return Feign.builder()
        .client(new OkHttpClient())
        .encoder(new GsonEncoder())
        .decoder(new GsonDecoder())
        .errorDecoder(new JsonPlaceholderErrorDecoder())
        .logger(new Slf4jLogger(UserApi.class))
        .logLevel(FULL)
        .target(UserApi.class, jsonPlaceholderConfigProperties.getBaseUrl());
  }
}
```

### Consideraciones importantes

* `basePackages` debe apuntar al paquete donde fue generado el API client Feign:
  * En `build.gradle`, indicamos `apiPackage = "com.typicode.jsonplaceholder.api".toString()`, así que el valor de `basePackages` debería ser `com.typicode.jsonplaceholder.api`.
* Configurá el `.errorDecoder` con la clase `ErrorDecoder` que creamos en [3. Crea una implementación de Error Decoder](/integration-layer/configure-the-generated-feign-client-api#3-crea-una-implementación-de-error-decoder).
  * El tipo de retorno del `@Bean`, la clase `.logger Slf4jLogger`, y la clase en `.target` deben ser el API client Feign deseado.

## 7. Crea un nuevo aspect pointcut

Volviendo al [Aspect](/optional-but-recommended-features/logs#aspect), creamos una clase Aspect que loggea automáticamente en ciertos puntos de la aplicación. Vamos a configurarlo para que también loggee todo lo que entra y sale del API client Feign.

Para eso, en `src/main/java/dev/pollito/users_manager/aspect/LogAspect.java` vamos a crear un nuevo `@Pointcut` que matchee al API client Feign, y lo agregamos a los métodos `@Before` y `@AfterReturning`. El resultado final debería quedar algo así:

```java
package dev.pollito.users_manager.aspect;

import java.util.Arrays;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class LogAspect {

  @Pointcut("execution(public * dev.pollito.users_manager.controller..*.*(..))")
  public void controllerPublicMethodsPointcut() {}

  @Pointcut("execution(public * com.typicode.jsonplaceholder.api.*.*(..))")
  public void jsonPlaceholderApiMethodsPointcut() {}

  @Before("controllerPublicMethodsPointcut() || jsonPlaceholderApiMethodsPointcut()")
  public void logBefore(@NotNull JoinPoint joinPoint) {
    log.info(
        "[{}] Args: {}",
        joinPoint.getSignature().toShortString(),
        Arrays.toString(joinPoint.getArgs()));
  }

  @AfterReturning(
      pointcut = "controllerPublicMethodsPointcut() || jsonPlaceholderApiMethodsPointcut()",
      returning = "result")
  public void logAfterReturning(@NotNull JoinPoint joinPoint, Object result) {
    log.info("[{}] Response: {}", joinPoint.getSignature().toShortString(), result);
  }
}
```

Commiteá el progreso hasta ahora.

```bash
git add .
git commit -m "generated feign client api from an openapi specification"
```
