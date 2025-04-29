---
sidebar_position: 5
---

import YouTube from '@site/src/components/YouTube';

# Sobre mutation testing

¿Qué es mutation testing? [Pitest](https://pitest.org/) lo define como:

> Mutation testing es conceptualmente bastante simple. Se insertan fallos (o mutaciones) automáticamente en tu código, luego se ejecutan tus tests. Si tus tests fallan, la mutación es eliminada, si tus tests pasan, la mutación sobrevivió. La calidad de tus tests puede medirse por el porcentaje de mutaciones eliminadas.

## Mutation testing en proyectos Java Spring Boot

El mutation testing no se discute con frecuencia en los círculos de Spring Boot. Algunas razones de su limitada popularidad son:

* **Problemas de rendimiento**: El mutation testing es computacionalmente costoso, especialmente para códigos base grandes de Spring.
* **Complejidad vs. percepción de valor**: Muchos equipos cuestionan si los insights adicionales justifican la complejidad de la configuración y los costos de ejecución.
* **Impacto en CI/CD**: El largo tiempo de ejecución puede interrumpir los ciclos de feedback rápidos en las pipelines de CI/CD.

Hay un interés que aumenta lentamente, particularmente entre equipos con prácticas de testing maduras, pero preparate para tiempos de construcción más largos.

## Solidsoft Pitest Gradle Plugin

Para obtener esta métrica, necesitamos el [Solidsoft Pitest Gradle Plugin](https://mvnrepository.com/artifact/info.solidsoft.pitest/info.solidsoft.pitest.gradle.plugin).

1. Agregá el plugin en la sección de plugins (usualmente al principio de `build.gradle`):

    ```groovy title="build.gradle"
    id 'info.solidsoft.pitest' version '1.15.0'
    ```

2. Configurá `pitest` (al final de `build.gradle`):

    ```groovy title="build.gradle"
    pitest {
        junit5PluginVersion = '1.2.1'
        outputFormats = ['HTML']
        targetClasses = [
            "${project.group}.${project.name}.adapter.in.rest.*".toString(),
            "${project.group}.${project.name}.config.advice.*".toString(),
            "${project.group}.${project.name}.domain.service.*".toString(),
        ]
        excludedClasses = [
            // excluir todos los subpaquetes en adapter.in.rest, como mappers y código generado por openApi
            "${project.group}.${project.name}.adapter.in.rest.*.*".toString()
        ]
        targetTests = [
            "${project.group}.${project.name}.*".toString()
        ]
        timestampedReports = false
        useClasspathFile = true
    }
    ```

3. Asegurate de que `test` ahora dependa de `pitest`:

    ```groovy title="build.gradle"
    tasks.named('test') {
        dependsOn 'pitest'
        useJUnitPlatform()
    }
    ```

4. Ahora que todo está configurado, ejecutá la tarea `test`. Cuando la tarea termine, si chequeás la carpeta `build/reports/pitest/index.html`, vas a encontrar un archivo HTML, ese es el reporte. Abrilo y exploralo.

   <div>
     <img src={require('@site/static/img/unit-testing/report.png').default} alt="reporte" />
   </div>

Commiteá el progreso hasta ahora.

```bash
git add .
git commit -m "pitest"
```