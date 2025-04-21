---
sidebar_position: 4
---

# Understanding the Generated Feign Client API

The generated Feign client code provides a solid starting point. However, in more complex scenarios you’ll often need additional customization. In particular, pay attention to the following areas:

* **Encoder**: Serializes your request bodies.
  * By default, is a JacksonEncoder wrapped inside a FormEncoder.
  * If your API requires a different format or specific serialization behavior (for example, custom date formats or property naming strategies), you can replace it by providing your own Encoder implementation.
* **Decoder**: Converts HTTP responses back into Java objects.
  * By default, a custom ApiResponseDecoder is built on top of JacksonDecoder.
  * Enhance or customize this component if your API responses require additional handling, transformation, or if you need to support alternative data formats (XML, Protobuf, etc.).
* **ErrorDecoder**: Error handling.
  * By default, the generated code does not include error handling.
  * Providing a custom ErrorDecoder can allow you to intercept non-2xx HTTP responses, translate them into meaningful exceptions, and add fallback logic if necessary. This is especially important when integrating external services where you might need domain-specific error handling.
* **Logger**:
  * The generated code initializes the Feign client with a [Slf4jLogger](https://www.baeldung.com/slf4j-with-log4j2-logback).
  * Depending on your monitoring needs, you might want to adjust the logging level or even plug in a custom logger that provides more detailed insights (e.g., capturing request/response bodies or wire-level logging).
