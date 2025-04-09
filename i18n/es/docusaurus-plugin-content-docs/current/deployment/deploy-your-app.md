---
sidebar_position: 4
---

import YouTube from '@site/src/components/YouTube';

# Desplegar tu aplicación

Lograr que tu aplicación Spring Boot funcione de manera confiable para tus usuarios es el paso final y crucial. Las estrategias de despliegue varían muchísimo según el equipo, la madurez de la empresa y la escala del proyecto. Vamos a ver un par de enfoques que he encontrado y a discutir las mejores prácticas modernas.

## Métodos de despliegue

### La forma "old school" manual (y por qué es arriesgada)

En mi primer trabajo, desplegar nuestra aplicación Spring Boot (empaquetada como un archivo `WAR`) era un ritual tenso y manual:

1. **Escritorio remoto**: Conectarse a la máquina virtual de producción usando un cliente de escritorio remoto.
2. **Detener el servidor**: Detener manualmente la instancia de [Apache Tomcat](https://tomcat.apache.org/) que estaba ejecutando la versión actual de la aplicación. Esto significaba **tiempo de inactividad** para los usuarios.
3. **Reemplazar el archivo**: Navegar en el sistema de archivos del servidor, borrar el viejo archivo `app.war` y copiar el nuevo `app.war` (subido manualmente).
4. **Iniciar el servidor**: Arrancar manualmente la instancia de Tomcat nuevamente.
5. **Rezá**: Esperar que todo funcione, revisar los logs frenéticamente y probar manualmente las funciones críticas.

**Por qué esto no es lo ideal (y casi poco profesional hoy en día)**:

* **Alto riesgo de error humano**: Copiar el archivo equivocado, borrar algo importante, configurar mal Tomcat – los pasos manuales son propensos a errores.
* **Tiempo de inactividad**: Detener el servidor significa que la aplicación no está disponible para los usuarios durante el despliegue.
* **Sin rollback fácil**: Si la nueva versión falla, volver atrás implica repetir el proceso manual en sentido inverso, a menudo bajo presión.
* **Falta de auditabilidad**: ¿Quién desplegó qué, cuándo y cómo? Los procesos manuales dejan pocos registros.
* **No escalable**: Imaginá hacer esto para decenas o cientos de microservicios. No es sostenible.
* **Estresante**: Los despliegues manuales son eventos de alta presión, lo que puede llevar a agotamiento y errores.

Si bien esto puede funcionar para una herramienta interna pequeña, es completamente inadecuado para aplicaciones serias.

### La forma moderna: pipelines CI/CD y contenedorización

La forma más común y profesional de desplegar aplicaciones Spring Boot hoy en día implica automatización a través de un [pipeline de Integración/Despliegue Continuo (CI/CD)](https://www.redhat.com/en/topics/devops/what-is-ci-cd), a menudo utilizando contenedores (como Docker). Acá tenés un flujo típico que se dispara con un `git push` a una rama específica (por ejemplo, `main` o `release`):

<div>
  <img src={require('@site/static/img/deployment/cicd.png').default} alt="cicd" />
</div>

1. **Push de código**: Un desarrollador sube cambios al repositorio Git.
2. **Pruebas automatizadas**: El pipeline ejecuta automáticamente tests unitarios, tests de integración y potencialmente otros chequeos de calidad (como análisis de código estático con [SonarQube](https://www.sonarsource.com/products/sonarqube/)). Si los tests fallan, el pipeline se detiene, evitando que código defectuoso siga adelante.
3. **Build y dockerización**: Si los tests pasan, el pipeline construye la aplicación Spring Boot (creando un archivo `JAR`) y luego construye una imagen Docker usando el `Dockerfile` que discutimos antes. Esto empaqueta la aplicación y sus dependencias en un contenedor estandarizado y portable.
4. **Push de la imagen al registry**: La nueva imagen Docker se etiqueta (por ejemplo, con el hash del commit o el número de versión) y se sube a un [registro de contenedores](https://www.redhat.com/en/topics/cloud-native-apps/what-is-a-container-registry) (como [Docker Hub](https://hub.docker.com/), [Google Artifact Registry](https://cloud.google.com/artifact-registry) o [AWS ECR](https://aws.amazon.com/ecr/)).
5. **(Opcional) Control de aprobación**: En muchos setups, especialmente para despliegues en producción, el pipeline puede hacer una pausa y requerir aprobación manual de un líder de equipo, QA o gerente antes de continuar.
6. **Despliegue**: El pipeline dispara el despliegue de la nueva imagen de contenedor al entorno objetivo.

Este enfoque automatizado ofrece grandes ventajas: consistencia, confiabilidad, rapidez, auditabilidad y rollbacks automáticos (si se configuran).

## Despliegues seguros: reparto gradual de tráfico

Poner una nueva versión en vivo de golpe para todos los usuarios, incluso después de probarla, conlleva riesgos. Las estrategias de despliegue modernas a menudo implican desplegar la nueva versión *sin* enviar inmediatamente tráfico de usuarios a ella, y luego ir distribuyendo el tráfico poco a poco.

1. **Desplegar nueva versión**: Se despliega la nueva versión de la aplicación (v2) junto a la versión actual (v1). Ambas están en ejecución, pero inicialmente todo el tráfico va a v1.
2. **Pruebas internas**: El equipo puede probar v2 usando URLs internas o reglas de enrutamiento específicas para asegurarse de que funciona correctamente en producción.
3. **Aumento incremental del tráfico**: Usando balanceadores de carga o mallas de servicios, el tráfico se desplaza gradualmente de v1 a v2:
    * Empezar con un pequeño porcentaje (por ejemplo, 1%, 5%, 10%) hacia v2.
    * Monitorear métricas clave (errores, latencia, uso de recursos) de cerca.
    * Si las métricas se ven bien, aumentar el porcentaje (por ejemplo, 25%, 50%, 75%).
    * Si surgen problemas, cambiar inmediatamente el tráfico de vuelta a v1 (rollback) e investigar.
4. **Despliegue completo**: Una vez que se confíe y v2 maneje el 100% del tráfico de forma estable, se pueden reducir y remover las instancias viejas de v1.

Esta técnica (a menudo parte de estrategias de despliegue [Blue-Green](https://www.redhat.com/en/topics/devops/what-is-blue-green-deployment) o [Canary](https://www.jetbrains.com/teamcity/ci-cd-guide/concepts/canary-release/)) reduce significativamente el riesgo de que un despliegue fallido impacte a los usuarios y permite lanzamientos sin tiempo de inactividad.

## Recomendación para proyectos personales/PoC: niveles gratuitos de PaaS

Configurar un pipeline CI/CD completo puede ser excesivo para proyectos personales, pruebas de concepto (PoC) o demos pequeñas. Para estos escenarios, los proveedores de Platform-as-a-Service (PaaS) ofrecen excelentes niveles gratuitos.

Para aplicaciones Spring Boot (empaquetadas como JARs), encontré que **[Render.com](https://render.com/)** es una gran opción:

* **Configuración sencilla**: Conectás tu repositorio de GitHub/GitLab y lo apuntas a tu proyecto Spring Boot.
* **Nivel gratuito**: Es lo suficientemente generoso para aplicaciones pequeñas.
* **Despliegues automáticos**: Se despliega automáticamente con cada push a la rama especificada.
* **Infraestructura gestionada**: Se encargan de los servidores, la red y el escalado básico por vos.

**Principal limitación**: El nivel gratuito suele presentar [cold starts](https://medium.com/@ilakk2023/overcoming-the-cold-start-problem-in-microservices-strategies-and-aws-solutions-2f93fc1e59a6). Si tu aplicación no recibe tráfico por un tiempo, el contenedor puede apagarse para ahorrar recursos. La siguiente solicitud lo encenderá de nuevo, causando un retraso notable (varios segundos) para ese primer usuario. Esto suele ser aceptable para proyectos personales, pero no para aplicaciones de producción que requieren latencia baja constante.

**Recomendación especial**: Te recomiendo mucho el video de Daniele Leão "DEPLOY SPRING BOOT NO RENDER".

<YouTube id="fwWvgk_SW2g" />

¡Feliz despliegue! 🚀