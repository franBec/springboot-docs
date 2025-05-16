---
sidebar_position: 6
---

import YouTube from '@site/src/components/YouTube';

# IDE

Técnicamente, podrías escribir apps de Spring Boot en el Bloc de Notas y compilarlas manualmente por línea de comandos—pero eso es como construir una casa con un destornillador.

Un IDE (Entorno de Desarrollo Integrado) es una herramienta que te facilita la programación, detecta errores en tiempo real y organiza archivos para que te enfoques en qué construir en lugar de cómo construirlo.

## ¿Por qué todos usan IntelliJ IDEA?

Si alguna vez viste a un compañero de laburo programar o exploraste un tutorial de Spring, es probable que hayas visto este logo:

<div className="image-container">
   <img src={require('@site/static/img/prior-recommended-knowledge/intelliJ-IDEA-logo.png').default} alt="IntelliJ IDEA Logo" width="144" height="144" />
</div>

**IntelliJ IDEA** domina el desarrollo con Java y Spring Boot por cinco razones clave:

1. **Superpoderes para Spring Boot**: Autoconfigura proyectos y sugiere soluciones específicas de Spring.
2. **Autocompletado de código**: Predice lo que vas a tipear (como un buscador para código).
3. **Todo en un clic**: Ejecutá, debuggeá, testeá y desplegá apps sin salir del IDE.
4. **Velocidad y estabilidad**: Maneja proyectos grandes sin tildarse.
5. **Gratis y potente**: La Edición Community cubre el 90% de las necesidades.

## ¿Qué pasa con otras IDE?

* [VS Code](https://code.visualstudio.com/): Ligero, pero necesita plugins para Spring Boot (configuración extra).
* [Eclipse/Spring Tool Suite](https://eclipseide.org/): Gratis, pero un poco tosco, con flujos de trabajo anticuados.
* [NetBeans](https://netbeans.apache.org/front/main/index.html): Rara vez usado para desarrollo moderno con Spring.

Mi recomendación personal: descargá [IntelliJ IDEA Community Edition](https://www.jetbrains.com/idea/download/) (no me patrocinan, lamentablemente).

<YouTube id="jTZVx4TCmI4" />

## Optimizando IntelliJ IDEA con plugins (para Java)

Antes de codificar, saquemos un poco de desorden y distracciones del IDE.

### Desactivar plugins no usados

1.  Andá a File → Settings → Plugins (Windows) o IntelliJ IDEA → Settings → Plugins (macOS).
2.  En la pestaña Installed, desactivá estos plugins:
   *   En **Deployment**: Remote Execution Agent.
   *   En **HTML and XML**: HTML Tools.
   *   Todo en **IDE Localization** (como paquetes de idioma chino, japonés, coreano).
   *   En **JVM Frameworks**: JavaFX.
   *   En **Languages**: Shell Script y TOML.
   *   En **Test Tools**: TestNG.
   *   En **Version Controls**: Mercurial, Perforce Helix Core, Subversion.
   *   En **Other Tools**: Code with me, Eclipse Interoperability, EditorConfig, Performance Testing, Qodana, Task Management, TextMate Bundles, WebP Support.

**Cómo desactivar**: Desactivá la casilla del plugin → Hacé clic en Apply → Reiniciá el IDE si te lo pide.

### Instalar plugins

*   [Lombok](https://plugins.jetbrains.com/plugin/6317-lombok): soporte para [Project Lombok](https://projectlombok.org/).
*   [CodeComplexity](https://plugins.jetbrains.com/plugin/21667-code-complexity): Este plugin calcula métricas de complejidad de código.
*   [OpenAPI (Swagger) Editor](https://plugins.jetbrains.com/plugin/14837-openapi-swagger-editor): Soporte para la [Especificación OpenAPI (OAS)](https://swagger.io/specification/).

Hacé clic en Apply → Reiniciá IntelliJ IDEA cuando te lo pida.