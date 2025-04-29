---
sidebar_position: 4
---

# Entendiendo el código generado

Exploremos brevemente qué produjo el [plugin openapi-generator](https://github.com/OpenAPITools/openapi-generator) y por qué se ve tan verboso.

## ¿Qué hay dentro del código generado?

* **Modelos**: Clases Java que reflejan tus schemas de OpenAPI (por ejemplo, `User`). Incluyen anotaciones de validación, lógica de serialización y patrones Builder.
* **Interfaces de API**: Interfaces de Spring con `@RestController` (por ejemplo, `UsersApi`) que definen tus endpoints y las firmas de sus métodos.

## ¿Por qué se ve tan complicado?

El código generado incluye:

* **Código boilerplate** para compatibilidad con OpenAPI/Spring (por ejemplo, anotaciones `@Validated`, `@Generated`).
* **Lógica de validación** (por ejemplo, `@NotNull`, `@Size`) para asegurar tu contrato.
* Soporte para **serialización/deserialización** (por ejemplo, mapeo de JSON ↔ objeto Java).

## ¿Por qué no deberías preocuparte (demasiado)?

* **Es autogenerado**: Tratalo como una dependencia compilada: la usás, no la modificás.
* **Filosofía contract-first**: El código coincide exactamente con tu spec de OpenAPI. Si necesitás cambios, actualizá el archivo YAML y volvé a generar.
* **Libre de mantenimiento**: El generador maneja las actualizaciones, así que evitás la refactorización manual.

Enfocate en usar el código generado, no en sus detalles internos. ¡Dejá que la herramienta haga el trabajo pesado!