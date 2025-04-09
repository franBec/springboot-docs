---
sidebar_position: 5
---

# Acerca de pruebas de mutación

¿Qué son las pruebas de mutación? [Pitest](https://pitest.org/) la define como:

> Las pruebas de mutación son conceptualmente bastante simple. Se introducen errores (o mutaciones) automáticamente en tu código, y luego se ejecutan tus tests. Si tus tests fallan, la mutación se mata; si pasan, la mutación sobrevive. La calidad de tus tests se puede medir a partir del porcentaje de mutaciones eliminadas.

Para obtener esta métrica, necesitamos el [Solidsoft Pitest Gradle Plugin](https://mvnrepository.com/artifact/info.solidsoft.pitest/info.solidsoft.pitest.gradle.plugin).

1. En tu `build.gradle`, añade el plugin en la sección `plugins`:

    ```groovy
    id 'info.solidsoft.pitest' version '1.15.0'
    ```

2. Configura una nueva tarea `pitest` al final de `build.gradle`:

    ```groovy
    pitest {
        junit5PluginVersion = '1.2.1'
        outputFormats = ['HTML']
        targetClasses = [
            "${project.group}.${project.name}.controller.*".toString(),
            "${project.group}.${project.name}.service.*".toString(),
        ]
        targetTests = [
            "${project.group}.${project.name}.*".toString()
        ]
        timestampedReports = false
        useClasspathFile = true
    }
    ```

3. Asegúrate de que `test` ahora dependa de `pitest`:

    ```groovy
    tasks.named('test') {
        dependsOn 'pitest'
        useJUnitPlatform()
    }
    ```

4. Ahora que todo está listo, ejecuta la tarea `test`. Cuando termine, si revisas `build/reports/pitest/index.html`, encontrarás un archivo HTML que es el reporte. Ábrelo y dale una mirada.

   <div>
     <img src={require('@site/static/img/unit-testing/pit-report-path.png').default} alt="ruta del reporte pit" />
   </div>
   <div>
     <img src={require('@site/static/img/unit-testing/report.png').default} alt="reporte" />
   </div>

Commiteá el progreso hasta ahora.

```bash
git add .
git commit -m "pitest"