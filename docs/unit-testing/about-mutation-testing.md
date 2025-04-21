---
sidebar_position: 5
---

# About Mutation Testing

What is mutation testing? [Pitest](https://pitest.org/) defines it as:

> Mutation testing is conceptually quite simple. Faults (or mutations) are automatically seeded into your code, then your tests are run. If your tests fail then the mutation is killed, if your tests pass then the mutation lived. The quality of your tests can be gauged from the percentage of mutations killed.

## Mutation Testing in Java Spring Boot Projects

Mutation testing isn't frequently discussed in Spring Boot circles. Some reasons for its limited popularity are:

* **Performance concerns**: Mutation testing is computationally expensive, especially for large Spring codebases.
* **Complexity vs. value perception**: Many teams question whether the additional insights justify the setup complexity and runtime costs.
* **CI/CD impact**: The long execution time can disrupt fast feedback loops in CI/CD pipelines.

There is slowly increasing interest, particularly among teams with mature testing practices, but be prepared for longer build times.

## Solidsoft Pitest Gradle Plugin

To get this metric, we need the [Solidsoft Pitest Gradle Plugin](https://mvnrepository.com/artifact/info.solidsoft.pitest/info.solidsoft.pitest.gradle.plugin).

1. Add the plugin in the plugins section (usually at the start of `build.gradle`):

    ```groovy title="build.gradle"
    id 'info.solidsoft.pitest' version '1.15.0'
    ```

2. Configure `pitest` (bottom of `build.gradle`):

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
           // exclude all subpackages in adapter.in.rest, such as mappers and openApi generated code
           "${project.group}.${project.name}.adapter.in.rest.*.*".toString()
       ]
       targetTests = [
           "${project.group}.${project.name}.*".toString()
       ]
       timestampedReports = false
       useClasspathFile = true
   }
   ```

3. Ensure `test` now depends on `pitest`:

    ```groovy title="build.gradle"
    tasks.named('test') {
        dependsOn 'pitest'
        useJUnitPlatform()
    }
    ```

4. Now that everything is set up, run the `test` Task. When the task finishes, If you check the `build/reports/pitest/index.html`, you’ll find a HTML file, that is the report. Open it and explore it.

   <div>
     <img src={require('@site/static/img/unit-testing/report.png').default} alt="report" />
   </div>

Commit the progress so far.

```bash
git add .
git commit -m "pitest"
```