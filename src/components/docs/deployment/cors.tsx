import { CollapsibleCodeBlock } from '@site/src/components/collapsible-code-block';
import ZoomContainer from '@site/src/components/zoom-container';
import Mermaid from '@theme/Mermaid';

export const CorsApplicationYaml = () => (
  <CollapsibleCodeBlock language="yaml" title="resources/application.yaml">
    {`# ...
cors:
  allowed-origins: "*"
  allowed-methods: GET, POST, PUT, DELETE, PATCH
  allowed-headers: "*"
  allow-credentials: false`}
  </CollapsibleCodeBlock>
);

export const CorsConfigPropertiesJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/config/cors/CorsConfigProperties.java"
  >
    {`package dev.pollito.spring_java.config.cors;

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
}`}
  </CollapsibleCodeBlock>
);

export const CorsConfigPropertiesKotlin = () => (
  <CollapsibleCodeBlock
    language="kotlin"
    title="kotlin/dev/pollito/spring_kotlin/config/cors/CorsConfigProperties.kt"
  >
    {`package dev.pollito.spring_kotlin.config.cors

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties(prefix = "cors")
data class CorsConfigProperties(
    var allowedOrigins: List<String> = emptyList(),
    var allowedMethods: List<String> = emptyList(),
    var allowedHeaders: String = "",
    var allowCredentials: Boolean = false,
)`}
  </CollapsibleCodeBlock>
);

export const CorsConfigPropertiesGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/config/cors/CorsConfigProperties.groovy"
  >
    {`package dev.pollito.spring_groovy.config.cors

import groovy.transform.CompileStatic
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@CompileStatic
@Configuration
@ConfigurationProperties(prefix = "cors")
class CorsConfigProperties {
  List<String> allowedOrigins
  List<String> allowedMethods
  String allowedHeaders
  Boolean allowCredentials
}`}
  </CollapsibleCodeBlock>
);

export const WebConfigJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/config/cors/WebConfig.java"
  >
    {`package dev.pollito.spring_java.config.cors;

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
}`}
  </CollapsibleCodeBlock>
);

export const WebConfigKotlin = () => (
  <CollapsibleCodeBlock
    language="kotlin"
    title="kotlin/dev/pollito/spring_kotlin/config/cors/WebConfig.kt"
  >
    {`package dev.pollito.spring_kotlin.config.cors

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class WebConfig(private val corsConfigProperties: CorsConfigProperties) : WebMvcConfigurer {
  override fun addCorsMappings(registry: CorsRegistry) {
    registry
        .addMapping("/**")
        .allowedOrigins(*corsConfigProperties.allowedOrigins.toTypedArray())
        .allowedMethods(*corsConfigProperties.allowedMethods.toTypedArray())
        .allowedHeaders(corsConfigProperties.allowedHeaders)
        .allowCredentials(corsConfigProperties.allowCredentials)
  }
}`}
  </CollapsibleCodeBlock>
);

export const WebConfigGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/config/cors/WebConfig.groovy"
  >
    {`package dev.pollito.spring_groovy.config.cors

import groovy.transform.CompileStatic
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@CompileStatic
@Configuration
class WebConfig implements WebMvcConfigurer {
  private final CorsConfigProperties corsConfigProperties

  WebConfig(CorsConfigProperties corsConfigProperties) {
    this.corsConfigProperties = corsConfigProperties
  }

  @Override
  void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
        .allowedOrigins(corsConfigProperties.allowedOrigins as String[])
        .allowedMethods(corsConfigProperties.allowedMethods as String[])
        .allowedHeaders(corsConfigProperties.allowedHeaders)
        .allowCredentials(corsConfigProperties.allowCredentials)
  }
}`}
  </CollapsibleCodeBlock>
);

export const CorsSuccessFlow = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
    participant FE as Frontend App<br/>(localhost:3000)
    participant BR as Browser<br/>Security Engine
    participant API as Spring Boot API<br/>(localhost:8080)

    Note over FE: React/Vue/Angular App
    
    FE->>BR: 1. Fetch user data
    BR->>API: 2. OPTIONS /api/users<br/>(Preflight request)
    API-->>BR: 3. Access-Control-Allow-Origin: http://localhost:3000
    BR-->>FE: 4. Allowed? Yes!
    FE->>API: 5. GET /api/users
    API-->>BR: 6. Response + CORS Headers
    BR-->>FE: 7. Response allowed!`}
    />
  </ZoomContainer>
);

export const FilmControllerSpec = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/sakila/film/adapter/in/rest/FilmControllerSpec.groovy"
  >
    {`// ...

import dev.pollito.spring_groovy.config.cors.CorsConfigProperties
import dev.pollito.spring_groovy.config.cors.WebConfig

// ...

@WebMvcTest(FilmController)
@Import([ControllerAdvice, ApiResponseEnricher, FilmMapper, ModelMapperConfig, WebConfig, CorsConfigProperties])
class FilmControllerSpec extends Specification implements ApiResponseMatchers {
  // ...
}`}
  </CollapsibleCodeBlock>
);

export const FilmControllerTestJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/sakila/film/adapter/in/rest/FilmControllerTest.java"
  >
    {`// ...

import dev.pollito.spring_java.config.cors.CorsConfigProperties;
import dev.pollito.spring_java.config.cors.WebConfig;

// ...

@WebMvcTest(FilmController.class)
@Import({
  ControllerAdvice.class,
  ApiResponseEnricher.class,
  FilmMapperImpl.class,
  WebConfig.class,
  CorsConfigProperties.class
})
class FilmControllerTest {
  // ...
}`}
  </CollapsibleCodeBlock>
);

export const FilmControllerTestKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/sakila/film/adapter/in/rest/FilmControllerTest.kt"
  >
    {`// ...

import dev.pollito.spring_kotlin.config.cors.CorsConfigProperties
import dev.pollito.spring_kotlin.config.cors.WebConfig

// ...

@ExtendWith(SpringExtension::class)
@WebMvcTest(FilmController::class)
@Import(ControllerAdvice::class, FilmMapperImpl::class, WebConfig::class)
@EnableConfigurationProperties(CorsConfigProperties::class)
class FilmControllerTest {
  // ...
}`}
  </CollapsibleCodeBlock>
);
