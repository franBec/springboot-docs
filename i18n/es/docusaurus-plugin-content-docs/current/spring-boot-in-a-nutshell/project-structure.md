---
sidebar_position: 4
---

# Estructura del proyecto

Elegir una estructura de proyecto es como elegir el plano de una casa—dicta dónde "vive" tu código y cómo se relaciona con los vecinos.

Veamos cómo podemos agrupar clases relacionadas en Java y cuáles son los enfoques recomendados.

## Paquetes y la regla de la clase principal

Los paquetes son la forma en que Java agrupa clases (como carpetas).

**Regla crítica**: Tu clase principal (anotada con `@SpringBootApplication`) define el paquete raíz.

* Todos los demás paquetes que crees deben ser subpaquetes de esta raíz (por ejemplo, si tu clase principal está en `com.your.app`, creá `com.your.app.domain`, no `com.domain`).
* *¿Por qué?** Spring Boot escanea automáticamente las clases en el paquete raíz y sus subpaquetes. Las clases que estén afuera no serán detectadas a menos que se configuren explícitamente.
  * **Evitá luchar contra este valor por defecto a menos que sea necesario**: Spring Boot depende de esta jerarquía.

## Estructura de proyecto por defecto

Cuando generás un proyecto Spring Boot (más sobre cómo generar un proyecto en la [sección Spring Initializr](/lets-create-a-spring-boot-project/spring-initializr)), obtenés una estructura estándar de carpetas y archivos.

```log
your-project/  
├── src/  
│   ├── main/  
│   │   ├── java/  
│   │   │   └── com/example/demo/  
│   │   │       └── DemoApplication.java
│   │   └── resources/  
│   │       ├── static/
│   │       ├── templates/
│   │       └── application.properties (or application.yml)
│   └── test/  
│       └── java/com/example/demo/  
├── .gitignore
├── pom.xml (or build.gradle)
└── HELP.md
```

