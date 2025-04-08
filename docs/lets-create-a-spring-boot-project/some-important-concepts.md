---
sidebar_position: 4
---

import YouTube from '@site/src/components/YouTube';

# Some Important Concepts Before We Continue

## Git

You wouldn't build a house without a safety harness. Don't code without [version control](https://github.com/resources/articles/software-development/what-is-version-control). Here are some tips:

1. **Git first, code second**: Always git init before writing your first line of code.
2. **Console > GUI**. Tools like GitHub Desktop are great, but learn these 4 commands first:

    `git add ., git commit -m "save point", git push, git checkout -b`

    Why? Because when your IDE's Git plugin mysteriously breaks (it will), you'll need to debug like a pro. 
3. **Your Team's Rules > Textbook Gitflow**: You might love feature branches, but every company has their own "sacred" workflow. Observe first, then suggest improvements later.
4. **The 15-Minute Git Survival Kit**: If for some reason you arrived here without Git basics, first of all... How? I’m surprised. Here is the survival kit:
   * [Oh Shit, Git!?!](https://ohshitgit.com/).
   * [GitHub Training Kit](https://training.github.com/).
   * Any YouTube tutorial you feel comfortable with.

## Formatters

A **formatter** automatically styles your code (indentation, spacing, line breaks) to enforce consistency. No more debates about "tabs vs. spaces".

<YouTube id="V7PLxL8jIl8" />

Before imposing a formatter, check your team’s workflow:

* **If your team already uses a formatter** (e.g., [Checkstyle](https://checkstyle.org/), [Google Java Format](https://github.com/google/google-java-format)), stick with their setup—consistency > personal preference.
* **For existing projects without a formatter**, consult the team first. A sudden formatting overhaul in a shared codebase can bury meaningful changes in noise. If agreed, create a dedicated commit purely for formatting (no logic tweaks!) to simplify code reviews.

I recommend [Spotless](https://github.com/diffplug/spotless). Why? Personal preference, it is the one I’ve always used and haven’t bothered looking into others.

## Gradle Tasks

Think of Gradle as your code's personal assistant. These "tasks" are commands that:

* Compile code.
* Run tests.
* Package your app into a `JAR`.

IntelliJ IDEA provides a nice sidebar menu:

* Look for the elephant icon 🐘 on the right edge (Gradle Toolbar).
* Expand your-project > Tasks > build.

<div>
   <img src={require('@site/static/img/lets-create-a-spring-boot-project/gradle-tasks.png').default} alt="gradle tasks" />
</div>

The two tasks you'll actually use are **build** (compile + test + package into `JAR`) and **clean** (nuclear option when weird errors happen, it deletes all build files).

* Don't memorize all the tasks - just know these 2, and when you need others, Google is your best friend.

We’ll skip Maven specifics here, but if you’ve heard terms like `mvn clean install`—it’s the same circus, different clowns (Gradle just calls the tricks ‘tasks’ instead).

## Interfaces and Implementations

Let’s split this into two parts: the **interface** (the "what") and the **implementation** (the "how").

### What’s an Interface?

Think of an interface as a menu at a restaurant. It lists what dishes are available (methods), but not how they’re cooked.

### What’s an Implementation?

If the interface is the restaurant menu, the implementation is the kitchen actually cooking your order. It’s the grunt work – the Java class that does what the interface promised.

### Why Does This Matter?

* **Flexibility**: Swap implementations without breaking code (e.g., switch from hardcoded data to a database later).
* **Testing**: Easily mock the interface to test other components.
* **Clarity**: Separates “what” from “how” for cleaner code. Real implementations get messy – that’s why we hide them behind clean interfaces
* Spring Boot automatically injects the right "kitchen" when you order a "dish" (this is called [Dependency injection](/lets-create-a-spring-boot-project/some-important-concepts#dependency-injection)).

## Dependency Injection

Let’s check once more the [Spring Boot Layers](/spring-boot-in-a-nutshell/spring-boot-layers) diagram and ask ourselves:

> How does each layer inside a Spring Boot Application communicate with each other?

<div>
   <img src={require('@site/static/img/lets-create-a-spring-boot-project/dependency-injection.png').default} alt="dependency injection" />
</div>

The answer: **Dependency Injection**.

In our diagram, the dependencies can be “read” left to right:

* A Controller depends on a Service.
* A Service depends on a Repository.
* A Service depends on an ApiClient.

Let’s focus on the first one: “A Controller depends on a Service”. How do we write that? There are three ways to do that.

### Field Injection

```java
@RestController
public class CheckoutController {

    @Autowired
    private PaymentService paymentService;

    //Controller logic
}
```

### Setter Injection

```java
@RestController
public class CheckoutController {

    private PaymentService paymentService;

    @Autowired
    public void setPaymentService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    //Controller logic
}
```

### Constructor Injection

```java
@RestController
public class CheckoutController {

    private final PaymentService paymentService;

    public CheckoutController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    //Controller logic
}
```

**Constructor injection is the recommended approach**:

* **No nulls** – Your dependencies arrive fully assembled.
* **Immutable** – Can’t accidentally swap your database for a toaster mid-request.
* **Testing-friendly** – No Spring magic needed in unit tests.

### Constructor Injection with Lombok

WIth Lombok, Constructor Injection is even simplified (and this is my recommended approach):

```java
@RestController
@RequiredArgConstructor // <-- Lombok annotation
public class CheckoutController {

    private final PaymentService paymentService;

    //Controller logic
}
```

As a final note on this topic, **I really recommend** CodeAesthetic’s video “Dependency Injection, The Best Pattern”.

<YouTube id="J1f5b4vcxCQ" />