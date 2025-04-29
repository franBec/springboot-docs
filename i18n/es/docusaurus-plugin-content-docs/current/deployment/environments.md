---
sidebar_position: 1
---

# Entornos

Al desarrollar y desplegar software como una aplicación Spring Boot, rara vez envias el código directamente a los usuarios finales. En cambio, las aplicaciones suelen pasar por varios **Entornos**. Entender estos entornos es crucial para flujos de trabajo de desarrollo seguros, confiables y eficientes.

## ¿Qué son los entornos?

Los entornos son configuraciones distintas y aisladas donde se ejecuta tu aplicación. Cada entorno cumple un propósito específico en el ciclo de vida del desarrollo de software. Los entornos más comunes son:

* **Desarrollo (dev):** Aquí es donde los desarrolladores escriben y testean código localmente en sus máquinas o a veces en un servidor de desarrollo compartido. El foco está en la iteración rápida, la depuración y la implementación de funcionalidades. La configuración puede ser simplificada (por ejemplo, usando una base de datos en memoria).
* **Testing (test / staging / QA):** Este entorno busca replicar lo más fielmente posible la configuración de producción. Se utiliza para varios tipos de testing:
   * **Integration Testing:** Verificar que diferentes partes de la aplicación (o diferentes microservicios) funcionen juntas correctamente.
   * **User Acceptance Testing (UAT):** Permitir a los stakeholders o equipos de QA testear funcionalidades antes de que salgan a producción.
   * **Performance/Load Testing:** Chequear cómo se comporta la aplicación bajo estrés.
       Los entornos de testing aíslan las actividades de testing de los usuarios reales y los datos de producción.
* **Producción (prod):** Este es el entorno en vivo donde los usuarios finales interactúan con la aplicación. El foco principal aquí es la estabilidad, el rendimiento, la confiabilidad y la seguridad. Las configuraciones apuntan a bases de datos reales, servicios externos y utilizan recursos a nivel de producción.

## ¿Por qué existen los entornos?

Usar diferentes entornos es esencial por varias razones:

1. **Aislamiento y Seguridad:** La razón más crítica es prevenir que código no testeado o roto afecte a los usuarios reales. No testearías partes experimentales de un motor en un avión lleno de pasajeros; de manera similar, no testeas código nuevo directamente en producción.
2. **Diferencias de configuración:** Cada entorno a menudo necesita configuraciones diferentes. Por ejemplo:
   * **Bases de datos:**
      * En **dev**, quizás quieras una base de datos en memoria rápida y descartable como H2 para inicios rápidos.
      * En **test**, necesitas conectarte a una base de datos de test dedicada (quizás un clon del esquema de producción pero con datos de test).
      * En **prod**, te conectas a la base de datos real y en vivo que contiene los datos de usuarios reales.
   * **Servicios externos y API keys**: Los entornos de Dev/Test pueden usar versiones sandbox de API de terceros con claves de test, mientras que producción usa API en vivo con claves reales y potencialmente diferentes límites de tasa.
   * **Logging**: Quizás quieras logging `DEBUG` verborrágico en dev, pero solo logging de nivel `INFO` o `WARN` en producción para evitar ruido excesivo e impacto en el rendimiento.
   * **Recursos**: Dev/Test puede ejecutarse con límites más bajos de memoria/CPU, mientras que producción necesita recursos robustos.
3. **Fidelidad del Testing:** Los entornos de test te permiten validar tu aplicación en una configuración que se asemeja mucho a producción, aumentando la confianza en que funcionará correctamente cuando se despliegue.
4. **Implementaciones controladas:** Las funcionalidades pueden ser habilitadas o testeadas en staging antes de ser lanzadas a todos los usuarios en producción (a menudo usando feature flags).

## Perfiles de Spring Boot

Spring Boot proporciona una solución elegante para gestionar configuraciones específicas de entorno usando [Perfiles](https://docs.spring.io/spring-boot/reference/features/profiles.html). Un perfil es esencialmente una etiqueta para un conjunto de configuraciones.

Así es como funciona típicamente:

1. **La configuración por defecto** (`application.yml` o `application.properties`):
   * Este archivo, ubicado en `src/main/resources`, contiene propiedades de configuración comunes a *todos* los entornos o configuraciones que sirven como línea base.

       ```yaml title="src/main/resources/application.yml"
       spring:
         application:
           name: users-manager # Común a todos los entornos

       # Puerto del servidor por defecto (puede ser sobrescrito)
       server:
         port: 8080
       ```

2. **Configuraciones específicas de perfil** (`application-{profile}.yml`):
   * Estos archivos también se colocan en `src/main/resources`.
   * Creas archivos de configuración adicionales llamados `application-{profile}.yml` (o `.properties`) para cada entorno, reemplazando `{profile}` con el nombre del perfil (por ejemplo, `dev`, `test`, `prod`).
   * Las propiedades definidas en un archivo específico de perfil **sobrescriben** las propiedades definidas en el archivo `application.yml` por defecto cuando ese perfil está activo.

       ```yaml title="src/main/resources/application-dev.yml"
       spring:
         datasource:
           url: jdbc:h2:mem:devdb # H2 en memoria para dev
           username: sa
           password: password
         h2:
           console:
             enabled: true # Habilita la consola H2 solo para dev
       logging:
         level:
           dev.pollito: DEBUG # Logging más verborrágico para el paquete de nuestra app
       ```

       ```yaml title="src/main/resources/application-prod.yml"
       spring:
         datasource:
           url: jdbc:postgresql://prod-db.example.com:5432/usersdb # Base de datos de producción real
           username: prod_user
           # La contraseña a menudo proviene de variables de entorno o gestión de secretos
           password: ${DB_PASSWORD}
       server:
         port: 80 # Producción puede correr en un puerto estándar
       logging:
         level:
           dev.pollito: INFO # Menos logging verborrágico en producción
       ```

3. **Activando perfiles**:
   * Le decís a Spring Boot qué perfil(es) activar cuando la aplicación arranca. Spring cargará `application.yml` primero, y luego cargará el `application-{profile}.yml` para el perfil activo, sobrescribiendo cualquier propiedad superpuesta.
   * Formas comunes de activar un perfil:
      * **Variable de Entorno:** `SPRING_PROFILES_ACTIVE=prod` (Muy común en scripts de despliegue/contenedores).
      * **Propiedad del Sistema JVM:** `-Dspring.profiles.active=prod` (Pasado durante el inicio).
      * **En `application.yml`:** (Menos común para *activar* un entorno específico, pero posible).

          ```yaml title="src/main/resources/application.yml"
          spring:
            profiles:
              active: dev # Establece el perfil activo por defecto si no se especifica ninguno externamente
          ```

Usando perfiles y archivos de configuración separados, podés gestionar las diferentes configuraciones requeridas para tus entornos de dev, test y producción, asegurando que tu aplicación se comporte correcta y seguramente en cada contexto.