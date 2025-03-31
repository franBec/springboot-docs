---
sidebar_position: 2
---

# Capas De Spring Boot

Así es como se organizan la mayoría de los proyectos de Spring Boot:

![layers.png](img/layers.png)

| Capa                                  | Responsabilidad                                                                         |
|---------------------------------------|-----------------------------------------------------------------------------------------|
| Capa de Presentación (`Controllers`)  | Maneja solicitudes HTTP (enrutamiento, validación de entrada), devuelve respuestas HTTP |
| Capa de Negocio (`Services`)          | Contiene la lógica central de la aplicación (cálculos, flujos de trabajo)               |
| Capa de Persistencia (`Repositories`) | Gestiona las interacciones de la base de datos                                          |
| Capa de Integración (`API Clients`)   | Se comunica con API externas                                                            |

El flujo de una solicitud comienza con `Controller` → `Service`:

* Si está obteniendo datos de una base de datos, entonces `Repository` → `Database`.
* Si está obteniendo datos de una fuente externa, entonces `API Client` → `External API`. 

## ¿De Dónde Vienen Estos Nombres?

Estos nombres de capas (`Controller`, `Service`, `Repository`) tienen sus origenes en:

* **Patrones de Diseño:**
  * [MVC (Modelo-Vista-Controlador)](https://www.freecodecamp.org/news/model-view-architecture/): Un patrón con décadas de antigüedad para separar la presentación, la lógica y los datos.
  * [Arquitectura en Capas](https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/ch01.html): Una forma estándar de aislar las preocupaciones (presentación vs. negocio vs. datos).
* **La evolución de Spring**:
  * Las primeras aplicaciones [Java EE](https://www.geeksforgeeks.org/java-enterprise-edition/) usaban capas similares (como DAO para acceso a datos), que Spring formalizó con anotaciones como `@Controller`, `@Service`, `@Repository`.
* **Los nombres no son exclusivos de Spring**; reflejan las mejores prácticas de toda la industria para un código limpio.

## ¿Es Obligatorio?

No. **Spring no impone estos nombres ni capas**. Podrías escribir todo en una sola clase llamada `PizzaManager.java` con código espagueti.

Pero estas convenciones resuelven problemas reales:

* **Legibilidad**: Los desarrolladores comprenden al instante una clase llamada `UserService` frente a `TaxCalculatorUtil`.
* **Herramientas**: Anotaciones como `@Repository` permiten que Spring gestione automáticamente las excepciones de la base de datos.
* **Alineación del equipo**: Los nuevos empleados (o futuro tú) pierden menos tiempo descifrando una estructura a medida.

## Cuando Romper Las Reglas

* **Los proyectos pequeños pueden combinar capas** (p. ej., una clase `PaymentProcessor` que actúa como capa de servicio y de integración).
* **Las aplicaciones no HTTP** (p. ej., [trabajos por lotes](https://www.ibm.com/think/topics/batch-jobs)) pueden omitir los controladores por completo.
* **Si su equipo usa términos diferentes** (p. ej., `DataManager` en lugar de `Repository`), la coherencia es más importante que el nombre en sí.

## Prácticas y Errores Comunes

* **Un servicio por controlador**: Un controlador no debería orquestar 5 servicios. Si lo hace, su lógica de negocio probablemente esté dispersa.
* **Las capas son opcionales**: ¿No hay base de datos? Omite la capa de persistencia. ¿No hay API externas? Omite la integración. Empieza por lo simple.
* **Evita la extensión de capas**:
  * **Malo**: Los controladores realizando lógica de negocio, los repositorios realizando llamadas a la API.
  * **Bueno**: Cada capa tiene una única responsabilidad.
* **Se permiten las llamadas de servicio a servicio**: Los servicios pueden llamar a otros servicios (¡pero evita las [dependencias circulares](https://www.baeldung.com/circular-dependencies-in-spring)!).
