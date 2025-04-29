---
sidebar_position: 3
---

# Generá código desde el contrato

## ¿Por qué queremos generar código desde el contrato?

Si tuviéramos que escribir a mano un Primary Adapter que tiene pocos endpoints y sus modelos necesarios (llamados `Schemas` en la OpenAPI Specification), puede que no sea tan complicado.

<div>
  <img src={require('@site/static/img/contract-driven-development/hexagonal-arch-one-endpoint.png').default} alt="diagrama de arquitectura hexagonal - un endpoint" />
</div>

Pero imaginate si fuera un proyecto grande, con varias docenas de Primary Adapters… Hacer esto manualmente es propenso a errores y consume mucho tiempo.

<div>
  <img src={require('@site/static/img/contract-driven-development/hexagonal-arch-multiple-endpoints.png').default} alt="diagrama de arquitectura hexagonal - múltiples endpoints" />
</div>

## OpenAPI generator

Ahorrémonos algunos problemas usando una de las mejores librerías que existen: [openapi-generator](https://github.com/OpenAPITools/openapi-generator).

1. Agregá el plugin en la sección de plugins (usualmente al principio de `build.gradle`):

    ```groovy title="build.gradle"
    id 'org.openapi.generator' version '7.12.0'
    ```

2. Necesitamos las dependencias de [Swagger Core Jakarta](https://mvnrepository.com/artifact/io.swagger.core.v3/swagger-core-jakarta), [JsonNullable Jackson Module](https://mvnrepository.com/artifact/org.openapitools/jackson-databind-nullable) y [Spring Boot Starter Validation](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-validation). Agregalas en la sección de `dependencies` de `build.gradle`:

    ```groovy title="build.gradle"
    implementation 'io.swagger.core.v3:swagger-core-jakarta:2.2.28'
    implementation 'org.openapitools:jackson-databind-nullable:0.2.6'
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    ```

3. Configurá el openapi-generator (al final de `build.gradle`):

    ```groovy title="build.gradle"
    openApiGenerate {
        apiPackage = "${project.group}.${project.name}.adapter.in.rest.api".toString()
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
        modelPackage = "${project.group}.${project.name}.adapter.in.rest.dto".toString()
        outputDir = layout.buildDirectory.dir("generated/sources/openapi").get().asFile.toString()
    }
    ```

   * Podés encontrar más información sobre las diferentes configuraciones posibles en la [página de GitHub del plugin de Gradle para OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator/tree/master/modules/openapi-generator-gradle-plugin).
   * Es **importante** asegurarte de que `inputspec` esté apuntando al archivo YAML de la OpenAPI Specification deseada.

4. Agregá la configuración de `sourceSets`. Esto le indica a Gradle dónde encontrar las fuentes Java generadas. Colocá el siguiente código inmediatamente debajo de la sección `plugins`:

    ```groovy title="build.gradle"
    sourceSets {
        main {
            java {
                srcDir(layout.buildDirectory.dir("generated/sources/openapi/src/main/java"))
            }
        }
    }
    ```

5. Generá código al compilar agregando una nueva tarea:

    ```groovy title="build.gradle"
    tasks.named('compileJava') {
        dependsOn 'openApiGenerate'
    }
    ```

6. Ahora que todo está configurado, **ejecutá la tarea Build**. Cuando la tarea termine, chequeá la carpeta `build\generated\sources\openapi`. Vas a encontrar la representación de la OpenAPI Specification (nuestro contrato) en código Java, lista para ser usada.

    <div>
      <img src={require('@site/static/img/contract-driven-development/build.png').default} alt="build" />
    </div>

Commiteá el progreso hasta ahora.

```bash
git add .
git commit -m "código de primary adapter generado a partir de una openapi specification"
```