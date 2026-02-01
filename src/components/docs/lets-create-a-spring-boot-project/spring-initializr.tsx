import ZoomContainer from '@site/src/components/zoom-container';
import Mermaid from '@theme/Mermaid';
import { CollapsibleCodeBlock } from '@site/src/components/collapsible-code-block';

export const SpringBootInitializrProjectGraph = () => (
  <ZoomContainer>
    <Mermaid
      value={`graph TD
    Start((New Spring Boot Project)) --> Guidelines{Company Guidelines/Pipeline\n already exist?}

    Guidelines -- Yes --> Puppet[You don't get to choose.<br/>Obey the corporate overlords.]
    Guidelines -- No --> Speed{Do you care about build speed & custom logic?}

    Speed -- "Not really, I like stability" --> XMLHell[Maven]
    Speed -- "Yes, give me the speed" --> GradleBranch[Gradle]

    XMLHell --> Boring[The 'Safe' Choice.<br/>It's slow, it's XML, but it never breaks.]

    GradleBranch --> Language{Do you want type-safety or dynamic flexibility?}

    Language -- "I love autocomplete & safety" --> KotlinDSL[Gradle - Kotlin DSL]
    Language -- "I miss the 2010s / Groovy's chill" --> GroovyDSL[Gradle - Groovy]

    subgraph "The Verdict"
    Puppet
    Boring
    KotlinDSL
    GroovyDSL
    end`}
    />
  </ZoomContainer>
);

export const ConfigFormatProperties = () => (
  <CollapsibleCodeBlock language="properties" title="application.properties">
    {`server.port=8080
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.username=sa
spring.datasource.password=`}
  </CollapsibleCodeBlock>
);

export const ConfigFormatYaml = () => (
  <CollapsibleCodeBlock language="yaml" title="application.yml">
    {`server:
  port: 8080
spring:
  datasource:
    url: jdbc:h2:mem:testdb
    username: sa
    password:`}
  </CollapsibleCodeBlock>
);
