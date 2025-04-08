---
sidebar_position: 1
---

# Spring Initializr

Head to [Spring Initializr](https://start.spring.io/), the official Spring Boot project generator (shoutout to [Bootify](https://bootify.io/), interesting alternative).

You’ll see a form, don’t panic—we’ll decode each option.

<div>
  <img src={require('@site/static/img/lets-create-a-spring-boot-project/spring-initializr.png').default} alt="spring initializr" />
</div>

## Project: Maven vs Gradle

Think of these as your project’s managers. They:

* Download libraries/dependencies.
* Define steps (compile code, run tests, build JAR files).
* Keep project structure standard and organized.

| Aspect        | Maven                                | Gradle                                             |
|---------------|--------------------------------------|----------------------------------------------------|
| Configuration | Uses XML (structured with `<tags>`). | Uses Kotlin/Groovy (code-like syntax).             |
| Flexibility   | Strict, standardized conventions.    | Highly customizable (supports logic like if-else). |
| Use Cases     | Legacy or enterprise Java projects.  | Android apps, modern Java/Kotlin projects.         |

### Which One to Choose?

<div>
  <img src={require('@site/static/img/lets-create-a-spring-boot-project/maven-gradle-decision-tree.png').default} alt="maven gradle decision tree" />
</div>

### Why It Doesn’t Matter

Both will:

* Pull Spring Boot dependencies identically.
* Create the same executable JAR file.

Debating Maven vs. Gradle is like arguing whether to use a blender or food processor – both make smoothies, just with different buttons. Spring Initializr handles the messy setup either way.

## Spring Boot Versions 

When selecting a Spring Boot version you’ll encounter three types of labels:

* **SNAPSHOT**
  * Indicates a development build of Spring Boot.
  * These versions are unstable, actively being worked on, and may include untested features or bugs.
  * Avoid using them for production, as they can change without notice.
* M1, M2, etc. (**Milestones**)
  * Pre-release versions marking major milestones (e.g., new features) before a stable release.
  * More stable than SNAPSHOT but still not production-ready. Ideal for early testing of upcoming features.
* No Marker (**Stable Releases**)
  * These are stable releases, rigorously tested and production-ready.

**Always opt for the highest stable version** (without SNAPSHOT/M labels) unless you explicitly need experimental features.

## Project Metadata

The Project Metadata section defines your project’s identity and structure. Here’s a breakdown of each field and its recommended conventions:

| Field        | What It Means                                                              | Recommended Structure/Standard                          | Example                                        |
|--------------|----------------------------------------------------------------------------|---------------------------------------------------------|------------------------------------------------|
| Group        | Identifies your organization/team                                          | Use reverse domain name notation. Avoid generic terms.  | `com.acme`                                     |
| Artifact     | The project’s name                                                         | Use lowercase letters and hyphens for multi-word names. | `inventory-service`                            |
| Name         | Human-readable display name                                                | Use spaces/capitalization for readability.              | Inventory Management                           |
| Description  | Brief summary of the project’s purpose. Added to `pom.xml`/`build.gradle`. | Keep concise (1–2 sentences) and specific.              | Microservice for tracking warehouse inventory. |
| Package Name | Root Java package for source code                                          | Derived from Group + Artifact (hyphens removed).        | `com.acme.inventoryservice`                    |

**Personal preference:** I like to use underscore ( _ ) in the artifact name. There’s no rule against it, it's just not common. But I feel it helps to keep consistency, cause Spring Initializr will replace the hyphen with underscore in some folders.

## Packaging: JAR vs. WAR

Packaging determines how your application is bundled into a single, shareable file, enabling it to run smoothly on any system without complex setup.

| Format | Best For                                                                                                                                                          | Key Difference                                                                                      |
|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| JAR    | Modern Spring Boot apps, microservices, cloud deployments.                                                                                                        | Contains embedded server (e.g., [Tomcat](https://tomcat.apache.org/)) for self-contained execution. |
| WAR    | Legacy apps or deployments to external servers (e.g., traditional Tomcat, [JBoss](https://www.redhat.com/en/technologies/jboss-middleware/application-platform)). | Requires a separate server to run; no embedded server included.                                     |

**Use JAR unless you’re bound to legacy infrastructure**. JAR is the default in Spring Boot. Spring Boot’s embedded server makes JAR the lightweight, hassle-free choice for most projects today.

## Java Version

* Stick with what your team uses.
  * If your team is using an old unsupported version, go for the lowest version Spring Initializr provides.
* If unsure, [pick the latest LTS](https://www.oracle.com/java/technologies/java-se-support-roadmap.html)—it’s the sweet spot.

## Dependencies

Dependencies are pre-built libraries that add specific features to your app (like tools in a toolbox). For now, we’ll use the ones you’ll need in 90% of real-world Spring projects:

| Dependency                                                                                                                                                           | Category              | Why You Need It                                                                  |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------|----------------------------------------------------------------------------------|
| [Lombok](https://projectlombok.org/)                                                                                                                                 | Developer Tools       | Reduces repetitive code (e.g., getters/setters) with simple annotations.         |
| [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/3.3.4/reference/htmlsingle/index.html#actuator)                                                       | Operations/Monitoring | Adds health checks, metrics, and management endpoints for your app.              |
| [Spring Boot DevTools](https://docs.spring.io/spring-boot/docs/3.3.4/reference/htmlsingle/index.html#using.devtools)                                                 | Developer Tools       | Speeds up development with auto-restarts, LiveReload, and debug-friendly config. |
| [Spring Configuration Processor](https://docs.spring.io/spring-boot/docs/3.3.4/reference/htmlsingle/index.html#appendix.configuration-metadata.annotation-processor) | Developer Tools       | Enables code-completion for custom `application.properties`/`yml` settings.      |
| [Spring Web](https://docs.spring.io/spring-boot/docs/3.3.4/reference/htmlsingle/index.html#web)                                                                      | Web                   | Build REST APIs with Spring MVC + embedded Tomcat server.                        |

## Generate

Once you’ve configured your Spring Boot app, hit the Generate button (or Ctrl + Enter). Spring Initializr will bundle your project into a .zip file.

In this screenshot down below, I’m creating the **Users Manager application that we will develop during the rest of this guide**.

<div>
  <img src={require('@site/static/img/lets-create-a-spring-boot-project/generating-project.png').default} alt="generating project" />
</div>

What’s Inside the zip?

* A standard project structure (folders for code, tests, configs).
* Preconfigured `pom.xml` (Maven) or `build.gradle` (Gradle).
* A starter `application.properties` file.
* The main class (`*Application.java`) to run your app.

Don’t worry about the details yet – we’ll unpack and explore everything together in the next steps!
