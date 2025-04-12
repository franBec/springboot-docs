---
sidebar_position: 2
---

# Application Architecture

There are several ways to build applications, and each approach has its own style, benefits, and challenges.

## Monolith

_A house as one big unit, it gets the job done._

<div>
  <img src={require('@site/static/img/prior-recommended-knowledge/monolith.png').default} alt="monolith" />
</div>

I'm 99.9% sure this is the first application architecture you learn, cause is the most intuitive to start with. Also, most tutorials and courses goes for this approach.

A monolith is an all-in-one box. The best way to explain it is using the famous “house analogy”. Imagine you’re building a house. In traditional monolith web development, the entire house is constructed as one big unit, with all the rooms, functionalities, and infrastructure connected together in a single structure.

In this analogy:

* **House**: The monolith itself is like the house, which represents the entire application.
* **Rooms**: Inside the house, you have different rooms, such as the living room, kitchen, bedrooms, and bathroom. These rooms represent the various features and components of the web application, like user login, product listing, shopping cart, and payment processing.
* **Infrastructure**: The plumbing, electricity, and other essential systems that support the entire house are like the underlying code, database, and resources that make the web application work.

### Key Points

* **Everything in One Place**: Just like a house has everything under one roof, a monolith web application has all its code, functions, and data within a single codebase.
* **Simplicity**: Building the whole house as one unit can be straightforward and easy to understand since everything is in one place.
* **Communication**: In a monolith, all the rooms can communicate easily with each other since they are part of the same structure. Similarly, in web development, different features of the application can easily share data and functionalities.

### Downsides

* **Scalability**: If you want to make the house bigger, you have to expand the whole thing, which can be more challenging and expensive. Similarly, in web development, as the application grows, it becomes harder to scale, and adding new features might become more complicated.
* **Maintenance**: Imagine if there’s a problem with the plumbing in one room; it might affect the entire house. Similarly, if there’s a bug or issue in one part of the monolith code, it could impact the entire application.
* **Development Speed**: In a monolith, when multiple teams work on different parts of the application, coordinating their efforts can be challenging. Changes in one area might require thorough testing and validation throughout the entire application.

## Frontend + Backend

_Separation just makes sense._

<div>
  <img src={require('@site/static/img/prior-recommended-knowledge/frontend-backend.png').default} alt="frontend backend" />
</div>

Let’s go with the restaurant analogy for this one.

Imagine you have a restaurant. In the early days, your restaurant was small, and everything happened in one place: the kitchen, the dining area, and the payment counter were all together (a monolith).

However, as your restaurant became more popular, you encountered some challenges:

* **Scalability**: With increasing demand, it became harder to accommodate more customers, prepare food quickly, and manage the dining area simultaneously. You needed a way to expand without overcrowding the place.
* **Specialization**: You noticed that your restaurant staff had diverse skills. Some were excellent cooks, while others were friendly and great at serving customers. But having everyone do everything caused inefficiencies.

To overcome these challenges, you decided to split your restaurant into two distinct areas:

* **Frontend**: This is the dining area – the part of the restaurant that customers interact with directly. It’s designed to be user-friendly and visually appealing. There are menus, waitstaff, and ambiance, all focused on creating a delightful experience for the customers.
* **Backend**: This is the kitchen – the part of the restaurant hidden from the customers’ view. It’s where the chefs work efficiently to prepare the food, the inventory is managed, and orders are processed.

### Why This Separation Makes Sense

* **Improved Scalability**: With the frontend and backend separated, you can now expand either of them independently. If you want to accommodate more customers, you can focus on expanding the dining area (frontend) without affecting the kitchen’s operations (backend).
* **Specialization and Efficiency**: Now that the kitchen staff can solely focus on cooking and inventory management, they become more efficient in their tasks. The waitstaff can concentrate on providing excellent service to customers without having to worry about food preparation.
* **Flexibility**: With an independent frontend and backend, you have the flexibility to upgrade or replace one without necessarily touching the other. For example, you can revamp the menu and dining area (frontend) without changing the entire kitchen setup (backend).

In web development terms:

* **Frontend**: This is the user interface (UI) of a website or web application that users interact with directly. It’s responsible for the layout and overall user experience.
* **Backend**: This is the server-side of the application, handling tasks like data storage, processing, and business logic.

The split allows for a more efficient and flexible web development process, making it easier to manage complex projects and deliver a better user experience to visitors.

## Microservices

_Benefits with challenges._

<div>
  <img src={require('@site/static/img/prior-recommended-knowledge/spongebob-panic.png').default} alt="spongebob panic" />
</div>

Imagine you have a large, single, multi-purpose building (like a mega-mall) that houses all the different businesses, services, and facilities. This is similar to **a monolith architecture, where everything is tightly integrated into one large system**.

Now, let’s explore the pros and cons of transforming this monolith into **microservices, a collection of smaller, independent buildings, each dedicated to a specific function**.

**Pros**:

* **Scalability**: If a particular service (e.g., shopping, entertainment, transportation) experiences high demand, it can scale independently without affecting others.
* **Flexibility**: Each service can be designed and upgraded independently. If a service needs a new feature or technology, it can be updated without affecting others. This allows to stay up-to-date with the latest trends and advancements.
* **Fault Isolation**: If a problem arises in one service, it can be contained to that specific service, reducing the risk of widespread disruption.
* **Specialization**: Different services can specialize in what they do best. This allows each service to excel and deliver high-quality experiences.
* **Development Speed**: Independent teams can work on different services simultaneously, speeding up the development process. Changes and updates can be implemented faster since they are confined and don’t require coordination across the entire board.

**Cons**:

* **Complexity**: Managing numerous independent services requires coordination and communication. Microservices add complexity in terms of inter-service communication, deployment, and monitoring.
* **Infrastructure Overhead**: Each service needs its own infrastructure and resources, which can result in higher maintenance and operational costs compared to a single monolith.
* **Integration Challenges**: With numerous independent services, ensuring seamless integration between them can be more challenging than a monolith. Developers must implement robust communication protocols and handle potential issues arising from service interactions.
* **Learning Curve**: Transitioning to a microservice architecture can be a significant shift for the development team, requiring them to learn new concepts and best practices.

## Comparison


| Approach           | Advantages                                                                                                    | Downsides                                                                                   |
|--------------------|---------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| Monolith           | Simple to build and understand. Everything in one place makes communication easy                              | Harder to scale as the application grows. A bug in one area can affect the whole system     |
| Frontend + Backend | Clear separation of concerns improves organization. Each part can be updated or scaled independently          | Requires communication between two layers. More setup compared to a monolith                |
| Microservices      | Highly flexible—scale and update individual services. Fault isolation minimizes the risk of widespread issues | Can be complex to manage and coordinate. Higher operational overhead with multiple services |


Ultimately, there isn’t a perfect approach. Each architecture has its own benefits and trade-offs, and the right choice depends on your team’s experience, project requirements, and long-term goals.