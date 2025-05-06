---
sidebar_position: 2
---

# Logs

Considering we don’t mind printing sensitive information (keys, passwords, etc.), I’ve found it useful to log:

* Everything that comes in.
* Everything that comes out.

To achieve that, we are going to be using:

* An [Aspect](https://www.baeldung.com/spring-aop) that logs before and after execution of public controller methods.
* [Micrometer](https://www.baeldung.com/micrometer) to enhance logs.
* A [Filter](https://www.baeldung.com/spring-boot-add-filter) interface that logs stuff that doesn’t reach the controllers.

## Aspect

An aspect is a piece of code with a specific task—in this case, logging—that can automatically run at certain points in your application. It lets you separate common behavior from your main business logic, which simplifies the code and keeps it cleaner.

1. We need the [aspectjtools](https://mvnrepository.com/artifact/org.aspectj/aspectjtools) dependency. Add it in the `build.gradle` dependencies section:

    ```groovy title="build.gradle"
    implementation 'org.aspectj:aspectjtools:1.9.22.1'
    ```
   
2. Create `LogAspect.java`.
    
   ```java title="src/main/java/dev/pollito/users_manager/config/aspect/LogAspect.java"
   package dev.pollito.users_manager.config.aspect;
   
   import java.util.Arrays;
   import lombok.extern.slf4j.Slf4j;
   import org.aspectj.lang.JoinPoint;
   import org.aspectj.lang.annotation.AfterReturning;
   import org.aspectj.lang.annotation.Aspect;
   import org.aspectj.lang.annotation.Before;
   import org.aspectj.lang.annotation.Pointcut;
   import org.springframework.stereotype.Component;
   
   @Aspect
   @Component
   @Slf4j
   public class LogAspect {
     @Pointcut("execution(public * dev.pollito.users_manager.adapter.in.rest..*Controller.*(..))")
     public void controllerPublicMethodsPointcut() {}
   
     @Before("controllerPublicMethodsPointcut()")
     public void logBefore(JoinPoint joinPoint) {
       log.info(
           "[{}] Args: {}",
           joinPoint.getSignature().toShortString(),
           Arrays.toString(joinPoint.getArgs()));
     }
   
     @AfterReturning(pointcut = "controllerPublicMethodsPointcut()", returning = "result")
     public void logAfterReturning(JoinPoint joinPoint, Object result) {
       log.info("[{}] Response: {}", joinPoint.getSignature().toShortString(), result);
     }
   }
   ```

   * `@Aspect` classes don't have a clear place in the Hexagonal Architecture. You may find them in `/config` to indicate it's a cross-cutting concern.

Rebuild the application. Then go to [http://localhost:8080/users](http://localhost:8080/users) and check the logs. You should find something like this:

```log
2025-04-16T23:33:45.851+01:00  INFO 108782 --- [users_manager] [nio-8080-exec-1] d.p.u.config.aspect.LogAspect            : [UserController.findAll()] Args: []
2025-04-16T23:33:45.858+01:00  INFO 108782 --- [users_manager] [nio-8080-exec-1] d.p.u.config.aspect.LogAspect            : [UserController.findAll()] Response: <200 OK OK,[UserResponseDTO(id=1, name=Leanne Graham, username=Bret, email=Sincere@april.biz)],[]>
```

## What Does the IntelliJ IDEA Suggestion “Insert ‘@NotNull’ on parameter” Mean?

If you’re using IntelliJ IDEA, you would notice that in the class we just created, you are being suggested the following:

<div>
  <img src={require('@site/static/img/optional-but-recommended-features/notnull.png').default} alt="notnull" />
</div>

This annotation indicates that the parameter should not be null when the method is called. It helps in avoiding `NullPointerException` and improves code readability and safety by explicitly specifying that null values are not allowed.

It is not mandatory to add the `@NotNull` annotation, but it is highly recommended:

* **Code safety**: It helps prevent `NullPointerException` by explicitly specifying that the parameter should not be null.
* **Code readability**: It makes the code more readable and self-documenting by clearly indicating that null values are not allowed.
* **Static analysis**: Tools like IntelliJ IDEA can use this annotation to provide better static analysis, warnings, and code suggestions.

When accepting the suggestion, we are going to be notified about a new dependency being added. Accept.

<div>
  <img src={require('@site/static/img/optional-but-recommended-features/notnull-dependency.png').default} alt="notnull dependency" />
</div>

Sometimes the IDE behaves weird and doesn’t add the dependency in `build.gradle`. Go check if you can find the following

```groovy title="build.gradle"
implementation 'org.jetbrains:annotations:26.0.2'
```

If not, add it.

Rebuild the application. Then go to [http://localhost:8080/users](http://localhost:8080/users) and check the logs. Everything should be working exactly the same as before.

## Micrometer

Imagine this application has many endpoints and also has many requests at the same time. **How are we going to be sure which logs are related to the same request**, when everything is happening at the same time (or very close enough to mix each other)?

**Micrometer** enriches your logs by automatically attaching contextual information. This means that logs include details like [trace and span identifiers](https://medium.com/dzerolabs/observability-journey-understanding-logs-events-traces-and-spans-836524d63172), helping to correlate log messages with specific events and requests across your application.

We need these dependencies:

* [Micrometer Observation](https://mvnrepository.com/artifact/io.micrometer/micrometer-observation): allows you to measure and track various aspects of your application's performance in a standardized way.
* [Micrometer Tracing Bridge OTel](https://mvnrepository.com/artifact/io.micrometer/micrometer-tracing-bridge-otel): This is a "bridge" that enables distributed tracing using the [OpenTelemetry (OTEL)](https://opentelemetry.io/) standard.

Add them in the `build.gradle` dependencies section:

```groovy title="build.gradle"
implementation 'io.micrometer:micrometer-observation:1.14.4'
implementation 'io.micrometer:micrometer-tracing-bridge-otel:1.4.3'
```

Rebuild the application. Then go to [http://localhost:8080/users](http://localhost:8080/users) and check the logs. You should find something like this:

```log
2025-04-16T23:53:52.082+01:00  INFO 112231 --- [users_manager] [nio-8080-exec-1] [e508c97bff061f8daabd16aee85498c7-d654b43da989fdb1] d.p.u.config.aspect.LogAspect            : [UserController.findAll()] Args: []
2025-04-16T23:53:52.089+01:00  INFO 112231 --- [users_manager] [nio-8080-exec-1] [e508c97bff061f8daabd16aee85498c7-d654b43da989fdb1] d.p.u.config.aspect.LogAspect            : [UserController.findAll()] Response: <200 OK OK,[UserResponseDTO(id=1, name=Leanne Graham, username=Bret, email=Sincere@april.biz)],[]>
```

## Filter

What if I tell you there’s something in the Spring Boot App that goes before the Primary Adapter? These are **Filters**.

<div>
  <img src={require('@site/static/img/optional-but-recommended-features/filters.png').default} alt="filters" />
</div>

_Filters are left out of diagrams when talking about Hexagonal Architecture as they add complexity. Know that they are always there, but are kept out for simplicity._

A Filter acts like a checkpoint for every incoming request and outgoing response, even before they reach your Primary Adapters or after they leave.

* Think of it as a gatekeeper that can observe—and optionally modify—the raw flow of data between the client and your application.
* Filters operate at a lower level, intercepting all HTTP traffic regardless of whether it eventually triggers controller logic**.

By integrating filter, you ensure that nothing slips through the cracks in your logs:

* Every incoming request gets timestamped, inspected, and logged at the "front door," and every outgoing response is documented on its way out.
* This provides a complete audit trail, even for edge cases that don’t reach any of the Primary Adapters.

Filter classes in the Hexagonal Architecture make sense to be in the `/adapter/in` folder. However, you may find them in `/config` to indicate it's a cross-cutting concern.

Let’s create `LogFilter.java`.

```java title="src/main/java/dev/pollito/users_manager/config/filter/LogFilter.java"
package dev.pollito.users_manager.adapter.in.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@Slf4j
public class LogFilter extends OncePerRequestFilter {

  @Override
  protected void doFilterInternal(
      @NotNull HttpServletRequest request,
      @NotNull HttpServletResponse response,
      @NotNull FilterChain filterChain)
      throws ServletException, IOException {
    logRequestDetails(request);
    filterChain.doFilter(request, response);
    logResponseDetails(response);
  }

  private void logRequestDetails(@NotNull HttpServletRequest request) {
    log.info(
        ">>>> Method: {}; URI: {}; QueryString: {}; Headers: {}",
        request.getMethod(),
        request.getRequestURI(),
        request.getQueryString(),
        headersToString(request));
  }

  public String headersToString(@NotNull HttpServletRequest request) {
    Enumeration<String> headerNames = request.getHeaderNames();
    StringBuilder stringBuilder = new StringBuilder("{");

    while (headerNames.hasMoreElements()) {
      String headerName = headerNames.nextElement();
      String headerValue = request.getHeader(headerName);

      stringBuilder.append(headerName).append(": ").append(headerValue);

      if (headerNames.hasMoreElements()) {
        stringBuilder.append(", ");
      }
    }

    stringBuilder.append("}");
    return stringBuilder.toString();
  }

  private void logResponseDetails(@NotNull HttpServletResponse response) {
    log.info("<<<< Response Status: {}", response.getStatus());
  }
}
```

Rebuild the application. Then go to [http://localhost:8080/users](http://localhost:8080/users) and check the logs. You should find something resembling this structure:

1. `LogFilter` printing the request information such as Method, URI, Headers.
2. `LogAspect` printing the controller method and arguments.
3. `LogAspect` printing the controller method and response.
4. `LogFilter` printing the response status.

```log
2025-04-17T13:30:12.767+01:00  INFO 32637 --- [users_manager] [nio-8080-exec-5] [fa95bea514835a03b3bbd669b9a9b3dd-e77bd546beaf3350] d.p.u.config.filter.LogFilter        : >>>> Method: GET; URI: /users; QueryString: null; Headers: {host: localhost:8080, connection: keep-alive, sec-ch-ua: "Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135", sec-ch-ua-mobile: ?0, sec-ch-ua-platform: "Linux", dnt: 1, upgrade-insecure-requests: 1, user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36, accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7, sec-fetch-site: none, sec-fetch-mode: navigate, sec-fetch-user: ?1, sec-fetch-dest: document, accept-encoding: gzip, deflate, br, zstd, accept-language: es-AR,es-419;q=0.9,es;q=0.8,en;q=0.7,pt;q=0.6, cookie: Idea-f1d89c39=5112bd44-91f2-4b6c-8d18-4c172f6b483e, sec-gpc: 1}
2025-04-17T13:30:12.768+01:00  INFO 32637 --- [users_manager] [nio-8080-exec-5] [fa95bea514835a03b3bbd669b9a9b3dd-e77bd546beaf3350] d.p.u.config.aspect.LogAspect            : [UserController.findAll()] Args: []
2025-04-17T13:30:12.769+01:00  INFO 32637 --- [users_manager] [nio-8080-exec-5] [fa95bea514835a03b3bbd669b9a9b3dd-e77bd546beaf3350] d.p.u.config.aspect.LogAspect            : [UserController.findAll()] Response: <200 OK OK,[UserResponseDTO(id=1, name=Leanne Graham, username=Bret, email=Sincere@april.biz)],[]>
2025-04-17T13:30:12.772+01:00  INFO 32637 --- [users_manager] [nio-8080-exec-5] [fa95bea514835a03b3bbd669b9a9b3dd-e77bd546beaf3350] d.p.u.config.filter.LogFilter        : <<<< Response Status: 200
```

If we visit an uri that doesn't exist (like [http://localhost:8080/asdasd](http://localhost:8080/asdasd)), `LogFilter` will be the one that will let us know in the logs that this request ever happened.

```log
2025-04-17T13:31:48.742+01:00  INFO 32637 --- [users_manager] [nio-8080-exec-7] [90afb3fc373bfd83516e4f2349d3cd58-1b84c2268c83b23e] d.p.u.config.filter.LogFilter        : >>>> Method: GET; URI: /asdasd; QueryString: null; Headers: {host: localhost:8080, connection: keep-alive, sec-ch-ua: "Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135", sec-ch-ua-mobile: ?0, sec-ch-ua-platform: "Linux", dnt: 1, upgrade-insecure-requests: 1, user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36, accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7, sec-fetch-site: same-site, sec-fetch-mode: navigate, sec-fetch-user: ?1, sec-fetch-dest: document, accept-encoding: gzip, deflate, br, zstd, accept-language: es-AR,es-419;q=0.9,es;q=0.8,en;q=0.7,pt;q=0.6, cookie: Idea-f1d89c39=5112bd44-91f2-4b6c-8d18-4c172f6b483e, sec-gpc: 1}
2025-04-17T13:31:48.748+01:00  INFO 32637 --- [users_manager] [nio-8080-exec-7] [90afb3fc373bfd83516e4f2349d3cd58-1b84c2268c83b23e] d.p.u.config.filter.LogFilter        : <<<< Response Status: 404
```

Commit the progress so far.

```bash
git add .
git commit -m "logs"
```