* `DemoApplication.java`: El punto de entrada de tu app. Anotado con `@SpringBootApplication` para habilitar la [autoconfiguración](https://docs.spring.io/spring-boot/reference/using/auto-configuration.html).
* `application.properties` (o `application.yml`): Archivo de configuración central para URLs de base de datos, puertos del servidor, logging, etc.
* `static/` y `templates/`, vacíos por defecto. Usados para assets web:
  * `static/`: Sirve imágenes, CSS, JS directamente.
  * `templates/`: HTML renderizado por el servidor (si usás [Thymeleaf](https://www.thymeleaf.org/), [Mustache](https://www.baeldung.com/spring-boot-mustache), etc.).
* `pom.xml` (Maven) o `build.gradle` (Gradle): Define dependencias y plugins.
* `test/`: Preconfigurado para tests JUnit (Más sobre esto en la [sección Unit Testing](/category/unit-testing)). Tiene una clase de test esqueleto `DemoApplicationTests.java` que verifica que el contexto de la app carga.

## Eligiendo una arquitectura

Hagamos un ejemplo de una aplicación simple que:

1. Expone un endpoint de API REST GET /users.
2. Obtiene información de usuario de una base de datos H2.
3. Complementa esos datos con información de una API externa a través de FeignClient.

Para este ejemplo, asumamos:

* Nuestra aplicación maneja usuarios.
* Información básica de usuario (id, nombre, email) se almacena en una base de datos H2.
* Detalles adicionales de usuario (foto de perfil, estado, etc.) se obtienen de una API externa.

### Siguiendo Clean Architecture

* Las dependencias siempre apuntan hacia adentro.
* El dominio es la capa más independiente, y cada capa externa depende de las internas.

_La carpeta `src/test` se omite por simplicidad._

```log
src/
└── main/
    ├── java/
    │   └── com/example/demo/                         // Paquete base
    │       ├── DemoApplication.java                  // Clase principal de la aplicación Spring Boot
    │       │
    │       ├── domain/                               // REGLAS DE NEGOCIO EMPRESARIALES
    │       │   ├── entity/
    │       │   │   └── User.java                     // Entidad principal del dominio
    │       │   └── repository/
    │       │       └── UserRepository.java           // Interfaz del repositorio
    │       │
    │       ├── application/                          // REGLAS DE NEGOCIO DE LA APLICACIÓN
    │       │   ├── dto/
    │       │   │   ├── UserDto.java                  // Objeto de transferencia de datos de la aplicación
    │       │   │   └── UserProfileDto.java           // DTO para datos de perfil
    │       │   ├── port/
    │       │   │   ├── input/
    │       │   │   │   └── UserService.java          // Interfaz del puerto de entrada
    │       │   │   └── output/
    │       │   │       └── ExternalUserProfileService.java  // Puerto de salida
    │       │   └── service/
    │       │       └── UserServiceImpl.java          // Implementación del caso de uso
    │       │
    │       ├── infrastructure/                       // ADAPTADORES DE INTERFAZ Y FRAMEWORKS/DRIVERS
    │       │   ├── persistence/
    │       │   │   ├── entity/
    │       │   │   │   └── UserEntity.java           // Entidad JPA (Framework)
    │       │   │   ├── repository/
    │       │   │   │   └── UserJpaRepository.java    // Repositorio de Spring Data (Framework)
    │       │   │   └── adapter/
    │       │   │       └── UserRepositoryAdapter.java // Adaptador de BD (Adaptador de interfaz)
    │       │   ├── external/
    │       │   │   ├── client/
    │       │   │   │   └── ExternalUserProfileClient.java  // Cliente Feign (Framework)
    │       │   │   ├── dto/
    │       │   │   │   └── ExternalUserProfileDto.java     // DTO de API externa (Adaptador de interfaz)
    │       │   │   └── adapter/
    │       │   │       └── ExternalUserProfileAdapter.java // Adaptador de API (Adaptador de interfaz)
    │       │   └── config/
    │       │       └── FeignClientConfig.java        // Clase de configuración (Framework)
    │       │
    │       └── presentation/                         // ADAPTADORES DE INTERFAZ
    │           ├── rest/
    │           │   └── UserController.java           // Controlador REST
    │           └── dto/
    │               └── UserResponse.java             // DTO de respuesta HTTP
    │
    └── resources/                                    // FRAMEWORKS Y DRIVERS
        └── application.properties                    // Configuración de la aplicación
```

<div>
  <img src={require('@site/static/img/spring-boot-in-a-nutshell/clean-arch-folder-structure.png').default} alt="estructura de carpetas de arquitectura limpia" />
</div>

### Siguiendo Hexagonal Architecture

* Actores externos interactuando con la aplicación (lado del driver).
* Núcleo de dominio implementando la lógica de negocio.
* Servicios externos usados por la aplicación (lado del driven).
* Los puertos (interfaces) aseguran un acoplamiento bajo entre estas capas, haciendo la aplicación más mantenible y testeable.

_La carpeta `src/test` se omite por simplicidad._

```log
src/
└── main/
    ├── java/
    │   └── com/example/demo/
    │       │── UserManagementApplication.java  // Punto de entrada de la aplicación Spring Boot
    │       │
    │       ├── domain/
    │       │   ├── model/
    │       │   │   ├── User.java                  // Entidad principal del dominio representando al usuario
    │       │   │   └── UserDetails.java           // Objeto de valor para detalles adicionales del usuario
    │       │   ├── port/
    │       │   │   ├── in/
    │       │   │   │   └── UserService.java       // Puerto primario que define las operaciones de usuario
    │       │   │   └── out/
    │       │   │       ├── UserRepository.java    // Puerto secundario para operaciones de base de datos
    │       │   │       └── UserDetailsProvider.java // Puerto secundario para operaciones de API externa
    │       │   └── service/
    │       │       └── UserServiceImpl.java       // Implementación de UserService (lógica del dominio)
    │       │
    │       ├── adapter/
    │       │   ├── in/
    │       │   │   └── rest/
    │       │   │       ├── UserController.java    // Controlador REST que adapta peticiones HTTP
    │       │   │       ├── dto/
    │       │   │       │   └── UserResponseDTO.java // DTO para respuestas de API
    │       │   │       └── mapper/
    │       │   │           └── UserMapper.java    // Mapea entre modelos de dominio y DTOs
    │       │   └── out/
    │       │       ├── jpa/
    │       │       │   ├── entity/
    │       │       │   │   └── UserEntity.java    // Entidad JPA para operaciones de base de datos
    │       │       │   ├── repository/
    │       │       │   │   └── SpringDataUserRepository.java // Repositorio de Spring Data JPA
    │       │       │   ├── mapper/
    │       │       │   │   └── UserEntityMapper.java // Mapea entre el usuario del dominio y UserEntity
    │       │       │   └── UserRepositoryAdapter.java // Implementa UserRepository usando Spring Data
    │       │       └── rest/
    │       │           ├── client/
    │       │           │   └── UserDetailsClient.java // FeignClient para API externa
    │       │           ├── dto/
    │       │           │   └── ExternalUserDetailsDTO.java // DTO para respuestas de API externa
    │       │           ├── mapper/
    │       │           │   └── UserDetailsMapper.java // Mapea entre el DTO externo y el modelo de dominio
    │       │           └── UserDetailsProviderAdapter.java // Implementa UserDetailsProvider usando FeignClient
    │       │
    │       └── config/
    │           ├── DatabaseConfig.java         // Configuración de base de datos H2
    │           └── FeignClientConfig.java      // Configuración de FeignClient
    │
    └── resources/
        └── application.properties              // Propiedades de configuración de la aplicación
```

<div>
  <img src={require('@site/static/img/spring-boot-in-a-nutshell/hexagonal-arch-folder-structure.png').default} alt="estructura de carpetas de arquitectura hexagonal" />
</div>

## ¿Es obligatorio seguir una arquitectura?

No. **Spring no impone nombres ni capas**. Podrías escribir todo en una sola clase. Pero estas convenciones resuelven el **problema de la legibilidad**: los desarrolladores entienden instantáneamente una clase por su nombre.

### Recomendaciones personales

Siento que la **Arquitectura Hexagonal facilita la comprensión de la codificación** (o al menos es la que me hizo clic rápido). Dicho eso, no la sigo palabra por palabra, y eso está bien.

* **Nadie sigue realmente una arquitectura al detalle**: Cada lugar donde trabajé intentó seguir Clean Architecture, pero se desvió en algún punto a mitad del desarrollo y ahora es cualquier cosa.
* **Está bien flexibilizar las reglas**: Proyectos pequeños podrían combinar capas.
* **Consistencia > perfección**: Acordate con tu equipo en una estructura y seguila. Refactorizá más tarde si es necesario.
  * Si tu equipo usa términos diferentes (por ejemplo, `DataManager` en lugar de `Repository`), la consistencia importa más que el nombre en sí.