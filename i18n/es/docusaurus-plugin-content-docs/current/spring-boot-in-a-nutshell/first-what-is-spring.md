---
sidebar_position: 1
---

import YouTube from '@site/src/components/YouTube';

# ¿Qué Es Spring?

Antes de comprender Spring Boot, es necesario conocer sobre lo que está basado: Spring Framework. Spring es un potente framework de aplicaciones de código abierto para Java que simplifica el desarrollo empresarial. Su filosofía principal se basa en:

* **Inversión de Control (IoC)**: Permite que el framework gestione la creación de objetos y las dependencias (mediante la [Dependency injection](/lets-create-a-spring-boot-project/some-important-concepts#dependency-injection)).
* **Modularidad**: Permite seleccionar los componentes según las necesidades.
* **Flexibilidad**: Admite todo tipo de aplicaciones, desde microservicios hasta monolíticas.

Pero un gran poder conlleva una gran configuración. Configurar un proyecto Spring tradicionalmente implica escribir archivos XML y lidiar con código repetitivo. En el tutorial a continuación, se tardó aproximadamente 30 minutos en prepararlo todo. Si tienes curiosidad, puedes verlo, pero no es necesario.

<YouTube id="e8aSyQo0nHo" />

Aquí es donde Spring Boot interviene para salvar el día.

## Cómo Spring Boot Simplifica El Desarrollo

Spring Boot no reemplaza a Spring; es una extensión potente que simplifica el trabajo pesado. Así es como simplifica la vida:

* **Convención antes que configuración**: Valores predeterminados predefinidos para dependencias, estructura del proyecto y configuración. ¡Se acabó el XML!
* **Servidores integrados**: Integra un servidor [Tomcat](https://tomcat.apache.org/), [Jetty](https://jetty.org/index.html) o [Undertow](https://undertow.io/) directamente en tu aplicación. Simplemente ejecuta el `JAR`; no se requiere configuración externa.
* **Dependencias de inicio**: ¿Necesitas seguridad, acceso a la base de datos o funcionalidades web? Agrega `spring-boot-starter-web` o `spring-boot-starter-data-jpa` y Spring Boot autoconfigurará lo esencial.
* **Autoconfiguración**: Detecta bibliotecas en tu classpath y establece valores predeterminados adecuados.
* **Herramientas listas para producción**: Métricas integradas, comprobaciones de estado y gestión del entorno mediante [Spring Actuator](https://github.com/spring-projects/spring-boot/tree/v3.4.2/spring-boot-project/spring-boot-actuator).

En resumen, Spring Boot te permite centrarte en escribir la lógica de negocio en lugar de lidiar con la infraestructura.
