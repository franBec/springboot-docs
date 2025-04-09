---
sidebar_position: 1
---

# Introducción: ¿por qué Spring Boot?

_Ok, estás pensando en el desarrollo backend y ya te andan hablando de Spring Boot. Pero claro, también tienes tus dudas…_

## ¿Para quién es esta guía?

El 21 de junio de 2022, escribí en el grupo de WhatsApp de la universidad:

<div className="">
  <img src={require('@site/static/img/WhatsAppImage2025-02-27.jpeg').default} alt="WhatsAppImage2025-02-27" />
</div>

Incluso cometí un typo, lol.

Este documento es todo lo que me hubiera gustado que alguien me dijera. Si tú:

* Sabes de [Java](https://www.java.com/) (o de otro [lenguaje OOP](https://www.freecodecamp.org/news/what-is-object-oriented-programming/)) pero nunca has montado una [API](https://aws.amazon.com/what-is/api/),
* Quieres aprender Spring Boot sin ahogarte en jerga o tutoriales llenos de XML legado,
* Prefieres la práctica a tanta teoría (vamos a codear a la velocidad de la luz y explicarlo aún más rápido),

… Estás en el lugar indicado. No voy a entrar en detalles sobre ciclos de vida de beans, pools de hilos, o esas cosas, porque en el 90% de los escenarios prácticos no las vas a necesitar —esto no es una enciclopedia de Spring Boot. Es una guía para devs que quieren meterse rápido a una base de código y hacer deploy.

Vas a notar que a veces dejo links externos. No dudes en consultarlos para entender a fondo ese concepto en particular, pero ojo con caer en [una sobrecarga de información](https://www.interaction-design.org/literature/article/information-overload-why-it-matters-and-how-to-combat-it).

## ¿Tengo que dominar todo Spring?

Respuesta corta: **No**.

[Spring Framework](https://spring.io/projects/spring-framework) es como esa caja de herramientas inmensa que tiene 20 tipos distintos de martillos. Sin embargo, Spring Boot te da el martillo justo que necesitas desde el inicio. No tenés que memorizar cada anotación o configuración en XML. La mayoría de los proyectos solo requieren una fracción de las funciones de Spring, y las dependencias “starter” y la autoconfiguración de Boot hacen la chamba pesada por vos. Imaginate programar con rueditas de entrenamiento —excepto que esas rueditas de entrenamiento además te escriben la mitad de tu [código boilerplate](https://aws.amazon.com/what-is/boilerplate-code/).

## ¿Vale la pena aprenderlo en 2025?

Según la [Encuesta de Desarrolladores de Stack Overflow 2024](https://survey.stackoverflow.co/2024/technology#most-popular-technologies-webframe), Spring Boot se ubica con un 12.7% de adopción, quedándose atrás de gigantes como [Express.js](https://expressjs.com/) (17.8%) y [ASP.NET Core](http://ASP.NET) (16.9%). ¿Eso quiere decir que está pasado de moda? Para nada. Acá te dejo algunas razones de por qué sigue siendo una potencia:

* **Fuerza a nivel empresarial**: Detrás de esos números bajos, hay un ecosistema enorme que es confiado por empresas Fortune 500 y startups por igual.
* **La permanencia de Java**: Con más de 30 años dominando el mercado, Java no va a desaparecer—y Spring Boot es su alma gemela moderna y con opiniones firmes.
* **Escalabilidad**: ¿Necesitás atender a 10 usuarios o a 10 millones? Spring Boot se adapta sin problemas.

## ¿Y qué hay de la IA dominando todo?

La IA no va a reemplazar a los desarrolladores —pero sí va a potenciar a aquellos que entienden lo caótico de la realidad humana. Acá te explico por qué los ingenieros de Spring Boot van a romperla en la era de la IA.

### El mito de "requerimientos claros"

> **Solicitud del Product Owner**: "Que lo hagas como TikTok pero para reclamos de seguros, y lo necesitamos ayer."

> **Respuesta de la IA**: Genera 200 líneas de Java que ignoran el cumplimiento, la escalabilidad y por qué mezclar tendencias de baile con formularios de reclamo es una pésima idea.

Hasta que la IA no pueda hacer psicoanálisis a los stakeholders y traducir “dale onda” a specs técnicos, los desarrolladores siguen siendo el pegamento humano entre la ambición y la realidad. Los que conocen Spring Boot no solo escriben código –descifran la jerga corporativa y lo convierten en sistemas mantenibles.

### Deuda técnica

La IA es una máquina para escribir código, pero es pésima para asumir las consecuencias.

* ¿Ese microservicio en Spring Boot generado automáticamente? Disfrutá debugueando 23 endpoints sin seguridad a las 2 AM.
* ¿Ese MVP hecho a la carrera con ChatGPT? Ahora escala como jirafa en patines.

[La deuda técnica](https://www.productplan.com/glossary/technical-debt/) no es solo código —es una deuda organizacional. Los desarrolladores no son solo programadores; son los que limpian, diseñan la arquitectura y hasta actúan como terapeutas de sistemas que duran más que los roadmaps trimestrales.

### La ventaja de Spring Boot

La IA brilla en proyectos nuevos y sin historias. ¿El mundo empresarial? Es como un cementerio de:

* Apps monolíticas en Spring de 15 años.
* Integraciones heredadas que se mueren si las mirás mal.
* Requisitos de compliance escritos como jeroglíficos.

Los desarrolladores de Spring Boot no solo escriben código —navegan en el infierno de dependencias, parchean vulnerabilidades en bases de código de 50K líneas y hacen bailar a sistemas antiguos con infra en la nube moderna. Las herramientas de IA se convierten en ayudantes, no en reemplazos, en medio de este desmadre.

La IA escribe código. Los desarrolladores solucionan problemas. Mientras las empresas:

* Prioricen “moverse rápido” sobre “no romper nada”,
* Confundan “ágil” con “vago”,
* Traten el software como un centro de costos en lugar de una infraestructura viva

… Los expertos en Spring Boot seguirán siendo esenciales. La fortaleza empresarial del framework asegura que no solo seas relevante —sino que serás el adulto en medio de una sala llena de niños hiperactivos impulsados por IA.