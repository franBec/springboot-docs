---
sidebar_position: 2
---

# CORS

As you deploy your backend application, you might run into a security feature built into web browsers called [CORS](https://aws.amazon.com/what-is/cross-origin-resource-sharing/), which stands for **Cross-Origin Resource Sharing**. It sounds technical, but the core idea is simple and important for web security.

## What is CORS and Why Does It Exist?

Imagine your web browser is like a careful security guard for different websites. By default, this guard enforces a strict rule called the **Same-Origin Policy**. This rule basically says: "A web page loaded from website A (e.g., `your-awesome-app.com`) should only be allowed to make requests back to website A. It shouldn't be able to freely request data from website B (e.g., `your-bank.com` or `some-other-api.com`)."

**Why this rule?** Security! Without it, a malicious website (`evil.com`) could potentially load in your browser and use JavaScript to secretly make requests to your online bank (`mybank.com`) using *your* logged-in credentials, stealing your data or performing actions on your behalf. The Same-Origin Policy prevents this by default.

**CORS** is the mechanism that allows servers (like your Spring Boot backend) to *relax* this rule in a controlled way. It lets your server tell the browser: "Hey, it's actually okay for web pages from *these specific* other websites (origins) to make requests to me."

An **Origin** is defined by the combination of:
1.  **Scheme:** `http` or `https`.
2.  **Hostname:** `localhost`, `your-awesome-app.com`, `api.your-awesome-app.com`.
3.  **Port:** `:8080`, `:3000` (often implicit, like 80 for http, 443 for https).

If any of these three parts differ between the website making the request (e.g., your frontend) and the server receiving it (e.g., your backend API), it's considered a **cross-origin** request, and the browser's security guard steps in, requiring CORS approval from the server.

## When Do You Encounter CORS Issues?

The most common scenario where you need to configure CORS is when:

*   You have a **Frontend application** (like one built with React, Angular, Vue, or even plain HTML/JS) running on one origin (e.g., `http://localhost:3000` during development, or `https://your-frontend-app.com` in production).
*   This frontend needs to call your **Backend Spring Boot API**, which is running on a *different* origin (e.g., `http://localhost:8080` during development, or `https://api.your-app.com` in production).

When the frontend tries to make an API call (like fetching user data), the browser checks if the backend server explicitly allows requests from the frontend's origin via CORS headers. If the server doesn't send the right headers, the browser blocks the request, and you'll often see an error message in the browser's developer console mentioning CORS.

**What about Backend-to-Backend calls?** Generally, CORS is a *browser*-enforced security mechanism. Server-to-server communication (e.g., one microservice calling another) typically does *not* involve CORS checks, as browsers aren't involved in mediating those requests.

## Configuring CORS in Spring Boot (the Recommended Way)

Spring Boot makes handling CORS relatively straightforward. While you *could* hardcode CORS settings directly in your Java code, a much better and more flexible approach is to **externalize the configuration into your `application.yml`** (or `application.properties`).

1. Define CORS Properties in `application.yml`: Add a section to your `src/main/resources/application.yml` to define your CORS settings. This keeps the configuration separate from your code.

    ```yaml
    cors:
      allowed-origins: http://localhost:3000
      allowed-methods: GET, POST, PUT, DELETE, PATCH
      allowed-headers: "*"
      allow-credentials: true
    ```

   * `allowed-origins`: Lists the exact addresses (origins) of your frontend applications that are permitted.
   * `allowed-methods`: Specifies which HTTP actions (GET, POST, etc.) are allowed from these origins.
   * `allowed-headers`: Defines which custom HTTP headers the frontend is allowed to include in its requests. * means allow any.
   * `allowed-credentials`: Allows cookies (or other user credentials) to be included on cross-origin requests.

2. Create a `@Configuration` class that reads these properties. In `src/main/java/dev/pollito/users_manager/config/properties`, create `CorsConfigProperties.java`.

    ```java
    package dev.pollito.users_manager.config.properties;
    
    import java.util.List;
    import lombok.AccessLevel;
    import lombok.Data;
    import lombok.experimental.FieldDefaults;
    import org.springframework.boot.context.properties.ConfigurationProperties;
    import org.springframework.context.annotation.Configuration;
    
    @Configuration
    @ConfigurationProperties(prefix = "cors")
    @Data
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public class CorsConfigProperties {
      List<String> allowedOrigins;
      List<String> allowedMethods;
      String allowedHeaders;
      Boolean allowCredentials;
    }
    ```

3. Create a `@Configuration` class that implement `WebMvcConfigurer` to apply Spring's CORS handling. In `src/main/java/dev/pollito/users_manager/config`, create `WebConfig.java`.

```java
package dev.pollito.users_manager.config;

import dev.pollito.users_manager.config.properties.CorsConfigProperties;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {
  private final CorsConfigProperties corsConfigProperties;

  @Override
  public void addCorsMappings(@NotNull CorsRegistry registry) {
    registry
        .addMapping("/**")
        .allowedOrigins(corsConfigProperties.getAllowedOrigins().toArray(new String[0]))
        .allowedMethods(corsConfigProperties.getAllowedMethods().toArray(new String[0]))
        .allowedHeaders(corsConfigProperties.getAllowedHeaders())
        .allowCredentials(corsConfigProperties.getAllowCredentials());
  }
}
```

### Why is Using application.yml?

* **No hardcoding**: You avoid embedding specific URLs or settings directly in your Java code, which makes the code cleaner and less prone to errors if URLs change.
* **Environment flexibility**: You can easily define different allowed-origins (and other settings) for your dev, test, and prod environments using profile-specific `application-{profile}.yml` files without changing any Java code. For example, allow localhost:3000 in dev, but only https://your-frontend-app.com in prod.
* **Centralized configuration**: All CORS settings are clearly visible in your configuration files, making them easier to manage and audit. 

* By understanding CORS and configuring it correctly using externalized properties, you can securely allow your frontend applications to interact with your Spring Boot backend.