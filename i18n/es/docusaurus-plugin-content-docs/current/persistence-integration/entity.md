---
sidebar_position: 2
---

# Entidad

Imaginá que tenés una tabla de base de datos, como una hoja de cálculo usada para llevar un registro de `Productos`. Cada fila en esta hoja de cálculo es un producto específico, y las columnas representan sus detalles (como `ProductID`, `Name`, `Price`, `Description`).

## ¿Qué es una clase Entity?

Una clase **Entity** sirve como una **representación en Java de una sola fila** dentro de una tabla de base de datos.

* Pensá en una **clase Entity** en tu código Java como un **plano** o una **plantilla**. Este plano coincide precisamente con la estructura de esa tabla de base de datos (`Products`) (u hoja de cálculo).
* Entonces, para la tabla `Products`, crearías una clase en Java llamada `Product`.
* Dentro de esta clase `Product`, tendrías variables (a menudo llamadas campos o propiedades) que corresponden directamente a las columnas de la tabla: una variable para `productId`, otra para `name`, una para `price`, y así sucesivamente.

## Rol en el patrón Repository

* La **Entity (clase `Product`)** define **qué** aspecto tienen tus datos cuando se representan en Java, reflejando la estructura de una tabla de base de datos.
* El **Repository (`ProductRepository`)** define **cómo** gestionás e interactuás con esos datos (guardando, encontrando, eliminando) almacenados en la base de datos, trabajando siempre con el plano de la Entity.

Esta separación mantiene tu código organizado y más fácil de gestionar. La lógica principal de tu aplicación puede enfocarse en trabajar con objetos Java `Product` sencillos, mientras que el Repository se encarga de las operaciones de base de datos subyacentes, ocultando esa complejidad.