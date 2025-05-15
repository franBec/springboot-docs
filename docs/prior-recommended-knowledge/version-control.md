---
sidebar_position: 7
---

# Version Control

You wouldn't build a house without a safety harness. Don't code without [version control](https://github.com/resources/articles/software-development/what-is-version-control).

## Version Control Systems

Git commands the VCS market, with others being relegated to legacy holdouts.

| System                                      | Superpower                   | Flaw                 |
|---------------------------------------------|------------------------------|----------------------|
| [Git](https://git-scm.com/)                 | Distributed, branching magic | Steep learning curve |
| [SVN](https://subversion.apache.org/)       | Centralized simplicity       | No local commits     |
| [Mercurial](https://www.mercurial-scm.org/) | Easier than Git              | Lost the VCS wars    |
| [CVS](https://cvs.nongnu.org/)              | Pioneered versioning         | File-level tracking  |

## Hosting Platforms

This is where the code lives.

| Platform                                                         | Preferred by    | Free Private Repos         | Killer Feature                     |
|------------------------------------------------------------------|-----------------|----------------------------|------------------------------------|
| [GitHub](https://github.com/)                                    | Tech startups   | Yes, up to 3 collaborators | Copilot integration, Actions CI/CD |
| [GitLab](https://gitlab.com/)                                    | Enterprise      | Yes️                       | Built-in DevOps pipeline           |
| [Azure Repos](https://azure.microsoft.com/products/devops/repos) | Microsoft shops | No                         | Azure integration                  |
| [Bitbucket](https://bitbucket.org/)                              | Jira addicts    | Yes                        | Branch permissions                 |

## Git Tips

1. **Git first, code second**: Always `git init` before writing your first line of code.
2. **Console > GUI**. Tools like [GitHub Desktop](https://desktop.github.com/download/) are great, but learn these four commands first:

    ```bash
    git add .
    git commit -m "save point"
    git push
    git checkout -b
    ```

   Why? Because when your IDE's Git plugin mysteriously breaks (it will), you'll need to debug like a pro.
3. **Your team's rules > textbook gitflow**: You might love feature branches, but every company has their own "sacred" workflow. Observe first, then suggest improvements later.