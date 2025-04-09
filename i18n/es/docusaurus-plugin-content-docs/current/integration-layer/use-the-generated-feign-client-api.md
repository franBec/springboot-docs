---
sidebar_position: 6
---

# Usa el API client Feign generado

En `src/main/java/dev/pollito/users_manager/service/impl/UserServiceImpl.java`, inyectá el `UserApi` generado y hacé una implementación aproximada. Hasta ahora el código debería verse más o menos así:

```java
package dev.pollito.users_manager.service.impl;

import com.typicode.jsonplaceholder.api.UserApi;
import dev.pollito.users_manager.model.User;
import dev.pollito.users_manager.model.Users;
import dev.pollito.users_manager.service.UserService;
import java.util.List;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserApi userApi;

  @Override
  public Users findAll(Integer pageNumber, Integer pageSize, List<String> pageSort, String q) {
    return new Users().content(userApi.getUsers());
  }

  @Override
  public User findById(Long id) {
    return userApi.getUsers().stream()
        .filter(user -> user.getId().equals(id.intValue()))
        .findFirst()
        .orElseThrow(NoSuchElementException::new);
  }
}
```

Tu IDE debería estar tirando dos errores:

```log
Required type: List <dev.pollito.users_manager.model.User>
Provided: List <com.typicode.jsonplaceholder.model.User>
```

```log
Required type: dev.pollito.users_manager.model.User
Provided: com.typicode.jsonplaceholder.model.User
```

Al revisar esos archivos, te das cuenta de que básicamente son muy parecidos:

<div>
  <img src={require('@site/static/img/integration-layer/users.png').default} alt="users" />
</div>

* El de la izquierda es `build/generated/sources/openapi/src/main/java/dev/pollito/users_manager/model/User.java`, generado por la tarea `openApiGenerate` del `build.gradle`.
* El de la derecha es `build/generated/sources/openapi/src/main/java/com/typicode/jsonplaceholder/model/User.java`, generado por la tarea `openApiGenerateFeign_jsonplaceholder` del `build.gradle`.

En efecto, no son la misma clase, pero ¿por qué tiene que ser así? ¿Qué podemos hacer ahora?

## Mantené separada la capa de integración API de la capa del controller

Imaginemos que no estuviéramos usando el [openapi-generator plugin](https://github.com/OpenAPITools/openapi-generator), y en su lugar estuviéramos escribiendo nuestros DTOs a mano. Acá te dejo una lista de razones por las que usar la misma clase para mapear la respuesta del Feign Client API y el retorno del `@RestController` es mala idea:

* Si usás el mismo DTO para ambos, cualquier cambio en el API externo (nuevos campos, campos deprecados, etc.) podría impactar innecesariamente tu código interno.
* Usar un DTO específico para el `@RestController` te permite filtrar y adaptar la respuesta para exponer solo lo que realmente se requiere.
    * Esto evita filtrar información sensible o irrelevante y ayuda a reducir el tamaño del payload, mejorando el rendimiento.
* Los DTOs del API externo a menudo necesitan mapear formatos o estructuras de datos que no son directamente útiles para tu aplicación.
    * Por ejemplo, un API de terceros podría devolver fechas como strings, pero internamente podés querer trabajar con LocalDate.

Al tener DTOs separados, la base de código se vuelve más fácil de testear y mantener. Los cambios en servicios externos no afectan directamente la funcionalidad central de tu aplicación.

## Mapstruct

Imaginá un proyecto grande con docenas de APIs y cientos de conversiones Schema -> DTO... Hacerlo manualmente puede generar mucho código repetitivo y consumir mucho tiempo. Por suerte, hay varios frameworks de mapeo de objetos para Java.

Los mappers son una [situación "elige tu propia aventura"](https://www.baeldung.com/java-performance-mapping-frameworks). El que recomiendo es [MapStruct](https://mapstruct.org/).

1. Necesitamos las dependencias [MapStruct Core](https://mvnrepository.com/artifact/org.mapstruct/mapstruct), [MapStruct Processor](https://mvnrepository.com/artifact/org.mapstruct/mapstruct-processor) y [Lombok Mapstruct Binding](https://mvnrepository.com/artifact/org.projectlombok/lombok-mapstruct-binding). En tu `build.gradle`, agregá las dependencias en la sección de `dependencies`:

    ```groovy
    implementation 'org.mapstruct:mapstruct:1.6.3'
    annotationProcessor 'org.mapstruct:mapstruct-processor:1.6.3'
    annotationProcessor 'org.projectlombok:lombok-mapstruct-binding:0.2.0'
    ```

2. En `src/main/java/dev/pollito/users_manager/mapper`, creá `UserMapper.java`, una interfaz anotada con `@Mapper` que mapea los usuarios de jsonplaceholder a nuestros propios usuarios (`dev.pollito.users_manager.model.User`).

    ```java
    package dev.pollito.users_manager.mapper;
    
    import static org.mapstruct.MappingConstants.ComponentModel.SPRING;
    
    import dev.pollito.users_manager.model.User;
    import java.util.List;
    import org.mapstruct.Mapper;
    
    @Mapper(componentModel = SPRING)
    public interface UserMapper {
      User map(com.typicode.jsonplaceholder.model.User user);
    
      List<User> map(List<com.typicode.jsonplaceholder.model.User> users);
    }
    ```

3. Inyectá `UserMapper` en `UserServiceImpl` y solucioná los errores. Hasta ahora el código debería verse algo así:

    ```java
    package dev.pollito.users_manager.service.impl;
    
    import com.typicode.jsonplaceholder.api.UserApi;
    import dev.pollito.users_manager.mapper.UserMapper;
    import dev.pollito.users_manager.model.User;
    import dev.pollito.users_manager.model.Users;
    import dev.pollito.users_manager.service.UserService;
    import java.util.List;
    import java.util.Objects;
    import lombok.RequiredArgsConstructor;
    import org.springframework.stereotype.Service;
    
    @Service
    @RequiredArgsConstructor
    public class UserServiceImpl implements UserService {
    
      private final UserApi userApi;
      private final UserMapper userMapper;
    
      @Override
      public Users findAll(Integer pageNumber, Integer pageSize, List<String> pageSort, String q) {
        return new Users().content(userMapper.map(userApi.getUsers()));
      }
    
      @Override
      public User findById(Long id) {
        return userMapper.map(
            userApi.getUsers().stream()
                .filter(u -> Objects.nonNull(u.getId()))
                .filter(u -> u.getId() == id.intValue())
                .findFirst()
                .orElseThrow());
      }
    }
    ```

Commiteá el progreso hasta ahora.

```bash
git add .
git commit -m "mapstruct"
```
