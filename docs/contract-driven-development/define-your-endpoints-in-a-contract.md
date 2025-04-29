---
sidebar_position: 2
---

# Define Your Endpoints in a Contract

Given a User with the following structure:

```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  },
  "profilePictureUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
}
```

We want our backend to expose these endpoints:

* `/users` list all users.
* `/users/{id}` get user by identifier.

## OpenAPI Specification

An [OpenAPI Specification](https://swagger.io/specification/) complies with the definition of contract I gave before: Is a set of assertions containing **valid input values** and their meaning, **valid return values** and their meaning, and **error values that can occur** and their meaning.

An OpenAPI Specification that would represent the desired behavior would look something like this:

```yaml
openapi: 3.0.3
info:
  title: users_manager API
  description: An API for retrieving information from a users database.
  version: 1.0.0
  contact:
    name: Pollito
    url: https://pollito.dev
servers:
  - url: 'http://localhost:8080'
    description: dev
paths:
  /users:
    get:
      tags:
        - User
      summary: List all users
      operationId: findAll
      responses:
        '200':
          description: List of all users
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
        default:
          description: Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
  /users/{id}:
    get:
      tags:
        - User
      summary: Get user by identifier
      operationId: findById
      parameters:
        - description: User identifier
          in: path
          name: id
          required: true
          schema:
            format: int64
            type: integer
      responses:
        '200':
          description: A user
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        default:
          description: Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
components:
  schemas:
    Address:
      description: User address
      properties:
        city:
          description: Address city
          example: "Gwenborough"
          type: string
        geo:
          $ref: '#/components/schemas/Geo'
        street:
          description: Address street
          example: "Kulas Light"
          type: string
        suite:
          description: Address suit
          example: "Apt. 556"
          type: string
        zipcode:
          description: Adress zipcode
          example: "92998-3874"
          type: string
      type: object
    Company:
      description: User company
      properties:
        bs:
          description: Company business
          example: "harness real-time e-markets"
          type: string
        catchPhrase:
          description: Company catch phrase
          example: "Multi-layered client-server neural-net"
          type: string
        name:
          description: Company name
          example: "Romaguera-Crona"
          type: string
      type: object
    Error:
      properties:
        detail:
          description: Description of the problem.
          example: No value present
          type: string
        instance:
          description: The endpoint where the problem was encountered.
          example: "/generate"
          type: string
        status:
          description: http status code
          example: 500
          type: integer
        title:
          description: A short headline of the problem.
          example: "NoSuchElementException"
          type: string
        timestamp:
          description: ISO 8601 Date.
          example: "2024-01-04T15:30:00Z"
          type: string
        trace:
          description: opentelemetry TraceID, a unique identifier.
          example: "0c6a41e22fe6478cc391908406ca9b8d"
          type: string
        type:
          description: used to point the client to documentation where it is explained clearly what happened and why.
          example: "about:blank"
          type: string
      type: object
    Geo:
      description: Address geolocation
      properties:
        lat:
          description: Geolocation latitude
          example: "-37.3159"
          type: string
        lng:
          description: Geolocation longitude
          example: "81.1496"
          type: string
      type: object
    User:
      properties:
        address:
          $ref: '#/components/schemas/Address'
        company:
          $ref: '#/components/schemas/Company'
        email:
          description: User email
          example: "Sincere@april.biz"
          type: string
        id:
          description: User id
          example: 1
          format: int64
          type: integer
        name:
          description: User name
          example: "Leanne Graham"
          type: string
        phone:
          description: User phone
          example: "1-770-736-8031 x56442"
          type: string
        profilePictureUrl:
          description: User profile picture url
          example: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          type: string
        username:
          description: User username
          example: "Bret"
          type: string
        website:
          description: User website
          example: "hildegard.org"
          type: string
```

For better visualization you can copy-paste the YAML file into [Swagger Editor](https://editor.swagger.io/) or use [OpenAPI (Swagger) Editor
in IntelliJ IDEA](https://plugins.jetbrains.com/plugin/14837-openapi-swagger-editor). You should be able to see something like this:

<div>
  <img src={require('@site/static/img/contract-driven-development/preview-browser.png').default} alt="preview browser" />
</div>

## REST and RESTful

**REST** (Representational State Transfer) is an architectural style defined by [Roy Fielding](https://roy.gbiv.com/), emphasizing:

1. Client-server separation
2. Statelessness
3. Cacheability
4. Layered system
5. Uniform interface (resources, representations)
6. Code-on-demand (optional)

**RESTful** APIs strictly follow *all* these constraints. But here's the thing: **most "REST" APIs aren't truly RESTful**, and that's okay.

### Rest Is Fine

True RESTful APIs require [HATEOAS](https://restfulapi.net/hateoas/) (Hypermedia as the Engine of Application State)—embedding links to related resources in responses:

```json
{
  "id": 1,
  "links": [
    { "rel": "self", "href": "/users/1" },
    { "rel": "orders", "href": "/users/1/orders" }
  ]
}
```

In practice this doesn't happen:

* Frontend teams rarely use embedded links.
* Adds complexity without immediate value.

An OpenAPI contract already gives you 80% of REST's benefits:

* **Resource-centric URLs** (`/users/{id}`).
* **Standard HTTP methods** (`GET`/`POST`/`PUT`/`DELETE`).
* **Clear error handling** (`4xx`/`5xx` codes).

For those reasons, **we are going to build REST APIs**. Unless you're building hypermedia-driven systems, **REST is fine**. Focus on:

* Consistent contracts.
* Predictable error handling.
* Documentation humans and machines can use.

As your API evolves, you may add RESTful features later if required.