---
sidebar_position: 1
---

import YouTube from '@site/src/components/YouTube';

# Software Architecture

When diving into software design, you'll often hear about [Clean Architecture](https://medium.com/@DrunknCode/clean-architecture-simplified-and-in-depth-guide-026333c54454). It's almost become the de facto blueprint for designing maintainable systems. However, in my current work environment, [Hexagonal Architecture](https://medium.com/ssense-tech/hexagonal-architecture-there-are-always-two-sides-to-every-story-bc0780ed7d9c) has emerged as a compelling alternative. Let’s take a closer look at both, their nuances, and why Hexagonal might soon become even more popular.

## Clean Architecture

Popularized by [Uncle Bob](https://en.wikipedia.org/wiki/Robert_C._Martin), this pattern organizes code into **four concentric layers**:

<div>
  <img src={require('@site/static/img/prior-recommended-knowledge/clean-arch.png').default} alt="clean architecture" />
</div>

1. **Enterprise Business Rules**: Entities representing core business concepts.  
   *Example*: `InsurancePolicy` class with validation logic.

2. **Application Business Rules**: Use cases orchestrating entity interactions.  
   *Example*: `ProcessClaimUseCase` handling claim approval workflow.

3. **Interface Adapters**: Converts data between layers. Includes controllers, presenters, and gateways.  
   *Example*: `ClaimRestController` converting HTTP requests to Java objects.

4. **Frameworks & Drivers**: Infrastructure details (DB, Web, UI).  
   *Example*: Spring Data JPA repositories, Hibernate configurations.

### Why You'll Often Encounter Clean Architecture

- **Widespread Adoption:** Its clear demarcation of concerns has led to extensive community and enterprise support.
- **Ease of Understanding:** The layered approach mirrors traditional systems, making it accessible for those familiar with classic architectural patterns.
- **Separation of Concerns:** By isolating business logic in the inner layers, the system remains resilient against external volatility.

## Hexagonal Architecture

Also known as Ports & Adapters, this pattern by [Alistair Cockburn](https://alistair.cockburn.us/) shifts the focus to the interactions between the system and its external actors, organizing responsibilities across two distinct perspectives:

<div>
  <img src={require('@site/static/img/prior-recommended-knowledge/hexagonal-arch.png').default} alt="hexagonal architecture" />
</div>

- **Driver Side (Left)**:
  - **Driver Ports**: Define how external actors interact with the app.  
    *Example*: REST API endpoints.
  - **Use Cases**: Business logic triggered by external input.
- **Driven Side (Right)**:
  - **Driven Ports**: Define how the app interacts with external services.  
    *Example*: Database access.
  - **Adapters**: Implementation details.  
    *Example*: MySQL implementation of repository interface.

### What Sets Hexagonal Apart

- **Flexible Integration:** By clearly separating the roles on the driver and driven sides, the architecture easily accommodates various interfaces and integration mechanisms.
- **Enhanced Testability:** Isolating external interactions through well-defined ports simplifies testing—the core use cases can be driven with mocks or stubs without invoking actual external systems.

### Recommended Learning Resource

**I really recommend** Alex Hyett's video "Hexagonal Architecture: What You Need To Know - Simple Explanation".

<YouTube id="bDWApqAUjEI" />

## Comparison

| Aspect               | Clean Architecture                                                                       | Hexagonal Architecture                                                                                                          |
|----------------------|------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| Conceptual Focus     | Emphasizes clear directional dependencies.                                               | Focuses on segregating external interactions.                                                                                   |
| Adaptability         | Excellent for applications with well-demarcated layers in traditional enterprise setups. | Excels in environments requiring dynamic integration options (APIs, messaging systems, GUIs) with clear separation of concerns. |
| Adoption and Mindset | Widely adopted due to its intuitive design and clear separation of responsibilities.     | Increasingly popular in dynamic environments; offers a forward-thinking approach that adapts to evolving integration demands.   |

Both architectures strive to produce resilient, maintainable software by insulating the core business rules from volatile external changes. Whether you opt for the layered clarity of Clean Architecture or the interaction-focused Hexagonal Architecture, the key is to align your design with your team’s needs and the demands of your project.

May your architecture be as robust—whether cleanly layered or hexagonally streamlined—as the code you write!