---
sidebar_position: 3
---

# Annotations

Annotations are Spring’s way of letting you **tag** your code with instructions like "Hey Spring, manage this class!" or "Inject that dependency here!" They replaced XML’s wall-of-text configuration with code-friendly metadata.

## Why Annotations?

* **Before annotations**, you had to repeat class names, dependencies, and configurations in a separate file. One typo and the project doesn't start.

    ```xml title="beans.xml"
    <bean id="userService" class="com.example.UserService">
        <property name="userRepository" ref="userRepository"/>
    </bean>
    ```

* **With annotations**, Spring reads them to autoconfigure your app.

    ```java
    @Service
    @RequiredArgConstructor
    public class UserService {
        private final UserRepository userRepository;
    }
    ```

## The Essential Annotation Toolkit

### Bean Definition

| Annotation        | Meaning                                                    | Use Case                                     |
|-------------------|------------------------------------------------------------|----------------------------------------------|
| `@Component`      | "Spring, manage this class!"                               | Generic beans                                |
| `@Service`        | "Business logic here!"                                     | Service-layer classes                        |
| `@Repository`     | "Database interactions here!"                              | DAOs/DB classes (adds exception translation) |
| `@RestController` | "API endpoint!" (Combines `@Controller` + `@ResponseBody`) | REST APIs                                    |

### Dependency Injection

| Annotation     | Meaning                          | Example                          |
|----------------|----------------------------------|----------------------------------|
| `@Autowired`   | "Inject a bean here!"            | Constructor/field/setter         |
| `@Primary`     | "Choose me first!"               | Resolve ambiguous bean conflicts |
| `@Qualifier`   | "Inject THIS specific bean"      | `@Qualifier("mysqlDb")`          |

### Configuration

| Annotation       | Meaning                        | Example                           |
|------------------|--------------------------------|-----------------------------------|
| `@Configuration` | "This class configures beans!" | Setup database/3rd-party libs     |
| `@Bean`          | "Here’s a bean to manage!"     | Methods returning complex objects |
| `@Value`         | "Inject a property value!"     | `@Value("${api.key}")`            |

### Web/REST

| Annotation        | Meaning                       | Example                              |
|-------------------|-------------------------------|--------------------------------------|
| `@RequestMapping` | "Map requests to this method" | `@RequestMapping("/users")`          |
| `@GetMapping`     | "Handle GET requests"         | `@GetMapping("/{id}")`               |
| `@PostMapping`    | "Handle POST requests"        | `@PostMapping("/create")`            |
| `@RequestBody`    | "Convert JSON → Java object"  | `createUser(@RequestBody User user)` |
| `@PathVariable`   | "Get URL parameters"          | `@PathVariable Long id`              |

### Lombok


| Annotation                 | Purpose                                                                                          | Example                                    |
|----------------------------|--------------------------------------------------------------------------------------------------|--------------------------------------------|
| `@Getter` / `@Setter`      | Auto-generate getters/setters                                                                    | `@Getter @Setter private String username;` |
| `@ToString`                | Auto-generate toString()                                                                         | `@ToString(exclude = "password")`          |
| `@EqualsAndHashCode`       | Auto-generate equals() and hashCode()                                                            | `@EqualsAndHashCode(callSuper = true)`     |
| `@NoArgsConstructor`       | Generate no-arg constructor                                                                      | `@NoArgsConstructor`                       |
| `@AllArgsConstructor`      | Generate constructor with all args                                                               | `@AllArgsConstructor`                      |
| `@RequiredArgsConstructor` | Generate constructor with final/@NonNull fields                                                  | `@RequiredArgsConstructor`                 |
| `@Data`                    | All-in-one (`@Getter`, `@Setter`, `@ToString`, `@EqualsAndHashCode`, `@RequiredArgsConstructor`) | `@Data public class User { ... }`          |
| `@Builder`                 | Implement Builder pattern                                                                        | `User.builder().name("Alice").build();`    |
| `@Slf4j`                   | Inject logger (Logger log)                                                                       | `log.info("User created: {}", username);`  |


## Tips

1. **Prefer constructor injection** (`private final` + Lombok `@RequiredArgsConstructor`) over field injection (`@Autowired`).
2. **Layer your annotations**.
   
   ```java
   @Repository  // Data layer
   public class UserRepository { ... }

   @Service     // Business logic
   public class UserService { ... }

   @RestController  // API layer
   public class UserController { ... }
   ```

3. Use `@Configuration` + `@Bean` to wire complex dependencies.
   
    ```java
   @Configuration
   public class SecurityConfig {
       @Bean
       public PasswordEncoder passwordEncoder() {
           return new BCryptPasswordEncoder();
       }
   }
   ```

4. **Environment-specific beans**: Use `@Profile` for dev/staging/prod setups.

   ```java
   @Profile("dev")
   @Service
   public class MockPaymentService implements PaymentService { ... }
   ```

5. **Avoid annotation soup**: Stick to **one** role-specific annotation.

   ```java
   @Component @Service  // Redundant!
   public class UserService { ... }
   ```