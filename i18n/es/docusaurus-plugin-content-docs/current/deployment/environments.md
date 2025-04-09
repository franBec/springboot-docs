---
sidebar_position: 1
---

# Entornos

Cuando desarrollás y desplegás software como una aplicación Spring Boot, rara vez simplemente subís el código directamente a los usuarios en vivo. En su lugar, las aplicaciones normalmente pasan por varios **Entornos**. Entender estos entornos es crucial para tener flujos de trabajo de desarrollo seguros, confiables y eficientes.

## ¿Qué son los entornos?

Los entornos son configuraciones distintas y aisladas donde se ejecuta tu aplicación. Cada entorno cumple un propósito específico en el ciclo de vida del desarrollo de software. Los entornos más comunes son:

* **Desarrollo (dev):** Acá es donde los desarrolladores escriben y prueban el código localmente en sus máquinas o a veces en un servidor de desarrollo compartido. El foco está en iterar rápido, hacer debugging e implementar nuevas funciones. La configuración puede ser simplificada (por ejemplo, usando una base de datos en memoria).
* **Pruebas (test / staging / QA):** Este entorno busca replicar lo más posible el setup de producción. Se usa para varios tipos de pruebas:
    * **Pruebas de integración:** Verificar que las diferentes partes de la aplicación (o distintos microservicios) funcionen bien en conjunto.
    * **Pruebas de aceptación de usuario (UAT):** Permitir que los interesados o el equipo de QA prueben las funciones antes de que se publiquen.
    * **Pruebas de rendimiento/carga:** Chequear cómo se comporta la aplicación bajo estrés.
      Los entornos de pruebas aíslan las actividades de testing de los usuarios reales y los datos de producción.
* **Producción (prod):** Este es el entorno en vivo donde interactúan los usuarios finales con la aplicación. El foco principal acá es la estabilidad, el rendimiento, la confiabilidad y la seguridad. Las configuraciones apuntan a bases de datos reales, servicios externos y usan recursos a nivel de producción.

## ¿Por qué existen los entornos?

Usar diferentes entornos es esencial por varias razones:

1. **Aislamiento y seguridad:** La razón más importante es evitar que código no probado o defectuoso afecte a usuarios reales. No probarías piezas experimentales en un avión lleno de pasajeros; de igual forma, no probás código nuevo directamente en producción.
2. **Diferencias de configuración:** Cada entorno frecuentemente necesita configuraciones distintas. Por ejemplo:
    * **Bases de datos:**
        * En **dev**, quizá quieras una base de datos en memoria, rápida y desechable, como H2, para arranques rápidos.
        * En **test**, necesitas conectar a una base de datos de pruebas dedicada (quizás una réplica del esquema de producción pero con datos de prueba).
        * En **prod**, te conectás a la base de datos real que contiene los datos de usuario.
    * **Servicios externos y claves API:** Los entornos de dev/test pueden usar versiones sandbox de APIs de terceros, con claves de prueba, mientras que producción usa APIs en vivo con claves reales y posiblemente diferentes límites de uso.
    * **Logging:** Quizás quieras registros muy verbosos (`DEBUG`) en dev, pero solo registros `INFO` o `WARN` en producción para evitar exceso de ruido y problemas de rendimiento.
    * **Recursos:** Dev/Test podría correr con límites de CPU/memoria más bajos, mientras que producción necesita recursos robustos.
3. **Fidelidad de las pruebas:** Los entornos de test permiten validar tu aplicación en un setup que lo asemeja a producción, lo que aumenta la confianza de que funcionará correctamente una vez desplegada.
4. **Despliegues controlados:** Las funciones se pueden habilitar o probar en staging antes de lanzarlas a todos los usuarios en producción (muchas veces usando banderas de características).

## Cómo manejarlos en Spring Boot (Perfiles)

Spring Boot provee una solución elegante para gestionar configuraciones específicas de cada entorno usando [Perfiles](https://docs.spring.io/spring-boot/reference/features/profiles.html). Un perfil es básicamente una etiqueta para un conjunto de configuraciones.

Acá te explico cómo funciona normalmente:

1. **La configuración por defecto (`application.yml` o `application.properties`):**
    * Este archivo, ubicado en `src/main/resources`, contiene propiedades de configuración comunes a *todos* los entornos o que sirven como base.
    * Ejemplo de `application.yml`:
        ```yaml
        spring:
          application:
            name: users-manager # Común para todos los entornos
        
        # Puerto del servidor por defecto (se puede sobreescribir)
        server:
          port: 8080 
        ```

2. **Configuraciones específicas de perfil (`application-{profile}.yml`):**
    * Creás archivos de configuración adicionales llamados `application-{profile}.yml` (o `.properties`) para cada entorno, reemplazando `{profile}` por el nombre del perfil (por ejemplo, `dev`, `test`, `prod`).
    * Estos archivos también se ubican en `src/main/resources`.
    * Las propiedades definidas en un archivo específico de perfil **sobrescriben** las propiedades definidas en el `application.yml` por defecto cuando ese perfil está activo.
    * Ejemplo de `application-dev.yml`:
        ```yaml
        spring:
          datasource:
            url: jdbc:h2:mem:devdb # Base de datos en memoria H2 para dev
            username: sa
            password: password
          h2:
            console:
              enabled: true # Se habilita la consola H2 solo en dev
        logging:
          level:
            dev.pollito: DEBUG # Logs más verbosos para nuestro paquete de la aplicación
        ```
    * Ejemplo de `application-prod.yml`:
        ```yaml
        spring:
          datasource:
            url: jdbc:postgresql://prod-db.example.com:5432/usersdb # Base de datos real de producción
            username: prod_user
            # La contraseña a menudo viene de variables de entorno o manejo de secretos
            password: ${DB_PASSWORD} 
        server:
          port: 80 # Producción podría usar un puerto estándar
        logging:
          level:
            dev.pollito: INFO # Logs menos verbosos en producción
        ```

3. **Activando los perfiles:**
    * Le decís a Spring Boot qué perfil(es) activar cuando arranca la aplicación. Spring cargará primero el `application.yml` y luego cargará el `application-{profile}.yml` para el perfil activo, sobrescribiendo las propiedades en conflicto.
    * Formas comunes de activar un perfil:
        * **Variable de entorno:** `SPRING_PROFILES_ACTIVE=prod` (muy común en scripts de despliegue/containers)
        * **Propiedad del sistema JVM:** `-Dspring.profiles.active=prod` (pasada durante el arranque)
        * **En el `application.yml`:** (menos común para *activar* un entorno, pero posible)
            ```yaml
            spring:
              profiles:
                active: dev # Configura el perfil activo por defecto si no se especifica externamente
            ```

Usando perfiles y archivos de configuración separados, podés fácilmente gestionar las diferentes configuraciones requeridas para tus entornos de dev, test, y producción, asegurando que tu aplicación se comporte de manera correcta y segura en cada contexto.