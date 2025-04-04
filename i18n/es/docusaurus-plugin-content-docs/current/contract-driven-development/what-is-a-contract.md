---
sidebar_position: 1
---

# ¿Qué Es Un Contrato?

En el [artículo de Wikipedia sobre Design by Contract](https://en.wikipedia.org/wiki/Design_by_contract) podemos leer lo siguiente:

<div>
  <img src={require('@site/static/img/contract-driven-development/design-by-contract.png').default} alt="design by contract" />
</div>

> […] los diseñadores de software deberían definir especificaciones formales, precisas y verificables para las interfaces de los componentes de software, que extienden la definición ordinaria de tipos de datos abstractos con precondiciones, postcondiciones e invariantes.

A partir de eso, hice mi propia adaptación de la filosofía de Contract-Driven Development para la arquitectura de microservicios:

> Los microservicios deben cumplir con un contrato, el cual define entradas, salidas y errores.

Entonces, **¿qué es un contrato?** Es un **conjunto de aserciones** que contiene la siguiente información:

* **Valores de entrada válidos**, y su significado.
* **Valores de retorno válidos**, y su significado.
* **Valores de error que pueden ocurrir**, y su significado.

En un contrato hay dos partes:

* **Consumidor**: provee los valores de entrada y espera el retorno.
* **Proveedor**: espera los valores de entrada y provee el retorno.