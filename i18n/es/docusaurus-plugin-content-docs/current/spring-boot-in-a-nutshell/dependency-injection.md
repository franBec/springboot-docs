---
sidebar_position: 2
---

import YouTube from '@site/src/components/YouTube';

# Inyección de dependencias

Pensá en la Inyección de Dependencias de Spring Boot como un **maestro marionetista** que sabe exactamente qué hilos tirar para hacer que tus objetos bailen juntos.

## Pre-Spring

```java
// Sin DI
public class CheckoutController {
    private PaymentService paymentService = new PaymentService(
        new FraudCheck(),
        new Database(),
        new EmailService()
        //más cosas que PaymentService pueda necesitar...
    );
}
```

Cada `new` es un compromiso. ¿Querés testearlo? Obtenés **todo el árbol de dependencias**. ¿Necesitás una base de datos mock? Reescribí todos los constructores.

## El contenedor IoC de Spring

Imaginate que sos un chef en una cocina. En lugar de correr a la granja por huevos, a la vaca por leche y al molino por harina, gritás *"¡Necesito ingredientes!"*, y aparecen en tu mostrador. **Ese es el Contenedor IoC (Inversion of Control) de Spring—**tu asistente personal para objetos Java.

### Cómo funciona

1. **Escaneo de componentes**: Spring escanea tu código buscando clases marcadas con anotaciones como `@Component`, `@Service`, `@Controller`.
2. **Creación de beans**: Spring instancia estas clases como "beans" (objetos administrados) y los guarda en su contenedor.
3. **Inyección de dependencias**: Cuando necesitás un bean, Spring te lo trae automáticamente del contenedor.

<div>
  <img src={require('@site/static/img/spring-boot-in-a-nutshell/spring-ioc.png').default} alt="diagrama de ioc de Spring" />
</div>

## Formas de hacer inyección de dependencias

### Inyección por campo (field injection)

```java
@RestController
public class CheckoutController {

    @Autowired
    private PaymentService paymentService;

    //Lógica del controlador
}
```

### Inyección por setter (setter injection)

```java
@RestController
public class CheckoutController {

    private PaymentService paymentService;

    @Autowired
    public void setPaymentService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    //Lógica del controlador
}
```

### Inyección por constructor (constructor injection)

```java
@RestController
public class CheckoutController {

    private final PaymentService paymentService;

    public CheckoutController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    //Lógica del controlador
}
```

**La inyección por constructor es el enfoque recomendado**:

* **Sin nulos** – Tus dependencias llegan completamente ensambladas.
* **Inmutabilidad** – No podés cambiar accidentalmente tu base de datos por una tostadora a mitad de la petición.
* **Amigable para testing** – No se necesita magia de Spring en los unit tests.

### Inyección por constructor con Lombok

Con Lombok, la inyección por constructor es aún más simplificada (y este es mi enfoque recomendado):

```java
@RestController
@RequiredArgConstructor // <-- Anotación de Lombok
public class CheckoutController {

    private final PaymentService paymentService;

    //Lógica del controlador
}
```

Como nota final sobre este tema, **te recomiendo mucho** el video de CodeAesthetic “Dependency Injection, The Best Pattern”.

<YouTube id="J1f5b4vcxCQ" />