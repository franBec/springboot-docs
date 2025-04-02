---
sidebar_position: 1
---

# Spring Initializr

Visita [Spring Initializr](https://start.spring.io/), el generador oficial de proyectos Spring Boot (mención honorífica a [Bootify](https://bootify.io/), una alternativa interesante).

Verás un formulario, pero no te preocupes. Vamos a desmenuzar cada opción.

![spring-initializr.png](img/spring-initializr.png)

## Proyecto: Maven vs Gradle

Piensa en estos como los gestores de tu proyecto. Ellos se encargan de:

* Descargar librerías/dependencias.
* Definir pasos (compilar código, correr tests, generar archivos `JAR`).
* Mantener la estructura del proyecto organizada y estandarizada.

| Aspecto       | Maven                                     | Gradle                                                   |
|---------------|-------------------------------------------|----------------------------------------------------------|
| Configuración | Usa XML (estructurado con `<tags>`)       | Usa Kotlin/Groovy (una sintaxis parecida a código)       |
| Flexibilidad  | Estricto, con convenciones estandarizadas | Altamente personalizable (soporta lógica como `if-else`) |
| Casos de Uso  | Proyectos Java antiguos o empresariales   | Apps Android, proyectos modernos en Java/Kotlin          |

### ¿Cuál Elegir?

![maven-gradle-decision-tree.png](img/maven-gradle-decision-tree.png)

### Por Qué No Importa Tanto

Ambos harán lo siguiente:

* Descargarán las dependencias de Spring Boot de la misma manera.
* Crearán el mismo archivo JAR ejecutable.

Discutir entre Maven o Gradle es como pelearse por usar una licuadora o un procesador de alimentos – ambos hacen smoothies, solo que tienen botones distintos. Spring Initializr se encarga de toda la configuración complicada de todas formas.

## Spring Boot Versions

Al seleccionar una versión de Spring Boot te encontrarás con tres tipos de etiquetas:

* **SNAPSHOT**
  * Indica que es una compilación en desarrollo de Spring Boot.
  * Estas versiones son inestables, están en constante cambio y pueden incluir características sin probar o bugs.
  * Evítalas para producción, ya que pueden cambiar de la noche a la mañana.
* M1, M2, etc. (**Milestones**)
  * Versiones previas que marcan hitos importantes (por ejemplo, nuevas funcionalidades) antes de una versión estable.
  * Son más estables que las SNAPSHOT pero aún no están listas para producción. Ideales para probar temprano lo que viene.
* Sin Marca (**Versiones Estables**)
  * Estas son versiones estables, rigurosamente probadas y listas para producción.

**Siempre opta por la versión estable más alta** (sin etiquetas SNAPSHOT/M) a menos que necesites funcionalidades experimentales.

## Project Metadata

La sección **Project Metadata** define la identidad y la estructura de tu proyecto. Aquí tienes un desglose de cada campo y las convenciones recomendadas:

| Campo        | Qué Significa                                                                  | Estructura/Estándar Recomendado                                       | Ejemplo                                             |
|--------------|--------------------------------------------------------------------------------|-----------------------------------------------------------------------|-----------------------------------------------------|
| Group        | Identifica a tu organización/equipo                                            | Usa notación de nombre de dominio invertido. Evita términos genéricos | `com.acme`                                          |
| Artifact     | El nombre del proyecto                                                         | Usa letras minúsculas y guiones para nombres compuestos               | `inventory-service`                                 |
| Name         | Nombre para mostrar de forma amigable                                          | Usa espacios y mayúsculas para que sea legible                        | Inventory Management                                |
| Description  | Resumen breve del propósito del proyecto. Se agrega a `pom.xml`/`build.gradle` | Sé breve (1–2 oraciones) y específico                                 | Microservicio para gestionar inventario del almacén |
| Package Name | Paquete raíz de Java para el código fuente                                     | Se deriva de Group + Artifact (quitando los guiones)                  | `com.acme.inventoryservice`                         |

**Preferencia personal:** A mí me gusta usar el guion bajo ( _ ) en el nombre del artifact. No hay regla en contra, solo que no es lo habitual. Pero siento que ayuda a mantener la consistencia, ya que Spring Initializr reemplazará el guion con guion bajo en algunas carpetas.

## Packaging: JAR vs WAR

El **Packaging** determina cómo se agrupa tu aplicación en un único archivo compartible, permitiendo que se ejecute sin complicaciones en cualquier sistema sin necesidad de una configuración compleja.

| Formato | Ideal Para                                                                                                                                                                  | Diferencia Clave                                                                                             |
|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| `JAR`   | Apps modernas de Spring Boot, microservicios, despliegues en la nube                                                                                                        | Contiene un servidor embebido (por ejemplo, [Tomcat](https://tomcat.apache.org/)) para su ejecución autónoma |
| `WAR`   | Apps antiguas o despliegues en servidores externos (por ejemplo, Tomcat tradicional, [JBoss](https://www.redhat.com/en/technologies/jboss-middleware/application-platform)) | Requiere un servidor aparte para trabajar; no incluye servidor embebido                                      |

**Usa JAR a menos que estés atado a infraestructuras antiguas**. `JAR` es el formato por defecto en Spring Boot. El servidor embebido de Spring Boot hace que `JAR` sea la opción liviana y sin complicaciones para la mayoría de los proyectos actuales.

## Java Version

* Quédate con la versión que usa tu equipo.
  * Si tu equipo está usando una versión antigua y sin soporte, elige la versión más baja que ofrece Spring Initializr.
* Si no tienes claro cuál elegir, [elige la última LTS](https://www.oracle.com/java/technologies/java-se-support-roadmap.html)—es la opción ideal.

## Dependencias

Las dependencias son librerías preconstruidas que añaden funciones específicas a tu app (como herramientas en una caja de herramientas). Por ahora, usaremos las que necesitarás en el 90% de los proyectos Spring en el mundo real:

| Dependencia                                                                                                                                                          | Categoría                         | Por Qué La Necesitas                                                                                       |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|------------------------------------------------------------------------------------------------------------|
| [Lombok](https://projectlombok.org/)                                                                                                                                 | Herramientas para Desarrolladores | Reduce el código repetitivo (por ejemplo, getters/setters) con anotaciones simples                         |
| [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/3.3.4/reference/htmlsingle/index.html#actuator)                                                       | Operaciones/Monitoreo             | Añade chequeos de salud, métricas y endpoints de administración para tu app                                |
| [Spring Boot DevTools](https://docs.spring.io/spring-boot/docs/3.3.4/reference/htmlsingle/index.html#using.devtools)                                                 | Herramientas para Desarrolladores | Acelera el desarrollo con reinicios automáticos, LiveReload y configuraciones amigables para depuración    |
| [Spring Configuration Processor](https://docs.spring.io/spring-boot/docs/3.3.4/reference/htmlsingle/index.html#appendix.configuration-metadata.annotation-processor) | Herramientas para Desarrolladores | Permite la autocompletación de código en configuraciones personalizadas de `application.properties`/`yml`. |
| [Spring Web](https://docs.spring.io/spring-boot/docs/3.3.4/reference/htmlsingle/index.html#web)                                                                      | Web                               | Permite crear APIs REST con Spring MVC + un servidor Tomcat embebido                                       |

## Generar

Una vez que hayas configurado tu app de Spring Boot, presiona el botón Generate (o Ctrl + Enter). Spring Initializr empaquetará tu proyecto en un archivo .zip.

En la captura de pantalla de abajo, estoy creando la **aplicación Users Manager que desarrollaremos durante el resto de esta guía**.

![generating-project.png](img/generating-project.png)

¿Qué hay dentro del zip?

* Una estructura de proyecto estándar (carpetas para el código, tests, configuraciones).
* Un `pom.xml` preconfigurado (para Maven) o `build.gradle` (para Gradle).
* Un archivo inicial `application.properties`.
* La clase principal (`*Application.java`) para ejecutar tu app.

No te preocupes por los detalles todavía – ¡descomprimiremos y exploraremos todo juntos en los siguientes pasos!