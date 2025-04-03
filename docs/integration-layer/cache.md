---
sidebar_position: 7
---

# Cache

Caching is one of those "optional but recommended features" that is useful for our specific case: we are integrating an outside source whose response never change (or if it does, we don’t care in this example). So, why not cache the response instead of asking the same thing over and over again?

Take into consideration that [caching has many pitfalls](https://medium.com/@sinhanitin8/pitfalls-of-caching-and-their-mitigation-strategies-ee6c76dd1ba9).

1. We need [Spring Boot Starter Cache](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-cache), and [Caffeine Cache](https://mvnrepository.com/artifact/com.github.ben-manes.caffeine/caffeine) dependencies. In your `build.gradle`, add the dependencies in the `dependencies` section:

    ```groovy
    implementation 'org.springframework.boot:spring-boot-starter-cache'
    implementation 'com.github.ben-manes.caffeine:caffeine:3.2.0'
    ```

2. In `src/main/resources/application.yml`, create a new property `expiresAfter`:

    ```yaml
    jsonplaceholder:
      baseUrl: https://jsonplaceholder.typicode.com/
      expiresAfter: 24 #hours
    spring:
      application:
        name: users_manager
    ```

3. In `src/main/java/dev/pollito/users_manager/config/properties/JsonPlaceholderConfigProperties.java`, declare the field `private Integer expiresAfter` so it can be accessed.

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

4. In `src/main/java/dev/pollito/users_manager/config`, create `CacheConfig.java`.

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

5. In `src/main/java/dev/pollito/users_manager/service`, create `UserApiCacheService.java`.

    ```java
    package dev.pollito.users_manager.service;
    
    import com.typicode.jsonplaceholder.model.User;
    import java.util.List;
    
    public interface UserApiCacheService {
      List<User> getUsers();
    }
    ```

6. In `src/main/java/dev/pollito/users_manager/service/impl`, create `UserApiCacheServiceImpl.java` and implement `UserApiCacheService`.

    - Is important to annotate the overriden method with `@Cacheable(value = JSON_PLACEHOLDER_CACHE)` so the cache takes place.
    
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

7. In `src/main/java/dev/pollito/users_manager/service/impl/UserServiceImpl.java`, replace `UserApi` for `UserApiCacheService`. Should be a smooth replacement.

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

Right-click the main class → Run. Then go to [http://localhost:8080/users](http://localhost:8080/users).

<div>
  <img src={require('@site/static/img/integration-layer/request.png').default} alt="request" />
</div>

Repeat the request. The cache will come into play, and you should find a much quicker response time: It went from 1014ms down to 13ms, a 98.7% speed increase.

<div>
  <img src={require('@site/static/img/integration-layer/cache.png').default} alt="cache" />
</div>

Commit the progress so far.

```bash
git add .
git commit -m "cache"
```