---
sidebar_position: 3
---

import YouTube from '@site/src/components/YouTube';

# Docker

Si venís haciendo desarrollo de software hace un tiempo, es probable que hayas visto este logo:

<div className="image-container">
  <img src={require('@site/static/img/deployment/docker.png').default} alt="Logo de Docker" width="174" height="146" />
</div>

[Docker](https://www.docker.com/) es como un contenedor de envío estándar para software. Así como los contenedores de envío revolucionaron el comercio global al proporcionar una forma estándar de transportar bienes sin importar el contenido, Docker proporciona una forma estándar de empaquetar y ejecutar software sin importar la infraestructura subyacente.

Pensá en Docker como la creación de una caja completa y autocontenida que tiene todo lo que tu aplicación necesita para ejecutarse:

* La aplicación en sí.
* Todas las librerías y dependencias.
* Entorno de ejecución.
* Configuración.

Esta "caja" (llamada contenedor) puede luego ser movida y ejecutada consistentemente en cualquier sistema que soporte Docker * desde la laptop de un desarrollador hasta un entorno de testing o un servidor de producción.

## ¿Por qué "dockerizar" aplicaciones Spring Boot?

Las aplicaciones Spring Boot son candidatas perfectas para contenedores Docker por varias razones:

1. **Portabilidad entre entornos**.
   * Los contenedores Docker empaquetan la aplicación junto con todas sus dependencias (por ejemplo, JDK, librerías).
   * Asegura consistencia en diferentes entornos (desarrollo, staging, producción), evitando el clásico problema de “en mi máquina funciona”.
2. **Facilidad de despliegue**.
   * Una imagen Docker es un artefacto autocontenido que se puede desplegar en cualquier lugar donde se soporte Docker (on-premises, AWS, GCP, Azure, etc.).
3. **Escalabilidad**.
   * Los contenedores son ligeros en comparación con las máquinas virtuales tradicionales, lo que te permite levantar múltiples instancias de tu app Spring Boot rápidamente.
   * Útil para arquitecturas de microservicios donde escalar servicios individuales es común.
4. **Aislamiento**.
   * Cada contenedor Docker se ejecuta en su propio entorno aislado.
   * Esto evita conflictos entre las dependencias de tu app Spring Boot y otras apps o librerías a nivel del sistema.
5. **Pipelines CI/CD simplificados**.
   * Docker se integra sin problemas con herramientas CI/CD como Jenkins, GitLab CI o GitHub Actions.
6. **Mejor utilización de recursos**.
   * Los contenedores comparten el kernel del sistema operativo host, lo que los hace más eficientes en recursos que las VM tradicionales.
   * Esto permite ejecutar más instancias de tu app Spring Boot en el mismo hardware.
7. **Versionado y rollbacks**.
   * Las imágenes Docker están versionadas, lo que te permite rastrear cambios y volver a una versión anterior si es necesario.
8. **Alineación Cloud-Native**.
   * La mayoría de las plataformas cloud están optimizadas para aplicaciones containerizadas.
9. **Simplifica la colaboración en equipo**.
   * Los desarrolladores y equipos de DevOps pueden usar la misma imagen Docker para asegurarse de que todos están trabajando con configuraciones de aplicación idénticas.

## Dockerfile para Spring Boot

Un `Dockerfile` define cómo debe containerizarse tu aplicación Spring Boot. Acá está mi propia implementación:

```Dockerfile title="Dockerfile"
# Etapa de Construcción (Build Stage)
FROM gradle:jdk21-alpine AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build -x test --no-daemon

# Etapa de Ejecución (Run Stage)
FROM eclipse-temurin:21-jre-alpine
RUN apk add --no-cache curl
COPY --from=build /home/gradle/src/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

No obstante, si te unís a un equipo que ya tiene su propio `Dockerfile` definido, lo mejor es evitar modificaciones a menos que sea necesario.

### Entendiendo el Multi-Stage Build

Este `Dockerfile` utiliza lo que se llama un [multi-stage build](https://docs.docker.com/build/building/multi-stage/) (construcción multi-etapa):

**Etapa de Construcción**. Esta primera etapa es como un taller donde construimos nuestra aplicación:

1. Empezamos con un contenedor que tiene Gradle y el [Java Development Kit (JDK)](https://www.geeksforgeeks.org/jdk-in-java/) completo.
2. Copiamos nuestro proyecto Spring Boot en este contenedor.
3. Ejecutamos el comando `gradle build` para compilar nuestra aplicación y crear un archivo `JAR`.
4. Una vez hecho, tendremos nuestra aplicación compilada, pero también un montón de herramientas de construcción que ya no necesitamos.

**Etapa de Ejecución**. Esta segunda etapa es el contenedor real que se ejecutará:

1. Empezamos con un contenedor mucho más pequeño que solo tiene el [Java Runtime Environment (JRE)](https://www.geeksforgeeks.org/jre-in-java/).
2. Agregamos `curl` para chequeos de salud y troubleshooting.
3. Copiamos solo el archivo `JAR` final de la etapa de construcción.
4. Configuramos el comando para ejecutar nuestra aplicación.

### Beneficios de este enfoque

Este enfoque de dos etapas ofrece varias ventajas:

* **Tamaño de imagen final más pequeño**: El contenedor final solo incluye lo que se necesita para ejecutar la aplicación, no para construirla.
* **Mejor seguridad**: Menos componentes significan menos vulnerabilidades potenciales.
* **Despliegues más rápidos**: Imágenes más pequeñas se despliegan más rápidamente.
* **Separación más limpia**: Las preocupaciones de construcción se separan de las preocupaciones de ejecución.

## ¿Ahora debería construir el contenedor, verdad?

<div>
  <img src={require('@site/static/img/deployment/well-yes-but-no.png').default} alt="bueno sí, pero no" />
</div>

Si bien construir y testear imágenes Docker localmente es el escenario ideal, en muchos entornos profesionales, los desarrolladores adoptan un enfoque diferente:

### Desafíos de instalación de Docker

Hacer que Docker funcione sin problemas en tu máquina de desarrollo no siempre es sencillo:

*   Los usuarios de **Windows** pueden enfrentar problemas de compatibilidad con WSL (Windows Subsystem for Linux), requisitos de Hyper-V o problemas de rendimiento.
*   Los usuarios de **macOS** necesitan trabajar con Docker Desktop, que consume recursos significativos del sistema y tiene requisitos de licenciamiento para organizaciones grandes.
*   Los usuarios de **Linux** tienen la experiencia más nativa, pero aún necesitan permisos y configuración adecuados.

Estos obstáculos de configuración pueden distraerte de tu trabajo principal: escribir código.

### Aprovechando pipelines existentes

La mayoría de los proyectos establecidos ya tienen pipelines CI/CD configurados:

*   Cuando envias código al repositorio, procesos automatizados construyen, testean y despliegan tus cambios.
*   Los entornos de desarrollo y test se actualizan automáticamente con tus cambios.
*   Los logs de construcción y los resultados de despliegue están disponibles a través de tu plataforma CI/CD (Jenkins, GitHub Actions, GitLab CI, etc.).

En estos casos, a menudo es más eficiente:

1.  Envía tus cambios a una rama de funcionalidades (feature branch).
2.  Deja que el pipeline se encargue del proceso de construcción de Docker.
3.  Revisá los logs si ocurren problemas.
4.  Chequeá la aplicación desplegada en el entorno de desarrollo.

Este enfoque te permite concentrarte en la calidad del código mientras que las herramientas de pipeline especializadas manejan el proceso de construcción en entornos consistentes y controlados, diseñados específicamente para esa tarea.

## ¿Por qué todo desarrollador debería entender los básicos de Docker?

-   **Solucioná problemas de despliegue** entendiendo los logs y comportamientos de los contenedores.
-   **Colaborá eficazmente** con equipos de DevOps usando terminología compartida.
-   **Creá entornos consistentes** entre desarrollo y producción.
-   **Escribí código más portable** que no dependa de configuraciones de máquina específicas.
-   **Avanzá en tu carrera** con una habilidad ahora considerada fundamental en el desarrollo moderno.

Entender Docker ayuda a cerrar la brecha entre "en mi máquina funciona" y "funciona en todos lados" – conocimiento esencial en el mundo containerizado de hoy.

## Recurso de aprendizaje recomendado

**Te recomiendo mucho** el video de KodeKloud "Learn Docker in 2 Hours—A Full Tutorial (2025)".

<YouTube id="zJ6WbK9zFpI" />