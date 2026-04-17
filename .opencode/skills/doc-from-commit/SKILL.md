---
name: doc-from-commit
description: Creates a new Docusaurus documentation page from a topic and one or more GitHub commit links. Fetches commit diffs, analyzes the changes, and generates a polished .mdx file following the project's writing and code style conventions.
license: MIT
compatibility: opencode
metadata:
  audience: developers
  workflow: documentation-creation
---

## What I do

- Fetch commit data and diffs from GitHub commit URLs using `gh api`
- Analyze the code changes to understand what was added, modified, or removed
- Generate a complete Docusaurus `.mdx` documentation page that explains the topic
- Follow the project's writing-style, code-style, and docusaurus-i18n conventions
- Place the file in the correct `docs/` subdirectory with proper frontmatter

## When to use me

Use me when the user provides a topic and GitHub commit link(s) and wants to create a new documentation page. Trigger phrases:

- "Create a doc from these commits"
- "Write documentation for this change"
- "Make a doc page about X based on commit Y"
- After the `/doc-from-commit` command is invoked

## Instructions

### Step 1: Parse the Input

The user provides:

- **Topic**: What the documentation page is about (e.g., "Error Handling", "Database Setup")
- **Commit URL(s)**: One or more GitHub commit URLs in the format `https://github.com/<owner>/<repo>/commit/<sha>`

If the topic or commit URLs are missing, ask the user for them before proceeding.

### Step 2: Fetch Commit Data

For each commit URL, extract the owner, repo, and SHA. Then fetch:

1. **Commit metadata** using: `gh api repos/<owner>/<repo>/commits/<sha>` to get the commit message, author, date, and list of changed files.

2. **The diff/patch** using: `gh api repos/<owner>/<repo>/commits/<sha> --jq '.files[] | {filename, status, patch}'` to get the actual code changes.

3. If the commit references a pull request, also fetch the PR description for additional context: `gh api repos/<owner>/<repo>/pulls/<number>`

If a commit URL is invalid or the API call fails, report the error to the user and continue with the remaining commits.

### Step 3: Analyze the Changes

After gathering all commit data:

- Identify the key code changes (new classes, modified methods, configuration changes, etc.)
- Determine the Spring Boot concepts involved (annotations, patterns, dependencies)
- Note which language variants are present (Java, Kotlin, Groovy)
- Identify any new dependencies, configuration properties, or structural patterns

### Step 4: Determine File Placement

Based on the topic, choose the appropriate subdirectory under `docs/`. Current sections:

- `docs/about/` - About the project/author/license
- `docs/cross-cutting-concerns/` - Error handling, logs, mapping
- `docs/deployment/` - VPS deployment, observability, dependabot
- `docs/intro.mdx` - Project intro (single file)
- `docs/lets-create-a-spring-boot-project/` - Project setup, first endpoint, running the app
- `docs/openapi-spec-first-development/` - OpenAPI spec and generator
- `docs/persistence-integration/` - Database setup, JPA, reverse engineering
- `docs/prior-recommended-knowledge/` - Prerequisites (architecture, JVM, dev env, etc.)
- `docs/spring-boot-in-a-nutshell/` - Core Spring concepts, IoC, project structure
- `docs/testing/` - Testing strategies, frameworks, first tests

If no existing section fits, ask the user where to place it. You can also suggest creating a new section if warranted.

### Step 5: Load Project Skills

Before writing, load these skills to ensure consistency:

1. Load the **writing-style** skill to follow tone, voice, and anti-AI-writing-pattern rules
2. Load the **code-style** skill to follow Docusaurus MDX formatting, component imports, and code block conventions
3. If the user requests a Spanish translation, load the **docusaurus-i18n** skill

### Step 6: Generate the Documentation Page

Write the `.mdx` file following these conventions:

**Frontmatter:**

```yaml
---
sidebar_position: <appropriate number based on existing files in the directory>
title: <Sentence case title matching the topic>
---
```

**Imports:** Use only the components needed for the content:

- `GithubCommitsInfo` from `@site/src/components/github-commits-info` if relevant commit(s) exist
- `Tabs` from `@theme/Tabs` and `TabItem` from `@theme/TabItem` for multi-language code
- `CodeBlock` from `@theme/CodeBlock` for terminal output
- `Image` from `@site/src/components/image` for images
- `Admonition` from `@theme/Admonition` for callouts
- Custom snippet components from `@site/src/components/docs/<section>/` if needed

**Code references from commits:**

Use the `reference` meta keyword in fenced code blocks to fetch live code from the repo:

````markdown
```java reference title="descriptive-title.java"
https://raw.githubusercontent.com/<owner>/<repo>/<commit-sha>/path/to/file.java
```
````

Support line ranges with `#L5` for single lines or `#L44-L61` for ranges.

**Language tabs:** When showing code for Java, Kotlin, and Groovy variants, use:

```mdx
<Tabs groupId="language" queryString>
  <TabItem value="java" label="Java" default>
    ...
  </TabItem>
  <TabItem value="kotlin" label="Kotlin">
    ...
  </TabItem>
  <TabItem value="groovy" label="Groovy">
    ...
  </TabItem>
</Tabs>
```

**Content structure:**

1. Start with a brief introduction (1-3 sentences) explaining what this page covers and why it matters
2. Use `##` headings for major sections, `###` for subsections
3. Use sentence case for all headings
4. Every concept gets a code example
5. Use practical, concrete examples drawn from the actual commit changes
6. End at the last useful fact or example (no summary paragraphs)

### Step 7: Ask for Feedback

After generating the initial draft:

1. Show the user the file path and a brief summary of what was created
2. Ask if they want to adjust the tone, add/remove sections, change the sidebar position, or generate the Spanish translation
3. If the user approves, offer to run `pnpm run format` on the new file

### Step 8: Optional Spanish Translation

If the user wants an Spanish version:

1. Load the **docusaurus-i18n** skill
2. Create the translation at `i18n/es/docusaurus-plugin-content-docs/current/<same-path-as-english-file>`
3. Follow the i18n skill's guidelines for tone ("vos" form) and formatting
