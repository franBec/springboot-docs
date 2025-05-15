---
sidebar_position: 9
---

import YouTube from '@site/src/components/YouTube';

# Herramientas de construcción de Java

Tu herramienta de construcción es como un lavavajillas—vos solo querés platos limpios, no un doctorado en ingeniería de electrodomésticos. Cortemos con el ruido de XML/Groovy.

## Maven vs gradle

Pensá en estas como los gerentes de tu proyecto. Ellas:

* Descargan librerías/dependencias.
* Definen pasos (compilan código, ejecutan tests, construyen archivos `JAR`).
* Mantienen la estructura del proyecto estándar y organizada.

| Aspecto       | Maven                                   | Gradle                                                   |
|---------------|-----------------------------------------|----------------------------------------------------------|
| Configuración | Usa XML (estructurado con `<tags>`)     | Usa Kotlin/Groovy (sintaxis tipo código)                 |
| Flexibilidad  | Convenciones estrictas y estandarizadas | Altamente personalizable (soporta lógica como `if-else`) |
| Casos de uso  | Proyectos Java legados o empresariales  | Apps Android, proyectos Java/Kotlin modernos             |


## Por qué usualmente no importa

A tu `JAR` de producción no le importa si fue empaquetado por Maven o Gradle.

1. **La gestión de dependencias es idéntica**: Ambas resuelven desde Maven Central/JitPack.

    Esto:

    ```xml
    <!-- Maven -->
    <dependency>
        <groupId>com.google.guava</groupId>
        <artifactId>guava</artifactId>
        <version>33.0.0</version>
    </dependency>
    ```

    Es igual a esto:

    ```groovy
    // Gradle
    implementation 'com.google.guava:guava:33.0.0'
    ```

2. **Los `JAR` generados son gemelos**: Mismo diseño de clases, mismo `MANIFEST.MF`.
3. **A las IDE no les importa**: IntelliJ va a detectar automáticamente cualquiera y mostrar la barra de herramientas de Maven o Gradle correspondiente.