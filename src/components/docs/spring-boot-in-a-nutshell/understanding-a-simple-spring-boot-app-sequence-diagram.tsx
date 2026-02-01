import ZoomContainer from '@site/src/components/zoom-container';
import Mermaid from '@theme/Mermaid';

export const RequestFlowSequenceDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
        participant Client
        box Spring MVC
            participant FilmController
        end
        box Spring Container
            participant FilmService
            participant FilmRepository
        end
        participant Database

        Client->>FilmController: GET /api/films/{filmId} Request
        activate FilmController
        Note over FilmController: Receives HTTP request, extracts filmId from path.

        FilmController->>FilmService: findFilmById(filmId)
        activate FilmService
        Note over FilmService: Contains business logic to retrieve film by ID.

        FilmService->>FilmRepository: findById(filmId)
        activate FilmRepository
        Note over FilmRepository: Responsible for data access, queries the database.

        Database-->>FilmRepository: Raw Film Data
        deactivate FilmRepository

        FilmRepository-->>FilmService: Film Entity
        Note over FilmService: Potentially transforms raw data into a domain object.

        FilmService-->>FilmController: Film DTO
        deactivate FilmService
        Note over FilmController: Maps domain object to a DTO for API response.

        FilmController-->>Client: FilmResponse (HTTP 200 OK)
        deactivate FilmController
        Note over Client: Displays film details to the user.`}
    />
  </ZoomContainer>
);

export const RequestFlowSequenceDiagramES = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
        participant Cliente
        box Spring MVC
            participant FilmController
        end
        box Contenedor de Spring
            participant FilmService
            participant FilmRepository
        end
        participant BaseDeDatos

        Cliente->>FilmController: Solicitud GET /api/films/{filmId}
        activate FilmController
        Note over FilmController: Recibe la solicitud HTTP, extrae filmId de la ruta.

        FilmController->>FilmService: findFilmById(filmId)
        activate FilmService
        Note over FilmService: Contiene la lógica de negocio para obtener la película por ID.

        FilmService->>FilmRepository: findById(filmId)
        activate FilmRepository
        Note over FilmRepository: Responsable del acceso a datos, consulta la base de datos.

        BaseDeDatos-->>FilmRepository: Datos crudos de Film
        deactivate FilmRepository

        FilmRepository-->>FilmService: Entidad Film
        Note over FilmService: Potencialmente transforma los datos crudos en un objeto de dominio.

        FilmService-->>FilmController: Film DTO
        deactivate FilmService
        Note over FilmController: Mapea el objeto de dominio a un DTO para la respuesta de la API.

        FilmController-->>Cliente: FilmResponse (HTTP 200 OK)
        deactivate FilmController
        Note over Cliente: Muestra los detalles de la película al usuario.`}
    />
  </ZoomContainer>
);
