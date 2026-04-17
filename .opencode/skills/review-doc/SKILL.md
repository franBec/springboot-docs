---
name: review-doc
description: Reviews a Docusaurus doc page (MDX + optional TSX companion) against code-style, writing-style, and docusaurus-i18n conventions. Reports findings with severity levels and line numbers.
license: MIT
compatibility: opencode
metadata:
  audience: developers
  workflow: documentation-review
---

## What I do

- Parse a local Docusaurus URL to locate the corresponding MDX and TSX files
- Review the MDX document and its TSX companion (if any) against project conventions
- Report compliance issues with severity levels and line numbers
- Optionally check Spanish translations against i18n guidelines

## When to use me

- After the `/review-doc` command is invoked with a URL
- When you want to audit an existing doc page for style or convention violations
- When reviewing a Spanish translation for i18n compliance

## Instructions

### Step 1: Parse the URL

The user provides a URL like `http://localhost:3000/persistence-integration/query-paginated-results` or `http://localhost:3000/es/persistence-integration/query-paginated-results`.

Extract two things:

1. **Locale**: If the path starts with `/es/`, the locale is `es` (Spanish). Otherwise the locale is `en` (English).
2. **Doc slug**: The remaining path after stripping the locale prefix and the leading slash.

The Docusaurus config uses `routeBasePath: '/'`, so docs live at the root — there is no `/docs/` prefix in the URL.

Examples:

| URL                                                                        | Locale | Slug                                              |
| -------------------------------------------------------------------------- | ------ | ------------------------------------------------- |
| `http://localhost:3000/persistence-integration/query-paginated-results`    | `en`   | `persistence-integration/query-paginated-results` |
| `http://localhost:3000/es/persistence-integration/query-paginated-results` | `es`   | `persistence-integration/query-paginated-results` |
| `http://localhost:3000/intro`                                              | `en`   | `intro`                                           |
| `http://localhost:3000/es/intro`                                           | `es`   | `intro`                                           |

If the URL was not provided, ask the user for it before proceeding.

### Step 2: Map to file paths

Determine the file paths to review based on the locale and slug:

| File          | English path                     | Spanish path                                                |
| ------------- | -------------------------------- | ----------------------------------------------------------- |
| MDX doc       | `docs/{slug}.mdx`                | `i18n/es/docusaurus-plugin-content-docs/current/{slug}.mdx` |
| TSX companion | `src/components/docs/{slug}.tsx` | Same TSX file (shared across locales)                       |

Read all files that exist. The TSX companion is optional — not every doc has one.

If the MDX file does not exist, report the error and stop. Suggest checking the URL or listing available docs with `ls docs/`.

### Step 3: Load relevant skills

1. Always load the **code-style** skill
2. Always load the **writing-style** skill
3. If the locale is `es`, also load the **docusaurus-i18n** skill

Read the full content of each skill file before proceeding to the review steps.

> **Note on indentation**: Do not spend significant effort checking indentation issues. Prettier (`pnpm run format`) already enforces formatting rules. Treat indentation checks as low-priority `[WARN]` at most.

### Step 4: Review — Code Style

Check both the MDX and TSX files (if it exists) against the rules in the **code-style** skill. Go through each check below and record a result for every one.

#### Imports (MDX and TSX)

- [ ] No `import React from 'react'` — named imports only (`import { useState } from 'react'`)
- [ ] Docusaurus theme components use `@theme/` imports (`CodeBlock`, `Tabs`, `TabItem`, `Mermaid`, `Admonition`, `Heading`, `Translate`)
- [ ] Project components use `@site/src/components/` or `@site/src/components/docs/` paths
- [ ] i18n imports use `@docusaurus/Translate` when applicable
- [ ] Imports grouped logically: React/Docusaurus builtins first, then `@theme/`, then `@site/` local

#### Component Patterns (TSX only)

- [ ] Named function exports (`export default function ComponentName()` or `export const ComponentName = () => ()`)
- [ ] Props interfaces defined immediately above the component that uses them
- [ ] No comments in code (unless explicitly asked)

#### Frontmatter (MDX only)

- [ ] Includes `sidebar_position` (number)
- [ ] Includes `title` (string)

#### Docusaurus Components (MDX and TSX)

- [ ] `Tabs` uses `groupId="language" queryString` when presenting Java/Kotlin/Groovy variations
- [ ] Java tab has the `default` attribute
- [ ] `Mermaid` is wrapped in `<ZoomContainer>`
- [ ] Code blocks use `<CodeBlock>` with correct `language` and `title` props
- [ ] Terminal output uses `<CodeBlock language="log" title="Terminal">`
- [ ] JSON samples use `<CodeBlock language="json">`
- [ ] File trees use `<CodeBlock language="log" title="File Tree">` wrapped in `<FileTreeInfo>`

#### Code Snippets (MDX only)

- [ ] GitHub code references use the `reference` meta keyword in fenced code blocks
- [ ] Line ranges use `#L5` for single lines or `#L44-L61` for ranges

#### TabItem Indentation (MDX only)

- [ ] _(Low priority — Prettier handles indentation automatically)_ Content inside `<TabItem>` is indented with 4 spaces

#### Images (MDX only)

- [ ] Images use the `<Image>` component from `@site/src/components/image` instead of raw `<img>`

#### Highlight Markers (TSX only)

- [ ] `// highlight-added`, `// highlight-removed`, `// highlight-modified` used on files, not folders

### Step 5: Review — Writing Style

