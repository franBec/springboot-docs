---
sidebar_position: 2
---

# CORS

Al desplegar tu aplicación backend, podrías encontrarte con una funcionalidad de seguridad integrada en los navegadores web llamada [CORS](https://aws.amazon.com/what-is/cross-origin-resource-sharing/), que significa **Cross-Origin Resource Sharing** (Compartir Recursos entre Orígenes Cruzados). Suena técnico, pero la idea principal es sencilla e importante para la seguridad web.

## ¿Qué es CORS y por qué existe?

Imaginá que tu navegador web es como un cuidadoso guardia de seguridad para diferentes sitios web. Por defecto, este guardia impone una regla estricta llamada la **Política del Mismo Origen (Same-Origin Policy)**. Esta regla básicamente dice: "A una página web cargada desde el sitio web A (por ejemplo, `tu-app-genial.com`) solo se le debería permitir hacer peticiones de vuelta al sitio web A. No debería poder pedir datos libremente del sitio web B (por ejemplo, `tu-banco.com` o `alguna-otra-api.com`)".

**¿Por qué esta regla?** ¡Seguridad! Sin ella, un sitio web malicioso (`malvado.com`) podría potencialmente cargarse en tu navegador y usar JavaScript para hacer peticiones secretas a tu banco en línea (`mibanco.com`) usando *tus* credenciales de sesión iniciada, robando tus datos o realizando acciones en tu nombre. La Política del Mismo Origen previene esto por defecto.

**CORS** es el mecanismo que permite a los servidores (como tu backend Spring Boot) **relajar** esta regla de manera controlada. Permite que tu servidor le diga al navegador: "Oye, en realidad está bien que las páginas web de *estos sitios web específicos* (orígenes) me hagan peticiones".

Un **Origen** se define por la combinación de:
1. **Esquema:** `http` o `https`.
2. **Hostname:** `localhost`, `tu-app-genial.com`, `api.tu-app-genial.com`.
3. **Puerto:** `:8080`, `:3000` (a menudo implícito, como 80 para http, 443 para https).

Si alguna de estas tres partes difiere entre el sitio web que hace la petición (por ejemplo, tu frontend) y el servidor que la recibe (por ejemplo, tu API backend), se considera una petición **de origen cruzado (cross-origin)**.

## ¿Cuándo te encontrás con problemas de CORS?

El escenario más común donde necesitas configurar CORS es cuando:

* Tenés una **aplicación Frontend** (como una construida con React, Angular, Vue, o incluso HTML/JS plano) corriendo en un origen (por ejemplo, `http://localhost:3000` durante el desarrollo, o `https://tu-app-frontend.com` en producción).
* Este frontend necesita llamar a tu **API Backend de Spring Boot**, que está corriendo en un origen *diferente* (por ejemplo, `http://localhost:8080` durante el desarrollo, o `https://api.tu-app.com` en producción).

Cuando el frontend intenta hacer una llamada a la API (como obtener datos de usuario), el navegador chequea si el servidor backend permite explícitamente peticiones desde el origen del frontend a través de encabezados CORS. Si el servidor no envía los encabezados correctos, el navegador bloquea la petición, y a menudo verás un mensaje de error en la consola de desarrollador del navegador mencionando CORS.

**¿Y las llamadas de Backend a Backend?** Generalmente, CORS es un mecanismo de seguridad *aplicado por el navegador*. La comunicación de servidor a servidor (por ejemplo, un microservicio llamando a otro) típicamente *no* involucra chequeos de CORS, ya que los navegadores no intervienen en la mediación de esas peticiones.

## Configurando CORS en Spring Boot (la forma recomendada)

Spring Boot hace que manejar CORS sea relativamente sencillo. Si bien *podrías* hardcodear las configuraciones de CORS directamente en tu código Java, un enfoque mucho mejor y más flexible es **externalizar la configuración en tu `application.yml`** (o `application.properties`).

1. Definí propiedades CORS en `application.yml`.

    ```yaml title="src/main/resources/application.yml"
    cors:
      allowed-origins: http://localhost:3000
      allowed-methods: GET, POST, PUT, DELETE, PATCH
      allowed-headers: "*"
      allow-credentials: true
    ```

   * `allowed-origins`: Lista las direcciones exactas (orígenes) de tus aplicaciones frontend que están permitidas.
   * `allowed-methods`: Especifica qué acciones HTTP (GET, POST, etc.) están permitidas desde estos orígenes.
   * `allowed-headers`: Define qué encabezados HTTP personalizados puede incluir el frontend en sus peticiones. `*` significa permitir cualquiera.
   * `allowed-credentials`: Permite que se incluyan cookies (u otras credenciales de usuario) en las peticiones de origen cruzado.

2. Creá una clase `@Configuration` que lea estas propiedades.

    ```java title="src/main/java/dev/pollito/users_manager/config/cors/CorsConfigProperties.java"
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

3. Creá una clase `@Configuration` que implemente `WebMvcConfigurer` para aplicar el manejo CORS de Spring.

    ```java title="src/main/java/dev/pollito/users_manager/config/cors/WebConfig.java"
    package dev.pollito.users_manager.config.cors;

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

* **No hardcodear**: Evitás incrustar URLs o configuraciones específicas directamente en tu código Java, lo que hace que el código sea más limpio y menos propenso a errores si cambian las URLs.
* **Flexibilidad de entorno**: Podés definir diferentes `allowed-origins` (y otras configuraciones) para tus entornos dev, test y prod usando archivos `application-{profile}.yml` específicos de perfil sin cambiar ningún código Java. Por ejemplo, permití `localhost:3000` en dev, pero solo `https://tu-app-frontend.com` en prod.
* **Configuración centralizada**: Todas las configuraciones CORS son claramente visibles en tus archivos de configuración, haciéndolas más fáciles de gestionar y auditar.

Entendiendo CORS y configurándolo correctamente usando propiedades externalizadas, podés permitir de forma segura que tus aplicaciones frontend interactúen con tu backend Spring Boot.