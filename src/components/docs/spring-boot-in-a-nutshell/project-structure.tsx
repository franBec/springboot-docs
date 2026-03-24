import CodeBlock from '@theme/CodeBlock';

export const DefaultProjectStructure = () => (
  <CodeBlock language="log" title="File Tree">
    {`your-project/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── dev/pollito/spring_java/
│   │   │       └── SpringJavaApplication.java
│   │   └── resources/
│   │       ├── static/
│   │       ├── templates/
│   │       └── application.properties (or application.yml)
│   └── test/
│       └── java/dev/pollito/spring_java/
│           └── SpringJavaApplicationTests.java
├── .gitignore
├── pom.xml (or build.gradle)
└── HELP.md`}
  </CodeBlock>
);

export const CleanArchitectureStructure = () => (
  <CodeBlock language="log" title="File Tree">
    {`src/main/java/dev/pollito/spring_java
├── SpringJavaApplication.java
│
└── sakila
    ├── domain
    │   ├── model
    │   │   └── Film.java                    # Enterprise Business Rules
    │   ├── repository
    │   │   └── FilmRepository.java          # Enterprise Business Rules
    │   └── service
    │       └── FilmService.java             # Enterprise Business Rules
    │
    ├── application
    │   └── usecase
    │       └── FindFilmByIdUseCase.java      # Application Business Rules
    │
    ├── infrastructure
    │   ├── persistence
    │   │   ├── entity
    │   │   │   └── FilmEntity.java          # Interface Adapters
    │   │   ├── repository
    │   │   │   └── H2FilmRepository.java    # Frameworks & Drivers
    │   │   └── mapper
    │   │       └── FilmEntityMapper.java    # Interface Adapters
    │   │
    │   ├── external
    │   │   └── feign
    │   │       ├── ExternalFilmClient.java  # Frameworks & Drivers
    │   │       └── ExternalFilmResponse.java# Interface Adapters
    │   │
    │   └── configuration
    │       └── FeignConfig.java              # Frameworks & Drivers
    │
    └── interfaces
        └── rest
            ├── controller
            │   └── FilmController.java      # Interface Adapters
            └── dto
                └── FilmResponse.java        # Interface Adapters`}
  </CodeBlock>
);

export const HexagonalArchitectureStructure = () => (
  <CodeBlock language="log" title="File Tree">
    {`src/main/java/dev/pollito/spring_java
├── SpringJavaApplication.java
│
└── sakila
    ├── domain
    │   ├── model
    │   │   └── Film.java                          # Business/Domain logic
    │   ├── service
    │   │   └── FilmService.java                   # Business/Domain logic
    │   └── port
    │       ├── in
    │       │   └── FindFilmByIdPort.java            # Primary Port
    │       └── out
    │           ├── FilmPersistencePort.java        # Secondary Port
    │           └── ExternalFilmInfoPort.java       # Secondary Port
    │
    ├── adapter
    │   ├── in
    │   │   └── rest
    │   │       ├── FilmController.java             # Primary Adapter
    │   │       └── dto
    │   │           └── FilmResponse.java           # Primary Adapter
    │   │
    │   └── out
    │       ├── persistence
    │       │   ├── entity
    │       │   │   └── FilmEntity.java             # Secondary Adapter
    │       │   ├── repository
    │       │   │   └── H2FilmRepository.java       # Secondary Adapter
    │       │   └── FilmPersistenceAdapter.java     # Secondary Adapter
    │       │
    │       └── external
    │           └── feign
    │               ├── ExternalFilmClient.java     # Secondary Adapter
    │               ├── ExternalFilmResponse.java   # Secondary Adapter
    │               └── ExternalFilmAdapter.java    # Secondary Adapter
    │
    └── configuration
        └── FeignConfig.java`}
  </CodeBlock>
);
