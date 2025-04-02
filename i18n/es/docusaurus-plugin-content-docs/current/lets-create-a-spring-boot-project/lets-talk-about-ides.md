---
sidebar_position: 2
---

# Hablemos de los IDEs

Técnicamente, podrías escribir apps con Spring Boot en el Notepad y compilarlas a mano desde la línea de comando—pero eso es como construir una casa usando solo un destornillador.

Un IDE (Entorno de Desarrollo Integrado) es una herramienta que facilita el codeo, atrapa errores en tiempo real y organiza los archivos para que te puedas concentrar en qué construir en lugar de cómo hacerlo.

## ¿Por Qué Todo el Mundo Usa IntelliJ IDEA?

Si alguna vez viste a un colega codear o navegaste por algún tutorial de Spring online, seguro ya te topaste con este logo:

<div className="image-container">
  <img src={require('@site/static/img/intelliJ-IDEA-logo.png').default} alt="IntelliJ IDEA Logo" width="144" height="144" />
</div>

**IntelliJ IDEA** domina el desarrollo en Java y Spring Boot por cinco razones clave:

1. **Superpoderes para Spring Boot**: Configura proyectos automáticamente y sugiere arreglos específicos para Spring.
2. **Autocompletado de Código**: Predice lo que vas a escribir a continuación (como un buscador para código).
3. **Todo Con Un Clic**: Corre, depura, testea y despliega apps sin salir del IDE.
4. **Velocidad y Estabilidad**: Maneja proyectos grandes sin colapsar.
5. **Gratis y Potente**: La Community Edition cubre el 90% de lo que necesitás.

¿Y Qué Hay de Otros IDEs?

* [VS Code](https://code.visualstudio.com/): Ligero pero necesita plugins para Spring Boot (requiere configuración extra).
* [Eclipse/Spring Tool Suite](https://eclipseide.org/): Gratis pero pesado y con flujos de trabajo anticuados.
* [NetBeans](https://netbeans.apache.org/front/main/index.html): Rara vez se usa para desarrollo moderno con Spring.

Mi recomendación personal: descargá [IntelliJ IDEA Community Edition](https://www.jetbrains.com/idea/download/) (no es patrocinado, lamentablemente).

## Optimizando IntelliJ IDEA con Plugins

Antes de ponerte a codear, vamos a quitarle algo de bosta al IDE y eliminar distracciones.

### Desactivá Plugins que No Usás

1. Andá a File → Settings → Plugins (en Windows) o IntelliJ IDEA → Settings → Plugins (en macOS).
2. En la pestaña Installed, desactivá estos plugins:
   * En **Deployment**: Remote Execution Agent.
   * En **HTML and XML**: HTML Tools.
   * Todo en **IDE Localization** (como paquetes de idiomas en chino, japonés, coreano).
   * En **JVM Frameworks**: JavaFX.
   * En **Languages**: Shell Script y TOML.
   * En **Test Tools**: TestNG.
   * En **Version Controls**: Mercurial, Perforce Helix Core, Subversion.
   * En **Other Tools**: Code with me, Eclipse Interoperability, EditorConfig, Performance Testing, Qodana, Task Management, TextMate Bundles, WebP Support.

**Cómo Desactivarlo**: Apagá el toggle del plugin → Hacé clic en Apply → Reiniciá el IDE si te lo pide.

### Instalá Plugins

* [Lombok](https://plugins.jetbrains.com/plugin/6317-lombok): soporte para Project Lombok.
* [CodeComplexity](https://plugins.jetbrains.com/plugin/21667-code-complexity): este plugin calcula la métrica de complejidad del código.
* [OpenAPI (Swagger) Editor](https://plugins.jetbrains.com/plugin/14837-openapi-swagger-editor): soporte para la Especificación OpenAPI (OAS) / especificación Swagger.

Hacé clic en Apply → Reiniciá IntelliJ IDEA cuando te lo pida.