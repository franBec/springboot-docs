---
sidebar_position: 4
---

# Spring Boot Folder Structure

## Packages & the Main Class Rule
Packages are Java’s way of grouping related classes (like folders).

**Critical Rule**: Your main class (annotated with `@SpringBootApplication`) defines the root package.

* All other packages you create must be subpackages of this root (e.g., if your main class is in `com.your.app`, create `com.your.app.controllers`, not `com.controllers`).
* **Why?** Spring Boot automatically scans classes in the root package and its subpackages. Classes outside won’t be detected unless explicitly configured.

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
* `pom.xml` (Maven) or `build.gradle` (Gradle): Defines dependencies and plugins. More about this in the Maven vs Gradle section).
* `test/`: Preconfigured for JUnit tests (More about this in the [Unit Testing section](/category/unit-testing)). It has a skeleton test class `DemoApplicationTests.java` verifies the app context loads.

## Organizing new code

How do we organize new code? There are three approaches…

### By Layer (Traditional)

```log
src/main/java/com.your.app  
├── controller  
│   ├── UserController.java  
│   └── ProductController.java  
├── service  
│   ├── UserService.java  
│   └── ProductService.java  
└── repository  
    ├── UserRepository.java  
    └── ProductRepository.java
```

* **Pros**: Simple for small projects. Easy to find all controllers/services at a glance.
* **Cons**: As the app grows, navigating between 10+ layers for a single feature (e.g., "User") becomes tedious.

### By Feature (Modern Approach)

```log
src/main/java/com.your.app  
├── user  
│   ├── UserController.java  
│   ├── UserService.java  
│   └── UserRepository.java  
└── product  
    ├── ProductController.java  
    ├── ProductService.java  
    └── ProductRepository.java
```

* **Pros**: All code for a feature lives in one place. Scales better. Encourages modularity.
* **Cons**: Risk of duplicating common logic (e.g., shared utilities).

### Hybrid Approach (Mix both)

```log
src/main/java/com.your.app  
├── shared          <-- Common utilities, exceptions, configs  
├── user            <-- Feature package (controller/service/repo inside)  
└── product
```

## Key Takeaways
* Even though **there’s no right answer**, every project I worked on followed the Traditional “by layer” approach.
* **Consistency > Perfection**: Agree with your team on a structure and stick to it. Refactor later if needed.
* **Don’t fight against defaults unless you have a specific reason**: Spring Boot relies on this hierarchy and any Spring developer can instantly navigate your project.