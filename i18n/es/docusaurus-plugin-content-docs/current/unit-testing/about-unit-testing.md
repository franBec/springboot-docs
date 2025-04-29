---
sidebar_position: 1
---

import YouTube from '@site/src/components/YouTube';

# Sobre unit testing

Cuando empecé a escribir este documento, estaba muy seguro de que quería hablar de Unit Testing (pruebas unitarias), pero no estaba seguro de dónde ubicarlo en el contexto de toda la página.

* En teoría, unit testing debería ser lo primero.
* En la práctica, es más atractivo empezar con un escenario práctico.

¿Por qué pasa esto?

## Mi historia con unit testing

**En mi primer laburo**, el unit testing era inexistente. Trabajábamos en un monolito antiguo que había sobrevivido años sin un liderazgo técnico adecuado. El código creció de forma caótica, un monstruo de Frankenstein digital remendado para cumplir con las demandas del negocio sin mucha consideración por la calidad o la mantenibilidad.

**Mi segundo laburo** introdujo el concepto de unit testing, pero la implementación fue superficial en el mejor de los casos. Algunos miembros del equipo usaron el unit testing como un escudo durante los daily standups: "¡Todavía trabajando en esos unit tests!", se convirtió en la excusa perfecta cuando el progreso se estancaba. Es notablemente efectivo contra stakeholders no técnicos como scrum masters o product owners que aprecian el término, pero no saben lo suficiente como para desafiarlo.

No fue hasta **mi puesto actual** que experimenté una cultura genuina de unit testing. Aquí, la calidad del código es primordial, medida rigurosamente a través de [Sonar](https://docs.sonarsource.com/sonarqube-server/latest/), siendo la cobertura de unit tests una métrica clave. Este entorno finalmente me mostró cómo se ve el testing adecuado en la práctica, no solo en la teoría.

## No a todo el mundo le encanta el unit testing

> Unit Testing es una forma de poner una barandilla en cada curva posible cuando los desarrolladores son los que tienen el trabajo de hacer el camino.

Esa es una opinión picante dicha por Theo ([T3.gg](https://t3.gg/)) en su video _Why I Don’t Unit Test_.

<YouTube id="ZGKGb109-I4" />

Ese video tuvo una respuesta interesante de alguien que recomienda mucho el unit testing y crea contenido sobre ese tema.

<YouTube id="S5geCJb_bN4" />

## El valor del unit testing

Cuando aprendí Unit Testing en la universidad, me dijeron algo así como:

> El valor del Unit Testing no está claro de inmediato para el autor del código. No escribís tests para vos hoy — los escribís para el desarrollador (posiblemente tu yo futuro) que mantendrá tu código mañana.

* **Los tests unitarios proporcionan feedback inmediato al hacer cambios en código existente**. Le dan a los desarrolladores la confianza para refactorizar, mejorar o corregir problemas sin miedo a introducir nuevos bugs. Son como tener una red de seguridad al caminar por la cuerda floja — esperás no necesitarla, pero ciertamente estás contento de que esté ahí.
* **Los tests bien escritos también sirven como documentación viva**… si se hacen bien. Demuestran el comportamiento esperado de tu código en varios escenarios, a menudo más claramente que la documentación escrita que tiende a desfasarse con la implementación real.

## TDD

[Test-Driven Development (TDD)](https://www.agilealliance.org/glossary/tdd/) es un enfoque donde escribís tests antes de escribir el código real.

* Imaginá dibujar el contorno de una pintura antes de aplicar cualquier color — definís cómo se ve el éxito primero, luego trabajás para lograrlo.
* El proceso típicamente sigue un ciclo "Rojo-Verde-Refactorizar": escribís un test que falla, implementás el código mínimo para que pase, luego mejorás el código mientras mantenés los tests en verde.

<div>
  <img src={require('@site/static/img/unit-testing/tdd.png').default} alt="diagrama de TDD" />
</div>

A pesar de su popularidad, **aún no presencié a un desarrollador que se comprometa verdaderamente con TDD en su flujo de trabajo diario**. Es una de esas prácticas que todos afirman valorar, pero pocos implementan consistentemente.

Esto no es necesariamente porque TDD carezca de mérito — puede ser increíblemente poderoso cuando se aplica correctamente. Más bien, es porque cambiar de "código primero, test después" (si acaso) a una mentalidad test-driven requiere una disciplina significativa. En la prisa de los plazos y las demandas de funcionalidades, TDD es a menudo la primera víctima.