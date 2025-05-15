---
sidebar_position: 3
---

import YouTube from '@site/src/components/YouTube';

# Is Full Stack Even a Thing?

I'd like to start this document with a comment I found in a YouTube video that stuck with me:

> “Full stack” developer means “I do whatever the fuck you tell me to do”

Given that this whole guide is about Spring Boot, a framework traditionally seen as firm in the "backend" camp, this quote might hit differently. Does focusing on Spring Boot mean you're not full stack? Is full stack something you even want to be?

## Spring Boot's Traditional "Full Stack" Side

Historically, especially in enterprise Java applications, it was widespread for the same application to handle both the business logic and the user interface rendering. With Spring Boot, this often looked like:

* **Backend Logic:** Handled by Spring MVC controllers, services, repositories (the stuff Spring Boot excels at).
* **Frontend Rendering:** Using template engines like [Thymeleaf](https://www.thymeleaf.org/).
* **Client-Side Interaction:** Basic interactivity added with libraries like [jQuery](https://jquery.com/) and styling with frameworks like [Bootstrap](https://getbootstrap.com/), included directly as static assets.

If you built an application this way, you were absolutely doing both "front" and "back" end tasks within a single project. In many contexts, this was considered "full stack" with Spring Boot.

## The Modern "Full Stack" Debate

The term "full stack" has evolved significantly, especially with the rise of JavaScript frameworks. Today when people say "full stack," they often mean something closer to frameworks like [Next.js](https://nextjs.org/), [Remix](https://remix.run/), [SvelteKit](https://svelte.dev/tutorial/kit/introducing-sveltekit), or [SolidStart](https://start.solidjs.com/). These frameworks often use a single language (like JavaScript/TypeScript) to build applications that render on both the server and client, providing a seamless developer experience across the stack.

> We're getting new "fullstack" frameworks all the time. From Rails, to Laravel, to Next.js, to Tanstack Start, there are a lot of options. But all of them are very different, and we need to talk about it.

<YouTube id="eBy6LJvv8B0" />

## Where Does Spring Boot Fit?

Don't worry about whether mastering Spring Boot makes you "full stack" by some arbitrary definition. Focus on becoming proficient at building reliable backend systems with Spring Boot.

If your project requires you to touch the frontend (whether old-school Thymeleaf or a modern Javascript framework), learn that specific part as needed.

The value you bring is solving the whole problem, even if you specialize in one layer. Spring Boot positions you perfectly to own the critical backend piece in virtually any architecture.