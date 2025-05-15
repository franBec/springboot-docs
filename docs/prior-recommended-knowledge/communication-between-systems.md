---
sidebar_position: 5
---

# Communication Between Systems

When systems need to talk, they have two fundamental ways to communicate: **synchronously** (waiting for immediate replies) or **asynchronously** (fire-and-forget). Understanding this split will help you debug issues, choose technologies, and explain architectural decisions to your team.

<div>
  <img src={require('@site/static/img/prior-recommended-knowledge/sync-async-comparison.png').default} alt="sync async comparison" />
</div>

## Synchronous

A direct, real-time conversation where the caller waits for an immediate response.

| Protocol                                                        | Best For                  | Pain Points              |
|-----------------------------------------------------------------|---------------------------|--------------------------|
| [REST](https://www.redhat.com/en/topics/api/what-is-a-rest-api) | Web/mobile APIs           | Versioning, overfetching |
| [GraphQL](https://graphql.org/)                                 | Complex client data needs | Query complexity         |
| [gRPC](https://grpc.io/)                                        | Microservices (internal)  | Binary format debugging  |
| [SOAP](https://www.w3.org/TR/soap/)                             | Enterprise integrations   | XML complexity           |

* **Use when dealing with success/failure scenarios**, such as payment gateways or user authentication flows.
* **Avoid for long-running tasks**, imagine waiting 10 minutes for a webpage to load.

## Asynchronous

Async communication via message brokers. Systems toss messages into a "digital mailbox" and move on.

| Technology                                            | Strength                    | Quirk              |
|-------------------------------------------------------|-----------------------------|--------------------|
| [RabbitMQ](https://www.rabbitmq.com/)                 | Flexible message routing    | Needs queue tuning |
| [Kafka](https://kafka.apache.org/)                    | High-volume event streaming | Complex setup      |
| [AWS SQS](https://aws.amazon.com/sqs/)                | Serverless simplicity       | Vendor lock-in     |
| [Redis Pub/Sub](https://redis.io/docs/manual/pubsub/) | Real-time notifications     | No persistence     |

* It shines in scenarios such as:
  * **Order processing** ("Thank you for buying, we'll email when shipped")
  * **Data sync between systems** ("Update CRM overnight")
  * **Event-driven architectures** ("User signed up → send welcome email").
* Watch for problems like:
  * **Message duplication** ("Why did we charge them twice?")
  * **Stale data** ("Inventory says 1 left, but it's actually sold out").


## Comparison

| Criteria           | Synchronous               | Asynchronous                |
|--------------------|---------------------------|-----------------------------|
| **Latency**        | Immediate response needed | Tolerable delay (secs-min)  |
| **Error Handling** | Fail fast                 | Retry queues                |
| **Coupling**       | Tight (knows receiver)    | Loose (via broker)          |
| **Scalability**    | Limited by caller         | Independent scaling         |
| **Complexity**     | Simple to implement       | Complex delivery guarantees |
| **Cost**           | Resource-heavy (waiting)  | Efficient (no waiting)      |

Most systems you’ll encounter use a mix. Remember:

1. Your company’s existing infrastructure will heavily influence choices (no rewriting COBOL batch jobs into Kafka streams).
2. Communication patterns often outlive the systems themselves.
3. When joining a team, ask: *"What happens when System A sneezes?"* The answer reveals their system communication philosophy.

Now that you’re armed with this knowledge, you’ll never look at a "Connection timed out" error the same way again.