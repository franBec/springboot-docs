---
sidebar_position: 4
---

# Entendiendo el API client Feign generado

El [plugin openapi-generator](https://github.com/OpenAPITools/openapi-generator) generó una implementación en Java que contiene:

- **Interfaces de Cliente**: Declaraciones de clientes Feign que coinciden con tus endpoints de API.
- **Modelos de Datos**: POJOs que representan los schemas de request/response de tu especificación OpenAPI.
- **Configuración Básica**: Código boilerplate mínimo para las interacciones con la API.

Si bien este código generado te da una base, no está listo para producción porque:

- **Sin configuración en tiempo de ejecución**: Le falta la configuración esencial del cliente HTTP y beans de serialización/deserialización.
- **Sin manejo de errores**: Carece de un tratamiento adecuado de excepciones para respuestas que no sean 2xx.
- **Sin personalización del cliente**: Requiere configuración explícita para timeouts, interceptores y logging.
- **Sin integración con el contexto Spring**: Las interfaces generadas no se registran automáticamente como Beans de Spring.

## Feign builder

El `Feign.Builder` permite personalizar el comportamiento del cliente a través de estos componentes clave:

1. **Implementación del cliente**: Elegí entre el cliente HTTP por defecto o alternativas como OkHttp para un mejor pool de conexiones y soporte para HTTP/2.
2. **Encoder/Decoder**:
   - **Encoder** convierte objetos Java en cuerpos de petición HTTP.
   - **Decoder** transforma las respuestas HTTP en objetos Java.
   - Las implementaciones por defecto usan procesamiento JSON (Jackson/GSON).
3. **ErrorDecoder**:
   - Interpreta las respuestas de error (4xx/5xx).
   - Permite un manejo unificado de errores en todas las llamadas a la API.
   - **Práctica común**: Crear excepciones personalizadas que lance tu decoder.
4. **Logger & LogLevel**:
   - **Logger**: Elegí una implementación de logging (se recomienda SLF4J).
   - **LogLevel**: Controla la verbosidad (NONE, BASIC, HEADERS, FULL).
5. **Target**:
   - Especifica la URL base y el tipo de interfaz del cliente.
   - Se puede personalizar para endpoints específicos de cada ambiente (dev/staging/prod).

## Sobre los interceptors

No vamos a enfocarnos en interceptors en este momento, pero es bueno saber que existen. Se pueden usar para implementar [mecanismos de reintento](https://www.baeldung.com/feign-retry) y [headers de seguridad](https://medium.com/@babalolaopedaniel/how-to-use-feign-client-with-interceptors-for-authentication-in-a-spring-boot-application-71d46ba89c06).