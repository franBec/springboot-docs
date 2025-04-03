---
sidebar_position: 5
---

# About Mutation Testing

What is mutation testing? [Pitest](https://pitest.org/) defines it as:

> Mutation testing is conceptually quite simple. Faults (or mutations) are automatically seeded into your code, then your tests are run. If your tests fail then the mutation is killed, if your tests pass then the mutation lived. The quality of your tests can be gauged from the percentage of mutations killed.

To get this metric, we need the [Solidsoft Pitest Gradle Plugin](https://mvnrepository.com/artifact/info.solidsoft.pitest/info.solidsoft.pitest.gradle.plugin).

1. In your `build.gradle`, add the plugin in the `plugins` section:

    ```groovy
    id 'info.solidsoft.pitest' version '1.15.0'
    ```

2. Configure a new `pitest` task at the bottom of `build.gradle`:

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

3. Ensure `test` now depends on `pitest`:

    ```groovy
    tasks.named('test') {
        dependsOn 'pitest'
        useJUnitPlatform()
    }
    ```

4. Now that everything is set up, run the `test` Task. When the task finishes, If you check the `build/reports/pitest/index.html`, you’ll find a HTML file, that is the report. Open it and explore it.

   <div>
     <img src={require('@site/static/img/unit-testing/pit-report-path.png').default} alt="pit report path" />
   </div>
   <div>
     <img src={require('@site/static/img/unit-testing/report.png').default} alt="report" />
   </div>

Commit the progress so far.

```bash
git add .
git commit -m "pitest"
```