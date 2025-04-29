---
sidebar_position: 2
---

# Definí tus endpoints en un contrato

Dado un Usuario con la siguiente estructura:

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

Queremos que nuestro backend exponga estos endpoints:

* `/users` lista todos los usuarios.
* `/users/{id}` obtiene un usuario por identificador.

## OpenAPI specification

Una [OpenAPI Specification](https://swagger.io/specification/) cumple con la definición de contrato que di antes: Es un conjunto de afirmaciones que contiene **valores de entrada válidos** y su significado, **valores de retorno válidos** y su significado, y **valores de error que pueden ocurrir** y su significado.

Una OpenAPI Specification que representaría el comportamiento deseado se vería algo así:

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

Para una mejor visualización, podés copiar y pegar el archivo YAML en [Swagger Editor](https://editor.swagger.io/) o usar [OpenAPI (Swagger) Editor en IntelliJ IDEA](https://plugins.jetbrains.com/plugin/14837-openapi-swagger-editor). Deberías poder ver algo así:

<div>
  <img src={require('@site/static/img/contract-driven-development/preview-browser.png').default} alt="vista previa en el navegador" />
</div>

## Rest y Restful

**REST** (Representational State Transfer) es un estilo arquitectónico definido por [Roy Fielding](https://roy.gbiv.com/), que enfatiza:

1. Separación cliente-servidor.
2. Ausencia de estado (Statelessness).
3. Capacidad de caché (Cacheability).
4. Sistema en capas (Layered system).
5. Interfaz uniforme (recursos, representaciones).
6. Código bajo demanda (Code-on-demand) (opcional).

Las API **RESTful** siguen estrictamente *todas* estas restricciones. Pero la realidad es esta: **la mayoría de las API "REST" no son verdaderamente RESTful**, y eso está bien.

### Rest está bien

Las APIs verdaderamente RESTful requieren [HATEOAS](https://restfulapi.net/hateoas/) (Hypermedia as the Engine of Application State) — embeber links a recursos relacionados en las respuestas:

```json
{
  "id": 1,
  "links": [
    { "rel": "self", "href": "/users/1" },
    { "rel": "orders", "href": "/users/1/orders" }
  ]
}
```

En la práctica, esto no sucede:

* Los equipos de frontend rara vez usan links embebidos.
* Agrega complejidad sin valor inmediato.

Un contrato OpenAPI ya te da el 80% de los beneficios de REST:

* **URLs centradas en recursos** (`/users/{id}`).
* **Métodos HTTP estándar** (`GET`/`POST`/`PUT`/`DELETE`).
* **Manejo claro de errores** (códigos `4xx`/`5xx`).

Por esas razones, **vamos a construir APIs REST**. A menos que estés construyendo sistemas impulsados por hipermedia, **REST está bien**. Enfocate en:

* Contratos consistentes.
* Manejo predecible de errores.
* Documentación que humanos y máquinas puedan usar.

A medida que tu API evolucione, podés agregar funcionalidades RESTful más adelante si es necesario.