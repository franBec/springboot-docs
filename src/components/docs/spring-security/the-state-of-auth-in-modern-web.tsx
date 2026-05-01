import Mermaid from '@theme/Mermaid';
import ZoomContainer from '@site/src/components/zoom-container';

export const AccessRefreshTokenFlow = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
    participant Browser
    participant Server
    participant SessionStore as Session store

    Browser->>Server: POST /login (credentials)
    Server->>SessionStore: Create session
    Server-->>Browser: Set access_token + refresh_token cookies
    Note over Browser,Server: Access token expires (e.g., 15 min)
    Browser->>Server: GET /api/resource (access_token cookie)
    Server->>SessionStore: Validate session
    SessionStore-->>Server: Valid
    Server-->>Browser: Resource data
    Note over Browser,Server: Access token expired
    Browser->>Server: GET /api/resource (expired access_token)
    Server-->>Browser: 401 Unauthorized
    Browser->>Server: POST /refresh (refresh_token cookie)
    Server->>SessionStore: Validate refresh session
    SessionStore-->>Server: Valid
    Server->>SessionStore: Rotate: create new session, invalidate old
    Server-->>Browser: Set new access_token + refresh_token cookies
    Browser->>Server: GET /api/resource (new access_token)
    Server-->>Browser: Resource data
`}
    />
  </ZoomContainer>
);

export const JwtFlow = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: POST /login (credentials)
    Server-->>Browser: JWT signed with secret (stored in localStorage)
    Browser->>Server: GET /api/resource (Authorization: Bearer <JWT>)
    Server->>Server: Verify JWT signature & expiry locally
    Server-->>Browser: Resource data
    Note over Browser,Server: Token expires
    Browser->>Server: GET /api/resource (expired JWT)
    Server-->>Browser: 401 Unauthorized
    Note over Browser,Server: The app must handle refresh manually<br/>or force re-login if no refresh mechanism exists
`}
    />
  </ZoomContainer>
);
