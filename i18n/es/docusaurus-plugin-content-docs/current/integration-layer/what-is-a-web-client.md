---
sidebar_position: 1
---

# ¿Qué es un web client?

Echemos otro vistazo al diagrama de [Spring Boot Layers](/spring-boot-in-a-nutshell/spring-boot-layers) y enfoquémonos en la **Capa de Integración** (la caja amarilla en la esquina inferior derecha):

<div>
  <img src={require('@site/static/img/spring-boot-in-a-nutshell/layers.png').default} alt="layers" />
</div>

Un **Web Client** (ApiClient en el diagrama) es una herramienta que se encarga de:

* Construir peticiones HTTP.
* Parsear las respuestas.
* Manejar errores.

Existen muchas librerías para este propósito, pero dos de las más populares en el ecosistema Spring son [RestTemplate](https://www.baeldung.com/rest-template) y [FeignClient](https://docs.spring.io/spring-cloud-openfeign/docs/current/reference/html/).

## RestTemplate: enfoque imperativo

RestTemplate provee una manera tradicional e imperativa de manejar peticiones HTTP. Con este cliente, creás la instancia explícitamente, construís tus peticiones y gestionás las respuestas paso a paso. Este enfoque te da un control más fino sobre el proceso de petición/respuesta.

```java
RestTemplate restTemplate = new RestTemplate();
String response = restTemplate.getForObject("https://api.example.com/data", String.class);
```

En este fragmento, el código invoca directamente una petición GET y procesa los datos devueltos. Es straightforward, pero requiere que escribas el código boilerplate para cada petición.

## FeignClient: enfoque declarativo

Por otro lado, FeignClient adopta un estilo declarativo. En lugar de escribir todo el código para manejar las peticiones manualmente, definís una interfaz anotada con los detalles acerca de los endpoints HTTP. Spring crea automáticamente una implementación de esa interfaz en tiempo de ejecución. Esto conduce a un código más limpio y fácil de mantener, especialmente a medida que crece la cantidad de llamadas externas.

```java
@FeignClient(name = "exampleClient", url = "https://api.example.com")
public interface ExampleClient {
    @GetMapping("/data")
    String getData();
}
```

Acá, simplemente declarás un método para la operación HTTP deseada, y el framework se encarga del resto. Este enfoque puede reducir significativamente la cantidad de código repetitivo y hacer que las integraciones de servicios sean más legibles.
