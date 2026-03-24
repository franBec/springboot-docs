---
name: writing-style
description: Guidelines for creating documentation with a pragmatic senior developer mentor tone and voice. Covers Docusaurus formatting, document structure (openings, file trees, conclusions), heading capitalization, code reference handling, and writing patterns to avoid.
license: MIT
compatibility: opencode
metadata:
  type: conventions
---

## What I do

- Enforce a pragmatic, conversational "senior dev mentor" tone across all documentation
- Enforce Docusaurus Markdown/MDX formatting conventions for headings, frontmatter, and structure
- Enforce document structure: opening paragraphs, file tree overviews, and meaningful conclusions
- Flag and rewrite AI-sounding writing patterns to keep docs human and approachable
- Enforce heading capitalization rules (sentence case, not title case)
- Guide code reference decisions (when to inline, when to describe, when to show sections)

## When to use me

- When creating or editing `.md` or `.mdx` documentation files in the `docs/` directory
- When reviewing draft documentation for tone, voice, or formatting issues
- When converting rough notes or AI-generated drafts into polished documentation
- When deciding how to present file changes, code references, or multi-language content

## Instructions

### Tone and Voice

Write like a patient senior developer sitting next to the reader, not like a textbook:

- **Direct and conversational.** Use "you" and "we" freely. Prefer short sentences. It is fine to start sentences with "And" or "But" when it reads naturally.
- **No purple prose.** Skip grandiose language. The reader came here to ship code, not to be told that a framework "empowers developers to unlock the full potential of" something.
- **Opinionated but honest.** State what we recommend and why. When there are trade-offs, name them. Do not pretend every choice is equally valid.
- **Assume competence, not familiarity.** The reader knows Java/OOP but has not built an API yet. Do not explain what a class is. Do explain anything Spring Boot-specific that is not obvious.
- **Show, do not tell.** Every concept gets a code example. Do not write a paragraph describing what code does when a snippet plus a one-liner will do.

### Document Openings

Every document should start with a brief introductory paragraph — one or two sentences that orient the reader. This paragraph should convey what the document covers and connect it to what came before.

Phrases like "In the previous document" work well and can be varied (e.g., "Last time," "Previously," "Building on what we set up"). The goal is to give the reader a quick anchor before diving into details.

Example:

> In the [previous document](./reverse-engineering-jpa-entities) we set up build-time entity generation from the Sakila schema. This document wires those entities into the hexagonal architecture so the app can query the database.

### Files Overview

When a document involves creating or modifying files, add a "Files Overview" section early (after the opening paragraph, before the main content). Use the `FileTreeInfo` component from `src/components/file-tree-info.tsx` to present the file tree.

The file tree must live in a separate `.tsx` file — not inline in the `.mdx`. Place it under `src/components/docs/<section>/<doc-name>.tsx` and export a `FileTree` component. Then import and render it in the `.mdx`:

```tsx
// src/components/docs/persistence-integration/database-setup.tsx
import CodeBlock from '@theme/CodeBlock';
import { FileTreeInfo } from '@site/src/components/file-tree-info';

export const FileTree = () => (
  <FileTreeInfo>
    <CodeBlock language="log" title="File Tree">{`
springboot-demo-projects/
├── build.gradle
└── src/
    └── ...
    `}</CodeBlock>
  </FileTreeInfo>
);
```

```mdx
// docs/persistence-integration/database-setup.mdx
import { FileTree } from '@site/src/components/docs/persistence-integration/database-setup';

<FileTree />
```

Use `// highlight-added-start`, `// highlight-added-end`, and `// highlight-modified` comments to mark new and changed files in the tree. Apply these comments to **files or groups of files**, not to folders. Highlighting folders adds noise and makes it unclear which specific files changed.

### Code References

When referencing code, consider the size of the file being referenced:

- **Under ~400 lines**: inline the full file or relevant sections as code blocks.
- **400+ lines**: do not reference the entire file. Instead:
  - Show only the relevant section(s) with a comment like `// ... rest of the file unchanged` for omitted parts.
  - Or describe what the code does and what changed in a sentence or two, without including the full file.
  - Never dump a 400+ line file into a document. The reader will skip it anyway.

### Language Tabs

The project supports three JVM languages (Java, Kotlin, Groovy). Use `<Tabs groupId="language" queryString>` when content differs across all three (or two) languages. However, when something only applies to **one** language, skip the tabs entirely — just show the reference directly. Wrapping a single-language snippet in tabs adds indirection with no benefit.

Example — don't do this:

```mdx
<Tabs groupId="language" queryString>
<TabItem value="java">
<!-- Only Java content here, identical across tabs -->
</TabItem>
<TabItem value="kotlin">
<!-- Same content, no difference -->
</TabItem>
</Tabs>
```

