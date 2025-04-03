---
sidebar_position: 3
---

# Generate A Feign Client API From The Contract

1. We are going to be using [FeignClient](https://docs.spring.io/spring-cloud-openfeign/docs/current/reference/html/). We need [Spring Cloud Starter OpenFeign](https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-starter-openfeign), [Feign OkHttp](https://mvnrepository.com/artifact/io.github.openfeign/feign-okhttp), [Feign Jackson](https://mvnrepository.com/artifact/io.github.openfeign/feign-jackson), and [Feign Gson](https://mvnrepository.com/artifact/io.github.openfeign/feign-gson) dependencies. In your `build.gradle`, **add the dependencies** in the `dependencies` section:

    ```groovy
    implementation 'org.springframework.cloud:spring-cloud-starter-openfeign:4.2.1'
    implementation 'io.github.openfeign:feign-okhttp:13.5'
    implementation 'io.github.openfeign:feign-jackson:13.5'
    implementation 'io.github.openfeign:feign-gson:13.5'
    ```

2. **Configure** a new openapi-generator task at the bottom of `build.gradle`:

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
    
    * You can find more information about the different possible configurations in the [OpenAPI Generator Gradle Plugin GitHub page](https://github.com/OpenAPITools/openapi-generator/tree/master/modules/openapi-generator-gradle-plugin).
    * **Personal recommendations**:
      * In `apiPackage` use the url we are going to integrate in java-style, and end in `.api` (`jsonplaceholder.typicode.com` -> `com.typicode.jsonplaceholder.api`)
      * Same idea for `modelPackage` (`jsonplaceholder.typicode.com` -> `com.typicode.jsonplaceholder.model`)
    * It is **important** to make sure that `inputspec` is pointing to the desired OpenAPI Specification yaml file.

3. Ensure `compileJava` now depends on both OpenAPI generation tasks:

    ```groovy
    tasks.named('compileJava') {
        dependsOn 'openApiGenerate', 'openApiGenerateFeign_jsonplaceholder'
    }
    ```

4. Now that everything is set up, **run the Build Task**. When the task finishes, If you check the `build\generated\sources\openapi` folder, you’ll find a new `jsonplaceholder.typicode.com` folder with the representation of the OpenAPI Specification in Java code, ready to be used.

   <div>
     <img src={require('@site/static/img/integration-layer/jsonplaceholder-folder.png').default} alt="jsonplaceholder folder" />
   </div>