---
sidebar_position: 1
---

# Introducción: ¿Por qué Spring Boot?

_Así que estás considerando el desarrollo backend, y escuchaste hablar de Spring Boot. Pero tenés tus dudas…_

## ¿Para quién es esta guía?

Allá por el 21 de junio de 2022, escribí en el grupo de WhatsApp de la facultad:

<div>
  <img src={require('@site/static/img/WhatsAppImage2025-02-27.jpeg').default} alt="WhatsAppImage2025-02-27" />
</div>

Incluso cometí un typo, lol.

Este documento es todo lo que me hubiese gustado que alguien me responda. Si vos:

* Sabés [Java](https://www.java.com/) (o algún otro [lenguaje POO](https://www.freecodecamp.org/news/what-is-object-oriented-programming/)) pero nunca armaste una [API](https://aws.amazon.com/what-is/api/),
* Querés aprender Spring Boot sin ahogarte en jerga o tutoriales viejos de XML,
* Preferís hacer a la teoría (vamos a codear rápido y explicar más rápido todavía),

… Estás en el lugar indicado. No te voy a explicar el ciclo de vida de los beans, thread pools, o esas cosas, porque para el 90% de los escenarios prácticos, no vas a necesitar eso —esto no es una enciclopedia de Spring Boot. Es una guía para devs que quieren saltar rápido a una base de código y mandar código a producción.

Vas a notar que a veces pongo referencias a links externos. Sentite libre de chequearlos para tener una explicación más profunda de ese concepto específico, pero tené cuidado de no entrar en [sobrecarga de información](https://www.interaction-design.org/literature/article/information-overload-why-it-matters-and-how-to-combat-it).

## ¿Necesitás dominar todo Spring?

Respuesta corta: **No**.

[Spring Framework](https://spring.io/projects/spring-framework) es como una caja de herramientas gigante con 20 martillos distintos. Spring Boot, sin embargo, te da el martillo justo para la tarea de entrada. No necesitás memorizar cada annotation o configuración de XML. La mayoría de los proyectos solo necesitan una fracción de las features de Spring, y las dependencias "starter" y la autoconfiguración de Boot hacen el trabajo pesado. Pensalo como codear con rueditas de aprendizaje —excepto que las rueditas también escriben la mitad de tu [boilerplate](https://aws.amazon.com/what-is/boilerplate-code/).

## ¿Vale la pena aprenderlo en 2025?

Según la [Encuesta para Desarrolladores de Stack Overflow 2024](https://survey.stackoverflow.co/2024/technology#most-popular-technologies-webframe), Spring Boot tiene una adopción del 12.7%, quedando detrás de gigantes como [Express.js](https://expressjs.com/) (17.8%) y [ASP.NET Core](http://ASP.NET) (16.9%). ¿Significa que está desactualizado? Para nada. Acá tenés por qué sigue siendo una potencia:

* **Fuerza de nivel empresarial**: ¿Detrás de esos números de adopción más bajos? Un ecosistema masivo en el que confían tanto empresas Fortune 500 como startups.
* **La permanencia de Java**: Con más de 30 años de dominio, Java no va a desaparecer —y Spring Boot es su alma gemela moderna y opinionada.
* **Escalabilidad**: ¿Necesitás manejar 10 usuarios o 10 millones? Spring Boot escala sin transpirar.

## Pero, ¿qué onda con la IA tomando el control?

La IA no va a reemplazar a los desarrolladores – pero sí va a amplificar el valor de quienes entienden las realidades humanas complejas. Acá tenés por qué los ingenieros de Spring Boot van a prosperar en la era de la IA.

### El mito de los "requisitos claros"

> **Pedido del Product Owner**: "Hacelo tipo TikTok pero para reclamos de seguros, y lo necesitábamos para ayer."

> **Respuesta de la IA**: Genera 200 líneas de Java que ignoran la compliance, la escalabilidad, y por qué combinar tendencias de baile con formularios de reclamo es una pésima idea.

Hasta que la IA pueda psicoanalizar stakeholders y traducir "que le ponga onda" a especificaciones técnicas, los desarrolladores siguen siendo el pegamento humano entre la ambición y la realidad. Los profesionales de Spring Boot no solo escriben código – decodifican la jerga corporativa en sistemas mantenibles.

### Deuda técnica

La IA es genial escribiendo código, terrible asumiendo consecuencias.

* ¿Ese microservicio de Spring Boot autogenerado? Disfrutá debuggeando endpoints no seguros.
* ¿Ese MVP apurado construido con ChatGPT? Ahora escala como una jirafa en patines.

La [deuda técnica](https://www.productplan.com/glossary/technical-debt/) no es código – es deuda organizacional. Los desarrolladores no son solo coders; son los conserjes, arquitectos y terapeutas de sistemas que sobreviven a los roadmaps trimestrales.

### La ventaja de Spring Boot

La IA prospera en proyectos greenfield. ¿El mundo empresarial? Es un cementerio de:

* Apps monolíticas de Spring de 15 años.
* Integraciones legacy que tosen sangre si las mirás feo.
* Requisitos de compliance escritos en jeroglíficos.

Los desarrolladores de Spring Boot no solo escriben código – están navegando el infierno de dependencias, parcheando vulnerabilidades en bases de código de 50K líneas, y haciendo que sistemas antiguos bailen con la infraestructura cloud moderna. Las herramientas de IA se convierten en ayudantes, no en reemplazos, en este caos.

La IA escribe código. Los desarrolladores resuelven problemas. Mientras las empresas:

* Prioricen "moverse rápido" por encima de "no romper nada",
* Confundan "ágil" con "vago",
* Traten al software como un centro de costos en lugar de infraestructura viva…

… Los expertos en Spring Boot van a seguir siendo esenciales. El fuerte anclaje del framework en el mundo empresarial asegura que no solo sos relevante – sos el adulto en una habitación llena de nenes hiperactivos potenciados por IA.