Instead, just write the content directly.

#### Identical code across projects

The same rule applies when code is identical across projects (not just languages). This happens frequently with YAML files, Gradle build scripts, and similar config — the content is the same whether it lives in the Java, Kotlin, or Groovy project.

When the code referenced from GitHub is **exactly the same** across projects, do **not** wrap it in `<Tabs>` + `<TabItem>` with separate GitHub references. Instead, inline the relevant code directly as a plain code block. Tabs that show identical content under different labels add click overhead with zero informational value.

### Document Conclusions

Never end a document abruptly after the last code block or technical step. Every document should close with a conclusion that gives the reader a tangible sense of what was accomplished. Pick the most fitting format:

- **A Mermaid sequence or flow diagram** summarizing the flow just built (wrapped in `<ZoomContainer><Mermaid .../></ZoomContainer>`).
- **A terminal `curl` command** (or similar) that exercises the endpoint/feature just created, giving the reader a quick "try it now" moment.
- **A brief closing paragraph** stating what was achieved and what's next (e.g., "We now have a paginated films endpoint. Next, we'll add query parameters for filtering.").

Pick one format — don't pile all three. The conclusion should feel like a natural wrap-up, not a summary list.

### Heading Capitalization

Use **sentence case** for all headings, not title case:

```mdx
---
sidebar_position: 3
title: Creating your first controller
---
```

```mdx
## Setting up the database
```

```mdx
### Why hexagonal architecture matters
```

Only the first word and proper nouns (Spring Boot, Java, Kotlin, Groovy, H2, PostgreSQL) are capitalized.

Do not use title case:

| Title case (avoid)             | Sentence case (use)            |
| ------------------------------ | ------------------------------ |
| Creating Your First Controller | Creating your first controller |
| Setting Up The Database        | Setting up the database        |
| Running The Application        | Running the application        |

### Docusaurus Formatting Rules

- Every `.md` or `.mdx` file must include `sidebar_position` and `title` in frontmatter.
- Code examples use `<Tabs groupId="language" queryString>` with `default` on the Java tab — but only when content differs across languages. See the Language Tabs rule above.
- Sequence diagrams are wrapped in `<ZoomContainer><Mermaid .../></ZoomContainer>`.
- Terminal output uses `<CodeBlock language="log" title="Terminal">`.
- Do not modify `sidebars.ts` — it autogenerates from the `docs/` directory.

### Writing Patterns to Avoid

The patterns below are adapted from research on AI-generated writing ([Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)). Train yourself to spot and eliminate them. When one or two appear, rewrite.

#### AI vocabulary overload

LLMs overuse certain words that signal "machine wrote this." If you catch yourself reaching for any of the following, pick a plainer word or cut the phrase entirely:

- **2023–mid 2024 era (still common in output):** additionally, boasts, bolstered, crucial, delve, emphasizing, enduring, garner, intricate/intricacies, interplay, key (as adjective), landscape (as abstract noun), meticulous/meticulously, pivotal, showcase, tapestry, testament, underscore, valuable, vibrant
- **Mid 2024–mid 2025 era:** align with, bolstered, crucial, emphasizing, enhance, enduring, fostering, highlighting, pivotal, showcasing, underscore, vibrant
- **Mid 2025 onward:** emphasizing, enhance, highlighting, showcasing (plus notability/significance language)

**Examples of rewrites:**

| Avoid                                                           | Use                                                         |
| --------------------------------------------------------------- | ----------------------------------------------------------- |
| "Spring Boot underscores the importance of configuration"       | "Spring Boot forces you to be explicit about configuration" |
| "This section delves into dependency injection"                 | "This section covers dependency injection"                  |
| "A pivotal moment in the evolving landscape of Java frameworks" | "Java frameworks changed how we build apps"                 |
| "Showcasing its robust error handling"                          | "Showing how error handling works"                          |

#### Avoiding "is"/"are" (copula avoidance)

LLMs swap simple "is"/"are" constructions for inflated phrases like _serves as_, _acts as_, _represents_, _stands as_, or _boasts_. Prefer the plain form.

| Avoid                                                 | Use                                            |
| ----------------------------------------------------- | ---------------------------------------------- |
| "The `@RestController` annotation serves as a marker" | "The `@RestController` annotation is a marker" |
| "This class represents the main entry point"          | "This class is the main entry point"           |
| "The application boasts a layered architecture"       | "The application has a layered architecture"   |

#### Negative parallelisms

LLMs love "Not just X, but also Y" and "It is not X, it is Y" constructions. They sound dramatic but add no information. Pick one point and make it directly.

| Avoid                                                       | Use                                                |
| ----------------------------------------------------------- | -------------------------------------------------- |
| "Spring Boot is not just a framework, but a paradigm shift" | "Spring Boot changes how you build apps"           |
| "It's not just about configuration — it's about convention" | "Spring Boot favors convention over configuration" |

