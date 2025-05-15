---
sidebar_position: 4
---

import YouTube from '@site/src/components/YouTube';

# Servidor y Serverless

Nuestras aplicaciones, al final, necesitan correr _en algún lado_. Ese "algún lado" generalmente se reduce a dos opciones: servidores tradicionales (donde vos jugás a ser el dueño de la casa) o entornos serverless (donde sos un nómada en la nube). Ambos enfoques mantienen tu código corriendo en las nubes, pero uno te da las llaves de la sala de servidores mientras que el otro te pasa una cuenta tipo Uber. Analicemos estas opciones.

## Servidor

Aunque Serverless se lleva toda la atención, las arquitecturas tradicionales basadas en servidores aún potencian sistemas empresariales. Esto es lo que tenés que saber:

* **Vos sos el dueño de la caja**: física (hardware on-premise) o virtual (VMs en la nube como [AWS EC2](https://aws.amazon.com/ec2/) o [Google Compute Engine](https://cloud.google.com/products/compute/)), tenés control total sobre:
  * Parches del SO y actualizaciones de seguridad.
  * Estrategias de escalado (vertical/horizontal).
  * Asignación de recursos (CPU, RAM, almacenamiento).
* **Costos predecibles**: Facturas mensuales fijas sin importar los picos de tráfico.

## Serverless

El término "Serverless" es un poco engañoso. Todavía hay servidores involucrados, pero vos nunca los ves ni los gestionás.

* En lugar de preocuparte por hardware, actualizaciones de software o escalado, los desarrolladores se enfocan puramente en escribir código.
* Los proveedores de nube (como [AWS](https://aws.amazon.com/), [Google Cloud](https://cloud.google.com/) o [Microsoft Azure](https://portal.azure.com/)) se encargan del trabajo pesado: levantar servidores cuando se necesitan, parchear agujeros de seguridad, balancear tráfico e incluso hacer copias de seguridad de los datos automáticamente.

En una era donde "computación Serverless" es la palabra de moda, es tentador pensar en los servidores como reliquias obsoletas de tiempos más simples. Después de todo, ¿por qué lidiar con ellos si podés dejar que los proveedores de nube se encarguen de todo?

Sin embargo, antes de subirte al tren de Serverless, vale la pena detenerse a considerar si es realmente la mejor opción para tu app (y tu billetera).

<div>
  <img src={require('@site/static/img/prior-recommended-knowledge/serverless-meme.png').default} alt="meme de serverless" />
</div>

### El sueño de Serverless puede volverse una pesadilla rápido

La computación Serverless promete una escalabilidad sin igual, pero esa flexibilidad a menudo viene con una estructura de costos impredecible. Un ejemplo impactante de esto salió a la luz hace solo unos meses cuando [cara.app](https://cara.app/explore), un pequeño proyecto indie, se volvió viral. Construida usando [funciones serverless](https://www.splunk.com/en_us/blog/learn/serverless-functions.html), la popularidad repentina de la app llevó a una asombrosa factura de nube de $96,000 para su creador.

<YouTube id="SCIfWhAheVw" />

Este no es un incidente aislado. El precio de Serverless se basa mucho en el uso, y aunque eso puede parecer rentable al principio, un pico en la demanda puede disparar tus costos a la órbita rápidamente.

## Conclusión: no es uno o el otro

| Criterio                           | Servidor                                    | Serverless                            |
|------------------------------------|---------------------------------------------|---------------------------------------|
| **Estructura de costos**           | Predecible (fija/mes)                       | Variable (pagás por ejecución)        |
| **Escalado**                       | Configuración manual/auto-escalado          | Automático (pero picos costosos)      |
| **Mantenimiento**                  | Alto (vos manejás todo)                     | Cero (es tarea del proveedor de nube) |
| **Control**                        | Control total sobre el entorno              | Limitado a runtime/config             |
| **Arrancada en frío (cold start)** | Ninguna (siempre corriendo)                 | Hay latencia                          |
| **Mejor para**                     | Cargas de trabajo estables, apps con estado | Tráfico basado en eventos, ráfagas    |

La mayoría de los equipos a los que te unirás ya tomaron esta decisión años antes de tu llegada. Pero acá te explico por qué esto te importa **a vos**:

* **Discusiones de arquitectura**: Entendé las ventajas y desventajas cuando tus compañeros debatan _migrar a Lambda_.
* **Contexto de debugging**: Los problemas en Serverless (arrancadas en frío/tiempos de espera) son diferentes a los de los servidores (thread pool).
* **Avances de carrera**: Las certificaciones de nube esperan este conocimiento.
* **Potencial de ascenso**: Roles como Tech Leads necesitan asesorar sobre decisiones de infraestructura.

Ya sea que estés manteniendo un servidor polvoriento o construyendo microservicios Serverless, la mejor arquitectura es la que tu equipo realmente puede operar.