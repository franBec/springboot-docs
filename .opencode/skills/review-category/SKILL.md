---
name: review-category
description: Reviews a Docusaurus category label and generated-index description against writing-style, code-style, and i18n conventions. Reports findings with severity levels and line numbers.
license: MIT
compatibility: opencode
metadata:
  audience: developers
  workflow: category-review
---

## What I do

- Parse a local Docusaurus category URL to locate the corresponding `_category_.json` file
- Review the category label and description against project writing and style conventions
- Verify that the description accurately reflects the documents it indexes
- Optionally check Spanish translations against i18n guidelines
- Report compliance issues with severity levels and line numbers

## When to use me

- After the `/review-category` command is invoked with a URL
- When you want to audit a category page for label or description quality
- When reviewing a Spanish category translation for i18n compliance

## Instructions

### Step 1: Parse the URL

The user provides a URL like `http://localhost:3000/category/prior-recommended-knowledge` or `http://localhost:3000/es/category/prior-recommended-knowledge/big-picture`.

Extract two things:

1. **Locale**: If the path starts with `/es/`, the locale is `es` (Spanish). Otherwise the locale is `en` (English).
2. **Category path**: The path segment(s) after `/category/`. This corresponds to the directory path inside `docs/`.

The Docusaurus config uses `routeBasePath: '/'`, so category pages use the `/category/` prefix in the URL.

Examples:

| URL                                                                      | Locale | Category path                             |
| ------------------------------------------------------------------------ | ------ | ----------------------------------------- |
| `http://localhost:3000/category/prior-recommended-knowledge`             | `en`   | `prior-recommended-knowledge`             |
| `http://localhost:3000/es/category/prior-recommended-knowledge`          | `es`   | `prior-recommended-knowledge`             |
| `http://localhost:3000/category/prior-recommended-knowledge/big-picture` | `en`   | `prior-recommended-knowledge/big-picture` |
| `http://localhost:3000/es/category/prior-recommended-knowledge/jvm`      | `es`   | `prior-recommended-knowledge/jvm`         |

If the URL was not provided, ask the user for it before proceeding.

### Step 2: Map to file paths

Determine the file paths based on the category path:

| File              | English path                          | Spanish path                                          |
| ----------------- | ------------------------------------- | ----------------------------------------------------- |
| Category JSON     | `docs/{categoryPath}/_category_.json` | Same JSON file (shared across locales)                |
| i18n translations | N/A                                   | `i18n/es/docusaurus-plugin-content-docs/current.json` |

Read the `_category_.json` file. If it does not exist, report the error and stop. Suggest checking the URL or listing available categories.

If the locale is `es`, also read `i18n/es/docusaurus-plugin-content-docs/current.json` to find the corresponding Spanish translations.

The translation keys follow these patterns:

- Label: `sidebar.tutorialSidebar.category.{English Label}`
- Description: `sidebar.tutorialSidebar.category.{English Label}.link.generated-index.description`

### Step 3: Load relevant skills

1. Always load the **writing-style** skill
2. Always load the **code-style** skill (for Docusaurus formatting conventions)
3. If the locale is `es`, also load the **docusaurus-i18n** skill

Read the full content of each skill file before proceeding to the review steps.

### Step 4: Review the label

Check the `label` field from `_category_.json` against the rules below.

#### Sentence case

- [ ] The label uses **sentence case**: only the first word and proper nouns are capitalized (Spring Boot, Java, Kotlin, Groovy, JVM, H2, PostgreSQL, OpenAPI)
- [ ] No title case labels like "Cross-Cutting Concerns" — should be "Cross-cutting concerns" (unless "Cross-Cutting" is treated as a compound proper noun the project has decided to retain)
- [ ] Short prepositions, conjunctions, and articles (for, and, in, the, a, of) in the middle of the label are lowercase unless following the sentence-case rule

#### AI vocabulary

- [ ] No words from the AI vocabulary flagged lists (additionally, boasts, bolstered, crucial, delve, emphasizing, enduring, garner, intricate, interplay, key as adjective, landscape as abstract noun, meticulous, pivotal, showcase, tapestry, testament, underscore, valuable, vibrant, align with, enhance, fostering, highlighting, showcasing)
- [ ] No copula avoidance ("serves as", "acts as", "represents", "stands as", "boasts") where simpler wording works
- [ ] No puffery or significance language ("crucial role", "game-changer", "is a testament to")

### Step 5: Review the description

Check the `description` field from `_category_.json` against the rules below.

#### Length

- [ ] The description is **one to three sentences**. If it exceeds three sentences, flag it as `[FAIL]`.

