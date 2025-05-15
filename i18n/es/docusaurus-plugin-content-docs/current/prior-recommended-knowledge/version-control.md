---
sidebar_position: 7
---

# Control de versiones

No construirías una casa sin arnés de seguridad. No programes sin [control de versiones](https://github.com/resources/articles/software-development/what-is-version-control).

## Sistemas de control de versiones

Git domina el mercado de VCS, con los demás relegados a sistemas legacy.

| Sistema                                     | Superpoder                             | Defecto                        |
|---------------------------------------------|----------------------------------------|--------------------------------|
| [Git](https://git-scm.com/)                 | Distribuido, magia de branches (ramas) | Curva de aprendizaje empinada  |
| [SVN](https://subversion.apache.org/)       | Simplicidad centralizada               | No tenés commits locales       |
| [Mercurial](https://www.mercurial-scm.org/) | Más fácil que Git                      | Perdió las guerras de VCS      |
| [CVS](https://cvs.nongnu.org/)              | Fue pionero en versionado              | Seguimiento a nivel de archivo |

## Plataformas de hosting

Acá es donde vive el código.

| Plataforma                                                       | Preferida por                 | Repositorios privados gratis | Funcionalidad estrella                     |
|------------------------------------------------------------------|-------------------------------|------------------------------|--------------------------------------------|
| [GitHub](https://github.com/)                                    | Startups tech                 | Sí, hasta 3 colaboradores    | Integración con Copilot, CI/CD con Actions |
| [GitLab](https://gitlab.com/)                                    | Empresas grandes (Enterprise) | Sí️                          | Pipeline de DevOps integrado               |
| [Azure Repos](https://azure.microsoft.com/products/devops/repos) | Los que usan Microsoft        | No                           | Integración con Azure                      |
| [Bitbucket](https://bitbucket.org/)                              | Fanáticos de Jira             | Sí                           | Permisos de ramas                          |

## Consejos de Git

1. **Primero Git, después el código**: Siempre `git init` antes de escribir tu primera línea de código.
2. **Consola > GUI**. Herramientas como [GitHub Desktop](https://desktop.github.com/download/) están buenísimas, pero aprendete estos cuatro comandos primero:

    ```bash
    git add .
    git commit -m "save point"
    git push
    git checkout -b
    ```

    ¿Por qué? Porque cuando el plugin de Git de tu IDE se rompa misteriosamente (va a pasar), vas a necesitar debuggear como un pro.
3. **Las reglas de tu equipo > gitflow de manual**: Quizás ames los feature branches, pero cada empresa tiene su propio flujo de trabajo "sagrado". Observá primero, después sugerí mejoras.