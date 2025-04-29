---
sidebar_position: 4
---

# Entendiendo la API Feign Client generada

El código cliente Feign generado proporciona un buen punto de partida. Sin embargo, en escenarios más complejos a menudo vas a necesitar personalización adicional. En particular, prestá atención a las siguientes áreas:

* **Encoder**: Serializa el cuerpo de tus peticiones.
   * Por defecto, hay un `JacksonEncoder` envuelto en un `FormEncoder`.
   * Si tu API requiere un formato diferente o un comportamiento de serialización específico (por ejemplo, formatos de fecha personalizados o estrategias de nomenclatura de propiedades), podés reemplazarlo proporcionando tu propia implementación de Encoder.
* **Decoder**: Convierte las respuestas HTTP de nuevo a objetos Java.
   * Por defecto, se construye un `ApiResponseDecoder` personalizado sobre un `JacksonDecoder`.
   * Mejorá o personalizá este componente si las respuestas de tu API requieren manejo adicional, transformación, o si necesitas soportar formatos de datos alternativos (XML, Protobuf, etc.).
* **ErrorDecoder**: Manejo de errores.
   * Por defecto, el código generado no incluye manejo de errores.
   * Proporcionar un `ErrorDecoder` personalizado puede permitirte interceptar respuestas HTTP que no sean 2xx, traducirlas a excepciones significativas, y agregar lógica de fallback si es necesario. Esto es especialmente importante al integrar servicios externos donde podrías necesitar manejo de errores específico del dominio.
* **Logger**:
   * El código generado inicializa el cliente Feign con un [Slf4jLogger](https://www.baeldung.com/slf4j-with-log4j2-logback).
   * Dependiendo de tus necesidades de monitoreo, quizás quieras ajustar el nivel de logging o incluso enchufar un logger personalizado que proporcione insights más detallados (por ejemplo, capturar cuerpos de petición/respuesta o logging a nivel de cable).