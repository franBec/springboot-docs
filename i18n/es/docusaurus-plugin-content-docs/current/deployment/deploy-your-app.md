---
sidebar_position: 4
---

import YouTube from '@site/src/components/YouTube';

# Desplegá tu aplicación

Hacer que tu aplicación Spring Boot funcione de manera confiable para tus usuarios es el paso final y crucial. Las estrategias de despliegue varían enormemente dependiendo del equipo, la madurez de la empresa y la escala del proyecto. Echemos un vistazo a un par de enfoques que encontré y discutamos las mejores prácticas modernas.

## Métodos de despliegue

### La forma manual "vieja escuela" (y por qué es riesgoso)

En mi primer laburo, desplegar nuestra aplicación Spring Boot (empaquetada como un archivo `WAR`) era un ritual tenso y manual:

1. **Escritorio remoto**: Conectarse a la Máquina Virtual de producción usando un cliente de Escritorio Remoto.
2. **Detener el servidor**: Detener manualmente la instancia de [Apache Tomcat](https://tomcat.apache.org/) que estaba ejecutando la versión actual de la aplicación. Esto significaba **tiempo de inactividad** para los usuarios.
3. **Reemplazar el archivo**: Navegar por el sistema de archivos del servidor, eliminar el archivo `app.war` viejo y copiar el archivo `app.war` nuevo (subido manualmente).
4. **Iniciar el servidor**: Iniciar manualmente la instancia de Tomcat de nuevo.
5. **Rezar**: Esperar que todo funcionara, revisar logs frenéticamente y testear manualmente funcionalidades críticas.

**Por qué esto no es óptimo (y casi poco profesional hoy en día):**

* **Alto riesgo de error humano**: Copiar el archivo equivocado, eliminar algo importante, configurar mal Tomcat – los pasos manuales son propensos a errores.
* **Tiempo de inactividad**: Detener el servidor significa que la aplicación no está disponible para los usuarios durante el despliegue.
* **No hay rollback fácil**: Si la nueva versión falla, revertir implica repetir el proceso manual en reversa, a menudo bajo presión.
* **Falta de auditabilidad**: ¿Quién desplegó qué, cuándo y cómo? Los procesos manuales dejan poca trazabilidad.
* **No es escalable**: Imaginá hacer esto para decenas o cientos de microservicios. Es insostenible.
* **Estresante**: Los despliegues manuales suelen ser eventos de alta presión, lo que lleva al agotamiento y a errores.

Si bien esto podría funcionar para una pequeña herramienta interna, es completamente inadecuado para aplicaciones serias.

### La forma moderna: Pipelines CI/CD y containerización

La forma más común y profesional de desplegar aplicaciones Spring Boot hoy en día implica la automatización a través de un [pipeline de Integración Continua/Despliegue Continuo (CI/CD)](https://www.redhat.com/en/topics/devops/what-is-ci-cd), a menudo aprovechando la containerización (como Docker). Aquí hay un flujo típico disparado por un `git push` a una rama específica (por ejemplo, `main` o `release`):

<div>
  <img src={require('@site/static/img/deployment/cicd.png').default} alt="diagrama de cicd" />
</div>

1. **Envío de código**: Un desarrollador envía cambios de código al repositorio Git.
2. **Testing automatizado**: El pipeline ejecuta automáticamente unit tests, integration tests y potencialmente otras verificaciones de calidad (como análisis de código estático con [SonarQube](https://www.sonarsource.com/products/sonarqube/)). Si los tests fallan, el pipeline se detiene, impidiendo que código defectuoso avance.
3. **Build y "dockerizar"**: Si los tests pasan, el pipeline construye la aplicación Spring Boot (creando un archivo `JAR`) y luego construye una imagen Docker usando el `Dockerfile` que discutimos antes. Esto empaqueta la aplicación y sus dependencias en un contenedor estandarizado y portable.
4. **Enviar imagen al registry**: La imagen Docker recién construida se etiqueta (por ejemplo, con el hash del commit o el número de versión) y se envía a un [registro de contenedores (container registry)](https://www.redhat.com/en/topics/cloud-native-apps/what-is-a-container-registry) (como [Docker Hub](https://hub.docker.com/), [Google Artifact Registry](https://cloud.google.com/artifact-registry), [AWS ECR](https://aws.amazon.com/ecr/)).
5. **(Opcional) Puerta de aprobación**: En muchas configuraciones, especialmente para despliegues en producción, el pipeline puede pausarse y requerir aprobación manual de un líder de equipo, QA o gerente antes de continuar.
6. **Despliegue**: El pipeline dispara el despliegue de la nueva imagen del contenedor al entorno de destino.

Este enfoque automatizado ofrece enormes ventajas: consistencia, confiabilidad, velocidad, auditabilidad y rollbacks automatizados (si están configurados).

## Despliegues seguros: Despliegue gradual de tráfico

Lanzar una nueva versión instantáneamente a todos los usuarios, incluso después de testear, conlleva riesgos. Las estrategias de despliegue modernas a menudo implican desplegar la nueva versión *sin* enviar inmediatamente tráfico de usuarios a ella, y luego cambiar gradualmente el tráfico.

1. **Desplegar nueva versión**: La nueva versión de la aplicación (v2) se despliega junto a la versión que está corriendo actualmente (v1). Ambas están funcionando, pero inicialmente, todo el tráfico de usuarios sigue yendo a v1.
2. **Testing interno**: El equipo puede testear v2 usando URL internas o reglas de enrutamiento específicas para asegurarse de que está funcionando correctamente en el entorno de producción.
3. **Aumento incremental del tráfico**: Usando balanceadores de carga o service meshes, el tráfico se cambia gradualmente de v1 a v2:
   * Empezar con un pequeño porcentaje (por ejemplo, 1%, 5%, 10%) yendo a v2.
   * Monitorear de cerca métricas clave (errores, latencia, uso de recursos).
   * Si las métricas se ven bien, aumentar el porcentaje (por ejemplo, 25%, 50%, 75%).
   * Si surgen problemas, cambiar inmediatamente el tráfico de vuelta a v1 (rollback) e investigar.
4. **Despliegue completo**: Una vez que la confianza es alta y v2 maneja el 100% del tráfico de manera estable, las instancias viejas de v1 pueden ser reducidas y eliminadas.

Esta técnica (a menudo parte de estrategias de despliegue [Blue-Green](https://www.redhat.com/en/topics/devops/what-is-blue-green-deployment) o [Canary](https://www.jetbrains.com/teamcity/ci-cd-guide/concepts/canary-release/)) reduce significativamente el riesgo de que despliegues fallidos impacten a los usuarios y permite lanzamientos sin tiempo de inactividad.

## Recomendación para proyectos personales y PoC

Configurar un pipeline CI/CD completo es excesivo para proyectos personales, proof-of-concepts (PoC) o demos pequeñas. Para estos escenarios, los proveedores de Plataforma-como-Servicio (PaaS) ofrecen excelentes niveles gratuitos.

Para aplicaciones Spring Boot (empaquetadas como `JAR`), encontré que **[Render.com](https://render.com/)** es una gran opción:

* **Configuración fácil**: Conectá tu repositorio de GitHub/GitLab, apuntá al proyecto Spring Boot.
* **Nivel gratuito**: Suficientemente generoso para aplicaciones pequeñas.
* **Despliegues automáticos**: Se despliega automáticamente al hacer push a la rama especificada.
* **Infraestructura gestionada**: Maneja servidores, red y escalado básico por vos.

**Limitación principal**: El nivel gratuito a menudo experimenta [arrancadas en frío (cold starts)](https://medium.com/@ilakk2023/overcoming-the-cold-start-problem-in-microservices-strategies-and-aws-solutions-2f93fc1e59a6). Si tu aplicación no ha recibido tráfico en un tiempo, el contenedor puede ser apagado para ahorrar recursos. La siguiente petición activará que arranque de nuevo, causando un retraso notable (varios segundos) para ese primer usuario. Esto suele ser aceptable para proyectos personales, pero no para aplicaciones de producción que necesitan baja latencia consistente.

**Te recomiendo mucho** el video de Daniele Leão "DEPLOY SPRING BOOT NO RENDER".

<YouTube id="fwWvgk_SW2g" />

¡Feliz despliegue! 🚀