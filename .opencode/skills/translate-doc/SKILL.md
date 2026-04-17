---
name: translate-doc
description: Translates a Docusaurus doc page from English to a target locale. Reads the English source, applies locale-specific translation rules, and writes the translated file to the correct i18n directory.
license: MIT
compatibility: opencode
metadata:
  audience: translators
  workflow: translation
---

## What I do

- Parse a local Docusaurus URL and a target locale code to locate the English source document
- Validate the locale against the project's i18n configuration
- Translate the document following locale-specific tone, capitalization, and formatting rules
- Write the translated file to the correct i18n directory
- Check and update sidebar category translations if needed
- Offer to review the translation for convention compliance

## When to use me

- After the `/translate-doc` command is invoked with a URL and locale
- When you want to create a translated version of an existing English doc page
- Trigger phrases:
  - "Translate this doc to Spanish"
  - "Create an es translation for this page"
  - "Add a translation for query-paginated-results"

## Instructions

### Step 1: Parse the input

The user provides two arguments:

- **URL**: A local Docusaurus URL like `http://localhost:3000/persistence-integration/query-paginated-results` or `http://localhost:3000/es/persistence-integration/query-paginated-results`
- **Locale**: A target language code like `es`, `ES`, or `Español`

If either argument is missing, ask the user for it before proceeding.

### Step 2: Normalize and validate the locale

Normalize the locale input to a lowercase ISO 639-1 code. Common mappings:

| Input      | Normalized |
| ---------- | ---------- |
| `es`, `ES` | `es`       |
| `Español`  | `es`       |
| `en`, `EN` | `en`       |
| `fr`, `FR` | `fr`       |
| `Français` | `fr`       |

Read `docusaurus.config.ts` and extract the `i18n.locales` array. Currently this is `['en', 'es']`.

- If the normalized locale is `en`, report an error: English is the source locale. Translation is only for non-English locales.
- If the normalized locale is not in the `i18n.locales` array, report an error with the list of currently supported locales and stop.

### Step 3: Extract the doc slug

Parse the URL to extract the doc slug:

1. Remove the scheme and host: strip everything up to and including `localhost:3000` (or whatever host/port is used)
2. Strip any locale prefix: if the path starts with `/{locale}/`, remove it (e.g., `/es/persistence-integration/query-paginated-results` → `persistence-integration/query-paginated-results`)
3. The remaining path is the slug

The Docusaurus config uses `routeBasePath: '/'`, so docs live at the root — there is no `/docs/` prefix in the URL.

Examples:

| URL                                                                        | Locale prefix | Slug                                              |
| -------------------------------------------------------------------------- | ------------- | ------------------------------------------------- |
| `http://localhost:3000/persistence-integration/query-paginated-results`    | none          | `persistence-integration/query-paginated-results` |
| `http://localhost:3000/es/persistence-integration/query-paginated-results` | `/es/`        | `persistence-integration/query-paginated-results` |
| `http://localhost:3000/intro`                                              | none          | `intro`                                           |
| `http://localhost:3000/es/intro`                                           | `/es/`        | `intro`                                           |

The URL may include a locale prefix from the user browsing the translated version. Always strip it — the source document is always the English one in `docs/`.

### Step 4: Validate the source file exists

Check that the English source file exists at:

```
docs/{slug}.mdx
```

If the file does not exist, report the error and stop. Suggest the user check the URL or list available docs with `ls docs/`.

### Step 5: Check if the translation already exists

Construct the target path:

```
i18n/{locale}/docusaurus-plugin-content-docs/current/{slug}.mdx
```

If this file already exists:

- Warn the user that a translation already exists at this path
- Ask whether to **overwrite** it or **skip** (abort the translation)
- If the user chooses to skip, stop here

### Step 6: Load relevant skills

1. Load the **docusaurus-i18n** skill for locale-specific translation rules, tone, and formatting
2. Load the **writing-style** skill for sentence-case headings, anti-AI-writing rules, and document structure conventions
3. Load the **code-style** skill for MDX formatting, component imports, and code block conventions

Read the full content of each skill file before proceeding to the translation steps.

### Step 7: Translate the document

Read the full content of `docs/{slug}.mdx` and create the translation following these rules:

