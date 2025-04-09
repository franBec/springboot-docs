---
sidebar_position: 3
---

import YouTube from '@site/src/components/YouTube';

# Docker

Si andás desarrollando software desde hace un tiempo, seguramente ya viste este logo:

<div className="image-container">
  <img src={require('@site/static/img/deployment/docker.png').default} alt="Docker Logo" width="174" height="146" />
</div>

[Docker](https://www.docker.com/) es como un contenedor estándar para software. Así como los contenedores de envío revolucionaron el comercio global al proveer una manera estandarizada de transportar mercancías sin importar su contenido, Docker provee una forma estándar de empaquetar y ejecutar software sin importar la infraestructura subyacente.

Pensá en Docker como crear una caja completa y autónoma que tiene todo lo que tu aplicación necesita para ejecutarse:

* La propia aplicación.
* Todas las librerías y dependencias.
* El entorno de ejecución.
* La configuración.

Esta "caja" (llamada contenedor) puede moverse y ejecutarse de forma consistente en cualquier sistema que soporte Docker, *desde la laptop de un desarrollador hasta un ambiente de testing o un servidor de producción*.

## ¿Por qué dockerizar aplicaciones Spring Boot?

Las aplicaciones Spring Boot son candidatas perfectas para contenedores Docker por varias razones:

1. **Portabilidad entre ambientes**.
   * Los contenedores Docker empaquetan la aplicación junto con todas sus dependencias (por ejemplo, JDK, librerías).
   * Se asegura la consistencia entre distintos ambientes (desarrollo, staging, producción), evitando el clásico problema de “funciona en mi máquina”.
2. **Facilidad de despliegue**.
   * Una imagen Docker es un artefacto independiente que se puede desplegar en donde Docker sea soportado (on-premise, AWS, GCP, Azure, etc.).
3. **Escalabilidad**.
   * Los contenedores son livianos en comparación con las máquinas virtuales tradicionales, lo que permite levantar múltiples instancias de tu aplicación Spring Boot rápidamente.
   * Es muy útil en arquitecturas de microservicios, donde escalar servicios individualmente es común.
4. **Aislamiento**.
   * Cada contenedor Docker corre en su propio ambiente aislado.
   * Esto evita conflictos entre las dependencias de tu aplicación Spring Boot y otras aplicaciones o librerías del sistema.
5. **Pipelines CI/CD simplificados**.
   * Docker se integra sin problemas con herramientas de CI/CD como Jenkins, GitLab CI o GitHub Actions.
6. **Mejor utilización de recursos**.
   * Los contenedores comparten el kernel del sistema operativo, haciendo que sean más eficientes en el uso de recursos que las máquinas virtuales tradicionales.
   * Esto permite ejecutar más instancias de tu aplicación Spring Boot en el mismo hardware.
7. **Versionado y rollbacks**.
   * Las imágenes Docker se versionan, lo que te permite rastrear cambios y regresar a una versión anterior si es necesario.
8. **Alineación con cloud-native**.
   * La mayoría de las plataformas en la nube están optimizadas para aplicaciones contenedorizadas.
9. **Facilita la colaboración en equipo**.
   * Tanto los desarrolladores como los equipos de DevOps pueden usar la misma imagen Docker para asegurar que todos trabajen con configuraciones idénticas de la aplicación.

## Dockerfile para Spring Boot

Un `Dockerfile` define cómo se debe contenedorar tu aplicación Spring Boot. Acá tenés mi propia implementación:

```Dockerfile
# Build Stage
FROM gradle:jdk21-alpine AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build -x test --no-daemon

# Run Stage
FROM eclipse-temurin:21-jre-alpine
RUN apk add --no-cache curl
COPY --from=build /home/gradle/src/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

Sin embargo, si te unís a un equipo que ya tiene su propio `Dockerfile` definido, es mejor evitar modificaciones a menos que sea necesario.

### Comprendiendo la compilación en múltiples etapas

Este `Dockerfile` utiliza lo que se llama un [multi-stage build](https://docs.docker.com/build/building/multi-stage/):

**Etapa de compilación**. Esta primera etapa es como un taller donde se construye la aplicación:

1. Se parte de un contenedor que tiene Gradle y el [Java Development Kit (JDK)](https://www.geeksforgeeks.org/jdk-in-java/).
2. Se copia el proyecto Spring Boot dentro de este contenedor.
3. Se ejecuta el comando de compilación de Gradle para compilar la aplicación y crear un archivo `JAR`.
4. Cuando termina, se tiene la aplicación compilada, pero también muchas herramientas de compilación que ya no se necesitan.

**Etapa de ejecución**. Esta segunda etapa es el contenedor real que se va a ejecutar:

1. Se parte de un contenedor mucho más pequeño que solo tiene el [Java Runtime Environment (JRE)](https://www.geeksforgeeks.org/jre-in-java/).
2. Se instala curl para chequeos de salud y para solucionar problemas.
3. Se copia únicamente el archivo `JAR` final desde la etapa de compilación.
4. Se establece el comando para ejecutar la aplicación.

### Beneficios de este enfoque

Este enfoque de dos etapas ofrece varias ventajas:

* **Tamaño final de imagen más pequeño:** El contenedor final solo incluye lo necesario para ejecutar la aplicación, sin incluir herramientas de compilación.
* **Mejor seguridad:** Menos componentes significa menos posibles vulnerabilidades.
* **Despliegues más rápidos:** Las imágenes más pequeñas se despliegan más rápidamente.
* **Separación más limpia:** Los aspectos de compilación se separan de los de ejecución.

## ¿Ahora debo construir el contenedor, verdad?

<div>
  <img src={require('@site/static/img/deployment/well-yes-but-no.png').default} alt="bueno, sí, pero no" />
</div>

Aunque lo ideal es construir y probar imágenes Docker localmente, en muchos entornos profesionales los desarrolladores adoptan un enfoque distinto:

### Desafíos con la instalación de Docker

Hacer que Docker funcione sin problemas en tu máquina de desarrollo no siempre es sencillo:

* **Usuarios de Windows** pueden enfrentar problemas de compatibilidad con WSL (Windows Subsystem for Linux), requisitos de Hyper-V o preocupaciones de rendimiento.
* **Usuarios de macOS** tienen que trabajar con Docker Desktop, que consume bastantes recursos del sistema y tiene requisitos de licencia para organizaciones grandes.
* **Usuarios de Linux** tienen la experiencia más nativa, pero igualmente necesitan permisos y configuraciones adecuadas.

Estos obstáculos de configuración pueden distraerte de tu trabajo principal: escribir código.

### Aprovechando pipelines existentes

La mayoría de los proyectos establecidos ya tienen pipelines CI/CD configurados:

* Cuando empujás código al repositorio, los procesos automatizados construyen, prueban y despliegan tus cambios.
* Los ambientes de desarrollo y testing se actualizan automáticamente con tus modificaciones.
* Los registros de construcción y resultados de despliegue están disponibles a través de tu plataforma CI/CD (Jenkins, GitHub Actions, GitLab CI, etc.).

En estos casos, es a menudo más eficiente:

1. Empujar tus cambios a una rama de funcionalidad.
2. Dejar que el pipeline se encargue del proceso de build en Docker.
3. Revisar los logs si surge algún problema.
4. Chequear la aplicación desplegada en el ambiente de desarrollo.

Este enfoque te permite concentrarte en la calidad del código mientras las herramientas especializadas en pipelines manejan el proceso de construcción en entornos consistentes y controlados.

## Por qué todo desarrollador debería entender los conceptos básicos de Docker

- **Resolver problemas de despliegue** entendiendo los logs y el comportamiento de los contenedores.
- **Colaborar de forma efectiva** con equipos de DevOps usando una terminología compartida.
- **Crear ambientes consistentes** entre desarrollo y producción.
- **Escribir código más portable** que no dependa de configuraciones específicas de la máquina.
- **Impulsar tu carrera** con una habilidad ahora considerada fundamental en el desarrollo moderno.

Comprender Docker ayuda a cerrar la brecha entre “funciona en mi máquina” y “funciona en todas partes”, un conocimiento esencial en el mundo de hoy basado en contenedores.

## Recurso de aprendizaje recomendado

**Te recomiendo muchísimo** el video de KodeKloud "Learn Docker in 2 Hours - A Full Tutorial (2025)".

<YouTube id="zJ6WbK9zFpI" />