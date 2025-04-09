---
sidebar_position: 2
---

# Entidad

Imagina que tenés una tabla en la base de datos, como una hoja de cálculo usada para llevar el registro de `Productos`. Cada fila en esa hoja es un producto específico, y las columnas representan sus detalles (como `ProductID`, `Name`, `Price`, `Description`).

## ¿Qué es una clase entidad?

Una clase **Entidad** sirve como una **representación en Java de una sola fila** dentro de una tabla de base de datos.

* Pensá en una clase **Entidad** en tu código Java como un **plan** o una **plantilla**. Este plan coincide exactamente con la estructura de esa tabla de base de datos `Productos` (o hoja de cálculo).
* Entonces, para la tabla `Productos`, crearías una clase en Java llamada `Product`.
* Dentro de esa clase `Product`, vas a tener variables (a menudo llamadas campos o propiedades) que corresponden directamente a las columnas de la tabla: una variable para `productId`, otra para `name`, otra para `price`, y así sucesivamente.

## Rol en el patrón repositorio

* La **Entidad (clase `Product`)** define **cómo** lucen tus datos cuando están representados en Java, reflejando la estructura de una tabla de base de datos.
* El **Repositorio (`ProductRepository`)** define **cómo** gestionás e interactuás con esos datos (guardarlos, buscarlos, eliminarlos) almacenados en la base, trabajando siempre con la Entidad.

Esta separación mantiene tu código organizado y más fácil de manejar. La lógica principal de tu aplicación puede enfocarse en trabajar con objetos Java simples tipo `Product`, mientras el Repositorio se encarga de las operaciones subyacentes de la base de datos, ocultando esa complejidad.