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
	}
}
```

We want to create the following endpoints:

* `/users` will return a list of users.
* `/users/{id}` will return the user with a matching id.

An [OpenAPI Specification](https://swagger.io/specification/) complies with the definition of contract I gave before: Is a set of assertions containing **valid input values**, and their meaning, **valid return values**, and their meaning, and **error values that can occur**, and their meaning.

An OpenAPI Specification that would represent the desired behaviour would look something like this:

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
      parameters:
        - description: Zero-based page index (0..N)
          in: query
          name: pageNumber
          schema:
            default: 0
            minimum: 0
            maximum: 2147483647
            type: integer
        - description: Size of the page to be returned
          in: query
          name: pageSize
          schema:
            default: 10
            maximum: 10
            minimum: 1
            type: integer
        - description: >
            Sorting criteria in the format `field:direction`. Specify multiple
            sort criteria by repeating the `sort` query parameter. For example:
            `?pageSort=name:desc&pageSort=id:asc`. Available field values:
            `id`, `name`, `username`, `email`. Available direction values: `asc`,
            `desc`. If direction value is omitted it defaults to `asc`
          explode: true
          in: query
          name: pageSort
          schema:
            default: [ id:asc ]
            items:
              type: string
            type: array
      responses:
        '200':
          description: List of all users
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Users'
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
    Pageable:
      type: object
      properties:
        pageNumber:
          description: Current page number (starts from 0)
          example: 0
          type: integer
        pageSize:
          description: Number of items retrieved on this page
          example: 1
          type: integer
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
        username:
          description: User username
          example: "Bret"
          type: string
        website:
          description: User website
          example: "hildegard.org"
          type: string
    Users:
      properties:
        content:
          type: array
          items:
            $ref: '#/components/schemas/User'
        pageable:
          $ref: '#/components/schemas/Pageable'
        totalElements:
          description: Total number of items that meet the criteria
          example: 10
          type: integer
      type: object
```

For better visualization you can copy-paste the yaml file into [Swagger Editor](https://editor.swagger.io/) or use the “Show OpenAPI Preview” in IntelliJ IDEA (top right corner).

<div>
  <img src={require('@site/static/img/contract-driven-development/openapi-preview.png').default} alt="openapi preview" />
</div>

You should be able to see something like this:

<div>
  <img src={require('@site/static/img/contract-driven-development/preview-browser.png').default} alt="preview browser" />
</div>

We have the endpoint documentation done.