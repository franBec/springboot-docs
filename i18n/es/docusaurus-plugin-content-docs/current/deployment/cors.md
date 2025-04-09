---
sidebar_position: 2
---

# CORS

Al desplegar tu aplicación backend, puede que te encuentres con una característica de seguridad integrada en los navegadores web llamada [CORS](https://aws.amazon.com/what-is/cross-origin-resource-sharing/), que significa **Cross-Origin Resource Sharing**. Suena técnico, pero la idea central es simple e importante para la seguridad web.

## ¿Qué es CORS y por qué existe?

Imaginá que tu navegador actúa como un cuidadoso guardia de seguridad para distintos sitios web. Por defecto, este guardia hace cumplir una regla estricta llamada **Same-Origin Policy**. Esta regla básicamente dice: "Una página web cargada desde el sitio A (por ejemplo, `your-awesome-app.com`) solo debería poder hacer solicitudes al sitio A. No debería poder solicitar datos de manera libre desde el sitio B (por ejemplo, `your-bank.com` o `some-other-api.com`)."

**¿Por qué esta regla?** ¡Seguridad! Sin ella, un sitio web malicioso (`evil.com`) podría potencialmente cargarse en tu navegador y usar JavaScript para hacer solicitudes en secreto a tu banco en línea (`mybank.com`) utilizando *tus* credenciales de sesión, robando tus datos o realizando acciones en tu nombre. La Same-Origin Policy previene esto de forma predeterminada.

**CORS** es el mecanismo que permite a los servidores (como tu backend en Spring Boot) *relajar* esta regla de manera controlada. Le dice al navegador: "Oye, en realidad está bien que las páginas web de *estos orígenes específicos* hagan solicitudes hacia mí."

Un **origen** se define por la combinación de:
1. **Esquema:** `http` o `https`.
2. **Nombre de host:** `localhost`, `your-awesome-app.com`, `api.your-awesome-app.com`.
3. **Puerto:** `:8080`, `:3000` (a menudo implícito, como 80 para http, 443 para https).

Si alguna de estas tres partes difiere entre el sitio que hace la solicitud (por ejemplo, tu frontend) y el servidor que la recibe (por ejemplo, tu API backend), se considera una solicitud **cross-origin** y el guardia de seguridad del navegador interviene, requiriendo aprobación CORS por parte del servidor.

## ¿Cuándo te encontrás con problemas de CORS?

El escenario más común en el que necesitás configurar CORS es cuando:

* Tenés una **aplicación frontend** (como una creada con React, Angular, Vue o incluso HTML/JS simple) ejecutándose en un origen (por ejemplo, `http://localhost:3000` durante el desarrollo o `https://your-frontend-app.com` en producción).
* Ese frontend necesita llamar a tu **API Backend Spring Boot**, que se está ejecutando en un *origen distinto* (por ejemplo, `http://localhost:8080` durante el desarrollo o `https://api.your-app.com` en producción).

Cuando el frontend intenta hacer una llamada a la API (como obtener datos de usuario), el navegador chequea si el servidor backend permite explícitamente solicitudes desde el origen del frontend a través de cabeceras CORS. Si el servidor no envía las cabeceras correctas, el navegador bloquea la solicitud, y a menudo verás un mensaje de error en la consola de desarrollo del navegador mencionando CORS.

**¿Y qué pasa con las llamadas de backend a backend?** Generalmente, CORS es un mecanismo de seguridad *impuesto por el navegador*. La comunicación entre servidores (por ejemplo, un microservicio llamando a otro) normalmente no involucra comprobaciones de CORS, ya que los navegadores no intervienen en esas solicitudes.

## Configurando CORS en Spring Boot (la forma recomendada)

Spring Boot facilita bastante el manejo de CORS. Aunque *podrías* codificar directamente la configuración de CORS en tu código Java, un enfoque mucho mejor y más flexible es **externalizar la configuración en tu `application.yml`** (o `application.properties`).

1. Define propiedades para CORS en `application.yml`: Agregá una sección en tu `src/main/resources/application.yml` para definir tus configuraciones CORS. Esto mantiene la configuración separada de tu código.

    ```yaml
    cors:
      allowed-origins: http://localhost:3000
      allowed-methods: GET, POST, PUT, DELETE, PATCH
      allowed-headers: "*"
      allow-credentials: true
    ```

   * `allowed-origins`: Lista las direcciones exactas (orígenes) de tus aplicaciones frontend que están permitidas.
   * `allowed-methods`: Especifica qué métodos HTTP (GET, POST, etc.) están permitidos desde esos orígenes.
   * `allowed-headers`: Define qué cabeceras HTTP personalizadas se le permiten incluir en las solicitudes desde el frontend. `*` significa permitir cualquier cabecera.
   * `allow-credentials`: Permite que se incluyan cookies (u otras credenciales de usuario) en las solicitudes cross-origin.

2. Creá una clase con `@Configuration` que lea estas propiedades. En `src/main/java/dev/pollito/users_manager/config/properties`, creá `CorsConfigProperties.java`.

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

3. Creá una clase con `@Configuration` que implemente `WebMvcConfigurer` para aplicar el manejo de CORS de Spring. En `src/main/java/dev/pollito/users_manager/config`, creá `WebConfig.java`.

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

### ¿Por qué usar application.yml?

* **Sin hardcoding:** Evitás incrustar URL específicas o configuraciones directamente en tu código Java, lo que hace que el código sea más limpio y menos propenso a errores si las URL cambian.
* **Flexibilidad por entorno:** Podés definir fácilmente diferentes orígenes permitidos (y otras configuraciones) para tus entornos de desarrollo, test y producción usando archivos `application-{profile}.yml` sin cambiar el código Java. Por ejemplo, permitir `localhost:3000` en desarrollo, pero solo `https://your-frontend-app.com` en producción.
* **Configuración centralizada:** Todas las configuraciones de CORS son claramente visibles en tus archivos de configuración, lo que las hace más fáciles de gestionar y auditar.

* Al entender CORS y configurarlo correctamente usando propiedades externalizadas, podés permitir de forma segura que tus aplicaciones frontend interactúen con tu backend en Spring Boot.