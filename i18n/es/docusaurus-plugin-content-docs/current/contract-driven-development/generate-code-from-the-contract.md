---
sidebar_position: 3
---

# Genera Código a Partir del Contrato

Si fuéramos a escribir a mano estos dos endpoints y los modelos necesarios (llamados `Schemas` en la Especificación OpenAPI) puede que no sea tan complicado. Pero imaginate si fuera un proyecto grande, con algunas docenas de endpoints y cerca de un cien de schemas...

Ahorrémonos problemas usando una de las mejores librerías que existen: [openapi-generator](https://github.com/OpenAPITools/openapi-generator).

1. En tu `build.gradle`, **agrega el plugin** en la sección de `plugins` (usualmente al inicio del archivo):

    ```groovy
    id 'org.openapi.generator' version '7.12.0'
    ```

2. Necesitamos las dependencias [Swagger Core Jakarta](https://mvnrepository.com/artifact/io.swagger.core.v3/swagger-core-jakarta), [JsonNullable Jackson Module](https://mvnrepository.com/artifact/org.openapitools/jackson-databind-nullable) y [Spring Boot Starter Validation](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-validation). En tu `build.gradle`, **agrega las dependencias** en la sección de `dependencies`:

    ```groovy
    implementation 'io.swagger.core.v3:swagger-core-jakarta:2.2.28'
    implementation 'org.openapitools:jackson-databind-nullable:0.2.6'
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    ```

3. **Configura** el openapi-generator al final del `build.gradle`:

    ```groovy
    openApiGenerate {
        apiPackage = "${project.group}.${project.name}.api".toString()
        configOptions = [
            interfaceOnly: "true",
            skipOperationExample: "true",
            useEnumCaseInsensitive: "true",
            useSpringBoot3: "true"
        ]
        generateApiTests = false
        generateApiDocumentation = false
        generateModelTests = false
        generateModelDocumentation = false
        generatorName = "spring"
        inputSpec = "$rootDir/src/main/resources/openapi/users_manager.yaml".toString()
        modelPackage = "${project.group}.${project.name}.model".toString()
        outputDir = layout.buildDirectory.dir("generated/sources/openapi").get().asFile.toString()
    }
    ```

    * Podés encontrar más información sobre las distintas configuraciones posibles en la [página GitHub del OpenAPI Generator Gradle Plugin](https://github.com/OpenAPITools/openapi-generator/tree/master/modules/openapi-generator-gradle-plugin).
    * Es **importante** asegurarse de que `inputSpec` apunte al archivo `yaml` de la Especificación OpenAPI deseada.

4. **Agrega la configuración de sourceSets** en tu `build.gradle`. Esto le dice a Gradle dónde encontrar las fuentes Java generados. Colocá el siguiente código inmediatamente después de la sección de `plugins` en tu `build.gradle`:

   ```groovy
   sourceSets {
       main {
           java {
               srcDir(layout.buildDirectory.dir("generated/sources/openapi/src/main/java"))
           }
       }
   }
   ```

5. **Genera código en la compilación**, agregando una nueva tarea:

    ```groovy
    tasks.named('compileJava') {
        dependsOn 'openApiGenerate'
    }
    ```

6. Ahora que todo está configurado, **ejecutá la tarea Build**. Cuando la tarea termine, si revisás la carpeta `build\generated\sources\openapi` vas a encontrar la representación de la Especificación OpenAPI (nuestro contrato) en código Java, lista para ser utilizada.

   <div>
     <img src={require('@site/static/img/contract-driven-development/build.png').default} alt="build" />
   </div>