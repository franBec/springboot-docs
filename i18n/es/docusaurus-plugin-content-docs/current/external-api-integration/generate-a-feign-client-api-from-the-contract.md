---
sidebar_position: 3
---

# Generá una API cliente Feign a partir del contrato

1. Importá `GenerateTask` (principio de `build.gradle`)

    ```groovy title="build.gradle"
    import org.openapitools.generator.gradle.plugin.tasks.GenerateTask
    ```

2. Necesitamos las dependencias [Spring Cloud Starter OpenFeign](https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-starter-openfeign), [Feign OkHttp](https://mvnrepository.com/artifact/io.github.openfeign/feign-okhttp), [Feign Jackson](https://mvnrepository.com/artifact/io.github.openfeign/feign-jackson) y [Feign Gson](https://mvnrepository.com/artifact/io.github.openfeign/feign-gson). Agregalas en la sección de `dependencies` de `build.gradle`:

    ```groovy title="build.gradle"
    implementation 'org.springframework.cloud:spring-cloud-starter-openfeign:4.2.1'
    implementation 'io.github.openfeign:feign-okhttp:13.5'
    implementation 'io.github.openfeign:feign-jackson:13.5'
    implementation 'io.github.openfeign:feign-gson:13.5'
    ```

3. Configurá una nueva tarea de openapi-generator (al final de `build.gradle`):

    ```groovy title="build.gradle"
    tasks.register("openApiGenerate_feign_jsonplaceholder", GenerateTask) {
        apiPackage = "com.typicode.jsonplaceholder.api".toString()
        configOptions = [
            "feignClient": "true",
            "interfaceOnly": "true",
            "useEnumCaseInsensitive": "true",
            "useJakartaEe": "true"
        ]
        generateApiTests = false
        generateApiDocumentation = false
        generateModelTests = false
        generateModelDocumentation = false
        generatorName = "java"
        inputSpec = "$rootDir/src/main/resources/openapi/jsonplaceholder.yaml".toString()
        library = "feign"
        modelPackage = "com.typicode.jsonplaceholder.model".toString()
        outputDir = layout.buildDirectory.dir("generated/sources/openapi").get().asFile.toString()
    }
    ```

   * Podés encontrar más información sobre las diferentes configuraciones posibles en la [página de GitHub del plugin de Gradle para OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator/tree/master/modules/openapi-generator-gradle-plugin).
   * **Recomendaciones personales**:
      * En `apiPackage` usá la url que vamos a integrar en formato Java, y que termine en `.api` (`jsonplaceholder.typicode.com` -> `com.typicode.jsonplaceholder.api`)
      * La misma idea para `modelPackage` (`jsonplaceholder.typicode.com` -> `com.typicode.jsonplaceholder.model`)
   * Es **importante** asegurarte de que `inputspec` esté apuntando al archivo YAML de la OpenAPI Specification deseada.

4. Asegurate de que `compileJava` ahora dependa de ambas tareas de generación de OpenAPI:

    ```groovy title="build.gradle"
    tasks.named('compileJava') {
        dependsOn 'openApiGenerate', 'openApiGenerate_feign_jsonplaceholder'
    }
    ```

5. Ahora que todo está configurado, **ejecutá la tarea Build**. Cuando la tarea termine, si chequeás la carpeta `build\generated\sources\openapi`, vas a encontrar una nueva carpeta `jsonplaceholder.typicode.com` con la representación de la OpenAPI Specification en código Java, lista para ser usada.

    <div>
      <img src={require('@site/static/img/external-api-integration/jsonplaceholder-folder.png').default} alt="carpeta de jsonplaceholder" />
    </div>

Commiteá el progreso hasta ahora.

```bash
git add .
git commit -m "código de secondary adapter api externa generado a partir de una openapi specification"
```