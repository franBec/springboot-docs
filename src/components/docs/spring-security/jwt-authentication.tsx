import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Mermaid from '@theme/Mermaid';
import { FileTreeInfo } from '@site/src/components/file-tree-info';
import ZoomContainer from '@site/src/components/zoom-container';

const FileTreeJava = () => (
  <CodeBlock language="log" title="File Tree">
    {`.
// highlight-modified
├── build.gradle
├── ...
└── src
    ├── main
    │   ├── java
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_java
    │   │               ├── config
    │   │               │   ├── security
// highlight-added
    │   │               │   │   ├── SecurityConfig.java
    │   │               │   │   ├── handler
// highlight-added-start
    │   │               │   │   │   ├── AuthenticationErrorResponseWriter.java
    │   │               │   │   │   ├── CustomAccessDeniedHandler.java
    │   │               │   │   │   └── CustomAuthenticationEntryPoint.java
// highlight-added-end
    │   │               │   │   ├── jwt
// highlight-added-start
    │   │               │   │   │   ├── JwtAuthenticationFilter.java
    │   │               │   │   │   ├── JwtProperties.java
    │   │               │   │   │   └── JwtService.java
// highlight-added-end
    │   │               │   │   └── userdetails
// highlight-added-start
    │   │               │   │       ├── SakilaUserDetails.java
    │   │               │   │       └── SakilaUserDetailsService.java
// highlight-added-end
    │   │               │   └── web
// highlight-modified
    │   │               │       └── ControllerAdvice.java
    │   │               └── sakila
    │   │                   ├── auth
    │   │                   │   ├── adapter
    │   │                   │   │   └── in
    │   │                   │   │       └── rest
// highlight-added-start
    │   │                   │   │           ├── AuthRestController.java
    │   │                   │   │           └── AuthRestMapper.java
// highlight-added-end
    │   │                   │   └── domain
    │   │                   │       ├── port
    │   │                   │       │   └── in
// highlight-added
    │   │                   │       │       └── AuthUseCases.java
    │   │                   │       └── service
// highlight-added
    │   │                   │           └── AuthUseCasesImpl.java
    │   │                   └── staff
    │   │                       ├── adapter
    │   │                       │   └── out
    │   │                       │       └── jpa
// highlight-added-start
    │   │                       │           ├── StaffJpaMapper.java
    │   │                       │           ├── StaffJpaRepository.java
    │   │                       │           └── StaffRepositoryImpl.java
// highlight-added-end
    │   │                       └── domain
    │   │                           ├── model
// highlight-added
    │   │                           │   └── Staff.java
    │   │                           └── port
    │   │                               └── out
// highlight-added
    │   │                                   └── StaffRepository.java
    │   └── resources
// highlight-modified-start
    │       ├── application.yaml
    │       ├── openapi.yaml
    │       ├── sakila-data.sql
    │       └── sakila-schema.sql
// highlight-modified-end
    └── test
        └── java
            └── dev
                └── pollito
                    └── spring_java
                        ├── config
                        │   └── security
// highlight-added
                        │       ├── SecurityConfigMockMvcTest.java
                        │       ├── jwt
// highlight-added-start
                        │       │   ├── JwtAuthenticationFilterTest.java
                        │       │   └── JwtServiceTest.java
// highlight-added-end
                        │       └── userdetails
// highlight-added-start
                        │           └── SakilaUserDetailsServiceTest.java
// highlight-added-end
                        └── sakila
                            ├── auth
                            │   ├── adapter
                            │   │   └── in
                            │   │       └── rest
// highlight-added
                            │   │           └── AuthRestControllerMockMvcTest.java
                            │   └── domain
                            │       └── service
// highlight-added
                            │           └── AuthUseCasesImplTest.java
                            └── film
                                └── adapter
                                    └── in
                                        └── rest
// highlight-modified
                                            └── FilmRestControllerMockMvcTest.java`}
  </CodeBlock>
);

