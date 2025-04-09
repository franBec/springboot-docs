---
sidebar_position: 4
---

# Limpieza

Si venís de documentos anteriores, necesitás hacer una limpieza antes de continuar. Seguí estos pasos.

1. En `src/main/java/dev/pollito/users_manager/aspect/LogAspect.java`, borrá todo lo relacionado con `com.typicode.jsonplaceholder.api`. Después de la limpieza, debería quedar así:

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
    
      @Before("controllerPublicMethodsPointcut()")
      public void logBefore(@NotNull JoinPoint joinPoint) {
        log.info(
            "[{}] Args: {}",
            joinPoint.getSignature().toShortString(),
            Arrays.toString(joinPoint.getArgs()));
      }
    
      @AfterReturning(pointcut = "controllerPublicMethodsPointcut()", returning = "result")
      public void logAfterReturning(@NotNull JoinPoint joinPoint, Object result) {
        log.info("[{}] Response: {}", joinPoint.getSignature().toShortString(), result);
      }
    } 
    ```

2. En `src/main/java/dev/pollito/users_manager/controller/advice/ControllerAdvice.java`, borrá el manejador `@ExceptionHandler(JsonPlaceholderException.class)`. Después de la limpieza, debería quedar así:

    ```java
    package dev.pollito.users_manager.controller.advice;
    
    import io.opentelemetry.api.trace.Span;
    import jakarta.validation.ConstraintViolationException;
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
    
      @ExceptionHandler(ConstraintViolationException.class)
      public ProblemDetail handle(@NotNull ConstraintViolationException e) {
        return problemDetail(e, HttpStatus.BAD_REQUEST);
      }
    }
    ```

3. En `src/main/java/dev/pollito/users_manager/service/impl/UserServiceImpl.java`, eliminá toda la lógica de negocio. Después de la limpieza, debería quedar así:

    ```java
    package dev.pollito.users_manager.service.impl;
    
    import dev.pollito.users_manager.model.User;
    import dev.pollito.users_manager.model.Users;
    import dev.pollito.users_manager.service.UserService;
    import java.util.*;
    import lombok.RequiredArgsConstructor;
    import org.springframework.stereotype.Service;
    
    @Service
    @RequiredArgsConstructor
    public class UserServiceImpl implements UserService {
    
      @Override
      public Users findAll(Integer pageNumber, Integer pageSize, List<String> pageSort, String q) {
        return null;
      }
    
      @Override
      public User findById(Long id) {
        return null;
      }
    }
    ```

4. En `src/main/resources/application.yml`, borrá todo lo relacionado a `jsonplaceholder`. Después de la limpieza, debería quedar así:

    ```yaml
    spring:
      application:
        name: users_manager
    ```

5. En `src/test/java/dev/pollito/users_manager/controller/advice/ControllerAdviceTest.java`, borrá todo lo relacionado a `JsonPlaceholderException`. Después de la limpieza, debería quedar así:

    ```java
    package dev.pollito.users_manager.controller.advice;
    
    import static org.junit.jupiter.api.Assertions.*;
    import static org.mockito.Mockito.mock;
    
    import jakarta.validation.ConstraintViolationException;
    import java.util.NoSuchElementException;
    import java.util.stream.Stream;
    import org.jetbrains.annotations.Contract;
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
    }
    ```

6. En `build.gradle`, borrá:

   * Estas dependencias:

       ```groovy
       implementation 'org.springframework.cloud:spring-cloud-starter-openfeign:4.2.1'
       implementation 'io.github.openfeign:feign-okhttp:13.5'
       implementation 'io.github.openfeign:feign-jackson:13.5'
       implementation 'io.github.openfeign:feign-gson:13.5'
       implementation 'org.springframework.boot:spring-boot-starter-cache'
       implementation 'com.github.ben-manes.caffeine:caffeine:3.2.0'
       ```

   * La tarea `openApiGenerateFeign_jsonplaceholder`.
      * Y asegurate de que la tarea `compileJava` ya no dependa de esa tarea.

7. Borrá estos archivos:

   * `src/main/java/dev/pollito/users_manager/api/config/JsonPlaceholderApiConfig.java`
   * `src/main/java/dev/pollito/users_manager/config/properties/JsonPlaceholderConfigProperties.java`
   * `src/main/java/dev/pollito/users_manager/config/CacheConfig.java`
   * `src/main/java/dev/pollito/users_manager/errordecoder/JsonPlaceholderErrorDecoder.java`
   * `src/main/java/dev/pollito/users_manager/exception/JsonPlaceholderException.java`
   * `src/main/java/dev/pollito/users_manager/mapper/UserMapper.java`
   * `src/main/java/dev/pollito/users_manager/service/impl/UserApiCacheServiceImpl.java`
   * `src/main/java/dev/pollito/users_manager/service/UserApiCacheService.java`
   * `src/test/java/dev/pollito/users_manager/service/impl/UserApiCacheServiceImplTest.java`
   * `src/test/java/dev/pollito/users_manager/service/impl/UserServiceImplTest.java`
   * `src/test/java/dev/pollito/users_manager/MockData.java`

Commiteá el progreso hasta ahora.

```bash
git add .
git commit -m "cleaned up integration layer logic"
```