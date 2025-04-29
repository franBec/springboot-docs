---
sidebar_position: 2
---

import YouTube from '@site/src/components/YouTube';

# Dependency Injection

Think of Spring Boot Dependency Injection as a **marionette master** that knows exactly which strings to pull to make your objects dance together.

## Pre-Spring

```java
// Without DI
public class CheckoutController {
    private PaymentService paymentService = new PaymentService(
        new FraudCheck(),
        new Database(),
        new EmailService()
        //more things that PaymentService may need...
    );
}
```

Every `new` is a commitment. Want to test it? You get the **entire dependency tree**. Need a mock database? Rewrite all constructors.

## Spring's IoC Container

Imagine you're a chef in a kitchen. Instead of running to the farm for eggs, the dairy for milk, and the mill for flour, you shout _"I need ingredients!"_ and they appear on your counter. **That's Spring's IoC (Inversion of Control) Container—**your personal assistant for Java objects.

### How It Works

1. **Component scan**: Spring scans your code for classes marked with annotations such as `@Component`, `@Service`, `@Controller`.
2. **Beans creation**: Spring instantiates these classes as "beans" (managed objects) and stores them in its container.
3. **Dependency injection**: When you need a bean, Spring automatically gets it for you from the container.

<div>
  <img src={require('@site/static/img/spring-boot-in-a-nutshell/spring-ioc.png').default} alt="spring ioc" />
</div>

## Ways to Do Dependency Injection

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