const FileTreeKt = () => (
  <CodeBlock language="log" title="File Tree">
    {`.
// highlight-modified
├── build.gradle.kts
├── ...
└── src
    ├── main
    │   ├── kotlin
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_kotlin
    │   │               ├── config
    │   │               │   ├── security
// highlight-added
    │   │               │   │   ├── SecurityConfig.kt
    │   │               │   │   ├── handler
// highlight-added-start
    │   │               │   │   │   ├── AuthenticationErrorResponseWriter.kt
    │   │               │   │   │   ├── CustomAccessDeniedHandler.kt
    │   │               │   │   │   └── CustomAuthenticationEntryPoint.kt
// highlight-added-end
    │   │               │   │   ├── jwt
// highlight-added-start
    │   │               │   │   │   ├── JwtAuthenticationFilter.kt
    │   │               │   │   │   ├── JwtProperties.kt
    │   │               │   │   │   └── JwtService.kt
// highlight-added-end
    │   │               │   │   └── userdetails
// highlight-added-start
    │   │               │   │       ├── SakilaUserDetails.kt
    │   │               │   │       └── SakilaUserDetailsService.kt
// highlight-added-end
    │   │               │   └── web
// highlight-modified
    │   │               │       └── ControllerAdvice.kt
    │   │               └── sakila
    │   │                   ├── auth
    │   │                   │   ├── adapter
    │   │                   │   │   └── in
    │   │                   │   │       └── rest
// highlight-added-start
    │   │                   │   │           ├── AuthRestController.kt
    │   │                   │   │           └── AuthRestMapper.kt
// highlight-added-end
    │   │                   │   └── domain
    │   │                   │       ├── port
    │   │                   │       │   └── in
// highlight-added
    │   │                   │       │       └── AuthUseCases.kt
    │   │                   │       └── service
// highlight-added
    │   │                   │           └── AuthUseCasesImpl.kt
    │   │                   └── staff
    │   │                       ├── adapter
    │   │                       │   └── out
    │   │                       │       └── jpa
// highlight-added-start
    │   │                       │           ├── StaffJpaMapper.kt
    │   │                       │           ├── StaffJpaRepository.kt
    │   │                       │           └── StaffRepositoryImpl.kt
// highlight-added-end
    │   │                       └── domain
    │   │                           ├── model
// highlight-added
    │   │                           │   └── Staff.kt
    │   │                           └── port
    │   │                               └── out
// highlight-added
    │   │                                   └── StaffRepository.kt
    │   └── resources
// highlight-modified-start
    │       ├── application.yaml
    │       ├── openapi.yaml
    │       ├── sakila-data.sql
    │       └── sakila-schema.sql
// highlight-modified-end
    └── test
        └── kotlin
            └── dev
                └── pollito
                    └── spring_kotlin
                        ├── config
                        │   └── security
// highlight-added
                        │       ├── SecurityConfigMockMvcTest.kt
                        │       ├── jwt
// highlight-added-start
                        │       │   ├── JwtAuthenticationFilterTest.kt
                        │       │   └── JwtServiceTest.kt
// highlight-added-end
                        │       └── userdetails
// highlight-added
                        │           └── SakilaUserDetailsServiceTest.kt
                        └── sakila
                            ├── auth
                            │   ├── adapter
                            │   │   └── in
                            │   │       └── rest
// highlight-added
                            │   │           └── AuthRestControllerMockMvcTest.kt
                            │   └── domain
                            │       └── service
// highlight-added
                            │           └── AuthUseCasesImplTest.kt
                            └── film
                                └── adapter
                                    └── in
                                        └── rest
// highlight-modified
                                            └── FilmRestControllerMockMvcTest.kt`}
  </CodeBlock>
);

