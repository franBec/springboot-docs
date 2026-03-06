---
sidebar_position: 3
title: Roadmap
---

While direct contributions to this demo repository are not actively sought, **feedback on the guide itself is always welcome**. If you find issues, have suggestions for improvement, or want to report inaccuracies, please feel free to open an issue or contact me on [LinkedIn](https://linkedin.com/in/franco-becvort/).

## Things I have in mind

### Translations

- **Ukrainian and Russian**: My partner is native in both languages
- **Portuguese**: I need to ask a Portuguese friend to help with this

### New Content

- **Persistence Integration**:
  - **Reverse Engineering JPA Entities**: Work in progress. Document about how to set up [Hibernate Tools → Reverse engineering from a database](https://hibernate.org/tools/).
  - **Database Integration**: Work in progress. Document about using `JPARepository`. Full request/response cycle complete with H2 Database.
  - **Database Deployment**: Create a new document about adding a Postgres database to the docker-compose + deployment to coolify.
  - **CRUD**: Create a new document doing whole CRUD of films. Introduce the concept of pagination. Check [swaggerhub-spring-pagination](https://github.com/daniel-shuy/swaggerhub-spring-pagination) for reference.
  - **Schema Migrations**: Maybe creating a new document about this, exploring [Flyway](https://github.com/flyway/flyway) or [Liquibase](https://www.liquibase.com/). Not that confident in these areas though.
- **Deployment → Dependabot and CodeQL**: Create a new document under the Deployment section explaining how to set up Dependabot for automated dependency updates and GitHub Advanced Security with CodeQL for code scanning.

- **Deployment → Docker Registry Alternative**: Add a section in `/deployment/deployment-on-a-vps.mdx` explaining the alternative approach of using a Docker registry (e.g., GitHub Container Registry) instead of having Coolify build the application. Compare pros and cons with the current approach where Coolify handles the build.

- **Observability**:
  - Add a File Tree of files created/modified
  - Explanation about what each panels in the Grafana dashboards shows

- **Spring Security Section**: Create a dedicated section covering authentication, authorization, and security best practices in Spring Boot applications.

### Future Improvements

- **AI Search Feature**: Currently the search bar has an [AI feature](https://github.com/easyops-cn/docusaurus-search-local?tab=readme-ov-file#-ask-ai-support) that is disabled. Need to check how expensive and exploitable activating this could be. Probably an overkill but would be fancy.

### Huge Maybe

- **Template Engines Section**: Just for fun, create some basic views (login, table with pagination, forms) using [Thymeleaf](https://www.thymeleaf.org/) (templating) + [HTMX](https://htmx.org/) (server interactions) + [Alpine.js](https://alpinejs.dev/) (UI state) + [Tailwind CSS](https://tailwindcss.com/) (styling). This would be a "modern vintage" approach, server-side rendering with a touch of modern interactivity.
