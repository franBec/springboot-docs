---
sidebar_position: 9
---

# Interfaces and Implementations

Let’s split this into two parts: the **interface** (the "what") and the **implementation** (the "how").

* **Interface**: Think of an interface as a menu at a restaurant. It lists what dishes are available (methods), but not how they’re cooked.
* **Implementation**: If the interface is the restaurant menu, the implementation is the kitchen actually cooking your order. It’s the grunt work – the Java class that does what the interface promised.

## Why Does This Matter?

* **Flexibility**: Swap implementations without breaking code (e.g., switch from hardcoded data to a database later).
* **Testing**: Ease of mock the interface to test other components.
* **Clarity**: Separates “what” from “how” for cleaner code. Real implementations get messy – that’s why we hide them behind clean interfaces
* Spring Boot automatically injects the right "kitchen" when you order a "dish" (this is called [Dependency injection](/spring-boot-in-a-nutshell/dependency-injection)).