const FileTreeGroovy = () => (
  <CodeBlock language="log" title="File Tree">
    {`.
// highlight-modified
├── build.gradle
├── ...
└── src
    ├── main
    │   ├── groovy
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_groovy
    │   │               ├── config
    │   │               │   ├── security
// highlight-added
    │   │               │   │   ├── SecurityConfig.groovy
    │   │               │   │   ├── handler
// highlight-added-start
    │   │               │   │   │   ├── AuthenticationErrorResponseWriter.groovy
    │   │               │   │   │   ├── CustomAccessDeniedHandler.groovy
    │   │               │   │   │   └── CustomAuthenticationEntryPoint.groovy
// highlight-added-end
    │   │               │   │   ├── jwt
// highlight-added-start
    │   │               │   │   │   ├── JwtAuthenticationFilter.groovy
    │   │               │   │   │   ├── JwtProperties.groovy
    │   │               │   │   │   └── JwtService.groovy
// highlight-added-end
    │   │               │   │   └── userdetails
// highlight-added-start
    │   │               │   │       ├── SakilaUserDetails.groovy
    │   │               │   │       └── SakilaUserDetailsService.groovy
// highlight-added-end
    │   │               │   └── web
// highlight-modified
    │   │               │       └── ControllerAdvice.groovy
    │   │               └── sakila
    │   │                   ├── auth
    │   │                   │   ├── adapter
    │   │                   │   │   └── in
    │   │                   │   │       └── rest
// highlight-added-start
    │   │                   │   │           ├── AuthRestController.groovy
    │   │                   │   │           └── AuthRestMapper.groovy
// highlight-added-end
    │   │                   │   └── domain
    │   │                   │       ├── port
    │   │                   │       │   └── in
// highlight-added
    │   │                   │       │       └── AuthUseCases.groovy
    │   │                   │       └── service
// highlight-added
    │   │                   │           └── AuthUseCasesImpl.groovy
    │   │                   └── staff
    │   │                       ├── adapter
    │   │                       │   └── out
    │   │                       │       └── jpa
// highlight-added-start
    │   │                       │           ├── StaffJpaMapper.groovy
    │   │                       │           ├── StaffJpaRepository.groovy
    │   │                       │           └── StaffRepositoryImpl.groovy
// highlight-added-end
    │   │                       └── domain
    │   │                           ├── model
// highlight-added
    │   │                           │   └── Staff.groovy
    │   │                           └── port
    │   │                               └── out
// highlight-added
    │   │                                   └── StaffRepository.groovy
    │   └── resources
// highlight-modified-start
    │       ├── application.yaml
    │       ├── openapi.yaml
    │       ├── sakila-data.sql
    │       └── sakila-schema.sql
// highlight-modified-end
    └── test
        └── groovy
            └── dev
                └── pollito
                    └── spring_groovy
                        ├── config
                        │   └── security
// highlight-added
                        │       ├── SecurityConfigMockMvcSpec.groovy
                        │       ├── jwt
// highlight-added-start
                        │       │   ├── JwtAuthenticationFilterSpec.groovy
                        │       │   └── JwtServiceSpec.groovy
// highlight-added-end
                        │       └── userdetails
// highlight-added
                        │           └── SakilaUserDetailsServiceSpec.groovy
                        └── sakila
                            ├── auth
                            │   ├── adapter
                            │   │   └── in
                            │   │       └── rest
// highlight-added
                            │   │           └── AuthRestControllerMockMvcSpec.groovy
                            │   └── domain
                            │       └── service
// highlight-added
                            │           └── AuthUseCasesImplSpec.groovy
                            └── film
                                └── adapter
                                    └── in
                                        └── rest
// highlight-modified
                                            └── FilmRestControllerMockMvcSpec.groovy`}
  </CodeBlock>
);

export const FileTree = () => (
  <FileTreeInfo>
    <Tabs groupId="language" queryString>
      <TabItem value="java" label="Java" default>
        <FileTreeJava />
      </TabItem>
      <TabItem value="kotlin" label="Kotlin">
        <FileTreeKt />
      </TabItem>
      <TabItem value="groovy" label="Groovy">
        <FileTreeGroovy />
      </TabItem>
    </Tabs>
  </FileTreeInfo>
);

export const AuthenticationExampleTerminal = () => (
  <CodeBlock language="log" title="Terminal">
    {`$ curl -s 'POST' \\
  'http://localhost:8080/api/auth/login' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
  "username": "Mike",
  "password": "password"
}' | jq
{
  "instance": "/api/auth/login",
  "status": 200,
  "timestamp": "2026-04-28T22:55:22.915386475+01:00",
  "trace": "89784b93d7c8e7e5fc5dc26175d8315f",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJNaWtlIiwiaWF0IjoxNzc3NDEzMzIyLCJleHAiOjE3Nzc0MTY5MjJ9.BJHNKRefBZHF8iRU9cS7N2hyQvo5MtMIrPG0IcOZGhE"
  }
}`}
  </CodeBlock>
);

