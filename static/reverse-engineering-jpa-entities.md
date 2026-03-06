# Reverse Engineering JPA Entities

All three modules (`spring_java`, `spring_kotlin`, `spring_groovy`) generate JPA entity classes from a SQL schema at build time, using Hibernate Tools driven by a custom Gradle task. No running database is required — an in-memory H2 instance is spun up on the fly during the build.

---

## How it works (overview)

1. A dedicated `hibernateTools` Gradle dependency configuration (isolated from the compile/runtime classpath) pulls in the code generation tooling.
2. The `generateEntities` Gradle task reads the SQL schema, starts an in-memory H2 database pre-populated with it, introspects the schema via JDBC, and writes entity source files into `build/generated/sources/hibernate/`.
3. The generated directory is registered as an additional source root so entities compile transparently alongside hand-written code.
4. The task runs before `compileJava` / `compileKotlin` / `compileGroovy` so generated types are always available at compilation.

---

## Resource files

Every module has the same four resource files driving the generation. They live under `src/main/resources/`.

### `sakila-schema.sql`

The source of truth. This is an H2-native DDL file for the [Sakila sample database](https://dev.mysql.com/doc/sakila/en/). It is **byte-for-byte identical** across all three modules.

Hibernate Tools introspects this schema at generation time; this same file is also loaded at runtime and in tests to seed the in-memory H2 database.

### `hibernate.reveng.xml`

Controls how JDBC/SQL types are mapped to Java types, and which tables are included. **Identical across all three modules** (the Kotlin and Groovy copies have extra comments, but the content is the same).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE hibernate-reverse-engineering PUBLIC
        "-//Hibernate/Hibernate Reverse Engineering DTD 3.0//EN"
        "http://hibernate.org/dtd/hibernate-reverse-engineering-3.0.dtd" >

<hibernate-reverse-engineering>
    <type-mapping>
        <sql-type jdbc-type="TINYINT"   hibernate-type="java.lang.Integer"/>
        <sql-type jdbc-type="SMALLINT"  hibernate-type="java.lang.Integer"/>
        <sql-type jdbc-type="BIT"       hibernate-type="java.lang.Boolean" />
        <sql-type jdbc-type="TIMESTAMP" hibernate-type="java.time.LocalDateTime" />
        <sql-type jdbc-type="DATE"      hibernate-type="java.time.LocalDate" />
    </type-mapping>

    <table-filter match-schema="PUBLIC" match-name=".*" />
</hibernate-reverse-engineering>
```

Key points:

- The `<type-mapping>` block overrides default JDBC-to-Java mappings, replacing raw SQL types with clean `java.time.*` equivalents and proper boxed types.
- `<table-filter match-schema="PUBLIC" match-name=".*" />` tells Hibernate Tools to reverse-engineer every table in the `PUBLIC` schema (all of Sakila).

### `hibernate-tools.properties`

Provides static JDBC connection details. **Identical across all three modules.**

```properties
hibernate.connection.driver_class=org.h2.Driver
hibernate.connection.username=sa
hibernate.connection.password=
hibernate.dialect=org.hibernate.dialect.H2Dialect
hibernate.connection.provider_class=org.hibernate.connection.DriverManagerConnectionProvider
```

Note the absence of `hibernate.connection.url` — it is injected dynamically by the Gradle task at generation time, pointing at the SQL schema file via an H2 `INIT=RUNSCRIPT` URL (see below).

### `templates/hibernate/pojo/Pojo.ftl`

A [FreeMarker](https://freemarker.apache.org/) template that controls the exact shape of each generated entity class. This is the **only resource file that differs meaningfully between modules**, since it must emit valid syntax and use the appropriate idioms for each language.

See the [FreeMarker template differences](#freemarker-template-differences) section below.

---

## Gradle setup

### Isolated dependency configuration

All three modules declare a `hibernateTools` configuration that is completely isolated from the compile and runtime classpath:

**Java / Groovy** (`build.gradle`):

```groovy
configurations {
    compileOnly { extendsFrom annotationProcessor }
    hibernateTools   // isolated classpath for code generation only
}

dependencies {
    hibernateTools 'org.hibernate.tool:hibernate-tools-ant:6.6.1.Final'
    hibernateTools 'org.hibernate.orm:hibernate-core:6.6.1.Final'
    hibernateTools 'com.h2database:h2:2.4.240'
}
```

**Kotlin** (`build.gradle.kts`):

```kotlin
val hibernateTools: Configuration by configurations.creating

dependencies {
    hibernateTools("org.hibernate.tool:hibernate-tools-ant:6.6.1.Final")
    hibernateTools("org.hibernate.orm:hibernate-core:6.6.1.Final")
    hibernateTools("com.h2database:h2:2.4.240")
}
```

The three dependencies are the same in every module: the Hibernate Tools Ant task runner, the Hibernate ORM core (needed by the tools to do JDBC introspection), and H2 (to serve the in-memory database during generation).

### Runtime / compile dependencies

In addition to the generation tooling, each module also declares the standard JPA and H2 dependencies that are used at runtime:

```groovy
// Java / Groovy
runtimeOnly 'com.h2database:h2:2.4.240'
implementation 'org.springframework.boot:spring-boot-h2console'
implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
testImplementation 'org.springframework.boot:spring-boot-starter-data-jpa-test'
```

```kotlin
// Kotlin
runtimeOnly("com.h2database:h2:2.4.240")
implementation("org.springframework.boot:spring-boot-h2console")
implementation("org.springframework.boot:spring-boot-starter-data-jpa")
testImplementation("org.springframework.boot:spring-boot-starter-data-jpa-test")
```

The Kotlin module also requires the `kotlin("plugin.jpa")` Gradle plugin, which generates no-arg constructors for classes annotated with `@Entity`, `@Embeddable`, etc. — something the JPA spec requires but that Kotlin data classes don't provide by default:

```kotlin
plugins {
    kotlin("plugin.jpa") version "2.2.21"
    // ...
}
```

### The `generateEntities` task

The core logic is identical across all three modules. The differences are in syntax (Groovy DSL vs Kotlin DSL) and in a post-processing step for Kotlin and Groovy (renaming files).

**Step 1 — Build a temp properties file with the dynamic JDBC URL:**

```groovy
// Java / Groovy (Groovy DSL)
def tempPropsFile = layout.buildDirectory.file("tmp/hibernate-tools.properties").get().asFile
tempPropsFile.parentFile.mkdirs()

def props = new Properties()
basePropsFile.asFile.withInputStream { props.load(it) }
props.setProperty(
    'hibernate.connection.url',
    "jdbc:h2:mem:sakila;DB_CLOSE_DELAY=-1;INIT=RUNSCRIPT FROM '${sqlFile.asFile.absolutePath}'"
)
tempPropsFile.withOutputStream { props.store(it, null) }
```

```kotlin
// Kotlin DSL
val props = Properties()
basePropsFile.inputStream().use { props.load(it) }
props.setProperty(
    "hibernate.connection.url",
    "jdbc:h2:mem:sakila;DB_CLOSE_DELAY=-1;INIT=RUNSCRIPT FROM '$sakilaSqlPath'"
)
tempPropsFile.outputStream().use { props.store(it, null) }
```

The `INIT=RUNSCRIPT FROM '...'` H2 connection parameter loads and executes the SQL schema file when the in-memory database is created, giving Hibernate Tools a fully populated schema to introspect — all without any running external database.

**Step 2 — Invoke the Hibernate Tools Ant task:**

The same `HibernateToolTask` call appears in all three modules (shown here in Groovy DSL):

```groovy
ant.taskdef(
    name: 'hibernatetool',
    classname: 'org.hibernate.tool.ant.HibernateToolTask',
    classpath: configurations.hibernateTools.asPath
)

ant.hibernatetool(destdir: destDir, templatepath: templateDir.asFile) {
    jdbcconfiguration(
        propertyfile: tempPropsFile,
        revengfile: revengFile.asFile,
        packagename: "${project.group}.${project.name}.generated.entity",
        detectmanytomany: true,
        detectoptimisticlock: true
    )
    hbm2java(jdk5: true, ejb3: true)
}
```

Hibernate Tools reads the connection properties, connects to H2, introspects the schema, applies the reverse engineering rules from `hibernate.reveng.xml`, and renders entity source files using the FreeMarker template into `build/generated/sources/hibernate/`.

**Step 3 — File renaming (Kotlin and Groovy only):**

Hibernate Tools always emits `.java` files. Kotlin and Groovy need to rename them after generation.

Kotlin:

```kotlin
val entityDir = File(destDir, "${project.group}.${project.name}.generated.entity".replace('.', '/'))
entityDir
    .listFiles()
    ?.filter { it.extension == "java" }
    ?.forEach { javaFile ->
        val ktFile = File(javaFile.parentFile, "${javaFile.nameWithoutExtension}.kt")
        javaFile.renameTo(ktFile)
    }
```

Groovy:

```groovy
def entityDir = new File(destDir, "${project.group}.${project.name}.generated.entity".replace('.', '/'))
entityDir.eachFileMatch(~/.*.java/) { javaFile ->
    def groovyFile = new File(javaFile.parentFile, javaFile.name.replace('.java', '.groovy'))
    javaFile.renameTo(groovyFile)
}
```

Java skips this step entirely — Hibernate Tools already emits `.java`, so no renaming is needed.

### Source set registration and compile task wiring

The generated sources directory must be added to the appropriate source set so the compiler picks it up.

**Java** — added to the Java source set, entity generation wired before `compileJava`:

```groovy
sourceSets {
    main {
        java {
            srcDir(layout.buildDirectory.dir("generated/sources/hibernate"))
        }
    }
}

tasks.named('compileJava') {
    dependsOn 'generateEntities'
}
```

**Kotlin** — added to the Kotlin source set, wired before both `compileKotlin` and kapt's stub generation:

```kotlin
kotlin.sourceSets["main"].kotlin {
    srcDir(hibernateGeneratedSourcesDir)
}

tasks.named("compileKotlin") { dependsOn("generateEntities") }

tasks.withType<org.jetbrains.kotlin.gradle.internal.KaptGenerateStubsTask> {
    dependsOn("generateEntities")
}
```

The extra `KaptGenerateStubsTask` dependency is needed because kapt (annotation processing) generates stubs before `compileKotlin` runs, so entities must be available even earlier in the build.

**Groovy** — added to the Groovy source set (not the Java source set), wired before `compileGroovy`:

```groovy
sourceSets {
    main {
        groovy {
            srcDir(layout.buildDirectory.dir("generated/sources/hibernate"))
        }
    }
}

tasks.named('compileGroovy') {
    dependsOn 'generateEntities'
}
```

Note that in the Groovy module the OpenAPI-generated Java sources (wired before `compileJava`) and the Hibernate-generated Groovy sources (wired before `compileGroovy`) are registered to different source sets.

---

## FreeMarker template differences

All three `Pojo.ftl` templates share the same structural logic (composite key detection, `@Id` / `@EmbeddedId` / `@ManyToOne` / `@OneToMany` / `@Column` handling), but differ in what they emit.

### Java (`spring_java`)

- Uses Lombok annotations: `@Getter`, `@Setter`, `@NoArgsConstructor`, `@AllArgsConstructor`, `@Builder`, `@EqualsAndHashCode`.
- Composite key classes get `@Embeddable` + all Lombok annotations.
- Regular entity classes get `@Entity` + `@Builder` + all Lombok annotations.
- Collections initialized as `new HashSet<>(0)` with `@Builder.Default`.
- Fields declared as `private <Type> <name>;`.

### Kotlin (`spring_kotlin`)

- No Lombok — Kotlin handles boilerplate natively.
- Includes a `<#function toKotlinType>` FreeMarker helper that maps Java type names (as emitted by Hibernate Tools) to their Kotlin equivalents (`Integer` → `Int`, `Set<X>` → `MutableSet<X>`, `byte[]` → `ByteArray`, etc.).
- Composite key classes are emitted as `data class` (constructor-parameter style) since they need structural equality.
- Regular entity classes are emitted as plain `class` (also constructor-parameter style), because `data class` is not recommended for JPA entities (mutable state, proxying concerns).
- All properties declared as `var ... = null` (nullable) or `var ... = mutableSetOf()` for collections.
- `serialVersionUID` lives in a `companion object` instead of a static field.

### Groovy (`spring_groovy`)

- No Lombok — uses Groovy's own AST transformation annotations instead: `@Builder(builderStrategy = SimpleStrategy, prefix = '')`, `@EqualsAndHashCode`, `@ToString`.
- Adds `@CompileStatic` on every class for type safety at compile time.
- Fields have no explicit access modifier (Groovy defaults to `public` for properties, which then get auto-generated getters/setters via Groovy's property mechanism).
- Collections initialized as `new HashSet<>(0)` (same as Java), but without `@Builder.Default` since that is a Lombok concept.
- No type conversion function is needed — Groovy accepts Java type names directly.

### Summary table

| Aspect                       | Java                                    | Kotlin                           | Groovy                            |
| ---------------------------- | --------------------------------------- | -------------------------------- | --------------------------------- |
| Boilerplate strategy         | Lombok                                  | Native Kotlin                    | Groovy AST transforms             |
| Composite key class type     | `public class` + `@Embeddable`          | `data class` + `@Embeddable`     | `class` + `@Embeddable`           |
| Entity class type            | `public class` + `@Entity`              | `class` + `@Entity`              | `class` + `@Entity`               |
| Field visibility             | `private`                               | `var` (property)                 | implicit (Groovy property)        |
| Collection init              | `new HashSet<>(0)` + `@Builder.Default` | `mutableSetOf()`                 | `new HashSet<>(0)`                |
| Type conversion              | None needed                             | `toKotlinType()` FTL function    | None needed                       |
| `serialVersionUID`           | `private static final long` field       | `companion object { const val }` | `private static final long` field |
| Static analysis              | —                                       | —                                | `@CompileStatic` on every class   |
| File rename after generation | None (already `.java`)                  | `.java` → `.kt`                  | `.java` → `.groovy`               |
