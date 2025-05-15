---
sidebar_position: 5
---

import YouTube from '@site/src/components/YouTube';

# Comunicación entre sistemas

Cuando los sistemas necesitan hablar, tienen dos maneras fundamentales de comunicarse: de forma **sincrónica** (esperando respuestas inmediatas) o **asincrónica** (disparar y olvidarse). Entender esta división te va a ayudar a debuggear problemas, elegir tecnologías y explicar decisiones arquitectónicas a tu equipo.

<div>
  <img src={require('@site/static/img/prior-recommended-knowledge/sync-async-comparison.png').default} alt="comparación síncrono asíncrono" />
</div>

## Sincrónico

Una conversación directa y en tiempo real donde quien llama espera una respuesta inmediata.

| Protocolo                                                       | Mejor para                                 | Problemas comunes            |
|-----------------------------------------------------------------|--------------------------------------------|------------------------------|
| [REST](https://www.redhat.com/en/topics/api/what-is-a-rest-api) | APIs web/móvil                             | Versionado, overfetching     |
| [GraphQL](https://graphql.org/)                                 | Necesidades complejas de datos del cliente | Complejidad de consultas     |
| [gRPC](https://grpc.io/)                                        | Microservicios (internos)                  | Debugging de formato binario |
| [SOAP](https://www.w3.org/TR/soap/)                             | Integraciones empresariales                | Complejidad de XML           |

*  **Usalo cuando lidiás con escenarios de éxito/fracaso**, como pasarelas de pago o flujos de autenticación de usuario.
* **Evitalo para tareas largas**, imaginate esperar 10 minutos a que cargue una página web.

## Asincrónico

Comunicación asincrónica a través de message brokers. Los sistemas tiran mensajes en un "buzón digital" y siguen con lo suyo.

| Tecnología                                            | Fortaleza                            | Peculiaridad           |
|-------------------------------------------------------|--------------------------------------|------------------------|
| [RabbitMQ](https://www.rabbitmq.com/)                 | Enrutamiento flexible de mensajes    | Necesita tunear colas  |
| [Kafka](https://kafka.apache.org/)                    | Streaming de eventos de alto volumen | Configuración compleja |
| [AWS SQS](https://aws.amazon.com/sqs/)                | Simplicidad serverless               | Bloqueo de proveedor   |
| [Redis Pub/Sub](https://redis.io/docs/manual/pubsub/) | Notificaciones en tiempo real        | Sin persistencia       |

* Brilla en escenarios como:
  * **Procesamiento de pedidos** ("Gracias por tu compra, te enviaremos un correo cuando lo despachemos")
  * **Sincronización de datos entre sistemas** ("Actualizar el CRM durante la noche")
  * **Arquitecturas basadas en eventos** ("Usuario se registró → enviar correo de bienvenida").
* Estate atento a problemas como:
  * **Duplicación de mensajes** ("¿Por qué les cobramos dos veces?")
  * **Datos desactualizados** ("El inventario dice que queda 1, pero en realidad ya se vendió").


## Comparación

| Criterio              | Sincrónico                          | Asincrónico                          |
|-----------------------|-------------------------------------|--------------------------------------|
| **Latencia**          | Necesita respuesta inmediata        | Retraso tolerable (segundos-minutos) |
| **Manejo de errores** | Falla rápido                        | Colas de reintento                   |
| **Acoplamiento**      | Ajustado (conoce al receptor)       | Suelto (a través del broker)         |
| **Escalabilidad**     | Limitado por quien llama            | Escalado independiente               |
| **Complejidad**       | Simple de implementar               | Garantías de entrega complejas       |
| **Costo**             | Consume muchos recursos (esperando) | Eficiente (no espera)                |

La mayoría de los sistemas que vas a encontrar usan una mezcla. Recordá:

1. La infraestructura existente de tu empresa va a influir un montón en las decisiones (no vas a reescribir jobs por lotes de COBOL a streams de Kafka).
2. Los patrones de comunicación a menudo sobreviven a los sistemas mismos.
3. Cuando te unís a un equipo, preguntá: *"¿Qué pasa si el Sistema A estornuda?"* La respuesta revela su filosofía de comunicación entre sistemas.

Ahora que estás armado con este conocimiento, nunca vas a ver un error de "Connection timed out" de la misma manera.