Check the MDX content against the rules in the **writing-style** skill. Go through each check and record a result.

#### Document Structure

- [ ] **Opening paragraph**: 1-2 sentences that orient the reader and connect to what came before (e.g., "In the previous document...")
- [ ] **Files Overview**: Present early (after opening, before main content) using `FileTreeInfo` component from a separate TSX file — not inline
- [ ] **Document conclusion**: Ends with one of: a Mermaid diagram, a terminal curl command, or a brief closing paragraph. Does not end abruptly after a code block.

#### Language Tabs Usage

- [ ] Tabs only used when content differs across languages (Java/Kotlin/Groovy)
- [ ] No tabs wrapping identical content across all variants
- [ ] No tabs when only one language applies

#### Code References

- [ ] No 400+ line files inlined — only relevant sections shown, or changes described in prose

#### Heading Capitalization

- [ ] All headings use sentence case (only first word and proper nouns capitalized)
- [ ] No title case headings like "Setting Up The Database" — should be "Setting up the database"
- [ ] Frontmatter `title` also uses sentence case

#### AI Writing Patterns — check every one of these

- [ ] **AI vocabulary**: No words from the flagged lists (additionally, boasts, bolstered, crucial, delve, emphasizing, enduring, garner, intricate, interplay, key as adjective, landscape as abstract noun, meticulous, pivotal, showcase, tapestry, testament, underscore, valuable, vibrant, align with, enhance, fostering, highlighting, showcasing)
- [ ] **Copula avoidance**: No "serves as", "acts as", "represents", "stands as", "boasts" where "is"/"has" works
- [ ] **Negative parallelisms**: No "Not just X, but also Y" or "It is not X, it is Y" constructions
- [ ] **Rule of three padding**: No padding to hit exactly three items when fewer would do
- [ ] **Elegant variation**: Same technical term used consistently (not cycling through synonyms)
- [ ] **Puffery**: No "crucial role", "game-changer", "is a testament to", "underscores the importance of", "serves as a reminder that", "reflects broader trends in", "setting the stage for", "marks a shift toward"
- [ ] **Promotional language**: No "nestled in the heart of", "vibrant community", "boasts", "rich tapestry"
- [ ] **Em dash overuse**: No more than one em dash per paragraph; commas, colons, or periods preferred
- [ ] **Bold overuse**: Terms bolded only once when defined, not on every occurrence
- [ ] **Outline-like conclusions**: No mid-section summaries listing challenges and future prospects
- [ ] **Present participle analysis**: No "highlighting the importance of", "emphasizing the need for", "reflecting broader trends in"
- [ ] **Emoji**: No emoji in headings or bullet points

### Step 6: Review — i18n (Spanish only)

If the locale is `es`, check the Spanish MDX file against the rules in the **docusaurus-i18n** skill. Skip this step entirely for English documents.

- [ ] **Tone**: Uses "vos" form consistently; senior dev mentor voice in Spanish
- [ ] **Argentine/Latin American expressions**: Welcome but kept accessible
- [ ] **Prose/headings translated**: All prose, headings, explanations, callouts are in Spanish
- [ ] **Code stays English**: Code examples, comments within code, file paths, and technical terms without Spanish equivalent remain in English
- [ ] **Frontmatter**: `title` translated; `sidebar_position` kept as-is
- [ ] **Components preserved**: All Docusaurus component syntax intact (`<Admonition>`, `<Tabs>`, etc.)
- [ ] **Admonition titles translated**, but `type` values (`tip`, `warning`, etc.) kept in English
- [ ] **Links**: Spanish doc links point to `/es/` prefix, not `/docs/`
- [ ] **Spanish heading capitalization**: Only the first word and proper nouns (Spring Boot, Java, etc.) are capitalized — no English Title Case applied to Spanish
- [ ] **Translation drift**: Compare the Spanish MDX against the English `docs/{slug}.mdx` counterpart — flag missing sections, added sections, outdated code examples, or structural differences that suggest the translation has drifted from the original

### Step 7: Report findings

Present a structured review report. For each check, use one of three severity levels:

| Level    | Meaning                                                |
| -------- | ------------------------------------------------------ |
| `[PASS]` | The check passes — no issues found                     |
| `[FAIL]` | A clear violation that should be fixed                 |
| `[WARN]` | A potential issue or borderline case worth considering |

Format:

```
## Review: {slug} ({locale})

### Code Style
- [PASS] Frontmatter includes sidebar_position and title
- [FAIL] Line 12: `import React from 'react'` — use named imports only
- [WARN] Line 45: Mermaid not wrapped in ZoomContainer
...

### Writing Style
- [PASS] Opening paragraph connects to previous doc
- [FAIL] Line 88: Heading "Setting Up The Database" uses title case — use sentence case: "Setting up the database"
- [WARN] Line 134: "This feature empowers developers" — puffery, consider: "This feature lets you skip boilerplate"
...

### i18n (Spanish)
- [PASS] Uses vos form consistently
- [FAIL] Line 20: Heading "Introducción A Spring Boot" — only first word should be capitalized: "Introducción a Spring Boot"
...
```

Include line numbers wherever possible. If a check spans multiple lines, reference the first relevant line.

After listing all checks, provide a summary:

```
### Summary
- Code Style: {x} PASS, {y} FAIL, {z} WARN
- Writing Style: {x} PASS, {y} FAIL, {z} WARN
- i18n: {x} PASS, {y} FAIL, {z} WARN  (only if Spanish)
```

Do not automatically fix any issues. The report is informational — the user decides what to address.
