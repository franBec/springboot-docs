---
sidebar_position: 2
---

# Define Your Clients in a Contract

Back in [Contract-Driven Development](/category/contract-driven-development), we used an OpenAPI specification to define the expected behaviour of our Spring Boot application when **providing** endpoints to whoever decides to use our app.

<div>
  <img src={require('@site/static/img/integration-layer/openapi-controller.png').default} alt="openapi controller" />
</div>

But what if we used another OpenAPI specification to define the expected behaviour of our Spring Boot application when **integrating** an outside source?

<div>
  <img src={require('@site/static/img/integration-layer/openapi-external-sources.png').default} alt="openapi external sources" />
</div>

Well, we are in luck, cause the same [openapi-generator plugin](https://github.com/OpenAPITools/openapi-generator) is capable of doing both things!

For our project, we are going to integrate [\{JSON\} Placeholder /users endpoint](https://jsonplaceholder.typicode.com/users) to get fake data about users:

- Outside sources may provide an OpenAPI specification, but for this case I was not able to find any. So I made my own interpretation.

```yaml
openapi: 3.0.3
info:
  version: 1.0.0
  title: JSON Placeholder API
  description: See https://jsonplaceholder.typicode.com/
servers:
  - url: "https://jsonplaceholder.typicode.com/"
paths:
  /users:
    get:
      tags:
        - User
      operationId: getUsers
      summary: Get list of all users
      responses:
        "200":
          description: List of all users
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/User"
        default:
          description: Error
          content:
            application/json:
              schema:
                type: object
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
          $ref: "#/components/schemas/Geo"
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
    Geo:
      description: Address geolocalization
      properties:
        lat:
          description: Geolocalization latitude
          example: "-37.3159"
          type: string
        lng:
          description: Geolocalization longitude
          example: "81.1496"
          type: string
      type: object
    User:
      properties:
        address:
          $ref: "#/components/schemas/Address"
        company:
          $ref: "#/components/schemas/Company"
        email:
          description: User email
          example: "Sincere@april.biz"
          type: string
        id:
          description: User id
          example: 1
          type: integer
        name:
          description: User name
          example: "Leanne Graham"
          type: string
        phone:
          description: User phone
          example: "1-770-736-8031 x56442"
          type: string
        username:
          description: User username
          example: "Bret"
          type: string
        website:
          description: User website
          example: "hildegard.org"
          type: string
      type: object
```

Now that we documented the outside source we are integrating, let's generate code from this contract in the next step.