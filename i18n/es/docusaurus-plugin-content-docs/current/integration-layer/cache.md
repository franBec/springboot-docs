---
sidebar_position: 7
---

# Cache

El caching es una de esas “características opcionales pero recomendadas” que resulta útil en nuestro caso específico: estamos integrando una fuente externa cuya respuesta nunca cambia (o si lo hace, en este ejemplo no nos importa). Entonces, ¿por qué no cachear la respuesta en lugar de pedir lo mismo una y otra vez?

Ten en cuenta que [el caching tiene muchos problemas potenciales](https://medium.com/@sinhanitin8/pitfalls-of-caching-and-their-mitigation-strategies-ee6c76dd1ba9).

1. Necesitamos las dependencias [Spring Boot Starter Cache](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-cache) y [Caffeine Cache](https://mvnrepository.com/artifact/com.github.ben-manes.caffeine/caffeine). En tu `build.gradle`, agregá las dependencias en la sección de `dependencies`:

    ```groovy
    implementation 'org.springframework.boot:spring-boot-starter-cache'
    implementation 'com.github.ben-manes.caffeine:caffeine:3.2.0'
    ```

2. En `src/main/resources/application.yml`, agregá una nueva propiedad `expiresAfter`:

    ```yaml
    jsonplaceholder:
      baseUrl: https://jsonplaceholder.typicode.com/
      expiresAfter: 24 #hours
    spring:
      application:
        name: users_manager
    ```

3. En `src/main/java/dev/pollito/users_manager/config/properties/JsonPlaceholderConfigProperties.java`, declará el campo `private Integer expiresAfter` para poder acceder a él.

    ```java
    package dev.pollito.users_manager.config.properties;
    
    import lombok.Data;
    import org.springframework.boot.context.properties.ConfigurationProperties;
    import org.springframework.context.annotation.Configuration;
    
    @Configuration
    @ConfigurationProperties(prefix = "jsonplaceholder")
    @Data
    public class JsonPlaceholderConfigProperties {
      private String baseUrl;
      private Integer expiresAfter;
    }
    ```

4. En `src/main/java/dev/pollito/users_manager/config`, creá `CacheConfig.java`.

    ```java
    package dev.pollito.users_manager.config;
    
    import static java.util.concurrent.TimeUnit.HOURS;
    
    import com.github.benmanes.caffeine.cache.Caffeine;
    import dev.pollito.users_manager.config.properties.JsonPlaceholderConfigProperties;
    import lombok.RequiredArgsConstructor;
    import org.springframework.cache.CacheManager;
    import org.springframework.cache.annotation.EnableCaching;
    import org.springframework.cache.caffeine.CaffeineCacheManager;
    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    
    @Configuration
    @EnableCaching
    @RequiredArgsConstructor
    public class CacheConfig {
      private final JsonPlaceholderConfigProperties jsonPlaceholderConfigProperties;
      public static final String JSON_PLACEHOLDER_CACHE = "JSON_PLACEHOLDER_CACHE";
    
      @Bean
      public CacheManager cacheManager() {
        CaffeineCacheManager caffeineCacheManager = new CaffeineCacheManager(JSON_PLACEHOLDER_CACHE);
        caffeineCacheManager.setCaffeine(
            Caffeine.newBuilder()
                .expireAfterWrite(jsonPlaceholderConfigProperties.getExpiresAfter(), HOURS));
    
        return caffeineCacheManager;
      }
    }
    ```

5. En `src/main/java/dev/pollito/users_manager/service`, creá `UserApiCacheService.java`.

    ```java
    package dev.pollito.users_manager.service;
    
    import com.typicode.jsonplaceholder.model.User;
    import java.util.List;
    
    public interface UserApiCacheService {
      List<User> getUsers();
    }
    ```

6. En `src/main/java/dev/pollito/users_manager/service/impl`, creá `UserApiCacheServiceImpl.java` e implementá `UserApiCacheService`.

    - Es importante anotar el método sobrescrito con `@Cacheable(value = JSON_PLACEHOLDER_CACHE)` para que el cache se active.
    
    ```java
    package dev.pollito.users_manager.service.impl;
    
    import static dev.pollito.users_manager.config.CacheConfig.JSON_PLACEHOLDER_CACHE;
    
    import com.typicode.jsonplaceholder.api.UserApi;
    import com.typicode.jsonplaceholder.model.User;
    import dev.pollito.users_manager.service.UserApiCacheService;
    import java.util.List;
    import lombok.RequiredArgsConstructor;
    import org.springframework.cache.annotation.Cacheable;
    import org.springframework.stereotype.Service;
    
    @Service
    @RequiredArgsConstructor
    public class UserApiCacheServiceImpl implements UserApiCacheService {
      private final UserApi userApi;
    
      @Override
      @Cacheable(value = JSON_PLACEHOLDER_CACHE)
      public List<User> getUsers() {
        return userApi.getUsers();
      }
    }
    ```

7. En `src/main/java/dev/pollito/users_manager/service/impl/UserServiceImpl.java`, reemplazá `UserApi` por `UserApiCacheService`. Debería ser un reemplazo sencillo.

    ```java
    package dev.pollito.users_manager.service.impl;
    
    import dev.pollito.users_manager.mapper.UserMapper;
    import dev.pollito.users_manager.model.User;
    import dev.pollito.users_manager.model.Users;
    import dev.pollito.users_manager.service.UserApiCacheService;
    import dev.pollito.users_manager.service.UserService;
    import java.util.List;
    import java.util.Objects;
    import lombok.RequiredArgsConstructor;
    import org.springframework.stereotype.Service;
    
    @Service
    @RequiredArgsConstructor
    public class UserServiceImpl implements UserService {
    
      private final UserApiCacheService userApi;
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

Hacé clic derecho en la clase principal → Run. Luego, andá a [http://localhost:8080/users](http://localhost:8080/users).

<div>
  <img src={require('@site/static/img/integration-layer/request.png').default} alt="request" />
</div>

Repetí la solicitud. El cache entrará en acción y deberías notar una respuesta mucho más rápida: pasó de 1014ms a 13ms, ¡un incremento de velocidad del 98.7%!

<div>
  <img src={require('@site/static/img/integration-layer/cache.png').default} alt="cache" />
</div>

Commiteá el progreso hasta ahora.

```bash
git add .
git commit -m "cache"
```
