---
sidebar_position: 2
---

# Logs

Considerando que no nos importa imprimir información sensible (claves, contraseñas, etc.), me resultó útil loggear:

* Todo lo que entra.
* Todo lo que sale.

Para lograr eso, vamos a usar:

* Un [Aspect](https://www.baeldung.com/spring-aop) que loguea antes y después de la ejecución de métodos públicos de los controladores.
* [Micrometer](https://www.baeldung.com/micrometer) para mejorar los logs.
* Una interfaz [Filter](https://www.baeldung.com/spring-boot-add-filter) que loguea cosas que no llegan a los controladores.

## Aspect

Un aspect es una pieza de código con una tarea específica —en este caso, loguear— que puede ejecutarse automáticamente en ciertos puntos de tu aplicación. Te permite separar comportamientos comunes de tu lógica de negocio principal, lo que simplifica el código y lo mantiene más limpio.

1.  Necesitamos la dependencia [aspectjtools](https://mvnrepository.com/artifact/org.aspectj/aspectjtools). Agregala en la sección de `dependencies` de `build.gradle`:

    ```groovy title="build.gradle"
    implementation 'org.aspectj:aspectjtools:1.9.22.1'
    ```

2.  Creá `LogAspect.java`.

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

* Las clases `@Aspect` no tienen un lugar claro en la Arquitectura Hexagonal. Podés encontrarlas en `/config` para indicar que es una preocupación transversal.

Reconstruí la aplicación. Luego andá a [http://localhost:8080/users](http://localhost:8080/users) y chequeá los logs. Deberías encontrar algo así:

```log
2025-04-16T23:33:45.851+01:00  INFO 108782 --- [users_manager] [nio-8080-exec-1] d.p.u.config.aspect.LogAspect            : [UserController.findAll()] Args: []
2025-04-16T23:33:45.858+01:00  INFO 108782 --- [users_manager] [nio-8080-exec-1] d.p.u.config.aspect.LogAspect            : [UserController.findAll()] Response: <200 OK OK,[UserResponseDTO(id=1, name=Leanne Graham, username=Bret, email=Sincere@april.biz)],[]>
```

## ¿Qué significa la sugerencia de IntelliJ IDEA "Insert ‘@NotNull’ on parameter"?

Si usas IntelliJ IDEA, te darías cuenta de que en la clase que acabamos de crear, te sugiere lo siguiente:

<div>
  <img src={require('@site/static/img/optional-but-recommended-features/notnull.png').default} alt="sugerencia de @NotNull" />
</div>

Esta anotación indica que el parámetro no debe ser nulo cuando se llama al método. Ayuda a evitar `NullPointerException` y mejora la legibilidad y seguridad del código al especificar explícitamente que no se permiten valores nulos.

No es obligatorio agregar la anotación `@NotNull`, pero es muy recomendado:

* **Seguridad del código**: Ayuda a prevenir `NullPointerException` al especificar explícitamente que el parámetro no debe ser nulo.
* **Legibilidad del código**: Hace que el código sea más legible y auto-documentado al indicar claramente que no se permiten valores nulos.
* **Análisis estático**: Herramientas como IntelliJ IDEA pueden usar esta anotación para proporcionar un mejor análisis estático, advertencias y sugerencias de código.

Al aceptar la sugerencia, se nos va a notificar sobre la adición de una nueva dependencia. Aceptá.

<div>
  <img src={require('@site/static/img/optional-but-recommended-features/notnull-dependency.png').default} alt="dependencia de @NotNull" />
</div>

A veces el IDE se comporta raro y no agrega la dependencia en `build.gradle`. Andá a chequear si encontrás lo siguiente:

```groovy title="build.gradle"
implementation 'org.jetbrains:annotations:26.0.2'
```

Si no, agregala.

Reconstruí la aplicación. Luego andá a [http://localhost:8080/users](http://localhost:8080/users) y chequeá los logs. Todo debería funcionar exactamente igual que antes.

## Micrometer

Imaginá que esta aplicación tiene muchos endpoints y también tiene muchas peticiones al mismo tiempo. **¿Cómo nos vamos a asegurar de qué logs están relacionados con la misma petición**, cuando todo está pasando al mismo tiempo (o lo suficientemente cerca como para mezclarse)?

**Micrometer** enriquece tus logs adjuntando automáticamente información contextual. Esto significa que los logs incluyen detalles como [identificadores de trace y span](https://medium.com/dzerolabs/observability-journey-understanding-logs-events-traces-and-spans-836524d63172), ayudando a correlacionar mensajes de log con eventos y peticiones específicas a lo largo de tu aplicación.

Necesitamos estas dependencias:

*   [Micrometer Observation](https://mvnrepository.com/artifact/io.micrometer/micrometer-observation): te permite medir y rastrear varios aspectos del rendimiento de tu aplicación de manera estandarizada.
*   [Micrometer Tracing Bridge OTel](https://mvnrepository.com/artifact/io.micrometer/micrometer-tracing-bridge-otel): Este es un "puente" que habilita el distributed tracing (rastreo distribuido) usando el estándar [OpenTelemetry (OTEL)](https://opentelemetry.io/).

Agregalas en la sección de `dependencies` de `build.gradle`:

```groovy title="build.gradle"
implementation 'io.micrometer:micrometer-observation:1.14.4'
implementation 'io.micrometer:micrometer-tracing-bridge-otel:1.4.3'
```

Reconstruí la aplicación. Luego andá a [http://localhost:8080/users](http://localhost:8080/users) y chequeá los logs. Deberías encontrar algo así:

```log
2025-04-16T23:53:52.082+01:00  INFO 112231 --- [users_manager] [nio-8080-exec-1] [e508c97bff061f8daabd16aee85498c7-d654b43da989fdb1] d.p.u.config.aspect.LogAspect            : [UserController.findAll()] Args: []
2025-04-16T23:53:52.089+01:00  INFO 112231 --- [users_manager] [nio-8080-exec-1] [e508c97bff061f8daabd16aee85498c7-d654b43da989fdb1] d.p.u.config.aspect.LogAspect            : [UserController.findAll()] Response: <200 OK OK,[UserResponseDTO(id=1, name=Leanne Graham, username=Bret, email=Sincere@april.biz)],[]>
```

## Filter

¿Y si te digo que hay algo en la App Spring Boot que va antes del Primary Adapter? Estos son los **Filters**.

<div>
  <img src={require('@site/static/img/optional-but-recommended-features/filters.png').default} alt="diagrama de filters" />
</div>

_Los Filters se omiten de los diagramas cuando se habla de Arquitectura Hexagonal ya que agregan complejidad. Sabé que siempre están ahí, pero se dejan afuera para simplificar._

Un Filter actúa como un puesto de control para cada petición entrante y respuesta saliente, incluso antes de que lleguen a tus Primary Adapters o después de que se van.

* Pensalo como un portero que puede observar —y opcionalmente modificar— el flujo de datos crudo entre el cliente y tu aplicación.
* Los Filters operan a un nivel más bajo, interceptando todo el tráfico HTTP sin importar si finalmente desencadena lógica de controlador.

Al integrar un filter, te asegurás de que nada se escape en tus logs:

* Cada petición entrante es marcada con fecha y hora, inspeccionada y logueada en la "puerta principal", y cada respuesta saliente es documentada en su camino de salida.
* Esto proporciona un registro completo, incluso para casos extremos que no llegan a ninguno de los Primary Adapters.

Las clases Filter en la Arquitectura Hexagonal tienen sentido que estén en la carpeta `/adapter/in`. Sin embargo, podés encontrarlas en `/config` para indicar que es una preocupación transversal.

Creemos `LogFilter.java`.

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

Reconstruí la aplicación. Luego andá a [http://localhost:8080/users](http://localhost:8080/users) y chequeá los logs. Deberías encontrar algo que se parezca a esta estructura:

1. `LogFilter` imprimiendo la información de la petición como Método, URI, Headers.
2. `LogAspect` imprimiendo el método del controlador y los argumentos.
3. `LogAspect` imprimiendo el método del controlador y la respuesta.
4. `LogFilter` imprimiendo el estado de la respuesta.

```log
2025-04-17T13:30:12.767+01:00  INFO 32637 --- [users_manager] [nio-8080-exec-5] [fa95bea514835a03b3bbd669b9a9b3dd-e77bd546beaf3350] d.p.u.config.filter.LogFilter        : >>>> Method: GET; URI: /users; QueryString: null; Headers: {host: localhost:8080, connection: keep-alive, sec-ch-ua: "Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135", sec-ch-ua-mobile: ?0, sec-ch-ua-platform: "Linux", dnt: 1, upgrade-insecure-requests: 1, user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36, accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7, sec-fetch-site: none, sec-fetch-mode: navigate, sec-fetch-user: ?1, sec-fetch-dest: document, accept-encoding: gzip, deflate, br, zstd, accept-language: es-AR,es-419;q=0.9,es;q=0.8,en;q=0.7,pt;q=0.6, cookie: Idea-f1d89c39=5112bd44-91f2-4b6c-8d18-4c172f6b483e, sec-gpc: 1}
2025-04-17T13:30:12.768+01:00  INFO 32637 --- [users_manager] [nio-8080-exec-5] [fa95bea514835a03b3bbd669b9a9b3dd-e77bd546beaf3350] d.p.u.config.aspect.LogAspect            : [UserController.findAll()] Args: []
2025-04-17T13:30:12.769+01:00  INFO 32637 --- [users_manager] [nio-8080-exec-5] [fa95bea514835a03b3bbd669b9a9b3dd-e77bd546beaf3350] d.p.u.config.aspect.LogAspect            : [UserController.findAll()] Response: <200 OK OK,[UserResponseDTO(id=1, name=Leanne Graham, username=Bret, email=Sincere@april.biz)],[]>
2025-04-17T13:30:12.772+01:00  INFO 32637 --- [users_manager] [nio-8080-exec-5] [fa95bea514835a03b3bbd669b9a9b3dd-e77bd546beaf3350] d.p.u.config.filter.LogFilter        : <<<< Response Status: 200
```

Si visitamos una uri que no existe (como [http://localhost:8080/asdasd](http://localhost:8080/asdasd)), `LogFilter` será el que nos avisará en los logs que esa petición ocurrió.

```log
2025-04-17T13:31:48.742+01:00  INFO 32637 --- [users_manager] [nio-8080-exec-7] [90afb3fc373bfd83516e4f2349d3cd58-1b84c2268c83b23e] d.p.u.config.filter.LogFilter        : >>>> Method: GET; URI: /asdasd; QueryString: null; Headers: {host: localhost:8080, connection: keep-alive, sec-ch-ua: "Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135", sec-ch-ua-mobile: ?0, sec-ch-ua-platform: "Linux", dnt: 1, upgrade-insecure-requests: 1, user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36, accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7, sec-fetch-site: same-site, sec-fetch-mode: navigate, sec-fetch-user: ?1, sec-fetch-dest: document, accept-encoding: gzip, deflate, br, zstd, accept-language: es-AR,es-419;q=0.9,es;q=0.8,en;q=0.7,pt;q=0.6, cookie: Idea-f1d89c39=5112bd44-91f2-4b6c-8d18-4c172f6b483e, sec-gpc: 1}
2025-04-17T13:31:48.748+01:00  INFO 32637 --- [users_manager] [nio-8080-exec-7] [90afb3fc373bfd83516e4f2349d3cd58-1b84c2268c83b23e] d.p.u.config.filter.LogFilter        : <<<< Response Status: 404
```

Commiteá el progreso hasta ahora.

```bash
git add .
git commit -m "logs"
```