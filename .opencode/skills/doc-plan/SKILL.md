---
name: doc-plan
description: Plan and scaffold new Docusaurus documentation pages from scratch when there is no GitHub commit to drive the content. Generates a structured outline for user approval before writing prose.
license: MIT
compatibility: opencode
metadata:
  audience: authors
  workflow: doc-creation
---

## What I do

- Plan new documentation pages when there is no existing code or commit to scaffold from
- Determine the right category, placement, and `sidebar_position` in `docs/`
- Decide whether the topic calls for code examples, diagrams, file trees, pure prose, or a mix
- Generate a structured outline that follows project conventions
- Wait for your approval before writing the full document

## When to use me

Use this skill when:

- You want to write a conceptual or explanatory doc with no corresponding code changes
- The topic is about architecture, patterns, comparisons, or best practices where diagrams work better than code
- You have an idea for a doc but are not sure how to structure it or where it fits in the sidebar
- A `doc-from-commit` workflow is not applicable because there is no commit to reference

## When NOT to use me

- If you have a GitHub commit that drives the content, use **doc-from-commit** instead
- If you just want to fix a typo or reword a paragraph, prompt naturally without loading this skill

## Instructions

### Step 1: Gather context

1. Read the topic from the user. If it is vague, ask one or two clarifying questions at most:
   - "Is this a hands-on tutorial, a conceptual explanation, or a comparison?"
   - "Do you envision code examples, diagrams, or mostly prose?"
2. Look at the existing `docs/` directory structure. Identify which category the doc belongs in, or whether a new category is needed.
3. Read the `_category_.json` of the target category to understand the label and tone.
4. Read the doc that comes _before_ the proposed position (by `sidebar_position`) to write a natural opening hook.
5. Read the doc that comes _after_ (if any) to avoid overlap.

### Step 2: Determine content strategy

Based on the topic, decide what content types each section will use. Be honest about when code does not make sense.

| Content type                                       | Use when                                                       | Example                                                  |
| -------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------- |
| **Prose**                                          | Explaining concepts, comparing options, giving recommendations | Architecture comparisons, design rationale               |
| **Code block with `<Tabs>`**                       | Showing Java/Kotlin/Groovy variants of implementation          | Controller, service, or config examples                  |
| **Diagram (`<Mermaid>`)**                          | Showing flows, sequences, or architecture overviews            | Request lifecycle, deployment pipeline                   |
| **File tree (`<FileTreeInfo>`)**                   | Introducing files the reader will create or modify             | New module setup, configuration changes                  |
| **Reference link**                                 | Embedding code from GitHub when a commit exists                | ` ``` reference ` blocks (only if a commit URL is known) |
| **Table**                                          | Comparing options side-by-side                                 | Framework comparisons, property mappings                 |
| **Terminal output (`<CodeBlock language="log">`)** | Showing command output or curl results                         | Build logs, API responses                                |
| **Image (`<Image>`)**                              | Screenshots, diagrams that are too complex for Mermaid         | pgAdmin UI, survey charts                                |
| **YouTube embed (`<Youtube>`)**                    | External video explanations                                    | Architecture deep-divos by known creators                |

**Important:** Do not default to code. If the topic is "Hexagonal vs Clean Architecture," diagrams and tables are more valuable than Hello-World code snippets.

### Step 3: Generate the outline

Present a structured outline. Use this exact format:

````
## Doc Plan: {title}

**File:** `docs/{category}/{kebab-case-title}.mdx`
**Spanish translation:** `i18n/es/docusaurus-plugin-content-docs/current/{category}/{kebab-case-title}.mdx`
**Category:** {category} (position {n} of {m})

### Frontmatter
```yaml
---
sidebar_position: {number}
title: {sentence-case title}
description: {one-line summary}
---
````

### Opening hook

{1-2 sentences connecting to the previous doc or orienting the reader}

### Sections

1. **{Heading in sentence case}** (`##`)
   - Content: {prose | code-tabs | diagram | file-tree | table | terminal | image | youtube}
   - Purpose: {what this section achieves}
   - Notes: {any specifics, e.g., "use ASCII art for architecture, not Mermaid"}

2. **{Heading in sentence case}** (`##`)
   ...

### Conclusion strategy

{diagram / curl command / closing paragraph — pick one}

### Component checklist

- [ ] `FileTreeInfo` component file needed: `src/components/docs/{category}/{kebab-case-title}.tsx`
- [ ] Mermaid diagram needed (inline in MDX)
- [ ] Image asset needed: `static/img/...`
- [ ] YouTube embed needed
- [ ] External GitHub reference links needed

```

### Step 4: Wait for approval

Stop here. Ask the user:

> "Does this outline look right? Tell me what to change, or say 'write it' and I'll generate the full doc."

Do not write the `.mdx` file until the user explicitly approves or modifies the outline.

### Step 5: Write the document

Once approved:

1. Load the **writing-style** skill and follow its rules (tone, sentence case, AI-vocabulary avoidance, etc.)
2. Load the **code-style** skill for Docusaurus formatting conventions
3. Write the `.mdx` file to the planned path
4. If a `FileTreeInfo` component is needed, create the `.tsx` companion file first
5. Run `pnpm run format`
6. Report the created files

## Rules

- **One doc at a time.** Do not plan multiple pages in one invocation.
- **Sentence case only** for headings and titles.
- **Do not wrap single-language content in `<Tabs>`.** If a code example is identical across Java/Kotlin/Groovy, show it once as a plain code block.
- **End with a punch.** Every doc needs a conclusion — diagram, curl command, or paragraph. Never trail off after the last code block.
- **Respect the neighbor docs.** The opening should naturally follow from the previous doc in the category.
- **No speculative "next sections will show you X."** Only reference docs that already exist.
- **Spanish path is mandatory.** Even if you don't write the translation now, include the planned path in the outline.
```
