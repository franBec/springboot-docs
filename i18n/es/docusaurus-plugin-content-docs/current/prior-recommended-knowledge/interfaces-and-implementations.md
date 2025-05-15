---
sidebar_position: 10
---

import YouTube from '@site/src/components/YouTube';

# Interfaces e implementaciones

Dividamos esto en dos partes: la **interfaz** (el "qué") y la **implementación** (el "cómo").

* **Interfaz**: Pensá en una interfaz como el menú de un restaurante. Lista qué platos están disponibles (métodos), pero no cómo se cocinan.
* **Implementación**: Si la interfaz es el menú del restaurante, la implementación es la cocina que realmente prepara tu pedido. Es el trabajo pesado – la clase Java que hace lo que la interfaz prometió.

## ¿Por qué esto importa?

* **Flexibilidad**: Cambiá implementaciones sin romper código (por ejemplo, cambiá de datos hardcodeados a una base de datos después).
* **Testing**: Facilita mockear la interfaz para probar otros componentes.
* **Claridad**: Separa el "qué" del "cómo" para un código más limpio. Las implementaciones reales se ensucian – por eso las escondemos detrás de interfaces limpias.
* Spring Boot inyecta automáticamente la "cocina" correcta cuando pedís un "plato" (esto se llama [inyección de dependencias](/spring-boot-in-a-nutshell/dependency-injection)).