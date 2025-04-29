---
sidebar_position: 2
---

import YouTube from '@site/src/components/YouTube';

# Arquitectura de aplicación

Hay varias maneras de construir aplicaciones, y cada enfoque tiene su propio estilo, beneficios y desafíos.

## Monolito

_Una casa como una gran unidad, cumple su función._

<div>
  <img src={require('@site/static/img/prior-recommended-knowledge/monolith.png').default} alt="diagrama de monolito" />
</div>

Estoy 99.9% seguro de que esta es la primera arquitectura de aplicación que aprendés, porque es la más intuitiva para empezar. Además, la mayoría de los tutoriales y cursos van por este enfoque.

Un monolito es una caja todo-en-uno. La mejor forma de explicarlo es usando la famosa _analogía de la casa_. Imaginate que estás construyendo una casa. En el desarrollo web tradicional con monolito, toda la casa se construye como una gran unidad, con todas las habitaciones, funcionalidades e infraestructura conectadas en una sola estructura.

En esta analogía:

* **Casa**: El monolito en sí es como la casa, que representa toda la aplicación.
* **Habitaciones**: Dentro de la casa, tenés diferentes habitaciones, como la sala, la cocina, los dormitorios y el baño. Estas habitaciones representan las diversas funcionalidades y componentes de la aplicación web, como el inicio de sesión de usuario, la lista de productos, el carrito de compras y el procesamiento de pagos.
* **Infraestructura**: Las tuberías (plomería/fontanería), electricidad y otros sistemas esenciales que soportan toda la casa son como el código subyacente, la base de datos y los recursos que hacen que la aplicación web funcione.

### Puntos clave

* **Todo en un solo lugar**: Igual que una casa tiene todo bajo un mismo techo, una aplicación web monolítica tiene todo su código, funciones y datos dentro de una sola base de código.
* **Simplicidad**: Construir toda la casa como una unidad puede ser sencillo y fácil de entender, ya que todo está en un solo lugar.
* **Comunicación**: En un monolito, todas las habitaciones pueden comunicarse fácilmente entre sí, ya que forman parte de la misma estructura. De manera similar, en el desarrollo web, las diferentes funcionalidades de la aplicación pueden compartir fácilmente datos y funcionalidades.

### Desventajas

* **Escalabilidad**: Si querés hacer la casa más grande, tenés que expandir todo, lo que puede ser más difícil y caro. De manera similar, en el desarrollo web, a medida que la aplicación crece, se vuelve más difícil de escalar, y agregar nuevas funcionalidades puede volverse más complicado.
* **Mantenimiento**: Imaginate si hay un problema con las tuberías en una habitación; podría afectar toda la casa. De manera similar, si hay un bug o un problema en una parte del código del monolito, podría impactar toda la aplicación.
* **Velocidad de desarrollo**: En un monolito, cuando varios equipos trabajan en diferentes partes de la aplicación, coordinar sus esfuerzos puede ser desafiante. Los cambios en un área podrían requerir pruebas y validaciones exhaustivas en toda la aplicación.

## Frontend + backend

_Separarse simplemente tiene sentido._

<div>
  <img src={require('@site/static/img/prior-recommended-knowledge/frontend-backend.png').default} alt="diagrama frontend backend" />
</div>

Vamos con la analogía del restaurante para esta.

Imaginate que tenés un restaurante. Al principio, tu restaurante era chico, y todo pasaba en un solo lugar: la cocina, el comedor y el mostrador de pago estaban todos juntos (un monolito).

Sin embargo, a medida que tu restaurante se hizo más popular, te encontraste con algunos desafíos:

* **Escalabilidad**: Con el aumento de la demanda, se hizo más difícil acomodar más clientes, preparar comida rápido, y administrar el comedor simultáneamente. Necesitabas una forma de expandirte sin llenar el lugar.
* **Especialización**: Te diste cuenta de que el personal de tu restaurante tenía habilidades diversas. Algunos eran excelentes cocineros, mientras que otros eran amigables y geniales sirviendo a los clientes. Pero que todos hicieran todo causaba ineficiencias.

Para superar estos desafíos, decidiste dividir tu restaurante en dos áreas distintas:

* **Frontend**: Esta es el área del comedor – la parte del restaurante con la que los clientes interactúan directamente. Está diseñada para ser fácil de usar y visualmente atractiva. Hay menús, mozos (camareros/meseros) y ambiente, todo enfocado en crear una experiencia agradable para los clientes.
* **Backend**: Esta es la cocina – la parte del restaurante escondida de la vista de los clientes. Es donde los chefs trabajan eficientemente para preparar la comida, se gestiona el inventario y se procesan los pedidos.

### ¿Por qué esta separación tiene sentido?

