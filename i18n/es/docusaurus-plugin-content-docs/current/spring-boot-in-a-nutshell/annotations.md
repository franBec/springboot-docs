---
sidebar_position: 3
---

# Anotaciones

Las anotaciones son la forma que tiene Spring de permitirte **etiquetar** tu código con instrucciones tipo "¡Hey Spring, manejá esta clase!", o "¡Inyectá esa dependencia acá!". Reemplazaron la configuración en XML con metadata amigable para el código.

## ¿Por qué anotaciones?

* **Antes de las anotaciones**, tenías que repetir nombres de clases, dependencias y configuraciones en un archivo separado. Un typo y el proyecto no arrancaba.

    ```xml title="beans.xml"
    <bean id="userService" class="com.example.UserService">
        <property name="userRepository" ref="userRepository"/>
    </bean>
    ```

* **Con las anotaciones**, Spring las lee para autoconfigurar tu app.

    ```java
    @Service
    @RequiredArgConstructor
    public class UserService {
        private final UserRepository userRepository;
    }
    ```

## Anotaciones escenciales

### Definición de bean

| Anotación         | Significado                                                   | Caso de uso                                      |
|-------------------|---------------------------------------------------------------|--------------------------------------------------|
| `@Component`      | "¡Spring, manejá esta clase!"                                 | Beans genéricos                                  |
| `@Service`        | "¡Acá va la lógica de negocio!"                               | Clases de capa de servicio                       |
| `@Repository`     | "¡Acá van las interacciones con la base de datos!"            | Clases DAO/BD (agrega traducción de excepciones) |
| `@RestController` | "¡Endpoint de API!" (Combina `@Controller` + `@ResponseBody`) | APIs REST                                        |

### Inyección de dependencias

| Anotación    | Significado                    | Ejemplo                               |
|--------------|--------------------------------|---------------------------------------|
| `@Autowired` | "¡Inyectá un bean acá!"        | Constructor/campo/setter              |
| `@Primary`   | "¡Elegime a mí primero!"       | Resolver conflictos de beans ambiguos |
| `@Qualifier` | "Inyectá ESTE bean específico" | `@Qualifier("mysqlDb")`               |

### Configuración

| Anotación        | Significado                        | Ejemplo                                              |
|------------------|------------------------------------|------------------------------------------------------|
| `@Configuration` | "¡Esta clase configura beans!"     | Configuración de base de datos/librerías de terceros |
| `@Bean`          | "¡Acá tenés un bean para manejar!" | Métodos que devuelven objetos complejos              |
| `@Value`         | "¡Inyectá un valor de propiedad!"  | `@Value("${api.key}")`                               |

### Web/REST

| Anotación         | Significado                      | Ejemplo                              |
|-------------------|----------------------------------|--------------------------------------|
| `@RequestMapping` | "Mapeá peticiones a este método" | `@RequestMapping("/users")`          |
| `@GetMapping`     | "Maneja peticiones GET"          | `@GetMapping("/{id}")`               |
| `@PostMapping`    | "Maneja peticiones POST"         | `@PostMapping("/create")`            |
| `@RequestBody`    | "Convertí JSON → objeto Java"    | `createUser(@RequestBody User user)` |
| `@PathVariable`   | "Obtené parámetros de URL"       | `@PathVariable Long id`              |

### Lombok

| Anotación                  | Propósito                                                                                         | Ejemplo                                    |
|----------------------------|---------------------------------------------------------------------------------------------------|--------------------------------------------|
| `@Getter` / `@Setter`      | Auto-generá getters/setters                                                                       | `@Getter @Setter private String username;` |
| `@ToString`                | Auto-generá toString()                                                                            | `@ToString(exclude = "password")`          |
| `@EqualsAndHashCode`       | Auto-generá equals() y hashCode()                                                                 | `@EqualsAndHashCode(callSuper = true)`     |
| `@NoArgsConstructor`       | Generá constructor sin argumentos                                                                 | `@NoArgsConstructor`                       |
| `@AllArgsConstructor`      | Generá constructor con todos los argumentos                                                       | `@AllArgsConstructor`                      |
| `@RequiredArgsConstructor` | Generá constructor con campos final/@NonNull                                                      | `@RequiredArgsConstructor`                 |
| `@Data`                    | Todo en uno (`@Getter`, `@Setter`, `@ToString`, `@EqualsAndHashCode`, `@RequiredArgsConstructor`) | `@Data public class User { ... }`          |
| `@Builder`                 | Implementá el patrón Builder                                                                      | `User.builder().name("Alice").build();`    |
| `@Slf4j`                   | Inyectá el logger (Logger log)                                                                    | `log.info("User created: {}", username);`  |

## Consejos

1. **Preferí la inyección por constructor** (`private final` + Lombok `@RequiredArgsConstructor`) sobre la inyección por campo (`@Autowired`).
2. **Usá anotaciones por capas**.

    ```java
    @Repository  // Capa de datos
    public class UserRepository { ... }

    @Service     // Lógica de negocio
    public class UserService { ... }

    @RestController  // Capa de API
    public class UserController { ... }
    ```

3. Usá `@Configuration` + `@Bean` para conectar dependencias complejas.

    ```java
    @Configuration
    public class SecurityConfig {
        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }
    }
    ```

4. **Beans específicos del entorno**: Usá `@Profile` para configuraciones de dev/staging/prod.

    ```java
    @Profile("dev")
    @Service
    public class MockPaymentService implements PaymentService { ... }
    ```

5. **Evitá la sopa de anotaciones**: Usá solo **una** anotación por rol.

    ```java
    @Component @Service  // ¡Redundante!
    public class UserService { ... }
    ```