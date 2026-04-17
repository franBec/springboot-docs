import ZoomContainer from '@site/src/components/zoom-container';
import Mermaid from '@theme/Mermaid';

export const SynchronousSequenceDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
        participant Client
        participant Server

        Client->>Server: HTTP Request
        activate Server
        Note over Server: Processes request synchronously
        Server-->>Client: HTTP Response (immediate)
        deactivate Server`}
    />
  </ZoomContainer>
);

export const AsynchronousSequenceDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
        participant Client
        participant Broker
        participant Server

        Client->>Broker: Publish Message
        activate Broker
        Broker-->>Client: Acknowledged
        deactivate Broker
        Note over Broker: Message queued
        Broker->>Server: Deliver Message
        activate Server
        Note over Server: Processes at own pace
        Server-->>Broker: Acknowledged
        deactivate Server`}
    />
  </ZoomContainer>
);
