---
sidebar_position: 1
---

# What Is a Web Client?

Let’s check once more the [Hexagonal Architecture](/spring-boot-in-a-nutshell/project-structure#follow-hexagonal-architecture) diagram and focus in the **Secondary Adapter (External API)** (blue box lower right outside the hexagon):

<div>
  <img src={require('@site/static/img/external-api-integration/hexagon.png').default} alt="hexagon" />
</div>

## A Web Client is a Secondary Adapter

A Web Client is a tool that handles:

* Crafting HTTP requests.
* Parsing responses.
* Handling errors.

There are numerous libraries available for this purpose, but two of the most popular in the Spring ecosystem are [RestTemplate](https://www.baeldung.com/rest-template) and [FeignClient](https://docs.spring.io/spring-cloud-openfeign/docs/current/reference/html/).

## RestTemplate: Imperative Approach

[RestTemplate](https://www.baeldung.com/rest-template) provides a traditional, imperative way of handling HTTP requests. With this client, you explicitly create the instance, build your requests, and handle responses step by step. This approach can offer fine-grained control over the request/response process.

```java
RestTemplate restTemplate = new RestTemplate();
String response = restTemplate.getForObject("https://api.example.com/data", String.class);
```

In this snippet, the code directly invokes the GET request and processes the returned data. It’s straightforward but requires you to write the boilerplate for each request.

## FeignClient: Declarative Approach

[FeignClient](https://docs.spring.io/spring-cloud-openfeign/docs/current/reference/html/), on the other hand, embraces a declarative style. Instead of writing all the request-handling code manually, you define an interface annotated with details about the HTTP endpoints. Spring then automatically creates an implementation of that interface at runtime. This leads to cleaner, more maintainable code—especially as the number of external calls grows.

```java
@FeignClient(name = "exampleClient", url = "https://api.example.com")
public interface ExampleClient {
    @GetMapping("/data")
    String getData();
}
```

Here, you simply declare a method for the desired HTTP operation, and the underlying framework takes care of the rest. This approach can significantly reduce the amount of boilerplate code and make your service integrations more readable.