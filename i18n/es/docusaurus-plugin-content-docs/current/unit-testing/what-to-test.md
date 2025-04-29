---
sidebar_position: 2
---

# ¿Qué testear?

## Encontrando el equilibrio adecuado

Existe un enfoque purista del unit testing que defiende

> Si una línea de código puede ejecutarse, debe testearse.

Si bien esta filosofía suena minuciosa, puede llevar a lo que yo llamo "parálisis de testing" – donde los equipos pasan tanto tiempo escribiendo tests que la entrega real de funcionalidades se retrasa significativamente. E incluso con una cobertura del 100%, nunca podés garantizar que un caso extremo imprevisto no se te escape.

## Un enfoque pragmático

En mi puesto actual, encontramos una estrategia equilibrada que ofrece tanto calidad como puntualidad:

-   **Enfocate en la lógica de negocio**: Priorizá testear todo en los controladores y las implementaciones de servicio, donde reside la mayor parte de tu lógica de negocio crítica.
-   **Apuntá a una cobertura realista**: Si bien el 100% de cobertura puede ser el ideal teórico, apuntamos a un umbral práctico del 70%. Este punto de referencia asegura un testing robusto mientras permite a los equipos mantener el ritmo.
-   **Considerá el contexto**: Cuanto más complejo o crítico sea un componente, más a fondo debe testearse. No todo el código merece la misma atención de testing.

## Cuando la cobertura se pone difícil

Incluso con nuestro razonable requisito de cobertura del 70%, seguimos experimentando desafíos de entrega. Esto es especialmente claro al trabajar con códigos base más antiguos y mal mantenidos donde:

-   Los métodos son a menudo largos y complejos.
-   Las dependencias están fuertemente acopladas y son difíciles de mockear.
-   Los efectos secundarios son comunes e impredecibles.
-   La documentación es escasa o desactualizada.

En estas situaciones, la refactorización puede ser necesaria antes de que se pueda empezar a testear de manera efectiva, lo que resalta aún más cómo **el unit testing fomenta un mejor diseño de código**.