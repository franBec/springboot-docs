---
sidebar_position: 1
---

import YouTube from '@site/src/components/YouTube';

# What Is Spring?

Before understanding Spring Boot, you need to know its parent: Spring Framework. Spring is a powerful, open-source application framework for Java that simplifies enterprise-level development. Its core philosophy revolves around:

* **Inversion of control (IoC)**: Let the framework manage object creation and dependencies (via [Dependency injection](/spring-boot-in-a-nutshell/dependency-injection)).
* **Modularity**: Pick and choose components for your needs.
* **Flexibility**: Supports everything from microservices to monolithic apps.

But with great power comes great configuration. Setting up a Spring project traditionally involves writing XML files and wrestling with boilerplate code. In the tutorial down below, it took approximately 30 minutes to get everything ready. Feel free to watch if curious, but there's no need.

<YouTube id="e8aSyQo0nHo" />

Here's where Spring Boot swoops in to save the day.

## How Spring Boot Simplifies Development

Spring Boot isn’t a replacement for Spring—it’s a supercharged extension that removes the grunt work. Here’s how it makes life easier:

* **Convention over configuration**: Predefined defaults for dependencies, project structure, and settings. No more XML hell!
* **Embedded servers**: Pack a [Tomcat](https://tomcat.apache.org/), [Jetty](https://jetty.org/index.html), or [Undertow](https://undertow.io/) server directly into your app. Just run the `JAR`—no external setup needed.
* **Starter dependencies**: Need security, database access, or web capabilities? Add `spring-boot-starter-web` or `spring-boot-starter-data-jpa`, and Spring Boot autoconfigures the essentials.
* **Autoconfiguration**: Detects libraries in your classpath and sets up sensible defaults.
* **Production-ready tools**: Built-in metrics, health checks, and environment management via [Spring Actuator](https://github.com/spring-projects/spring-boot/tree/v3.4.2/spring-boot-project/spring-boot-actuator).

In short, Spring Boot lets you focus on writing business logic instead of wrestling with infrastructure.
