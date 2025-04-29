---
sidebar_position: 1
---

import YouTube from '@site/src/components/YouTube';

# ¿Qué es Spring?

Antes de entender Spring Boot, necesitás conocer a su predecesor: Spring Framework. Spring es un framework de aplicaciones de código abierto y potente para Java que simplifica el desarrollo a nivel empresarial. Su filosofía principal gira en torno a:

* **Inversión de control (IoC)**: Deja que el framework maneje la creación de objetos y las dependencias (a través de la [inyección de dependencias](/spring-boot-in-a-nutshell/dependency-injection)).
* **Modularidad**: Elegí los componentes que necesitás.
* **Flexibilidad**: Soporta desde microservicios hasta apps monolíticas.

Pero con gran poder viene una gran configuración. Configurar un proyecto Spring tradicionalmente implica escribir archivos XML y luchar con código boilerplate. En el tutorial de abajo, tomó aproximadamente 30 minutos tener todo listo. Si te da curiosidad, podés verlo, pero no es necesario.

<YouTube id="e8aSyQo0nHo" />

Acá es donde Spring Boot entra para salvar el día.

## Cómo Spring Boot simplifica el desarrollo

Spring Boot no reemplaza a Spring—es una extensión superpotenciada que elimina la chamba tediosa. Así es como te facilita la vida:

* **Convención sobre configuración**: Valores predeterminados para dependencias, estructura del proyecto y configuraciones. ¡Se acabó el infierno del XML!
* **Servidores embebidos**: Incluí un servidor [Tomcat](https://tomcat.apache.org/), [Jetty](https://jetty.org/index.html) o [Undertow](https://undertow.io/) directamente en tu app. Solo ejecutá el `JAR`—no necesitás configuración externa.
* **Dependencies 'starter'**: ¿Necesitás seguridad, acceso a base de datos, o funcionalidades web? Agregá `spring-boot-starter-web` o `spring-boot-starter-data-jpa`, y Spring Boot autoconfigura lo esencial.
* **Autoconfiguración**: Detecta librerías en tu classpath y establece valores predeterminados sensatos.
* **Herramientas listas para producción**: Métricas, chequeos de salud y gestión de entorno integrados a través de [Spring Actuator](https://github.com/spring-projects/spring-boot/tree/v3.4.2/spring-boot-project/spring-boot-actuator).

En resumen, Spring Boot te permite enfocarte en escribir lógica de negocio en lugar de luchar con la infraestructura.