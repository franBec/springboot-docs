---
sidebar_position: 1
---

# Acerca de pruebas unitarias

## Mi experiencia con las pruebas unitarias

**En mi primer trabajo**, las pruebas unitarias ni existían. Trabajábamos en un monolito antiguo que había sobrevivido años sin un liderazgo técnico adecuado. La base de código crecía de manera caótica, como si fuera el monstruo de Frankenstein digital, parcheado a último momento para cumplir con las demandas del negocio, sin mucha consideración por la calidad o la facilidad de mantenimiento.

**En mi segundo trabajo** me presentaron el concepto de pruebas unitarias, pero la implementación era, en el mejor de los casos, superficial. Algunos compañeros usaban las pruebas unitarias como escudo durante las reuniones diarias: "¡Todavía estoy trabajando en esos tests unitarios!", se convertía en la excusa perfecta cuando el progreso se frenaba. Es bastante efectivo contra los interlocutores no técnicos, como scrum masters o product owners, que disfrutan de la idea del término, pero no saben lo suficiente como para cuestionarlo.

No fue hasta **mi puesto actual** que viví de verdad una cultura de pruebas unitarias. Aquí, la calidad del código es lo principal, medida de forma rigurosa a través de [Sonar](https://docs.sonarsource.com/sonarqube-server/latest/), siendo la cobertura de pruebas unitarias una métrica clave. Este ambiente me mostró, por fin, cómo es una buena prueba en la práctica y no solo en teoría.

## ¿Dónde está el valor en las pruebas unitarias?

El verdadero valor de las pruebas unitarias no resulta tan evidente para quien escribe el código. Hoy no escribes tests para ti mismo, sino para el developer (quizás un tú del futuro) que mantendrá tu código mañana.

* **Las pruebas unitarias sirven como una red de seguridad al hacer cambios en el código existente.** Te dan feedback inmediato cuando una modificación rompe lo que ya funcionaba, haciendo que tengas confianza para refactorizar, mejorar o arreglar errores sin miedo a crear nuevos problemas. Es como tener un arnés de seguridad al caminar por la cuerda floja: esperas no necesitarlo, pero seguro te alegra tenerlo.
* **Los tests bien escritos también funcionan como documentación viva**. Demuestran el comportamiento esperado de tu código en distintos escenarios, muchas veces de forma más clara que esa documentación escrita que tiende a quedarse atrás respecto a la implementación real.

## El elefante en la habitación: TDD

[Test-Driven Development (TDD)](https://www.agilealliance.org/glossary/tdd/) es un enfoque en el que escribes tests antes de escribir el código real.

* Imagínate esbozar el contorno de un cuadro antes de ponerle color: defines primero cómo se ve el éxito y luego trabajas para conseguirlo.
* El proceso típicamente sigue el ciclo "Rojo-Verde-Refactor": escribes un test que falla, implementas el mínimo código para que pase, y luego mejoras el código mientras mantienes los tests en verde.

<div>
  <img src={require('@site/static/img/unit-testing/tdd.png').default} alt="tdd" />
</div>

A pesar de su popularidad en libros, conferencias y charlas técnicas, TDD sigue siendo más teórico que práctico en muchos entornos de desarrollo. Hasta hoy, **aún no he visto a un developer que se comprometa de verdad con TDD en su flujo diario de trabajo**. Es una de esas prácticas que todos dicen valorar, pero que pocos implementan de forma consistente.

Esto no es porque TDD carezca de mérito —puede ser increíblemente poderoso cuando se aplica bien— sino porque pasar de "primero el código, después las pruebas" (si es que se hace) a tener una mentalidad guiada por pruebas requiere mucha disciplina y una cultura de ingeniería de apoyo. En la prisa de cumplir fechas límite y atender demandas de nuevas funcionalidades, la disciplina que implica TDD suele ser lo primero en descartarse.