---
sidebar_position: 2
---

# ¿Qué testear?

## Encontrando el equilibrio adecuado

Existe un enfoque purista en las pruebas unitarias que dice:

> Si se puede ejecutar una línea de código, debe ser testeada.

Aunque esa filosofía suena súper completa, puede llevar a lo que yo llamo "parálisis de tests" – donde los equipos se pasan tanto tiempo escribiendo tests que la entrega real de funcionalidades se retrasa un montón. Y ni con cobertura del 100% se puede garantizar que no se escape algún caso extraño.

## Un enfoque pragmático

En mi rol actual, encontramos una estrategia balanceada que entrega calidad y puntualidad:

- **Enfócate en la lógica del negocio**: Prioriza testear todo en los controller(s) y en las implementaciones de servicio, que es donde vive la mayor parte de la lógica crítica.
- **Apunta a una cobertura realista**: Aunque el 100% de cobertura podría ser lo ideal en teoría, nosotros buscamos llegar a un práctico 70%. Ese benchmark asegura tests sólidos y permite que el equipo siga avanzando.
- **Considera el contexto**: Cuanto más complejo o crítico sea un componente, más a fondo debe ser testeado. No todos los códigos merecen la misma atención en sus tests.

## Cuando la cobertura se complica

Incluso con nuestro razonable requisito de 70% de cobertura, seguimos teniendo desafíos en la entrega. Esto se ve especialmente al trabajar con bases de código viejas y mal mantenidas, donde:

- Los métodos suelen ser largos y complejos.
- Las dependencias están muy acopladas y son difíciles de mockear.
- Los efectos secundarios son comunes e impredecibles.
- La documentación es escasa o está desactualizada.

En estas situaciones, puede que sea necesario refactorizar antes de poder empezar a testear de manera efectiva, lo que resalta aún más cómo **las pruebas unitarias fomentan un mejor diseño del código**.