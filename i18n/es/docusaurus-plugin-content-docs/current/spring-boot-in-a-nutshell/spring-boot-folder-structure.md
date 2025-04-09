---
sidebar_position: 3
---

# Estructura de carpetas en Spring Boot

## Paquetes y la regla de la clase principal

Los paquetes son la forma de Java de agrupar clases relacionadas (como si fueran carpetas).

**Regla crítica**: Tu clase principal (anotada con `@SpringBootApplication`) define el paquete raíz.

* Todos los demás paquetes que crees deben ser sub paquetes de esta raíz (por ejemplo, si tu clase principal está en `com.your.app`, crea `com.your.app.controllers`, no `com.controllers`).
* **¿Por qué?** Spring Boot escanea automáticamente las clases en el paquete raíz y sus sub paquetes. Las clases que queden afuera no se detectarán a menos que las configures explícitamente.

## Estructura default del proyecto

Cuando generas un proyecto Spring Boot (más sobre cómo generarlo en la sección de [Spring Initializr](/lets-create-a-spring-boot-project/spring-initializr)), obtienes una estructura estandarizada de carpetas y archivos.

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
│   │       └── application.properties (o application.yml)
│   └── test/  
│       └── java/com/example/demo/  
├── .gitignore
├── pom.xml (o build.gradle)
└── HELP.md
```

* `DemoApplication.java`: El punto de entrada de tu app. Anotada con `@SpringBootApplication` para habilitar la [autoconfiguración](https://docs.spring.io/spring-boot/reference/using/auto-configuration.html).
* `application.properties` (o `application.yml`): Archivo central de configuración para URLs de bases de datos, puertos del servidor, logging, etc.
* `static/` y `templates/`, vienen vacíos por defecto. Se usan para assets web:
  * `static/`: Sirve imágenes, CSS, JS directamente.
  * `templates/`: HTML renderizado por el servidor (si usas [Thymeleaf](https://www.thymeleaf.org/), [Mustache](https://www.baeldung.com/spring-boot-mustache), etc.).
* `pom.xml` (Maven) o `build.gradle` (Gradle): Define dependencias y plugins (más de esto en la sección de [Maven vs. Gradle](/lets-create-a-spring-boot-project/spring-initializr#project-maven-vs-gradle)).
* `test/`: Preconfigurado para tests con JUnit (más sobre esto en la sección de [Pruebas unitarias](/category/unit-testing)). Incluye una clase esqueleto de prueba `DemoApplicationTests.java`, que verifica que el contexto de la app se carga.

## Organizando el nuevo código

¿Cómo organizamos el nuevo código? Hay tres enfoques…

### Por capa (tradicional)

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

* **Pros**: Simple para proyectos pequeños. Es fácil encontrar todos los controllers/servicios de un vistazo.
* **Contras**:  A medida que la aplicación crece, navegar entre 10+ capas para una sola función (por ejemplo, "User") se vuelve tedioso.

### Por funcionalidad (enfoque moderno)

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

* **Pros**: Todo el código para una funcionalidad vive en un solo lugar. Escala mejor. Fomenta la modularidad.
* **Contras**: Existe el riesgo de duplicar lógica común (por ejemplo, utilidades compartidas).

### Enfoque híbrido (combinando ambos)

```log
src/main/java/com.your.app  
├── shared          <-- Utilidades comunes, excepciones, configuraciones
├── user            <-- Paquete de funcionalidad (controller/service/repo dentro)  
└── product
```

## Conclusiones clave

* Aunque **no hay una respuesta correcta**, en cada proyecto en el que he trabajado he seguido el enfoque tradicional “por capa”.
* **Consistencia > Perfección**: Acorda con tu equipo una estructura y manténganla. Refactoriza más tarde si es necesario.
* **No te enfrentes a los defaults a menos que tengas una razón específica**: Spring Boot depende de esta jerarquía y cualquier desarrollador de Spring puede navegar tu proyecto al instante.