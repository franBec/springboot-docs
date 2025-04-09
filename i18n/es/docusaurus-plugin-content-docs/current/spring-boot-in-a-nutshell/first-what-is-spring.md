---
sidebar_position: 1
---

import YouTube from '@site/src/components/YouTube';

# Primero, ¿qué es Spring?

Antes de entender Spring Boot, necesitas conocer a su "pariente": Spring Framework. Spring es un potente framework de aplicaciones de código abierto para Java que simplifica el desarrollo a nivel empresarial. Su filosofía principal se basa en:

* **Inversión de Control (IoC)**: Deja que el framework maneje la creación de objetos y las dependencias (a través de [Dependency injection](/lets-create-a-spring-boot-project/some-important-concepts#dependency-injection)).
* **Modularidad**: Elige solo los componentes que necesites.
* **Flexibilidad**: Soporta desde microservicios hasta aplicaciones monolíticas.

Pero con gran poder viene una gran cantidad de configuraciones. Configurar un proyecto Spring de manera tradicional implica escribir archivos XML y lidiar con código repetitivo. En el tutorial de abajo, tomó aproximadamente 30 minutos tener todo listo. Si te da curiosidad, échale un vistazo, pero no es obligatorio.

<YouTube id="e8aSyQo0nHo" />

Aquí es donde Spring Boot entra para salvar el día.

## Cómo Spring Boot simplifica el desarrollo

Spring Boot no reemplaza a Spring—es una extensión superpotenciada que elimina la chamba tediosa. Así es como te facilita la vida:

* **Convención Sobre Configuración**: Configuraciones predeterminadas para dependencias, estructura del proyecto y ajustes. ¡Se acabó el infierno XML!
* **Servidores Embebidos**: Incluye un servidor [Tomcat](https://tomcat.apache.org/), [Jetty](https://jetty.org/index.html) o [Undertow](https://undertow.io/) directamente en tu app. Solo corre el `JAR`—sin necesidad de configuraciones externas.
* **Dependencias Starter**: ¿Necesitas seguridad, acceso a base de datos o capacidades web? Agrega `spring-boot-starter-web` o `spring-boot-starter-data-jpa`, y Spring Boot configura lo esencial automáticamente.
* **Autoconfiguración**: Detecta las librerías en tu classpath y configura todo con valores sensatos.
* **Herramientas Listas Para Producción**: Métricas integradas, chequeos de salud y gestión del ambiente mediante [Spring Actuator](https://github.com/spring-projects/spring-boot/tree/v3.4.2/spring-boot-project/spring-boot-actuator).

En resumen, Spring Boot te permite concentrarte en escribir la lógica de negocio en lugar de lidiar con la infraestructura.