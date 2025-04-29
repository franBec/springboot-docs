---
sidebar_position: 2
---

# Ejecutá la aplicación

1. **Abrí IntelliJ IDEA** → File → Open → Seleccioná la carpeta del proyecto descomprimido.
2. **Configuración inicial de JDK** (si te la pide):
   * IntelliJ te va a pedir que descargues un JDK. Elegí la **misma versión** que seleccionaste en Spring Initializr (por ejemplo, Java 21).
   * Hacé clic en Download JDK y seguí las instrucciones.
3. **Esperá que terminen las tareas en segundo plano**:
   * Buscá los indicadores de progreso en la **esquina inferior derecha** (por ejemplo, "Downloading Gradle dependencies" o "Indexing").
   * **Dejá que terminen** – configuran las herramientas y librerías de tu proyecto.
4. **Ejecutá la aplicación**:
   * Andá a la clase principal: `src/main/java/dev/pollito/UsersManagerApplication.java`. Hacé clic derecho en la clase → Run `UsersManagerApplication.main()`.

    <div>
       <img src={require('@site/static/img/lets-create-a-spring-boot-project/main.png').default} alt="método main" />
    </div>

5. **Revisá la terminal de ejecución**:
   * Después de unos segundos, vas a ver algo similar a `Started UsersManagerApplication in 2.262 seconds (process running for 2.568)`.
   * ¡Esto significa que tu app Spring Boot está viva!
6. **Pruébala**:
   * Abrí tu navegador y andá a [http://localhost:8080/](http://localhost:8080/).
   * Vas a ver una página de error Whitelabel – esto es normal, ya que aún no desarrollamos nada.

<div>
   <img src={require('@site/static/img/lets-create-a-spring-boot-project/whitelabel.png').default} alt="página de error whitelabel" />
</div>

¡Felicidades! Tu app Spring Boot está ejecutándose – y acá te explico por qué esto es un gran logro:

**Antes de Spring Boot**, hacer que una app Java escuchara en un puerto como el 8080 requería horas de configuración manual:

* Configurar archivos `XML` (como `web.xml`).
* Desplegar archivos `WAR` en un servidor externo (por ejemplo, Tomcat).
* Escribir código boilerplate solo para iniciar el servidor.

**Hoy, con Spring Boot**:

* El servidor Tomcat embebido arranca automáticamente.
* No necesitás nada de código – el método `main()` hace todo.
* No hay `XML` ni configuración manual del servidor.

Acabás de presenciar la magia de Spring Boot: convertir lo que antes era una tarea de días en una tarea de 10 segundos. ¡Y todavía no escribimos ni una sola línea de nuestro propio código!