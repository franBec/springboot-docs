---
sidebar_position: 5
---

# Creando Tu Primer Endpoint

Finalmente, manos a la obra. Vamos a crear un endpoint simple que retorne un usuario: cuando visitemos [http://localhost:8080/users](http://localhost:8080/users), deberíamos ver algo como esto:

<div>
  <img src={require('@site/static/img/lets-create-a-spring-boot-project/users.png').default} alt="users" />
</div>

## Paso 0: Inicializar Git

```bash
git init
git add .
git commit -m "Initial commit"
```

## Paso 1: Agregar un Formateador (Spotless)

* En tu `build.gradle`, **agrega el plugin** en la sección de plugins (usualmente al inicio del archivo):

    ```groovy
    id 'com.diffplug.spotless' version '6.25.0'
    ```

* **Configura** Spotless al final de `build.gradle`; lo siguiente es mi preferencia personal:

    ```groovy
    spotless {
        java {
            target 'src/*/java/**/*.java'
            googleJavaFormat()
            removeUnusedImports()
            cleanthat()
            formatAnnotations()
        }
        groovyGradle {
            target '*.gradle'
            greclipse()
        }
    }
    ```
    Para más información sobre las configuraciones, consultá el [repositorio de Spotless en GitHub](https://github.com/diffplug/spotless).

* **Auto-formatear en cada build**, agregando una nueva tarea:

    ```groovy
    tasks.named("build") {
        dependsOn 'spotlessApply'
        dependsOn 'spotlessGroovyGradleApply'
    }
    ```

* Ahora que ya está todo listo, **ejecutá la tarea Build**.
* Guardá los cambios realizados hasta ahora:

    ```bash
    git add .
    git commit -m "spotless"
    ```

## Paso 2: Crear el Modelo de Usuario

Un modelo es un plano para tus datos — define la estructura de la información que maneja tu aplicación. En este caso, un Usuario con id, nombre, username y email.

En `src/main/java/com/dev/pollito/users_manager/model`, creá `User.java`.

```java
package dev.pollito.users_manager.model;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
  Long id;
  String name;
  String username;
  String email;
}
```

* Encontré que esta carpeta "model" suele ubicarse junto con las carpetas `controller`, `service`, `utils` o incluso se llama `dto` (haciendo referencia al [patrón DTO](https://www.baeldung.com/java-dto-pattern)).
  * No te preocupes demasiado por esto; más adelante encontraremos la forma de generar automáticamente este tipo de clases, y no tendremos que escribirlas (a menos que sea necesario).
* **Utilizaremos Lombok para evitar código boilerplate**. Lombok genera de manera automática el código repetitivo de Java en tiempo de compilación.
  * Si tu IDE no tiene instalado el plugin de Lombok, verás errores de compilación. Revisá [Optimizing IntelliJ IDEA With Plugins](/lets-create-a-spring-boot-project/lets-talk-about-ides#optimizando-intellij-idea-con-plugins) para saber cómo agregar el plugin de Lombok.

## Paso 3: Crear el UserService

### Crear la Interfaz

En `src/main/java/dev/pollito/users_manager/service`, creá `UserService.java`.

```java
package dev.pollito.users_manager.service;

import dev.pollito.users_manager.model.User;
import java.util.List;

public interface UserService {
  List<User> getUsers();
}
```

### Crear la Implementación

En `src/main/java/dev/pollito/users_manager/service/impl`, creá `UserServiceImpl.java`.

```java
package dev.pollito.users_manager.service.impl;

import dev.pollito.users_manager.model.User;
import dev.pollito.users_manager.service.UserService;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  private static final User USER_1 =
      User.builder()
          .id(1L)
          .name("Leanne Graham")
          .username("Bret")
          .email("Sincere@april.biz")
          .build();

  @Override
  public List<User> getUsers() {
    return List.of(USER_1);
  }
}
```

* Por el momento vamos a retornar un usuario "hardcodeado".
* `@Service` le dice a Spring: "Acá tenés una implementación de `UserService`".
* `@Override` indica que el método `public List<User> getUsers()` cumple con el "contrato" de la interfaz.

## Paso 4: Crear el UserController

En `src/main/java/dev/pollito/users_manager/controller`, creá `UserController.java`.

```java
package dev.pollito.users_manager.controller;

import dev.pollito.users_manager.model.User;
import dev.pollito.users_manager.service.UserService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;

  @GetMapping("/users")
  public List<User> getUsers() {
    return userService.getUsers();
  }
}
```

Notá que declaramos la interfaz `UserService`, y no la implementación `UserServiceImpl`.

* El Controller no le importa cómo funciona `UserService`—solo quiere la lista de usuarios.
* Spring Boot buscará implementaciones de `UserService`, encontrará solo una (`UserServiceImpl.java`), y llamará al método `getUsers()`.

## Ejecutá la Aplicación

Hacé clic derecho en la clase principal → Run. Luego andá a [http://localhost:8080/users](http://localhost:8080/users).

<div>
    <img src={require('@site/static/img/lets-create-a-spring-boot-project/users.png').default} alt="users" />
</div>

¡Felicidades! Tu app con Spring Boot está en marcha, corriendo y exponiendo un endpoint. Commiteá el progreso realizado hasta el momento.

```bash
git add .
git commit -m "/users returns hardcoded user"
```