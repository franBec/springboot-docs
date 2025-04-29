---
sidebar_position: 1
---

import YouTube from '@site/src/components/YouTube';

# Arquitectura de software

Cuando te metés en el diseño de software, a menudo vas a escuchar sobre [Clean Architecture](https://medium.com/@DrunknCode/clean-architecture-simplified-and-in-depth-guide-026333c54454). Casi que se volvió el plano por excelencia para diseñar sistemas fáciles de mantener. Sin embargo, en mi laburo actual, la [Hexagonal Architecture](https://medium.com/ssense-tech/hexagonal-architecture-there-are-always-two-sides-to-every-story-bc0780ed7d9c) apareció como una alternativa interesante. Echemos un vistazo a las dos, sus detalles, y por qué la Hexagonal quizás se vuelva aún más popular pronto.

## Clean Architecture

Popularizada por [Uncle Bob](https://en.wikipedia.org/wiki/Robert_C._Martin), este patrón organiza el código en **cuatro capas concéntricas**:

<div>
  <img src={require('@site/static/img/prior-recommended-knowledge/clean-arch.png').default} alt="diagrama de arquitectura limpia" />
</div>

1. **Reglas de negocio empresariales**: Entidades que representan conceptos clave del negocio.
    * *Ejemplo*: La clase `InsurancePolicy` con su lógica de validación.

2. **Reglas de negocio de la aplicación**: Casos de uso que orquestan las interacciones de las entidades.
    * *Ejemplo*: El caso de uso `ProcessClaimUseCase` que maneja el flujo de aprobación de un reclamo.

3. **Adaptadores de interfaz**: Convierten datos entre capas. Incluye controladores, presentadores y gateways.
    * *Ejemplo*: El `ClaimRestController` que convierte peticiones HTTP a objetos Java.

4. **Frameworks y drivers**: Detalles de infraestructura (DB, Web, UI).
    * *Ejemplo*: Repositorios de Spring Data JPA, configuraciones de Hibernate.

### ¿Por qué vas a encontrar a menudo Clean Architecture?

-   **Adopción masiva**: Su clara demarcación de responsabilidades llevó a un gran apoyo de la comunidad y las empresas.
-   **Fácil de entender**: El enfoque por capas imita sistemas tradicionales, haciéndolo accesible para quienes están familiarizados con patrones arquitectónicos clásicos.
-   **Separación de responsabilidades**: Al aislar la lógica de negocio en las capas internas, el sistema se mantiene resistente a la volatilidad externa.

## Hexagonal architecture

También conocida como Puertos y Adaptadores, este patrón de [Alistair Cockburn](https://alistair.cockburn.us/) cambia el foco a las interacciones entre el sistema y sus actores externos, organizando las responsabilidades desde dos perspectivas distintas:

<div>
  <img src={require('@site/static/img/prior-recommended-knowledge/hexagonal-arch.png').default} alt="diagrama de arquitectura hexagonal" />
</div>

* **Lado del Driver (Izquierda)**:
    * **Puertos del Driver**: Definen cómo los actores externos interactúan con la aplicación.
        * *Ejemplo*: Endpoints de una API REST.
    * **Casos de uso**: Lógica de negocio disparada por entradas externas.
* **Lado del Driven (Derecha)**:
    * **Puertos del Driven**: Definen cómo la aplicación interactúa con servicios externos.
        * *Ejemplo*: Acceso a la base de datos.
    * **Adaptadores**: Detalles de implementación.
        * *Ejemplo*: Implementación MySQL de una interfaz de repositorio.

### ¿Qué diferencia a hexagonal?

* **Integración flexible**: Al separar claramente los roles en los lados driver y driven, la arquitectura se adapta fácilmente a varias interfaces y mecanismos de integración.
* **Mejor testabilidad**: Aislar las interacciones externas a través de puertos bien definidos simplifica las pruebas. Los casos de uso principales se pueden probar con mocks o stubs sin invocar sistemas externos reales.

### Recurso de aprendizaje recomendado

**Te recomiendo mucho** el video de Alex Hyett "Hexagonal Architecture: What You Need To Know - Simple Explanation".

<YouTube id="bDWApqAUjEI" />

## Comparación

| Aspecto               | Clean Architecture                                                                                  | Hexagonal Architecture                                                                                                                               |
|-----------------------|-----------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| Enfoque Conceptual    | Enfatiza dependencias direccionales claras                                                          | Se centra en segregar las interacciones externas                                                                                                     |
| Adaptabilidad         | Excelente para aplicaciones con capas bien definidas en configuraciones empresariales tradicionales | Sobresale en entornos que requieren opciones de integración dinámicas (APIs, sistemas de mensajería, GUIs) con clara separación de responsabilidades |
| Adopción y Mentalidad | Ampliamente adoptada por su diseño intuitivo y clara separación de responsabilidades                | Cada vez más popular en entornos dinámicos; ofrece un enfoque innovador que se adapta a demandas de integración cambiantes                           |

Ambas arquitecturas buscan producir software robusto y fácil de mantener, aislando las reglas de negocio principales de cambios externos volátiles. Ya sea que optes por la claridad por capas de la Arquitectura Limpia o la Arquitectura Hexagonal enfocada en la interacción, la clave es alinear tu diseño con las necesidades de tu equipo y las demandas de tu proyecto.

¡Que tu arquitectura sea tan robusta — ya sea por capas o hexagonalmente organizada — como el código que escribís!