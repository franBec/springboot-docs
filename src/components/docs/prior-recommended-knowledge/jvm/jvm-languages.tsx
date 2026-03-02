import ZoomContainer from '@site/src/components/zoom-container';
import Mermaid from '@theme/Mermaid';

export const JvmBytecodeDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`
flowchart TD
    %% Styling to enforce a colorless, wireframe look
    classDef default fill:#fff,stroke:#000,stroke-width:1px,color:#000;
    classDef file shape:note,fill:#fff,stroke:#000,stroke-width:1px;
    classDef machine fill:#f4f4f4,stroke:#000,stroke-width:1px,stroke-dasharray: 5 5;

    %% Top Level: Source Code
    Source([Java Program]):::default

    %% Compiler Level
    Compiler[Compiler]:::default

    %% Connections
    Source -->|MyProgram.java| Compiler

    %% The "Write Once" split into "Run Anywhere"
    Compiler -->|Bytecode| I_Win[Interpreter / JVM]
    Compiler -->|Bytecode| I_Lin[Interpreter / JVM]
    Compiler -->|Bytecode| I_Mac[Interpreter / JVM]

    %% Hardware/OS Level
    subgraph Windows [PC Compatible]
        direction TB
        I_Win --> Screen1[Windows OS<br/>Displaying 'My Program']:::machine
    end

    subgraph Linux [Linux / Solaris]
        direction TB
        I_Lin --> Screen2[Linux Server<br/>Displaying 'My Program']:::machine
    end

    subgraph Mac [Power Macintosh]
        direction TB
        I_Mac --> Screen3[macOS<br/>Displaying 'My Program']:::machine
    end

    %% Styles for subgraphs to be invisible/clean
    style Windows fill:#fff,stroke:none
    style Linux fill:#fff,stroke:none
    style Mac fill:#fff,stroke:none
`}
    />
  </ZoomContainer>
);
