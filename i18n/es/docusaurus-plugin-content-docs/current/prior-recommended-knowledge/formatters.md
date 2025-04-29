---
sidebar_position: 7
---

import YouTube from '@site/src/components/YouTube';

# Formatters

Un **formatter** estiliza automáticamente tu código (indentación, espacios, saltos de línea) para asegurar consistencia. ¡Se terminaron los debates sobre _tabs vs. spaces_!

<YouTube id="V7PLxL8jIl8" />

Antes de imponer un formatter, chequeá el flujo de trabajo de tu equipo:

* **La consistencia > la preferencia personal**: Si tu equipo ya usa un formatter (por ejemplo, [Checkstyle](https://checkstyle.org/), [Google Java Format](https://github.com/google/google-java-format)), seguí su configuración.
* **Para proyectos existentes sin formatter**, consultá al equipo primero. Un cambio repentino de formato en un código base compartido puede enterrar cambios significativos en el ruido. Si acuerdan, creá un commit dedicado puramente para el formato (¡nada de ajustes de lógica!) para simplificar las revisiones de código.

Te recomiendo [Spotless](https://github.com/diffplug/spotless). ¿Por qué? Preferencia personal, es el que siempre usé y no me molesté en buscar otros.