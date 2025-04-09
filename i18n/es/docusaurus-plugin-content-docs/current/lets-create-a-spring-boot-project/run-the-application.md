---
sidebar_position: 3
---

# Ejecuta la aplicación

1. **Abrí IntelliJ IDEA** → File → Open → Seleccioná la carpeta del proyecto descomprimido.
2. **Configuración Inicial del JDK** (si te lo pide):
   * IntelliJ te va a preguntar por descargar un JDK. Elegí la **misma versión** que seleccionaste en Spring Initializr (por ej., Java 21).
   * Hacé clic en Download JDK y seguí los pasos.
3. **Esperá a Que Finalicen las Tareas en Segundo Plano**:
   * Mirá los indicadores de progreso en la **parte inferior derecha** (por ejemplo, "Downloading Gradle dependencies" o "Indexing").
   * **Dejá que terminen** – están configurando las herramientas y librerías de tu proyecto.
4. **Ejecutá la Aplicación**:
   * Navegá a la clase principal: `src/main/java/dev/pollito/UsersManagerApplication.java`. Hacé clic derecho en la clase → Run `UsersManagerApplication.main()`.

   <div>
      <img src={require('@site/static/img/lets-create-a-spring-boot-project/main.png').default} alt="main" />
   </div>

5. **Revisá el Terminal de Ejecución**:
   * Después de unos segundos, verás algo similar a `Started UsersManagerApplication in 2.262 seconds (process running for 2.568)`.
   * Esto significa que tu app Spring Boot está en ejecutándose.
6. **Probala**:
   * Abrí tu navegador y andá a [http://localhost:8080/](http://localhost:8080/).
   * Vas a ver una Whitelabel Error Page – esto es normal porque todavía no hemos hecho desarrollo.

<div>
   <img src={require('@site/static/img/lets-create-a-spring-boot-project/whitelabel.png').default} alt="whitelabel" />
</div>

¡Felicidades! Tu app Spring Boot está ejecutándose – y acá te digo por qué es tan importante:

**Antes de Spring Boot**, lograr que una app en Java escuche en un puerto como el 8080 requería horas de configuración manual:

* Configurar archivos `XML` (como `web.xml`).
* Desplegar archivos `WAR` en un servidor externo (por ej., Tomcat).
* Escribir código boilerplate solo para arrancar el servidor.

**Hoy, con Spring Boot**:

* El servidor embebido de Tomcat arranca automáticamente.
* No se necesita ni una línea de código – el método `main()` lo hace todo.
* No hay `XML` ni configuración manual del servidor.

Acabás de presenciar la magia de Spring Boot: transformar lo que antes tomaba días en una tarea de 10 segundos. ¡Y ni siquiera hemos escrito ni una línea de nuestro propio código!