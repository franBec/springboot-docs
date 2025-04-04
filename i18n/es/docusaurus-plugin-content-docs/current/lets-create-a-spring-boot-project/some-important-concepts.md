---
sidebar_position: 4
---

import YouTube from '@site/src/components/YouTube';

# Algunos Conceptos Importantes Antes de Continuar

## Git

No vas a construir una casa sin arnés, ¿cierto? No escribas código sin [control de versiones](https://github.com/resources/articles/software-development/what-is-version-control). Acá van algunos tips:

1. **Git primero, código después**: Siempre hacé git init antes de escribir la primer línea de código.
2. **Terminal > Interfaz Gráfica**. Herramientas como GitHub Desktop son geniales, pero primero aprendé estos 4 comandos:

   `git add ., git commit -m "save point", git push, git checkout -b`

   ¿Por qué? Porque cuando el plugin de Git de tu IDE se rompa misteriosamente (va a pasar), vas a necesitar debuggear como un pro.
3. **Las Reglas de Tu Equipo > Gitflow de Libro de Texto**: Quizás te encanten las ramas de features, pero cada empresa tiene su propio flujo "sagrado". Observá primero y luego proponé mejoras.
4. **El Kit de Supervivencia Git de 15 Minutos**: Si por alguna razón llegaste acá sin saber lo básico de Git... primero, ¿cómo llegaste? Me sorprende. Acá te dejo el kit de supervivencia:
   * [Oh Shit, Git!?!](https://ohshitgit.com/).
   * [GitHub Training Kit](https://training.github.com/).
   * Cualquier tutorial de YouTube con el que te sientas cómodo.

## Formateadores

Un **formateador** da estilo automáticamente a tu código (indentación, espacios, saltos de línea) para que se mantenga la consistencia. Olvidate de los debates de "tabs vs. espacios".

<YouTube id="V7PLxL8jIl8" />

Antes de imponer un formateador, revisá el flujo de trabajo de tu equipo:

* **Si tu equipo ya usa un formateador** (por ej., [Checkstyle](https://checkstyle.org/), [Google Java Format](https://github.com/google/google-java-format)), seguí su configuración—consistencia > preferencia personal.
* **Para proyectos existentes sin formateador**, consultá primero con el equipo. Un cambio repentino de formateo en una base de código compartida puede enterrar cambios importantes en medio del ruido. Si se acuerda, hacé un commit dedicado exclusivamente al formateo (¡sin cambios de lógica!) para simplificar las revisiones de código.

Recomiendo [Spotless](https://github.com/diffplug/spotless). ¿Por qué? Por preferencia personal, es el que siempre he usado y no me he molestado en revisar otros.

## Tareas de Gradle

Pensá en Gradle como el asistente personal de tu código. Estas "tareas" son comandos que:

* Compilan código.
* Ejecutan tests.
* Empaquetan tu app en un `JAR`.

IntelliJ IDEA te ofrece un lindo menú en la barra lateral:

* Buscá el ícono de elefante 🐘 en el borde derecho (Toolbar de Gradle).
* Expandí your-project > Tasks > build.

<div>
   <img src={require('@site/static/img/lets-create-a-spring-boot-project/gradle-tasks.png').default} alt="gradle tasks" />
</div>

Las dos tareas que realmente vas a usar son **build** (compilar + testear + empaquetar en `JAR`) y **clean** (la opción nuclear para cuando aparecen errores raros; borra todos los archivos de build).

* No te enredes memorizando todas las tareas: sólo recordá estas 2, y cuando necesités otras, Google será tu mejor amigo.

Nos saltamos los detalles de Maven acá, pero si escuchaste términos como `mvn clean install`—es el mismo circo, distintos payasos (Gradle sólo llama "tareas" a los trucos).

## Interfaces e Implementaciones

Dividamos esto en dos partes: la **interfaz** (el "qué") y la **implementación** (el "cómo").

### ¿Qué es una Interfaz?

Pensá en una interfaz como el menú de un restaurante. Te lista los platos disponibles (métodos), pero no te dice cómo se cocinan.

### ¿Qué es una Implementación?

Si la interfaz es el menú del restaurante, la implementación es la cocina que realmente cocina lo que pediste. Es el trabajo sucio – la clase Java que hace lo que la interfaz prometió.

### ¿Por Qué Es Importante?

* **Flexibilidad**: Cambiá implementaciones sin romper el código (por ej., pasar de datos hardcodeados a una base de datos más adelante).
* **Testing**: Es facilísimo simular (mock) la interfaz para testear otros componentes.
* **Claridad**: Separa el “qué” del “cómo” para tener un código más limpio. Las implementaciones reales se vuelven un desorden – por eso las escondemos tras interfaces limpias.
* Spring Boot inyecta automáticamente la "cocina" correcta cuando pedís un "plato" (esto se llama [Inyección de Dependencias](/lets-create-a-spring-boot-project/some-important-concepts#dependency-injection)).

## Inyección de Dependencias

Revisemos una vez más el diagrama de [Capas de Spring Boot](/spring-boot-in-a-nutshell/spring-boot-layers) y pregúntate:

> ¿Cómo se comunican entre sí las capas dentro de una aplicación Spring Boot?

<div>
   <img src={require('@site/static/img/lets-create-a-spring-boot-project/dependency-injection.png').default} alt="dependency injection" />
</div>

La respuesta: **Inyección de Dependencias**.

En nuestro diagrama, las dependencias se "leen" de izquierda a derecha:

* Un Controller depende de un Service.
* Un Service depende de un Repository.
* Un Service depende de un ApiClient.

Fijémonos en el primero: "Un Controller depende de un Service". ¿Cómo lo escribimos? Hay tres formas de hacerlo.

### Inyección por Campo

```java
@RestController
public class CheckoutController {

    @Autowired
    private PaymentService paymentService;

    // Lógica del Controller
}
```

### Inyección por Setter

```java
@RestController
public class CheckoutController {

    private PaymentService paymentService;

    @Autowired
    public void setPaymentService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    // Lógica del Controller
}
```

### Inyección por Constructor

```java
@RestController
public class CheckoutController {

    private final PaymentService paymentService;

    public CheckoutController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    // Lógica del Controller
}
```

**La inyección por constructor es la opción recomendada**:

* **Sin nulos** – Tus dependencias llegan completas.
* **Inmutable** – No podés cambiar accidentalmente tu base de datos por una tostadora a mitad de una petición.
* **Facilita las pruebas** – No necesitás magia de Spring en los tests unitarios.

### Inyección por Constructor con Lombok

Con Lombok, la inyección por constructor se simplifica aun más (y esta es mi opción recomendada):

```java
@RestController
@RequiredArgConstructor // <-- Anotación de Lombok
public class CheckoutController {

    private final PaymentService paymentService;

    // Lógica del Controller
}
```

Como nota final sobre este tema, **realmente recomiendo** el video de CodeAesthetic “Dependency Injection, The Best Pattern”.

<YouTube id="J1f5b4vcxCQ" /> 