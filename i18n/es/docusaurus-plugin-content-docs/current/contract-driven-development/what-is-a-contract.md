---
sidebar_position: 1
---

# ¿Qué es un contrato?

En el [artículo de Wikipedia sobre Design by Contract](https://en.wikipedia.org/wiki/Design_by_contract), podemos encontrar la siguiente afirmación:

<div>
  <img src={require('@site/static/img/contract-driven-development/design-by-contract.png').default} alt="diagrama de design by contract" />
</div>

> […] Los diseñadores de software deberían definir especificaciones formales, precisas y verificables para las interfaces de los componentes de software, que extiendan la definición ordinaria de tipos de datos abstractos con precondiciones, postcondiciones e invariantes.

De ahí, hice mi propia adaptación de la filosofía de Desarrollo Guiado por Contrato (Contract-Driven Development) para backends:

> Los backends deben cumplir con un contrato, que define entradas, salidas y errores.

Entonces, **¿qué es un contrato?** Es un **conjunto de afirmaciones** que contiene la siguiente información:

* **Valores de entrada válidos**, y su significado.
* **Valores de retorno válidos**, y su significado.
* **Valores de error que pueden ocurrir** y su significado.

En un contrato hay dos partes:

* **Consumidor**: proporciona los valores de entrada y espera el retorno.
* **Proveedor**: espera los valores de entrada y proporciona el retorno.

Entonces, **¿cómo escribimos un contrato?** Chequeá la próxima lección ;)