#### Tone and voice

- [ ] The description uses a **pragmatic, conversational "senior dev mentor" tone** — not a textbook or sales pitch
- [ ] No purple prose or grandiose language
- [ ] Direct and concise — can any word be removed without losing meaning?
- [ ] The description orients the reader about what they will find, not why it is "important" or "crucial"

#### AI writing patterns — check every one of these

- [ ] **AI vocabulary**: No words from the flagged lists (additionally, boasts, bolstered, crucial, delve, emphasizing, enduring, garner, intricate, interplay, key as adjective, landscape as abstract noun, meticulous, pivotal, showcase, tapestry, testament, underscore, valuable, vibrant, align with, enhance, fostering, highlighting, showcasing)
- [ ] **Copula avoidance**: No "serves as", "acts as", "represents", "stands as", "boasts" where "is"/"has" works
- [ ] **Negative parallelisms**: No "Not just X, but also Y" or "It is not X, it is Y" constructions
- [ ] **Rule of three padding**: No padding to hit exactly three items when fewer would do
- [ ] **Elegant variation**: Same technical term used consistently
- [ ] **Puffery**: No "crucial role", "game-changer", "is a testament to", "underscores the importance of", "serves as a reminder that", "reflects broader trends in", "setting the stage for", "marks a shift toward"
- [ ] **Promotional language**: No "nestled in the heart of", "vibrant community", "boasts", "rich tapestry"
- [ ] **Em dash overuse**: No more than one em dash in the description; commas, colons, or periods preferred
- [ ] **Present participle analysis**: No "highlighting the importance of", "emphasizing the need for", "reflecting broader trends in"
- [ ] **Emoji**: No emoji in the description

#### Content relevance

- [ ] The description **accurately reflects the documents** contained in the category. To check this, read the frontmatter (`title` and `sidebar_position`) of each `.mdx`/`.md` file in the category directory and verify the description covers what those docs are about.
- [ ] The description is **not generic** — it should be specific enough that a reader can tell what the section covers. Descriptions like "Learn about X" or "Explore Y" without substance should be flagged as `[WARN]`.

### Step 6: Review i18n (Spanish only)

If the locale is `es`, check the Spanish translations in `i18n/es/docusaurus-plugin-content-docs/current.json` against the rules in the **docusaurus-i18n** skill. Skip this step entirely for English reviews.

- [ ] **Translation exists**: The `sidebar.tutorialSidebar.category.{English Label}` key exists in the Spanish JSON file
- [ ] **Description translation exists**: The `sidebar.tutorialSidebar.category.{English Label}.link.generated-index.description` key exists in the Spanish JSON file
- [ ] **Tone**: Uses "vos" form consistently; senior dev mentor voice in Spanish
- [ ] **Argentine/Latin American expressions**: Welcome but kept accessible
- [ ] **Spanish heading capitalization**: Only the first word and proper nouns (Spring Boot, Java, etc.) are capitalized — no English Title Case applied to Spanish
- [ ] **Translation drift**: The Spanish description matches the intent of the English description without missing or added meaning

### Step 7: Report findings

Present a structured review report. For each check, use one of three severity levels:

| Level    | Meaning                                                |
| -------- | ------------------------------------------------------ |
| `[PASS]` | The check passes — no issues found                     |
| `[FAIL]` | A clear violation that should be fixed                 |
| `[WARN]` | A potential issue or borderline case worth considering |

Format:

```
## Review: {category path} ({locale})

### Label: "{label}"
- [PASS] Label uses sentence case
- [FAIL] Label "Cross-Cutting Concerns" uses title case — consider: "Cross-cutting concerns"
- [WARN] Label contains proper noun "JVM" — this is acceptable in sentence case
...

### Description: "{description}"
- [PASS] Description is 2 sentences (within 1-3 range)
- [FAIL] Description contains "crucial" — flagged AI vocabulary; rewrite without it
- [WARN] Description is generic ("Learn about X") — consider making it more specific to the documents in this category
...

### i18n (Spanish)
- [PASS] Translation exists for label
- [FAIL] Spanish label "Conceptos Fundamentales" — description translation is missing
...
```

Include the specific text being reviewed. Where a check spans multiple words, reference the relevant word or phrase.

After listing all checks, provide a summary:

```
### Summary
- Label: {x} PASS, {y} FAIL, {z} WARN
- Description: {x} PASS, {y} FAIL, {z} WARN
- i18n: {x} PASS, {y} FAIL, {z} WARN  (only if Spanish)
```

Do not automatically fix any issues. The report is informational — the user decides what to address.
