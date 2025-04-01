---
sidebar_position: 3
---

# Estructura De Carpetas De Spring Boot

## Paquetes Y La Regla De La Clase Principal

Los paquetes son la forma en que Java agrupa clases relacionadas (como carpetas).

**Regla crítica**: La clase principal (anotada con `@SpringBootApplication`) define el paquete raíz.

* Todos los demás paquetes que cree deben ser subpaquetes de esta raíz (por ejemplo, si su clase principal está en `com.your.app`, cree `com.your.app.controllers`, no `com.controllers`).
* **¿Por qué?** Spring Boot escanea automáticamente las clases del paquete raíz y sus subpaquetes. Las clases externas no se detectarán a menos que se configuren explícitamente.

## Estructura Predeterminada Del Proyecto

Al generar un proyecto Spring Boot (más información sobre cómo generar un proyecto en la sección [Spring Initializr](/lets-create-a-spring-boot-project/spring-initializr)), se obtiene una estructura estandarizada de carpetas y archivos.

```log
your-project/  
├── src/  
│   ├── main/  
│   │   ├── java/  
│   │   │   └── com/example/demo/  
│   │   │       └── DemoApplication.java
│   │   └── resources/  
│   │       ├── static/
│   │       ├── templates/
│   │       └── application.properties (or application.yml)
│   └── test/  
│       └── java/com/example/demo/  
├── .gitignore
├── pom.xml (or build.gradle)
└── HELP.md
```

* `DemoApplication.java`: El punto de entrada de tu aplicación. Anotado con `@SpringBootApplication` para habilitar la [autoconfiguración](https://docs.spring.io/spring-boot/reference/using/auto-configuration.html).
* `application.properties` (o `application.yml`): Archivo de configuración central para las URL de la base de datos, los puertos del servidor, el registro, etc.
* `static/` y `templates/`, vacíos por defecto. Se usan para recursos web:
  * `static/`: Sirve imágenes, CSS y JS directamente.
  * `templates/`: HTML renderizado por el servidor (si se usa [Thymeleaf](https://www.thymeleaf.org/), [Mustache](https://www.baeldung.com/spring-boot-mustache), etc.).
* `pom.xml` (Maven) o `build.gradle` (Gradle): Define dependencias y complementos (más información en la sección [Maven vs. Gradle](/lets-create-a-spring-boot-project/spring-initializr#project-maven-vs-gradle)).
* `test/`: Preconfigurado para pruebas JUnit (más información en la sección [Pruebas unitarias](/category/unit-testing)). Incluye una clase de prueba básica, `DemoApplicationTests.java`, que verifica la carga del contexto de la aplicación.

## Organización Del Nuevo Código

¿Cómo organizamos el nuevo código? Hay tres enfoques…

### Por Capa (Tradicional)

```log
src/main/java/com.your.app  
├── controller  
│   ├── UserController.java  
│   └── ProductController.java  
├── service  
│   ├── UserService.java  
│   └── ProductService.java  
└── repository  
    ├── UserRepository.java  
    └── ProductRepository.java
```

* **Ventajas**: Sencillo para proyectos pequeños. Es fácil encontrar todos los controladores/servicios de un vistazo.
* **Desventajas**: A medida que la aplicación crece, navegar entre más de 10 capas para una sola función (por ejemplo, "Usuario") se vuelve tedioso.

### Por Característica (Enfoque Moderno)

```log
src/main/java/com.your.app  
├── user  
│   ├── UserController.java  
│   ├── UserService.java  
│   └── UserRepository.java  
└── product  
    ├── ProductController.java  
    ├── ProductService.java  
    └── ProductRepository.java
```

* **Ventajas**: Todo el código de una función reside en un solo lugar. Escalabilidad mejorada. Fomenta la modularidad.
* **Desventajas**: Riesgo de duplicación de lógica común (p. ej., utilidades compartidas).

### Enfoque Híbrido (Mezcla De Ambos)

```log
src/main/java/com.your.app  
├── shared          <-- Common utilities, exceptions, configs  
├── user            <-- Feature package (controller/service/repo inside)  
└── product
```

## Puntos Clave
* Aunque **no hay una respuesta correcta**, todos los proyectos en los que trabajé siguieron el enfoque tradicional "por capas".
* **Consistencia > Perfección**: Acuerda una estructura con tu equipo y apégate a ella. Refactoriza más adelante si es necesario.
* **No te opongas a los valores predeterminados a menos que tengas una razón específica**: Spring Boot se basa en esta jerarquía y cualquier desarrollador de Spring puede navegar tu proyecto al instante.