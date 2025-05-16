---
sidebar_position: 3
---

import YouTube from '@site/src/components/YouTube';

# ¿Es full stack siquiera una cosa?

Me gustaría empezar este documento con un comentario que encontré en un video de YouTube y me quedó grabado:

> Desarrollador “full stack” significa “hago lo que me digas”

Dado que toda esta guía es sobre Spring Boot, un framework tradicionalmente visto firmemente en el bando del "backend", esta frase te puede pegar distinto. ¿Enfocarte en Spring Boot significa que no sos full stack? ¿Es full stack algo que siquiera quieras ser?

> ¿Alguna vez te contrataron como "desarrollador full stack" y te diste cuenta de que ahora eso simplemente significa que eres legalmente responsable de cada error en el código base?

<YouTube id="If90OuYRYeY" />

## El lado "full stack" tradicional de Spring Boot

Históricamente, sobre todo en las aplicaciones Java empresariales, era muy común que la misma aplicación manejara tanto la lógica de negocio como el renderizado de la interfaz de usuario. Con Spring Boot, esto a menudo se veía así:

* **Lógica backend**: Manejada por controladores Spring MVC, servicios, repositorios (lo que Spring Boot hace de maravilla).
* **Renderizado frontend**: Usando motores de plantillas como [Thymeleaf](https://www.thymeleaf.org/).
* **Interacción del lado del cliente**: Interactividad básica agregada con librerías como [jQuery](https://jquery.com/) y librerías CSS como [Bootstrap](https://getbootstrap.com/), incluidos directamente como assets estáticos.

Si armaste una aplicación de esta manera, estabas absolutamente haciendo tareas tanto de "front" como de "back" end dentro de un mismo proyecto. En muchos contextos, esto se consideraba "full stack" con Spring Boot.

## El debate moderno sobre "full stack"

El término "full stack" ha evolucionado significativamente, sobre todo con el auge de los frameworks de JavaScript. Hoy en día, cuando la gente dice "full stack", a menudo se refieren a algo más parecido a frameworks como [Next.js](https://nextjs.org/), [Remix](https://remix.run/), [SvelteKit](https://svelte.dev/tutorial/kit/introducing-sveltekit), o [SolidStart](https://start.solidjs.com/). Estos frameworks a menudo usan un solo lenguaje (como JavaScript/TypeScript) para construir aplicaciones que se renderizan tanto en el servidor como en el cliente, brindando una experiencia de desarrollador fluida en toda la stack.

> Todo el tiempo aparecen nuevos frameworks "fullstack". Desde Rails, hasta Laravel, Next.js, Tanstack Start, hay un montón de opciones. Pero todos son muy diferentes, y necesitamos hablar de eso.

<YouTube id="eBy6LJvv8B0" />

## ¿Dónde encaja Spring Boot?

No te preocupes si dominar Spring Boot te hace "full stack" según alguna definición arbitraria. Enfocate en ser bueno armando sistemas backend confiables con Spring Boot.

Si tu proyecto requiere que toques el frontend (ya sea el Thymeleaf de la vieja escuela o un framework moderno de Javascript), aprendé esa parte específica según lo necesites.

El valor que aportás es resolver el problema completo, incluso si te especializás en una capa. Spring Boot te posiciona perfectamente para encargarte de la pieza backend crítica en prácticamente cualquier arquitectura.