#### Rule of three

LLMs default to listing exactly three adjectives, three phrases, or three items to sound comprehensive. If three items genuinely belong, keep them. If you are padding to hit three, cut.

| Avoid                                                                                   | Use                                                                    |
| --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| "Fast, reliable, and secure microservices"                                              | "Fast, reliable microservices"                                         |
| "We will cover configuration, dependency injection, and error handling in this section" | "We will cover configuration and dependency injection in this section" |

#### Elegant variation

LLMs avoid repeating a word by cycling through synonyms. In technical docs, **consistency beats variety**. If you called it a "controller" on line 1, call it a "controller" on line 20 — not "endpoint handler," "request mapper," or "API gateway."

#### Puffery and significance language

Do not tell the reader that something is important, significant, crucial, pivotal, or a game-changer. Show why it matters with a concrete fact or example instead.

| Avoid                                                       | Use                                                                   |
| ----------------------------------------------------------- | --------------------------------------------------------------------- |
| "Dependency injection plays a crucial role in Spring"       | "Spring uses dependency injection to wire your beans — here is how"   |
| "Spring Boot has left an enduring mark on Java development" | "Spring Boot is the most-used Java framework (2024 JetBrains survey)" |
| "This powerful feature empowers developers"                 | "This feature lets you skip boilerplate"                              |

Avoid phrases like _is a testament to_, _underscores the importance of_, _serves as a reminder that_, _reflects broader trends in_, _setting the stage for_, _marks a shift toward_.

#### Promotional and travel-guide language

Do not write like a sales page or tourism brochure:

| Avoid                                          | Use                                  |
| ---------------------------------------------- | ------------------------------------ |
| "Nestled in the heart of the Spring ecosystem" | "Built into Spring"                  |
| "A vibrant community of developers"            | "An active community"                |
| "Spring Boot boasts auto-configuration"        | "Spring Boot has auto-configuration" |
| "A rich tapestry of features"                  | "A set of features"                  |

#### Overuse of em dashes

Em dashes (—) have a place, but LLMs use them far more often than humans do, often where a comma, colon, or period would be clearer. Prefer commas, colons, or separate sentences. If you use more than one em dash per paragraph, rewrite.

| Avoid                                                                                                       | Use                                                                                                |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| "Spring Boot auto-configures your app — meaning you write less code — and still lets you override defaults" | "Spring Boot auto-configures your app so you write less code, and you can still override defaults" |

#### Overuse of boldface

Bold a term **once** when you define it. Do not bold every occurrence, and do not bold "key takeaways" in running prose. If you feel the urge to bold more than one or two terms per paragraph, the paragraph likely needs structural rewriting instead.

#### Outline-like conclusions

LLMs tend to close sections with summary paragraphs listing challenges and future prospects: "While X presents challenges, it also offers opportunities. As the landscape continues to evolve, Y will remain essential." Do not write these. End sections at the last useful fact or example — no summaries needed in the middle of a tutorial. (For document-level endings, see the Document Conclusions rule above — those should give the reader a tangible sense of what was accomplished, not a vague recap.)

#### Superficial analysis with present participles

LLMs attach "-ing" phrases that sound analytical but say nothing: "highlighting the importance of," "emphasizing the need for," "reflecting broader trends in." Delete these clauses or replace them with a concrete statement.

| Avoid                                                                                                | Use                                                               |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| "Auto-configuration reduces boilerplate, highlighting Spring Boot's focus on developer productivity" | "Auto-configuration reduces boilerplate"                          |
| "The annotation scans your packages, ensuring all components are registered"                         | "The annotation scans your packages and registers all components" |

#### Emoji in headings or bullets

Do not decorate headings or bullet points with emoji. This is a documentation site, not a slide deck.

### Quick Self-Check

Before finalizing any doc page, re-read it and ask:

1. **Would I say this out loud to a junior dev sitting next to me?** If it sounds like a press release, rewrite it.
2. **Can I cut any word from this sentence without losing meaning?** If yes, cut it.
3. **Am I telling the reader something is important, or showing them?** Show, do not tell.
4. **Do I see any words from the AI vocabulary list?** Replace or remove them.
5. **Does any sentence use an em dash where a comma or period would work?** Swap it.
6. **Does the document open with a brief orienting paragraph?** If it jumps straight into a heading, add one or two sentences.
7. **Does the document end with a conclusion?** If it trails off after a code block, wrap up with a diagram, curl, or brief paragraph.
8. **Am I inlining a 400+ line file?** Show only the relevant section or describe the change instead.
9. **Am I wrapping single-language content in Tabs?** If only one language applies, remove the tabs.
