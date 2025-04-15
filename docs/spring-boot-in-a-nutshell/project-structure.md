---
sidebar_position: 3
---

# Project Structure

Choosing a project structure is like picking a house blueprint - it dictates where your code "lives" and how it socializes with neighbors.

Let's check how we can group related classes in Java and what are the recommended approaches.

## Packages & the main Class Rule

Packages are Java’s way of grouping classes (like folders).

**Critical Rule**: Your main class (annotated with `@SpringBootApplication`) defines the root package.

* All other packages you create must be subpackages of this root (e.g., if your main class is in `com.your.app`, create `com.your.app.domain`, not `com.domain`).
* **Why?** Spring Boot automatically scans classes in the root package and its subpackages. Classes outside won’t be detected unless explicitly configured.
  * **Avoid fighting against this default unless necessary**: Spring Boot relies on this hierarchy.

## Default Project Structure

When you generate a Spring Boot project (more on how to generate a project in the [Spring Initializr section](/lets-create-a-spring-boot-project/spring-initializr)), you get a standardized folder and file structure.

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

* `DemoApplication.java`: The entry point of your app. Annotated with `@SpringBootApplication` to enable [autoconfiguration](https://docs.spring.io/spring-boot/reference/using/auto-configuration.html).
* `application.properties` (or `application.yml`): Central configuration file for database URLs, server ports, logging, etc.
* `static/` and `templates/`, empty by default. Used for web assets:
    * `static/`: Serve images, CSS, JS directly.
    * `templates/`: Server-rendered HTML (if using [Thymeleaf](https://www.thymeleaf.org/), [Mustache](https://www.baeldung.com/spring-boot-mustache), etc.).
* `pom.xml` (Maven) or `build.gradle` (Gradle): Defines dependencies and plugins.
* `test/`: Preconfigured for JUnit tests (More about this in the [Unit Testing section](/category/unit-testing)). It has a skeleton test class `DemoApplicationTests.java` that verifies the app context loads.

## Picking an Architecture

Let's do an example of a simple application that:

1. Exposes a GET /users REST API endpoint.
2. Gets user information from an H2 database.
3. Supplements that data with information from an external API via FeignClient.

For this example, let's assume:
- Our application manages users.
- Basic user info (id, name, email) is stored in the H2 database.
- Additional user details (profile picture, status, etc.) are fetched from an external API.

### Follow Clean Architecture

- Dependencies always point inward.
- The domain being the most independent layer and each outer layer depending on the inner ones.

```log
src/
└── main/
    ├── java/
    │   └── com/example/demo/                         // Base package
    │       ├── DemoApplication.java                  // Spring Boot main application class
    │       │
    │       ├── domain/                               // ENTERPRISE BUSINESS RULES
    │       │   ├── entity/
    │       │   │   └── User.java                     // Core domain entity
    │       │   └── repository/
    │       │       └── UserRepository.java           // Repository interface
    │       │
    │       ├── application/                          // APPLICATION BUSINESS RULES
    │       │   ├── dto/
    │       │   │   ├── UserDto.java                  // Application data transfer object
    │       │   │   └── UserProfileDto.java           // Profile data DTO
    │       │   ├── port/
    │       │   │   ├── input/
    │       │   │   │   └── UserService.java          // Input port interface
    │       │   │   └── output/
    │       │   │       └── ExternalUserProfileService.java  // Output port
    │       │   └── service/
    │       │       └── UserServiceImpl.java          // Use case implementation
    │       │
    │       ├── infrastructure/                       // INTERFACE ADAPTERS & FRAMEWORKS/DRIVERS
    │       │   ├── persistence/
    │       │   │   ├── entity/
    │       │   │   │   └── UserEntity.java           // JPA entity (Framework)
    │       │   │   ├── repository/
    │       │   │   │   └── UserJpaRepository.java    // Spring Data repo (Framework)
    │       │   │   └── adapter/
    │       │   │       └── UserRepositoryAdapter.java // DB adapter (Interface Adapter)
    │       │   ├── external/
    │       │   │   ├── client/
    │       │   │   │   └── ExternalUserProfileClient.java  // Feign client (Framework)
    │       │   │   ├── dto/
    │       │   │   │   └── ExternalUserProfileDto.java     // External API DTO (Interface Adapter)
    │       │   │   └── adapter/
    │       │   │       └── ExternalUserProfileAdapter.java // API adapter (Interface Adapter)
    │       │   └── config/
    │       │       └── FeignClientConfig.java        // Config class (Framework)
    │       │
    │       └── presentation/                         // INTERFACE ADAPTERS
    │           ├── rest/
    │           │   └── UserController.java           // REST controller
    │           └── dto/
    │               └── UserResponse.java             // HTTP response DTO
    │
    └── resources/                                    // FRAMEWORKS & DRIVERS
        └── application.properties                    // Application configuration
```

<div>
  <img src={require('@site/static/img/spring-boot-in-a-nutshell/clean-arch-folder-structure.png').default} alt="clean arch folder structure" />
</div>

### Follow Hexagonal Architecture

* External actors interacting with the application (driver side).
* Domain core implementing business logic.
* External services used by the application (driven side).
* The ports (interfaces) ensure loose coupling between these layers, making the application more maintainable and testable.

```log
src/
└── main/
    ├── java/
    │   └── com/example/demo/
    │       │── UserManagementApplication.java  // Spring Boot application entry point
    │       │
    │       ├── domain/
    │       │   ├── model/
    │       │   │   ├── User.java                  // Core domain entity representing user
    │       │   │   └── UserDetails.java           // Value object for additional user details
    │       │   ├── port/
    │       │   │   ├── in/
    │       │   │   │   └── UserService.java       // Primary port defining user operations
    │       │   │   └── out/
    │       │   │       ├── UserRepository.java    // Secondary port for database operations
    │       │   │       └── UserDetailsProvider.java // Secondary port for external API operations
    │       │   └── service/
    │       │       └── UserServiceImpl.java       // Implementation of UserService (domain logic)
    │       │
    │       ├── adapter/
    │       │   ├── in/
    │       │   │   └── web/
    │       │   │       ├── UserController.java    // REST controller adapting HTTP requests
    │       │   │       └── dto/
    │       │   │           ├── UserResponseDTO.java // DTO for API responses
    │       │   │           └── UserMapper.java    // Maps between domain models and DTOs
    │       │   └── out/
    │       │       ├── persistence/
    │       │       │   ├── entity/
    │       │       │   │   └── UserEntity.java    // JPA entity for database operations
    │       │       │   ├── repository/
    │       │       │   │   └── SpringDataUserRepository.java // Spring Data JPA repository
    │       │       │   ├── mapper/
    │       │       │   │   └── UserEntityMapper.java // Maps between domain User and UserEntity
    │       │       │   └── UserRepositoryAdapter.java // Implements UserRepository using Spring Data
    │       │       └── externalapi/
    │       │           ├── client/
    │       │           │   └── UserDetailsClient.java // FeignClient for external API
    │       │           ├── dto/
    │       │           │   └── ExternalUserDetailsDTO.java // DTO for external API responses
    │       │           ├── mapper/
    │       │           │   └── UserDetailsMapper.java // Maps between external DTO and domain model
    │       │           └── UserDetailsProviderAdapter.java // Implements UserDetailsProvider using FeignClient
    │       │
    │       └── config/
    │           ├── DatabaseConfig.java         // H2 database configuration
    │           └── FeignClientConfig.java      // FeignClient configuration
    │
    └── resources/
        └── application.properties              // Application configuration properties
```

<div>
  <img src={require('@site/static/img/spring-boot-in-a-nutshell/hexagonal-arch-folder-structure.png').default} alt="hexagonal arch folder structure" />
</div>

## Is Mandatory to Follow an Architecture?

No. **Spring doesn’t enforce names or layers**. You could write everything in a single class. But these conventions solve the **readability problem** : Developers instantly understand a class by its name.

### When to Bend the Rules

* Small projects might combine layers.
* **Consistency > Perfection**: Agree with your team on a structure and stick to it. Refactor later if needed.
  * If your team uses different terms (e.g., `DataManager` instead of `Repository`), consistency matters more than the name itself.