* **Escalabilidad mejorada**: Con el frontend y el backend separados, ahora podés expandir cualquiera de ellos de forma independiente. Si querés acomodar más clientes, podés enfocarte en expandir el área del comedor (frontend) sin afectar las operaciones de la cocina (backend).
* **Especialización y eficiencia**: Ahora que el personal de la cocina puede enfocarse únicamente en cocinar y gestionar el inventario, se vuelven más eficientes en sus tareas. Los mozos pueden concentrarse en brindar un excelente servicio a los clientes sin tener que preocuparse por la preparación de la comida.
* **Flexibilidad**: Con un frontend y un backend independientes, tenés la flexibilidad de actualizar o reemplazar uno sin necesariamente tocar el otro. Por ejemplo, podés renovar el menú y el comedor (frontend) sin cambiar toda la configuración de la cocina (backend).

En términos de desarrollo web:

* **Frontend**: Esta es la interfaz de usuario (UI) de un sitio web o aplicación web con la que los usuarios interactúan directamente. Es responsable del diseño y la experiencia de usuario general.
* **Backend**: Este es el lado del servidor de la aplicación, manejando tareas como el almacenamiento de datos, el procesamiento y la lógica de negocio.

La división permite un proceso de desarrollo web más eficiente y flexible, haciendo que sea más fácil manejar proyectos complejos y ofrecer una mejor experiencia de usuario a los visitantes.

## Microservicios

_Beneficios con desafíos._

<div>
  <img src={require('@site/static/img/prior-recommended-knowledge/spongebob-panic.png').default} alt="bob esponja en pánico" />
</div>

Imaginate que tenés un edificio grande, único y multiuso (como un mega-centro comercial) que alberga todos los diferentes negocios, servicios e instalaciones. Esto es similar a **una arquitectura monolítica, donde todo está fuertemente integrado en un solo sistema grande**.

Ahora, exploremos los pros y los contras de transformar este monolito en **microservicios, una colección de edificios más pequeños e independientes, cada uno dedicado a una función específica**.

**Pros**:

* **Escalabilidad**: Si un servicio particular (por ejemplo, compras, entretenimiento, transporte) experimenta alta demanda, puede escalar de forma independiente sin afectar a otros.
* **Flexibilidad**: Cada servicio se puede diseñar y actualizar de forma independiente. Si un servicio necesita una nueva funcionalidad o tecnología, se puede actualizar sin afectar a otros. Esto permite mantenerse al día con las últimas tendencias y avances.
* **Aislamiento de fallos**: Si surge un problema en un servicio, se puede contener a ese servicio específico, reduciendo el riesgo de una interrupción generalizada.
* **Especialización**: Diferentes servicios pueden especializarse en lo que mejor hacen. Esto permite que cada servicio sobresalga y ofrezca experiencias de alta calidad.
* **Velocidad de desarrollo**: Equipos independientes pueden trabajar en diferentes servicios simultáneamente, acelerando el proceso de desarrollo. Los cambios y actualizaciones se pueden implementar más rápido, ya que están confinados y no requieren coordinación en todo el tablero.

**Contras**:

* **Complejidad**: Administrar muchos servicios independientes requiere coordinación y comunicación. Los microservicios agregan complejidad en términos de comunicación entre servicios, despliegue y monitoreo.
* **Sobrecarga de infraestructura**: Cada servicio necesita su propia infraestructura y recursos, lo que puede resultar en mayores costos de mantenimiento y operación en comparación con un solo monolito.
* **Desafíos de integración**: Con muchos servicios independientes, asegurar una integración fluida entre ellos puede ser más desafiante que con un monolito. Los desarrolladores deben implementar protocolos de comunicación robustos y manejar posibles problemas que surjan de las interacciones entre servicios.
* **Curva de aprendizaje**: La transición a una arquitectura de microservicios puede ser un cambio significativo para el equipo de desarrollo, requiriéndoles aprender nuevos conceptos y mejores prácticas.

## Comparación

| Enfoque            | Ventajas                                                                                                                       | Desventajas                                                                                              |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| Monolito           | Fácil de construir y entender. Todo en un solo lugar facilita la comunicación                                                  | Más difícil de escalar a medida que crece la aplicación. Un bug en un área puede afectar todo el sistema |
| Frontend + Backend | Clara separación de responsabilidades mejora la organización. Cada parte puede ser actualizada o escalada independientemente   | Requiere comunicación entre dos capas. Más configuración comparado con un monolito                       |
| Microservicios     | Muy flexible—escalá y actualizá servicios individuales. El aislamiento de fallos minimiza el riesgo de problemas generalizados | Puede ser complejo de administrar y coordinar. Mayor sobrecarga operativa con múltiples servicios        |

En última instancia, no hay un enfoque perfecto. Cada arquitectura tiene sus propios beneficios y desventajas, y la elección correcta depende de la experiencia de tu equipo, los requisitos del proyecto y los objetivos a largo plazo.