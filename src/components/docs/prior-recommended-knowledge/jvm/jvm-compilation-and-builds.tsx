import Mermaid from '@theme/Mermaid';
import ZoomContainer from '@site/src/components/zoom-container';

export const BuildStructureFlowchart = () => (
  <ZoomContainer>
    <Mermaid
      value={`
flowchart TD
    Project[/Project Root/]
    Maven[build.gradle or pom.xml]

    Maven --> MavenTarget[target/]
    MavenTarget --> ClassDir[/classes/java/main/]
    MavenTarget --> ResourceDir[/classes/resources/]
    MavenTarget --> TestDir[/classes/java/test/]
    MavenTarget --> OutputJar[/my-app.jar/]

    TargetClassDir[/my-app-1.0.0.jar/]
    TargetResource[/META-INF/MANIFEST.MF/]
    TargetResource --> Content[/spring.factories, /]

    MavenTarget --> TestResults[/test-results/]
    TestResults --> TestResultsFile[/TEST-*.xml/]

    MavenTarget --> Generated[/generated-sources/]
    Generated --> GeneratedApt[/annotationProcessor/]
    Generated --> GeneratedBuild[/build/]

    MavenTarget --> Docs[/docs/]

    TargetClassDir --> Result[Production JAR]
    TargetResource --> Result

    MavenTarget --> BuildInfo[/pom.xml and build.gradle/]

    Result --> Deploy[/Deployment Server/]
    BuildInfo --> Deploy`}
    />
  </ZoomContainer>
);

export const CompilationFlowchart = () => (
  <ZoomContainer>
    <Mermaid
      value={`
flowchart TD
    S[Source Code - Java.kt or *.groovy] --> Comp[Compiler]

    Comp -->|Java| B1[Java Bytecode]
    Comp -->|Kotlin| B2[Kotlin Bytecode - very similar to Java]
    Comp -->|Groovy| B3[Dynamic Groovy Bytecode]

    B1 --> O[Optimizer]
    B2 --> O
    B3 --> O

    O --> B1Final[Optimized Java Bytecode]
    O --> B2Final[Optimized Kotlin Bytecode]
    O --> B3Final[Bloated Dynamic Bytecode]

    B1Final --> J[Java Virtual Machine]
    B2Final --> J
    B3Final --> J

    J --> R[Runtime Execution]`}
    />
  </ZoomContainer>
);

export const RuntimeFlowSequence = () => (
  <ZoomContainer>
    <Mermaid
      value={`
sequenceDiagram
    participant Dev as Developer
    participant IDE as IDE (IntelliJ)
    participant Builder as Build Tool
    participant JVM as JVM

    Dev->>IDE: Press Ctrl+S to save
    IDE->>IDE: Compile only that file (fast)
    IDE->>JVM: Run tests (quick check)
    IDE-->>Dev: Green bar, ready to code

    Dev->>Builder: Run build task
    Builder->>Builder: Compile ALL files
    Builder->>Builder: Run ALL tests
    Builder->>Builder: Package JAR
    Builder->>JVM: Start application (production mode)

    Dev->>Dev: Deploy that JAR`}
    />
  </ZoomContainer>
);
