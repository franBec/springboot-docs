---
sidebar_position: 1
---

# ¿Qué es un Web Client?

Chequeemos el diagrama de [Arquitectura Hexagonal](/spring-boot-in-a-nutshell/project-structure#follow-hexagonal-architecture) una vez más y enfoquemonos en el **Secondary Adapter (External API)** (caja azul abajo a la derecha fuera del hexágono):

<div>
  <img src={require('@site/static/img/external-api-integration/hexagon.png').default} alt="diagrama del hexágono" />
</div>

## Un Web Client es un Secondary Adapter

Un Web Client es una herramienta que maneja:

* Crear peticiones HTTP.
* Parsear respuestas.
* Manejar errores.

Hay muchas librerías disponibles para este propósito, pero dos de las más populares en el ecosistema Spring son [RestTemplate](https://www.baeldung.com/rest-template) y [FeignClient](https://docs.spring.io/spring-cloud-openfeign/docs/current/reference/html/).

## RestTemplate: Enfoque imperativo

[RestTemplate](https://www.baeldung.com/rest-template) proporciona una forma tradicional e imperativa de manejar peticiones HTTP. Con este cliente, creás explícitamente la instancia, construís tus peticiones y manejás las respuestas paso a paso. Este enfoque puede ofrecer un control detallado sobre el proceso de petición/respuesta.

```java
RestTemplate restTemplate = new RestTemplate();
String response = restTemplate.getForObject("https://api.example.com/data", String.class);
```

En este fragmento, el código invoca directamente la petición GET y procesa los datos devueltos. Es sencillo pero requiere que escribas el código boilerplate para cada petición.

## FeignClient: Enfoque declarativo

[FeignClient](https://docs.spring.io/spring-cloud-openfeign/docs/current/reference/html/), por otro lado, adopta un estilo declarativo. En lugar de escribir todo el código de manejo de peticiones manualmente, definís una interfaz anotada con detalles sobre los endpoints HTTP. Spring luego crea automáticamente una implementación de esa interfaz en tiempo de ejecución. Esto lleva a un código más limpio y fácil de mantener — especialmente a medida que crece el número de llamadas externas.

```java
@FeignClient(name = "exampleClient", url = "https://api.example.com")
public interface ExampleClient {
    @GetMapping("/data")
    String getData();
}
```

Aquí, declarás un método para la operación HTTP deseada, y el framework subyacente se encarga del resto. Este enfoque puede reducir significativamente la cantidad de código boilerplate y hacer que tus integraciones de servicio sean más legibles.