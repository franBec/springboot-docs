---
sidebar_position: 1
---

# MapStruct

Imagine a big project with few dozens APIs, and hundreds of Model -> DTO conversions... Doing this manually can quickly create much boilerplate code, be prone to error, and consume a lot of time. Luckily for us, there are multiple object mapping frameworks for Java.

Mappers are a [“choose your own adventure”](https://www.baeldung.com/java-performance-mapping-frameworks) situation. The one I recommend is [MapStruct](https://mapstruct.org/). Let's add it to the project

1. We need [MapStruct Core](https://mvnrepository.com/artifact/org.mapstruct/mapstruct), [MapStruct Processor](https://mvnrepository.com/artifact/org.mapstruct/mapstruct-processor), and [Lombok Mapstruct Binding](https://mvnrepository.com/artifact/org.projectlombok/lombok-mapstruct-binding) dependencies. Add them in the `build.gradle` dependencies section:

    ```groovy title="build.gradle"
    implementation 'org.mapstruct:mapstruct:1.6.3'
    annotationProcessor 'org.mapstruct:mapstruct-processor:1.6.3'
    annotationProcessor 'org.projectlombok:lombok-mapstruct-binding:0.2.0'
    ```

2. Rewrite `UserMapper` so it becomes an interface annotated by MapStruct.

   ```java title="src/main/java/dev/pollito/users_manager/adapter/in/rest/mapper/UserMapper.java"
   package dev.pollito.users_manager.adapter.in.rest.mapper;
   
   import static org.mapstruct.MappingConstants.ComponentModel.SPRING;
   
   import dev.pollito.users_manager.adapter.in.rest.dto.UserResponseDTO;
   import dev.pollito.users_manager.domain.model.User;
   import org.mapstruct.Mapper;
   
   @Mapper(componentModel = SPRING)
   public interface UserMapper {
     UserResponseDTO map(User u);
   }
   ```

Right-click the main class → Run. Then go to [http://localhost:8080/users](http://localhost:8080/users). Everything should be working as usual.

Don't forget to commit the progress so far.

```bash
git add .
git commit -m "mapstruct"
```