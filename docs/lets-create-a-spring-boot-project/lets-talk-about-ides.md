---
sidebar_position: 2
---

# Let’s Talk About IDEs

Technically, you could write Spring Boot apps in Notepad and compile them manually via the command line—but that’s like building a house with a screwdriver.

An IDE (Integrated Development Environment) is a tool that streamlines coding, catches errors in real-time, and organizes files so you can focus on what to build instead of how to build it.

## Why Does Everyone Use IntelliJ IDEA?

If you’ve ever watched a coworker code or browsed a Spring tutorial online, you’ve likely seen this logo:

<div className="image-container">
   <img src={require('@site/static/img/lets-create-a-spring-boot-project/intelliJ-IDEA-logo.png').default} alt="IntelliJ IDEA Logo" width="144" height="144" />
</div>

**IntelliJ IDEA** dominates Java and Spring Boot development for five key reasons:

1. **Spring Boot Superpowers**: Auto-configures projects and suggests Spring-specific fixes.
2. **Code Completion**: Predicts what you’ll type next (like a search engine for code).
3. **One-Click Everything**: Run, debug, test, and deploy apps without leaving the IDE.
4. **Speed and Stability**: Handles large projects without lagging.
5. **Free and Powerful**: The Community Edition covers 90% of needs.

What About Other IDEs?

* [VS Code](https://code.visualstudio.com/): Lightweight but needs plugins for Spring Boot (extra setup).
* [Eclipse/Spring Tool Suite](https://eclipseide.org/): Free but clunky, with outdated workflows.
* [NetBeans](https://netbeans.apache.org/front/main/index.html): Rarely used for modern Spring development.

My personal recommendation: download [IntelliJ IDEA Community Edition](https://www.jetbrains.com/idea/download/) (not sponsored, sadly).

## Optimizing IntelliJ IDEA With Plugins

Before coding, let’s remove some IDE clutter and distractions.

### Disable Unused Plugins

1. Go to File → Settings → Plugins (Windows) or IntelliJ IDEA → Settings → Plugins (macOS).
2. In the Installed tab, disable these plugins:
   * In **Deployment**: Remote Execution Agent.
   * In **HTML and XML**: HTML Tools.
   * Everything in **IDE Localization** (like Chinese, Japanese, Korean language packs).
   * In **JVM Frameworks**: JavaFX.
   * in **Languages**: Shell Script and TOML.
   * in **Test Tools**: TestNG.
   * in **Version Controls**: Mercurial, Perforce Helix Core, Subversion.
   * In **Other Tools**: Code with me, Eclipse Interoperability, EditorConfig, Performance Testing, Qodana, Task Management, TextMate Bundles, WebP Support.

**How to Disable**: Toggle off the plugin → Click Apply → Restart IDE if prompted.

### Install Plugins

* [Lombok](https://plugins.jetbrains.com/plugin/6317-lombok): support for Project Lombok.
* [CodeComplexity](https://plugins.jetbrains.com/plugin/21667-code-complexity): This plugin calculates code complexity metric.
* [OpenAPI (Swagger) Editor](https://plugins.jetbrains.com/plugin/14837-openapi-swagger-editor): Support for the OpenAPI Specification (OAS) / Swagger specification.

Click Apply → Restart IntelliJ IDEA when prompted.