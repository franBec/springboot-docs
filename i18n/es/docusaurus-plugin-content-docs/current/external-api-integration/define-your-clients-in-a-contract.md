---
sidebar_position: 2
---
 
# Definí tus clientes en un contrato

En [Desarrollo basado en Contratos](/category/contract-driven-development), usamos una [OpenAPI Specification](https://swagger.io/specification/) para definir el comportamiento esperado de nuestra aplicación Spring Boot al **proveer** endpoints a quien decida usar nuestra app.

<div>
  <img src={require('@site/static/img/external-api-integration/openapi-primary-adapter.png').default} alt="openapi primary adapter" />
</div>

Pero ¿qué pasa si usamos otra OpenAPI Specification para definir el comportamiento esperado de nuestra aplicación Spring Boot al **integrar** una API Externa?

<div>
  <img src={require('@site/static/img/external-api-integration/openapi-primary-and-secondary-adapters.png').default} alt="openapi primary y secondary adapters" />
</div>

Bueno, tenemos suerte, ¡porque el mismo [plugin openapi-generator](https://github.com/OpenAPITools/openapi-generator) es capaz de hacer ambas cosas!

Para nuestro proyecto, vamos a integrar el [endpoint /users de \{JSON\} Placeholder](https://jsonplaceholder.typicode.com/users) para obtener datos falsos sobre usuarios:

*   Fuentes externas pueden proporcionar una OpenAPI Specification, pero en este caso no pude encontrar ninguna. Así que hice mi propia interpretación.

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
      operationId: findAll
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

Ahora que documentamos la fuente externa que estamos integrando, generemos código a partir de este contrato en el siguiente paso.