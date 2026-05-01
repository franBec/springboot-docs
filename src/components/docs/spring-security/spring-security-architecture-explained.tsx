import Mermaid from '@theme/Mermaid';
import ZoomContainer from '@site/src/components/zoom-container';

export const FilterChainDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
    participant Client
    participant CORS as CORS Filter
    participant CSRF as CSRF Filter
    participant JWT as JWT Auth Filter
    participant Authz as Authorization Filter
    participant Controller

    Client->>CORS: HTTP Request
    alt CORS check fails
        CORS-->>Client: 403 Forbidden
    else CORS check passes
        CORS->>CSRF: pass request along
        alt CSRF check fails
            CSRF-->>Client: 403 Forbidden
        else CSRF check passes
            CSRF->>JWT: pass request along
            alt token missing or invalid
                JWT-->>Client: 401 Unauthorized
            else token valid
                JWT->>Authz: pass request along
                alt not authorized for this resource
                    Authz-->>Client: 403 Forbidden
                else authorized
                    Authz->>Controller: request reaches controller
                    Controller-->>Client: 200 OK
                end
            end
        end
    end
    `}
    />
  </ZoomContainer>
);

export const AuthenticationFlowDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
    participant Filter as JWT Auth Filter
    participant AM as AuthenticationManager
    participant PM as ProviderManager
    participant Dao as DaoAuthenticationProvider
    participant UDS as UserDetailsService
    participant PE as PasswordEncoder
    participant SC as SecurityContextHolder

    Filter->>AM: authenticate(token)
    AM->>PM: authenticate(token)
    PM->>Dao: authenticate(token)
    Dao->>UDS: loadUserByUsername(username)
    UDS-->>Dao: UserDetails
    Dao->>PE: matches(rawPassword, encodedPassword)
    PE-->>Dao: true / false
    alt Authentication succeeds
        Dao-->>PM: fully populated Authentication
        PM-->>AM: Authentication
        AM-->>Filter: Authentication
        Filter->>SC: setAuthentication(auth)
    else Authentication fails
        Dao-->>PM: BadCredentialsException
        PM-->>Filter: Authentication fails
        Filter->>SC: clearContext()
    end
    `}
    />
  </ZoomContainer>
);

export const FullLifecycleDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
    participant Client
    participant Filters as Filter Chain
    participant AuthFilter as JWT Auth Filter
    participant AM as AuthenticationManager
    participant Provider as DaoAuthenticationProvider
    participant UDS as UserDetailsService
    participant SCH as SecurityContextHolder
    participant Authz as Authorization Check
    participant Controller

    Client->>Filters: HTTP Request
    Filters->>AuthFilter: request + response
    AuthFilter->>AuthFilter: extract JWT from header

    alt No token present
        AuthFilter->>Filters: continue without auth
    else Token present and valid
        AuthFilter->>AM: authenticate(token)
        AM->>Provider: authenticate(token)
        Provider->>UDS: loadUserByUsername(username)
        UDS-->>Provider: UserDetails
        Provider->>Provider: verify credentials
        Provider-->>AM: fully populated Authentication
        AuthFilter->>SCH: SecurityContextHolder.getContext().setAuthentication(auth)
    end

    SCH->>Authz: Is this user allowed?
    alt Authorized
        Authz-->>Controller: proceed
        Controller-->>Client: 200 OK
    else Not authorized
        Authz-->>Client: 403 Forbidden
    end
    `}
    />
  </ZoomContainer>
);
