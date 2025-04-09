---
sidebar_position: 1
---

# Logs

Considerando que no nos importa imprimir información sensible (claves, contraseñas, etc.), me pareció útil loggear:

* Todo lo que llega.
* Todo lo que sale.

Para lograrlo vamos a usar:

* Un [Aspect](https://www.baeldung.com/spring-aop) que loggea antes y después de la ejecución de los métodos públicos de los controllers.
* [Micrometer](https://www.baeldung.com/micrometer) para enriquecer los logs.
* Una interfaz de [Filter](https://www.baeldung.com/spring-boot-add-filter) que loggea lo que no llega a los controllers.

## Aspect

Un aspect es una porción de código con una tarea específica —en este caso, loggear— que puede ejecutarse automáticamente en ciertos puntos de tu aplicación. Te permite separar comportamientos comunes de tu lógica de negocio principal, simplificando el código y haciéndolo más limpio.

1. Necesitamos la dependencia [aspectjtools](https://mvnrepository.com/artifact/org.aspectj/aspectjtools). En tu `build.gradle`, **agrega la dependencia** en la sección de `dependencies`:

   ```groovy
    implementation 'org.aspectj:aspectjtools:1.9.22.1'
    ```

2. En `src/main/java/dev/pollito/users_manager/aspect`, crea `LogAspect.java`.

   ```java
    package dev.pollito.users_manager.aspect;
    
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
    
      @Pointcut("execution(public * dev.pollito.users_manager.controller..*.*(..))")
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

Reconstruí la aplicación. Luego, andá a [http://localhost:8080/users](http://localhost:8080/users) y revisá los logs. Deberías ver algo como esto:

```log
2025-03-10T11:44:23.697Z  INFO 16164 --- [users_manager] [nio-8080-exec-1] d.p.users_manager.aspect.LogAspect       : [UserController.getUsers()] Args: []
2025-03-10T11:44:23.697Z  INFO 16164 --- [users_manager] [nio-8080-exec-1] d.p.users_manager.aspect.LogAspect       : [UserController.getUsers()] Response: [User(id=1, name=Leanne Graham, username=Bret, email=Sincere@april.biz)]
```

## ¿Qué significa la sugerencia de IntelliJ IDEA “insert ‘@NotNull’ on parameter”?

Si usás IntelliJ IDEA, notarás que en la clase que acabamos de crear te sugiere lo siguiente:

<div>
   <img src={require('@site/static/img/optional-but-recommended-features/notnull.png').default} alt="notnull" />
</div>

Esta anotación indica que el parámetro no debería ser nulo cuando se llame el método. Ayuda a prevenir `NullPointerException` y mejora la legibilidad y seguridad del código al especificar explícitamente que los valores nulos no están permitidos.

No es obligatorio agregar la anotación `@NotNull`, pero se recomienda encarecidamente:

* **Seguridad en el código**: Ayuda a prevenir NullPointerException al especificar explícitamente que el parámetro no debe ser nulo.
* **Legibilidad del código**: Hace que el código sea más legible y auto-documentado al indicar claramente que no se permiten valores nulos.
* **Análisis estático**: Herramientas como IntelliJ IDEA pueden utilizar esta anotación para ofrecer un mejor análisis estático, advertencias y sugerencias de código.

Al aceptar la sugerencia, se nos notificará sobre una nueva dependencia que se agregará. Simplemente aceptá.

<div>
   <img src={require('@site/static/img/optional-but-recommended-features/notnull-dependency.png').default} alt="notnull dependency" />
</div>

A veces el IDE se porta raro y no agrega la dependencia en la sección de dependencies del build.gradle. Revisá si podés encontrar lo siguiente:

```groovy
implementation 'org.jetbrains:annotations:26.0.2'
```

Si no está, agregala.

Reconstruí la aplicación. Luego, andá a [http://localhost:8080/users](http://localhost:8080/users) y revisá los logs. Todo debería funcionar igual que antes.

## Micrometer

Imaginá que esta aplicación tiene muchos endpoints y además muchos usuarios haciendo peticiones al mismo tiempo. ¿**Cómo vamos a poder asegurarnos de que qué logs están relacionados a la misma petición**, cuando todo sucede a la vez (o casi lo mismo para que se mezclen unos con otros)?

Micrometer enriquece tus logs adjuntando automáticamente información contextual. Esto significa que los logs incluirán detalles como [identificadores de trace y span](https://medium.com/dzerolabs/observability-journey-understanding-logs-events-traces-and-spans-836524d63172), ayudando a correlacionar mensajes de log con eventos y peticiones específicas a lo largo de tu aplicación.

Necesitamos las dependencias de micrometer. En tu `build.gradle`, **agrega las dependencias** en la sección de `dependencies`:

```groovy
implementation 'io.micrometer:micrometer-observation:1.14.4'
implementation 'io.micrometer:micrometer-tracing-bridge-otel:1.4.3'
```

Reconstruí la aplicación. Luego, andá a [http://localhost:8080/users](http://localhost:8080/users) y revisá los logs. Deberías ver algo como esto:

```log
2025-03-10T12:09:01.871Z  INFO 20224 --- [users_manager] [nio-8080-exec-3] [6eb73e82add143a3fb540ff6983c2c23-e93a7af466f261d4] d.p.users_manager.aspect.LogAspect       : [UserController.getUsers()] Args: []
2025-03-10T12:09:01.871Z  INFO 20224 --- [users_manager] [nio-8080-exec-3] [6eb73e82add143a3fb540ff6983c2c23-e93a7af466f261d4] d.p.users_manager.aspect.LogAspect       : [UserController.getUsers()] Response: [User(id=1, name=Leanne Graham, username=Bret, email=Sincere@april.biz)]
```

Ahora **cada log tiene un identificador único**. Si por alguna razón este proyecto interactuara con otros proyectos que también usen Micrometer, el identificador se propagará, haciendo que seguir las peticiones a través de diferentes servicios sea aún más fácil.

## Filter

Cuando hablamos de las capas de Spring Boot, usé este dibujo:

<div>
   <img src={require('@site/static/img/spring-boot-in-a-nutshell/layers.png').default} alt="layers" />
</div>

Pero ¿qué pasa si te digo que hay algo en la aplicación Spring Boot que va antes de la Capa de Presentación? Estos son los **Filters**.

<div>
   <img src={require('@site/static/img/optional-but-recommended-features/filters.png').default} alt="filters" />
</div>

Un Filter actúa como un punto de control para cada petición entrante y respuesta saliente, incluso antes de que lleguen a tus controllers o después de que se hayan ido. Pensalo como un portero que puede observar —y opcionalmente modificar— el flujo bruto de datos entre el cliente y tu aplicación.

Mientras que los aspects logean la actividad alrededor de métodos específicos del controller, **los filters operan a un nivel más bajo, interceptando todo el tráfico HTTP sin importar si eventualmente activa la lógica del controller o no**. Esto hace que los filters sean especialmente valiosos para loggear peticiones que jamás llegan a tu lógica de negocio.

Al integrar un filter de logs custom, te asegurás de que nada se escape en los logs:

* Cada petición entrante se marca con un timestamp, se inspecciona y se loggea en la "puerta de entrada", y cada respuesta saliente queda documentada en su camino.
* Esto provee un rastro de auditoría completo, incluso para casos extremos que no activan la lógica central de tu aplicación.

Creemos un log filter: En `src/main/java/dev/pollito/users_manager/filte`r, crea `LogFilter.java`.

```java
package dev.pollito.users_manager.filter;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class LogFilter implements Filter {

  @Override
  public void doFilter(
      ServletRequest servletRequest,
      ServletResponse servletResponse,
      @NotNull FilterChain filterChain)
      throws IOException, ServletException {
    logRequestDetails((HttpServletRequest) servletRequest);
    filterChain.doFilter(servletRequest, servletResponse);
    logResponseDetails((HttpServletResponse) servletResponse);
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

Reconstruí la aplicación. Luego, andá a [http://localhost:8080/users](http://localhost:8080/users) y revisá los logs. Deberías ver algo con una estructura similar a esta:

* `LogFilter` imprimiendo la información de la solicitud, como Método, URI, Headers.
* `LogAspect` imprimiendo el método del controller y sus argumentos.
* `LogAspect` imprimiendo el método del controller y la respuesta.
* `LogFilter` imprimiendo el estado de la respuesta.

```log
2025-03-14T12:29:36.131Z  INFO 27445 --- [users_manager] [nio-8080-exec-2] [ea1c95d66921506b9bfdf8c7d1b73765-d7cf4980f5c2d9da] d.p.users_manager.filter.LogFilter       : >>>> Method: GET; URI: /users; QueryString: null; Headers: {host: localhost:8080, connection: keep-alive, cache-control: max-age=0, sec-ch-ua: "Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134", sec-ch-ua-mobile: ?0, sec-ch-ua-platform: "Linux", upgrade-insecure-requests: 1, user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36, accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7, sec-fetch-site: cross-site, sec-fetch-mode: navigate, sec-fetch-user: ?1, sec-fetch-dest: document, accept-encoding: gzip, deflate, br, zstd, accept-language: es-ES,es;q=0.9,en;q=0.8}
2025-03-14T12:29:36.134Z  INFO 27445 --- [users_manager] [nio-8080-exec-2] [ea1c95d66921506b9bfdf8c7d1b73765-d7cf4980f5c2d9da] d.p.users_manager.aspect.LogAspect       : [UserController.getUsers()] Args: []
2025-03-14T12:29:36.135Z  INFO 27445 --- [users_manager] [nio-8080-exec-2] [ea1c95d66921506b9bfdf8c7d1b73765-d7cf4980f5c2d9da] d.p.users_manager.aspect.LogAspect       : [UserController.getUsers()] Response: [User(id=1, name=Leanne Graham, username=Bret, email=Sincere@april.biz)]
2025-03-14T12:29:36.138Z  INFO 27445 --- [users_manager] [nio-8080-exec-2] [ea1c95d66921506b9bfdf8c7d1b73765-d7cf4980f5c2d9da] d.p.users_manager.filter.LogFilter       : <<<< Response Status: 200
```

Si visitamos una URI que no exista (como [http://localhost:8080/asdasd](http://localhost:8080/asdasd)), será el LogFilter el que nos informe en los logs que esa petición sucedió.

```log
2025-03-14T12:53:52.443Z  INFO 30172 --- [users_manager] [nio-8080-exec-1] [29233a50dd093491acbeaf0fb8020f2a-e8a3e4ad035bfbac] d.p.users_manager.filter.LogFilter       : >>>> Method: GET; URI: /asdasd; QueryString: null; Headers: {host: localhost:8080, connection: keep-alive, sec-ch-ua: "Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134", sec-ch-ua-mobile: ?0, sec-ch-ua-platform: "Linux", upgrade-insecure-requests: 1, user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36, accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7, sec-fetch-site: cross-site, sec-fetch-mode: navigate, sec-fetch-user: ?1, sec-fetch-dest: document, accept-encoding: gzip, deflate, br, zstd, accept-language: es-ES,es;q=0.9,en;q=0.8}
2025-03-14T12:53:52.497Z  INFO 30172 --- [users_manager] [nio-8080-exec-1] [29233a50dd093491acbeaf0fb8020f2a-e8a3e4ad035bfbac] d.p.users_manager.filter.LogFilter       : <<<< Response Status: 404
```

Commiteá el progreso hasta ahora.

```bash
git add .
git commit -m "logs"
```