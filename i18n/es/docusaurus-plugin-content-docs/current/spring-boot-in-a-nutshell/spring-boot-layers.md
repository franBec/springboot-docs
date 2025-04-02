---
sidebar_position: 2
---

# Capas de Spring Boot

Así es como la mayoría de los proyectos con Spring Boot están organizados:

![layers.png](img/layers.png)

| Capa                                  | Responsabilidad                                                                               |
|---------------------------------------|-----------------------------------------------------------------------------------------------|
| Capa de Presentación (`Controllers`)  | Maneja las peticiones HTTP (enrutamiento, validación de entradas), y devuelve respuestas HTTP |
| Capa de Negocio (`Services`)          | Contiene la lógica central de la app (cálculos, flujos de trabajo)                            |
| Capa de Persistencia (`Repositories`) | Administra las interacciones con la base de datos                                             |
| Capa de Integración (`API Clients`)   | Se comunica con APIs externas                                                                 |

El flujo de una petición parte de un `Controller` → `Service`:

* Si estás buscando datos en una base de datos, entonces `Repository` → `Database`.
* Si estás buscando datos de una fuente externa, entonces `API Client` → `External API`.

## ¿De Dónde Vienen Estos Nombres?

Estos nombres de capas (`Controller`, `Service`, `Repository`) vienen de:

* **Patrones de Diseño:**
  * [MVC (Model-View-Controller)](https://www.freecodecamp.org/news/model-view-architecture/): Un patrón de hace décadas para separar la presentación, la lógica y los datos.
  * [Arquitectura en Capas](https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/ch01.html): Una forma estándar de aislar preocupaciones (presentación vs. negocio vs. datos).
* **La evolución de Spring**:
  * Las primeras aplicaciones [Java EE](https://www.geeksforgeeks.org/java-enterprise-edition/) usaban capas parecidas (como los DAOs para el acceso a datos), que Spring formalizó con anotaciones como `@Controller`, `@Service`, `@Repository`.
* **Los nombres no son exclusivos de Spring**: reflejan las mejores prácticas de la industria para lograr un código limpio.

## ¿Es Obligatorio?

No. **Spring no impone estos nombres o capas**. Podrías escribir todo en una sola clase llamada `PizzaManager.java` llena de código enredado.

Pero estas convenciones resuelven problemas reales:

* **Legibilidad**: Los desarrolladores entienden al toque una clase llamada `UserService` en vez de `TaxCalculatorUtil`.
* **Herramientas**: Anotaciones como `@Repository` permiten que Spring maneje automáticamente las excepciones de base de datos.
* **Alineación del equipo**: Los nuevos integrantes (o tu "yo" del futuro) pierden menos tiempo descifrando una estructura personalizada.

## Cuándo Flexionar las Reglas

* **Proyectos pequeños pueden combinar capas** (por ejemplo, una clase `PaymentProcessor` que actúa como servicio y como capa de integración).
* **Aplicaciones que no usan HTTP** (por ejemplo, [trabajos batch](https://www.ibm.com/think/topics/batch-jobs)) pueden omitir completamente los controllers.
* **Si tu equipo usa otros términos** (por ejemplo, `DataManager` en lugar de `Repository`), lo importante es la consistencia más que el nombre en sí.

## Prácticas y Errores Comunes

* **Un servicio por controlador**: Un controlador no debería orquestar 5 servicios. Si lo hace, probablemente tu lógica de negocio está dispersa.
* **Las capas son opcionales**: ¿No tienes base de datos? Omite la capa de persistencia. ¿No hay APIs externas? Omite la capa de integración. Empieza simple.
* **No dejes que las capas se mezclen**:
  * **Malo**: Controllers haciendo lógica de negocio, Repositories haciendo llamadas a APIs.
  * **Bueno**: Cada capa tiene una responsabilidad única.
* **Se permiten llamadas de servicio a servicio**: Los servicios pueden llamarse entre ellos (¡pero evita [dependencias circulares](https://www.baeldung.com/circular-dependencies-in-spring)!).