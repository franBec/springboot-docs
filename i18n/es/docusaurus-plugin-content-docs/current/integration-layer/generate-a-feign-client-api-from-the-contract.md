---
sidebar_position: 3
---

# Genera un API client Feign a partir del contrato

1. Vamos a usar [FeignClient](https://docs.spring.io/spring-cloud-openfeign/docs/current/reference/html/). Necesitamos las dependencias [Spring Cloud Starter OpenFeign](https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-starter-openfeign), [Feign OkHttp](https://mvnrepository.com/artifact/io.github.openfeign/feign-okhttp), [Feign Jackson](https://mvnrepository.com/artifact/io.github.openfeign/feign-jackson), y [Feign Gson](https://mvnrepository.com/artifact/io.github.openfeign/feign-gson). En tu `build.gradle`, **agrega las dependencias** en la sección de `dependencies`:

    ```groovy
    implementation 'org.springframework.cloud:spring-cloud-starter-openfeign:4.2.1'
    implementation 'io.github.openfeign:feign-okhttp:13.5'
    implementation 'io.github.openfeign:feign-jackson:13.5'
    implementation 'io.github.openfeign:feign-gson:13.5'
    ```

2. **Configura** una nueva tarea del openapi-generator al final del `build.gradle`:

    ```groovy
    tasks.register("openApiGenerateFeign_jsonplaceholder", GenerateTask) {
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
    
    * Podés encontrar más info sobre las distintas configuraciones posibles en la [página GitHub del OpenAPI Generator Gradle Plugin](https://github.com/OpenAPITools/openapi-generator/tree/master/modules/openapi-generator-gradle-plugin).
    * **Recomendaciones personales**:
      * En `apiPackage` usá la url que vamos a integrar en estilo java, y terminá en `.api` (`jsonplaceholder.typicode.com` -> `com.typicode.jsonplaceholder.api`)
      * Misma idea para `modelPackage` (`jsonplaceholder.typicode.com` -> `com.typicode.jsonplaceholder.model`)
    * Es **importante** asegurarse de que `inputSpec` apunte al archivo yaml deseado de la Especificación OpenAPI.

3. Asegurate de que `compileJava` ahora dependa de ambas tareas de generación OpenAPI:

    ```groovy
    tasks.named('compileJava') {
        dependsOn 'openApiGenerate', 'openApiGenerateFeign_jsonplaceholder'
    }
    ```

4. Ahora que todo está listo, **ejecutá la tarea Build**. Cuando termine, si revisás la carpeta `build\generated\sources\openapi` vas a encontrar una nueva carpeta `jsonplaceholder.typicode.com` con la representación de la Especificación OpenAPI en código Java, lista para usar.

   <div>
     <img src={require('@site/static/img/integration-layer/jsonplaceholder-folder.png').default} alt="jsonplaceholder folder" />
   </div>