export const AuthenticationExampleDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
  participant Client
  box Adapter In
    participant AuthRestController
  end
  box Domain
    participant AuthUseCasesImpl
  end
  box Infrastructure
    participant AuthenticationManager
    participant SakilaUserDetailsService
    participant JwtService
  end
  box Adapter Out
    participant StaffRepositoryImpl
    participant StaffJpaRepository
    participant StaffJpaMapper
  end
  participant H2 Database

  Client->>AuthRestController: POST /api/auth/login
  activate AuthRestController

  AuthRestController->>AuthUseCasesImpl: authenticate("Mike", "password")
  activate AuthUseCasesImpl

  AuthUseCasesImpl->>AuthenticationManager: authenticate(unauthenticated("Mike", "password"))
  activate AuthenticationManager

  AuthenticationManager->>SakilaUserDetailsService: loadUserByUsername("Mike")
  activate SakilaUserDetailsService

  SakilaUserDetailsService->>StaffRepositoryImpl: findByUsername("Mike")
  activate StaffRepositoryImpl

  StaffRepositoryImpl->>StaffJpaRepository: findByUsername("Mike")
  activate StaffJpaRepository

  StaffJpaRepository->>H2 Database: SELECT * FROM STAFF WHERE USERNAME = 'Mike'
  H2 Database-->>StaffJpaRepository: Row data

  StaffJpaRepository-->>StaffRepositoryImpl: StaffEntity
  deactivate StaffJpaRepository

  StaffRepositoryImpl->>StaffJpaMapper: mapper.map(entity)
  activate StaffJpaMapper
  StaffJpaMapper-->>StaffRepositoryImpl: Domain Staff
  deactivate StaffJpaMapper

  StaffRepositoryImpl-->>SakilaUserDetailsService: Domain Staff
  deactivate StaffRepositoryImpl

  SakilaUserDetailsService->>SakilaUserDetailsService: new SakilaUserDetails(staff)
  SakilaUserDetailsService-->>AuthenticationManager: UserDetails
  deactivate SakilaUserDetailsService

  AuthenticationManager->>AuthenticationManager: PasswordEncoder.matches(...)
  AuthenticationManager-->>AuthUseCasesImpl: Authentication (principal)
  deactivate AuthenticationManager

  AuthUseCasesImpl->>JwtService: generateToken(userDetails)
  activate JwtService
  JwtService-->>AuthUseCasesImpl: JWT token
  deactivate JwtService

  AuthUseCasesImpl-->>AuthRestController: JWT token
  deactivate AuthUseCasesImpl

  AuthRestController-->>Client: HTTP 200 OK + JSON body
  deactivate AuthRestController
      `}
    />
  </ZoomContainer>
);

export const AuthorizedExampleTerminal = () => (
  <CodeBlock language="log" title="Terminal">
    {`$ curl -s 'GET' \\
  'http://localhost:8080/api/auth/me' \\
  -H 'accept: application/json' \\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJNaWtlIiwiaWF0IjoxNzc3NDE0MjQyLCJleHAiOjE3Nzc0MTc4NDJ9.uvSsC412-2tX5ab_lAQFeSG3BrnzJw1JQj9Msr320ls' | jq
{
  "instance": "/api/auth/me",
  "status": 200,
  "timestamp": "2026-04-28T23:11:30.415677563+01:00",
  "trace": "e9ef841cc7107f2acc62d5a0bf25b422",
  "data": {
    "username": "Mike",
    "accountNonLocked": true,
    "authorities": [
      "ROLE_STAFF"
    ],
    "staff": {
      "id": 1,
      "firstName": "Mike",
      "lastName": "Hillyer",
      "username": "Mike",
      "active": true,
      "email": "Mike.Hillyer@sakilastaff.com"
    }
  }
}`}
  </CodeBlock>
);

export const AuthorizedExampleDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
  participant Client
  box Adapter In
    participant AuthRestController
    participant AuthRestMapper
  end
  box Domain
    participant AuthUseCasesImpl
  end
  box Infrastructure
    participant JwtAuthenticationFilter
    participant JwtService
    participant SakilaUserDetailsService
    participant SecurityContextHolder
  end

  Client->>JwtAuthenticationFilter: GET /api/auth/me (Authorization: Bearer <token>)
  activate JwtAuthenticationFilter

  JwtAuthenticationFilter->>JwtService: extractUsername(token)
  activate JwtService
  JwtService-->>JwtAuthenticationFilter: username ("Mike")
  deactivate JwtService

  JwtAuthenticationFilter->>SakilaUserDetailsService: loadUserByUsername("Mike")
  activate SakilaUserDetailsService
  SakilaUserDetailsService-->>JwtAuthenticationFilter: SakilaUserDetails
  deactivate SakilaUserDetailsService

  JwtAuthenticationFilter->>JwtService: isTokenValid(token, userDetails)
  activate JwtService
  JwtService-->>JwtAuthenticationFilter: true
  deactivate JwtService

  JwtAuthenticationFilter->>SecurityContextHolder: setAuthentication(authToken)
  activate SecurityContextHolder
  SecurityContextHolder-->>JwtAuthenticationFilter: context populated
  deactivate SecurityContextHolder

  JwtAuthenticationFilter->>AuthRestController: continue filter chain
  deactivate JwtAuthenticationFilter

  activate AuthRestController

  AuthRestController->>AuthUseCasesImpl: getCurrentUser()
  activate AuthUseCasesImpl

  AuthUseCasesImpl->>SecurityContextHolder: getContext().getAuthentication()
  activate SecurityContextHolder

  SecurityContextHolder-->>AuthUseCasesImpl: Authentication (SakilaUserDetails)
  deactivate SecurityContextHolder

  AuthUseCasesImpl-->>AuthRestController: SakilaUserDetails
  deactivate AuthUseCasesImpl

  AuthRestController->>AuthRestMapper: mapper.map(userDetails)
  activate AuthRestMapper
  AuthRestMapper-->>AuthRestController: REST DTO User
  deactivate AuthRestMapper

  AuthRestController-->>Client: HTTP 200 OK + JSON body
  deactivate AuthRestController
      `}
    />
  </ZoomContainer>
);