#### Frontmatter

- Copy `sidebar_position` exactly as-is (no translation)
- Translate the `title` following locale-specific capitalization rules (e.g., for Spanish: capitalize only the first word and proper nouns — never use English Title Case)

#### Prose and headings

- Translate all prose, headings, explanations, and callouts into the target locale
- Use the tone specified in the **docusaurus-i18n** skill for the target locale (for Spanish: **vos** form, senior dev mentor voice, Argentine/Latin American expressions that stay accessible)
- Apply locale-specific heading capitalization (for Spanish: only capitalize the first word and proper nouns like Spring Boot, Java, Kubernetes — no English Title Case)

#### Code and technical content

- Keep all code examples, inline code, and code comments in English
- Keep all file paths in English
- Keep technical terms without a target-language equivalent in English (e.g., "boilerplate", "stack", "workflow")
- Keep all `reference` meta keyword URLs and titles in fenced code blocks exactly as-is

#### Docusaurus components

- Preserve all import statements exactly as-is (paths and variable names do not change)
- Preserve all component syntax: `<Tabs>`, `<TabItem>`, `<GithubCommitsInfo>`, `<Admonition>`, `<Image>`, `<CodeBlock>`, `<FileTree>`, etc.
- For `<Admonition>`: translate the `title` attribute but keep the `type` attribute value in English (`tip`, `warning`, `info`, etc.)
- For `<GithubCommitsInfo>`: keep `commit` names and URLs in English
- For `<Tabs groupId="language" queryString>`: keep `groupId`, `queryString`, `value`, and `label` attributes as-is (code languages don't change)
- For `<TabItem>`: translate any descriptive text inside the tab, but keep code blocks untouched

#### Links

- Internal doc links that point to `/docs/` sections should be updated to point to `/{locale}/docs/` for the target locale (e.g., `/docs/persistence-integration/database-setup` → `/es/docs/persistence-integration/database-setup`)
- For links using relative Markdown syntax (`[text](./other-doc)`), rewrite them using the `/{locale}/docs/` absolute path format
- External links (to GitHub, third-party sites, etc.) remain unchanged

#### What stays identical between source and translation

- All import statements
- All code blocks (including `reference` fenced blocks with GitHub URLs)
- Component tag names and their non-translatable props (`groupId`, `queryString`, `value`, `type` on Admonition)
- `sidebar_position` value
- File paths and technical identifiers

### Step 8: Check category translation

Determine which section the document belongs to by looking at the slug (e.g., `persistence-integration/query-paginated-results` → section is `persistence-integration`).

1. Read `docs/{section}/_category_.json` to find the English category label
2. Read `i18n/{locale}/docusaurus-plugin-content-docs/current.json` and check if a translation entry exists for this category's label and description

The JSON keys follow this pattern:

```json
{
  "sidebar.tutorialSidebar.category.{Category Label}": {
    "message": "Translated Label",
    "description": "The label for category {Category Label} in sidebar tutorialSidebar"
  },
  "sidebar.tutorialSidebar.category.{Category Label}.link.generated-index.description": {
    "message": "Translated description.",
    "description": "The generated-index page description for category {Category Label} in sidebar tutorialSidebar"
  }
}
```

If the category label or description is missing from `current.json` for the target locale:

- Translate the label and description following the same locale-specific rules
- Add both entries to `i18n/{locale}/docusaurus-plugin-content-docs/current.json`
- Inform the user that category translations were added

**Do not** create `_category_.json` files in i18n directories — they are ignored by Docusaurus.

### Step 9: Write the file and format

1. Write the translated `.mdx` file to `i18n/{locale}/docusaurus-plugin-content-docs/current/{slug}.mdx`
2. Run `pnpm run format` on the new file to ensure consistent formatting
3. If category translations were added to `current.json`, also format that file

### Step 10: Report and offer review

1. Show the user the target file path and a brief summary of what was translated
2. List any category translations that were added to `current.json`
3. Offer to run the `/review-doc` command on the newly created translation to verify convention compliance
4. If the document has a TSX companion at `src/components/docs/{slug}.tsx`, mention that it is shared across locales and note any user-facing strings that may need a separate localization strategy in the future
