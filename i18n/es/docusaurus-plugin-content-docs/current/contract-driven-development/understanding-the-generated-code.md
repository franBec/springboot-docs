---
sidebar_position: 4
---

# Entendiendo el Código Generado

Exploremos brevemente qué produjo el [plugin openapi-generator](https://github.com/OpenAPITools/openapi-generator) y por qué se ve tan verboso.

## ¿Qué Hay Dentro del Código Generado?

* **Modelos**: Clases Java que reflejan tus schemas de OpenAPI (por ej., `User`). Estas incluyen anotaciones de validación, lógica de serialización y patrones builder.
* **Interfaces API**: Interfaces Spring `@RestController` (por ej., `UsersApi`) que definen tus endpoints y las firmas de los métodos.

## ¿Por Qué Se Ve Tan Complicado?

El código generado incluye:

* **Código boilerplate** para compatibilidad entre OpenAPI y Spring (por ej., anotaciones `@Validated`, `@Generated`).
* **Lógica de validación** (por ej., `@NotNull`, `@Size`) para hacer cumplir tu contrato.
* **Soporte para serialización/deserialización** (por ej., mapeo de JSON ↔ objetos Java).

## ¿Por Qué No Deberías Preocuparte (Demasiado)?

* **Es autogenerado**: Tratálo como una dependencia compilada—lo usás, no lo modificás.
* **Filosofía contract-first**: El código coincide exactamente con tu especificación OpenAPI. Si necesitás cambios, actualizá el archivo `.yaml` y regenerá.
* **Sin mantenimiento**: El generador se encarga de las actualizaciones, así evitás refactorizaciones manuales.

Enfocate en consumir el código generado, no en sus internals. ¡Dejá que la herramienta haga el trabajo pesado!