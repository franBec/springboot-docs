---
sidebar_position: 1
---

# MapStruct

Imaginá un proyecto grande con algunas docenas de APIs, y cientos de conversiones de Modelo → DTO... Hacer esto manualmente puede generar rápidamente mucho código boilerplate, ser propenso a errores y consumir mucho tiempo. Por suerte, hay múltiples frameworks de mapeo de objetos para Java.

Los mappers son una situación de [“elegí tu propia aventura”](https://www.baeldung.com/java-performance-mapping-frameworks). El que yo recomiendo es [MapStruct](https://mapstruct.org/). Vamos a agregarlo al proyecto.

1.  Necesitamos las dependencias de [MapStruct Core](https://mvnrepository.com/artifact/org.mapstruct/mapstruct), [MapStruct Processor](https://mvnrepository.com/artifact/org.mapstruct/mapstruct-processor) y [Lombok Mapstruct Binding](https://mvnrepository.com/artifact/org.projectlombok/lombok-mapstruct-binding). Agregalas en la sección de `dependencies` de `build.gradle`:

    ```groovy title="build.gradle"
    implementation 'org.mapstruct:mapstruct:1.6.3'
    annotationProcessor 'org.mapstruct:mapstruct-processor:1.6.3'
    annotationProcessor 'org.projectlombok:lombok-mapstruct-binding:0.2.0'
    ```

2.  Reescribí `UserMapper` para que se convierta en una interfaz anotada por MapStruct.

    ```java title="src/main/java/dev/pollito/users_manager/adapter/in/rest/mapper/UserMapper.java"
    package dev.pollito.users_manager.adapter.in.rest.mapper;

    import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

    import dev.pollito.users_manager.adapter.in.rest.dto.UserResponseDTO;
    import dev.pollito.users_manager.domain.model.User;
    import org.mapstruct.Mapper;

    @Mapper(componentModel = SPRING) // Indica que esta interfaz es un mapper de MapStruct, usando el modelo de componentes de Spring
    public interface UserMapper {
      UserResponseDTO map(User u); // Método de mapeo: convierte un objeto User a un UserResponseDTO
    }
    ```

Hacé clic derecho en la clase principal → Run. Luego andá a [http://localhost:8080/users](http://localhost:8080/users). Todo debería seguir funcionando como siempre.

Recordá commitear el progreso hasta ahora.

```bash
git add .
git commit -m "mapstruct"
```