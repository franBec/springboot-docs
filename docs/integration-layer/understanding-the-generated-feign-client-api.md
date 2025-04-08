---
sidebar_position: 4
---

# Understanding the Generated Feign Client API

The [openapi-generator plugin](https://github.com/OpenAPITools/openapi-generator) produced a Java implementation containing:

- **Client interfaces**: Feign client declarations matching your API endpoints.
- **Data models**: POJOs representing request/response schemas from your OpenAPI spec.
- **Basic configuration**: Minimal boilerplate for API interactions.

While this generated code provides a foundation, it's not production-ready because:

- **No runtime configuration**: Missing essential HTTP client setup and serialization/deserialization beans.
- **No error handling**: Lacks proper exception handling for non-2xx responses.
- **No client customization**: Requires explicit configuration for timeouts, interceptors, and logging.
- **No Spring context integration**: Generated interfaces aren't automatically registered as Spring beans.

## Feign Builder

The `Feign.Builder` allows customizing client behavior through these key components:

1. **Client implementation**: Choose between default HTTP client or alternatives like OkHttp for better connection pooling and HTTP/2 support.
2. **Encoder/Decoder**:
   - **Encoder** converts Java objects to HTTP request bodies.
   - **Decoder** transforms HTTP responses to Java objects.
   - Default implementations use JSON processing (Jackson/GSON).
3. **ErrorDecoder**:
   - Interprets error responses (4xx/5xx).
   - Enables unified error handling across all API calls.
   - **Common practice**: Create custom exceptions thrown by your decoder.
4. **Logger & LogLevel**:
   - **Logger**: Choose logging implementation (SLF4J recommended).
   - **LogLevel**: Control verbosity (NONE, BASIC, HEADERS, FULL).
5. **Target**:
   - Specifies base URL and client interface type.
   - Can be customized for environment-specific endpoints (dev/staging/prod).

## About Interceptors

We are not going to focus on interceptors at the moment, but is good to know they exist. They can be used for implementing [retry mechanism](https://www.baeldung.com/feign-retry) and [security headers](https://medium.com/@babalolaopedaniel/how-to-use-feign-client-with-interceptors-for-authentication-in-a-spring-boot-application-71d46ba89c06).