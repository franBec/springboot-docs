---
sidebar_position: 1
---

import YouTube from '@site/src/components/YouTube';

# Introducción: ¿Por qué Spring Boot?

_Así que estás considerando el desarrollo backend, y escuchaste hablar de Spring Boot. Pero tenés tus dudas…_

## ¿Para quién es esta guía?
Allá por el 21 de junio de 2022, escribí en el grupo de WhatsApp de la facultad:

<div>
  <img src={require('@site/static/img/WhatsAppImage2025-02-27.jpeg').default} alt="ImagenDeWhatsApp2025-02-27" />
</div>

Incluso cometí un typo, lol.

Este documento es todo lo que me hubiese gustado que alguien me responda. Si vos:

* Conocés [Java](https://www.java.com/) (u otro [lenguaje POO](https://www.freecodecamp.org/news/what-is-object-oriented-programming/)) pero nunca armaste una [API](https://aws.amazon.com/what-is/api/),
* Querés aprender Spring Boot sin ahogarte en jerga o tutoriales legacy de XML,
* Preferís ver resultados sobre leer la teoría (vamos a codear rápido y explicar más rápido),

… Estás en el lugar correcto. No te voy a explicar ciclos de vida de los beans, thread pools ni ninguna de esas cosas, porque para el 90% de los escenarios prácticos, no las vas a necesitar—esta no es una enciclopedia de Spring Boot. Es una guía para devs que quieren meterse rápido en una codebase y poner código en producción.

Vas a notar que a veces pongo referencias a enlaces externos. Sentite libre de chequearlos para obtener una explicación más a fondo de ese concepto específico, pero tené cuidado de no caer en [sobrecarga de información](https://www.interaction-design.org/literature/article/information-overload-why-it-matters-and-how-to-combat-it).

## ¿Necesitás dominar todo Spring?

Respuesta corta: **No**.

[Spring Framework](https://spring.io/projects/spring-framework) es como una caja de herramientas gigante con 20 martillos diferentes. Spring Boot, sin embargo, te da el martillo correcto para el trabajo de entrada. No necesitás memorizar cada anotación o configuración XML. La mayoría de los proyectos solo requieren una fracción de las features de Spring, y las dependencias 'starter' y la autoconfiguración de Boot hacen el trabajo pesado. Pensalo como codear con rueditas—excepto que las rueditas también escriben la mitad de tu código [boilerplate](https://aws.amazon.com/what-is/boilerplate-code/).

## ¿Vale la pena aprenderlo en 2025?

Según la [encuesta de desarrolladores de Stack Overflow de 2024](https://survey.stackoverflow.co/2024/technology#most-popular-technologies-webframe), Spring Boot se sitúa en un 12.7% de adopción, detrás de gigantes como [Express.js](https://expressjs.com/) (17.8%) y [ASP.NET Core](http://ASP.NET) (16.9%). ¿Significa esto que está obsoleto? Para nada. Acá te explico por qué sigue siendo una potencia:

* **Fuerza de nivel empresarial**: ¿Detrás de esos números de adopción más bajos? Un ecosistema masivo en el que confían tanto empresas Fortune 500 como startups.
* **La permanencia de Java**: Con más de 30 años de dominio, Java no va a desaparecer —y Spring Boot es su alma gemela moderna y opinionada.
* **Escalabilidad**: ¿Necesitás manejar 10 usuarios o 10 millones? Spring Boot escala sin transpirar.

<YouTube id="8inhakY1q9w" />

## Pero, ¿qué onda con la IA tomando el control?

La IA no va a reemplazar a los desarrolladores – pero sí va a amplificar el valor de los que entienden las realidades humanas complicadas. Acá te explico por qué los ingenieros de Spring Boot van a prosperar en la era de la IA.

### El mito de los "requisitos claros"

El mito de los 'requisitos claros' en el mundo real es… un mito.

> **Pedido del Product Owner**: "Hacelo como TikTok pero para reclamos de seguros, y lo necesitábamos para ayer."

> **Respuesta de la IA**: genera 200 líneas de Java que ignoran el cumplimiento normativo, la escalabilidad, y por qué combinar tendencias de baile con formularios de reclamo es una idea terrible.

Hasta que la IA pueda psicoanalizar stakeholders y traducir "que se vea copado" en especificaciones técnicas, los desarrolladores siguen siendo el pegamento humano entre la ambición y la realidad. Los pros de Spring Boot no solo escriben código – decodifican jerga corporativa en sistemas mantenibles.

### Deuda técnica

La IA es genial para escribir código, terrible para asumir las consecuencias.

* ¿Ese microservicio de Spring Boot autogenerado? Disfrutá debuggeando endpoints inseguros.
* ¿Ese MVP apurado construido con ChatGPT? Ahora escala como una jirafa en patines.

[La deuda técnica](https://www.productplan.com/glossary/technical-debt/) no es código – es deuda organizacional. Los desarrolladores no son solo coders; son los encargados de limpieza, arquitectos y terapeutas de sistemas que sobreviven a los roadmaps trimestrales.

### La ventaja de Spring Boot

La IA prospera en proyectos greenfield. ¿El mundo empresarial? Es un cementerio de:

* Apps monolíticas de Spring de 15 años.
* Integraciones legacy que tosen sangre si las mirás feo.
* Requisitos de compliance escritos en jeroglíficos.

Los desarrolladores de Spring Boot no solo escriben código – están navegando el infierno de las dependencias, parchando vulnerabilidades en codebases de 50K líneas, y haciendo que sistemas antiguos bailen con infraestructura cloud moderna. Las herramientas de IA se vuelven ayudantes, no reemplazos, en este caos.

La IA escribe código. Los desarrolladores resuelven problemas. Mientras las empresas:

* Prioricen "moverse rápido" por encima de "no romper nada",
* Confundan "ágil" con "vago",
* Traten al software como un centro de costos en lugar de infraestructura viva…

… Los expertos en Spring Boot seguirán siendo esenciales. El bastión empresarial del framework asegura que no solo sos relevante – sos el adulto en una sala llena de niños pequeños hiperactivos con azúcar potenciados por IA.