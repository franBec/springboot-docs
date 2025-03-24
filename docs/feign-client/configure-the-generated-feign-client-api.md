---
sidebar_position: 5
---

# Configure The Generated Feign Client API

## 1. Create A New Exception

In `src/main/java/dev/pollito/users_manager/exception`, create `JsonPlaceholderException.java`.

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

There’s no need to create fields in the class, it could be empty. But here are some things that can be helpful down the road:

* **Status**: Useful when handling the exception, to do different logic based on the status of the response.
* **An error class**:
  * If the outside source you are integrating has a defined error structure (or even multiple), you can define it as a `Schema` in the OpenAPI specification yaml file, so then when building you’ll have a Java class representing that error structure.
  * Use it when throwing the exception to map the error structure into a Java class.

## 2. Handle The New Created Exception

### What NOT To Do

Unless you have business logic that implies you have to do something when the REST API call fails (or another very good reason), **always let the Exception propagate**.

Don’t do this:

```java
SomeObject foo(){
  try{
    //business code
    Something something = someClient.getSomething();
    //more business code and eventually return SomeObject
  }catch(Exception e){
    return null;
  }
}
```

For more info on why that is bad, I recommend this article on [Fast Fail exception handling](https://medium.com/@qbyteconsulting/fast-fail-exception-handling-9bba83f7cce7).

### What To Do

Let the `@RestControllerAdvice` class take care of the propagated exception.

Once here you have two options:

1. If you don’t care at all and is ok for it to be a `500 INTERNAL ERROR`, then do nothing.
2. If you do care, handle the `Exception`.

Let’s go for scenario 2.

In `src/main/java/dev/pollito/users_manager/controller/advice/ControllerAdvice.java`, add a `@ExceptionHandler(JsonPlaceholderException.class)` handler.

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

## 3. Create an Error Decoder implementation

In `src/main/java/dev/pollito/users_manager/errordecoder`, create `JsonPlaceholderErrorDecoder.java`.

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

Here **you can get as creative as your business logic needs**.

Here is an example of how would it look a more complex Error Decoder implementation: The error that you get from the REST API call gets mapped into an Error class that is part of an Exception, so it can be used somewhere else (most probably a `@RestControllerAdvice` class).

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

## 4. Add The URL Value In application.yml

If by now you haven’t renamed `src/main/resources/application.properties`, rename it to `src/main/resources/application.yml`.

Then, add the url of the outside source we are integrating. The end result should look something like this:

```yaml
jsonplaceholder:
  baseUrl: https://jsonplaceholder.typicode.com/
spring:
  application:
    name: users_manager
```

* It is important that the name of the root keys (in this particular example, `jsonplaceholder`) is all **lowercase**.
  * If not, later you’ll get the error `Prefix must be in canonical form`.
* Order in this file doesn’t matter. I like to have stuff alphabetically sorted.

## 5. Create A ConfigurationProperties Class

To access the url we defined in `src/main/resources/application.yml`, we are going to use a [ConfigurationProperties](https://www.baeldung.com/configuration-properties-in-spring-boot) class

* For your information, there are more ways to access an externalized configuration property. The most common one I saw everywhere is using [the annotation @Value](https://www.baeldung.com/spring-value-annotation). I don't recommend it much cause later down the road when doing unit testing you end up using [Reflection](https://stackoverflow.com/questions/2811141/is-it-bad-practice-to-use-reflection-in-unit-testing), which in my personal opinion is bad practice.

In `src/main/java/dev/pollito/config/properties`, create `JsonPlaceholderConfigProperties.java`.

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

## 6. Configure The Feign Client

In `src/main/java/dev/pollito/api/config`, create `JsonPlaceholderApiConfig.java`.

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

### Important Considerations

* `basePackages` should be pointing to the package where the generated Feign API client was generated:
  * In build.gradle, we indicated `apiPackage = "com.typicode.jsonplaceholder.api".toString()`, so basePackages value should be `com.typicode.jsonplaceholder.api`.
* Set the .errorDecoder to the ErrorDecoder class we created in [3. Create an Error Decoder implementation](/feign-client/configure-the-generated-feign-client-api#3-create-an-error-decoder-implementation).
  * The `@Bean` return type, the `.logger Slf4jLogger` class, and the `.target` class should be the desired Feign API client.

## 7. Create A New Aspect Pointcut

Back in [Aspect](/optional-but-recommended-features/logs#aspect), we created an Aspect class that automatically logs at certain points in the application. Let's configure it so it also logs whatever goes in and out of the Feign API client.

To do that, in `src/main/java/dev/pollito/users_manager/aspect/LogAspect.java` we are going to create a new `@Pointcut` that matches the Feign API client, and add it to the `@Before` and `@AfterReturning` methods. The end result should look something like this:

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