export const UnauthorizedMissingHeaderTerminal = () => (
  <CodeBlock language="log" title="Terminal">
    {`$ curl -s 'GET' \\
  'http://localhost:8080/api/auth/me' \\
  -H 'accept: application/json' | jq
{
  "title": "Unauthorized",
  "detail": "Full authentication is required to access this resource",
  "instance": "/api/auth/me",
  "status": 401,
  "timestamp": "2026-04-28T23:24:03.462397829+01:00",
  "trace": "0b6455353a71f296304ce5a0814d1f49"
}`}
  </CodeBlock>
);

export const UnauthorizedMissingHeaderDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
  participant Client
  participant DS as DispatcherServlet
  participant CA as ControllerAdvice

  Client->>DS: GET /api/auth/me (no Authorization header)
  DS->>DS: Spring Security: Full authentication required
  DS->>DS: throws AuthenticationException
  DS->>CA: handleException(AuthenticationException)
  CA->>CA: @ExceptionHandler(AuthenticationException.class)
  CA->>CA: buildProblemDetail(e, UNAUTHORIZED)
  CA->>CA: log.warn("AuthenticationException being handled")
  CA-->>DS: ProblemDetail {status: 401, title, detail, timestamp, trace}
  DS-->>Client: HTTP 401 UNAUTHORIZED + JSON body
      `}
    />
  </ZoomContainer>
);

export const UnauthorizedInvalidTokenTerminal = () => (
  <CodeBlock language="log" title="Terminal">
    {`$ curl -s 'GET' \\
  'http://localhost:8080/api/auth/me' \\
  -H 'accept: application/json' \\
  -H 'Authorization: Bearer non-valid-token' | jq
{
  "title": "Unauthorized",
  "detail": "Invalid or malformed JWT token",
  "instance": "/api/auth/me",
  "status": 401,
  "timestamp": "2026-04-28T23:28:28.845341983+01:00",
  "trace": "2ff938e56d19299321753f40e60ceb20"
}`}
  </CodeBlock>
);

export const UnauthorizedInvalidTokenDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
  participant Client
  participant JAF as JwtAuthenticationFilter
  participant JS as JwtService
  participant ETF as ExceptionTranslationFilter
  participant CAEP as CustomAuthenticationEntryPoint

  Client->>JAF: GET /api/auth/me (Authorization: Bearer non-valid-token)
  activate JAF

  JAF->>JS: extractUsername(token)
  activate JS
  JS--xJAF: throws MalformedJwtException
  deactivate JS

  JAF->>JAF: catch JwtException → throw InsufficientAuthenticationException
  deactivate JAF

  ETF->>ETF: catches InsufficientAuthenticationException
  ETF->>CAEP: commence(request, response, exception)
  activate CAEP

  CAEP->>CAEP: AuthenticationErrorResponseWriter.write(...)
  CAEP-->>ETF: ProblemDetail {status: 401, detail, instance, timestamp, trace}
  deactivate CAEP

  ETF-->>Client: HTTP 401 UNAUTHORIZED + JSON body
      `}
    />
  </ZoomContainer>
);
