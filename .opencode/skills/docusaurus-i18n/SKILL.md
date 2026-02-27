---
name: docusaurus-i18n
description: Guidelines for translating Docusaurus documentation to Spanish, including file placement, tone, and formatting rules
license: MIT
compatibility: opencode
metadata:
  scope: localization
  audience: translators
  framework: docusaurus
---

## Supported Locales

- **English (`en`)** - Default locale, source files in `docs/`
- **Spanish (`es`)** - Translated files in `i18n/es/docusaurus-plugin-content-docs/current/`

Pages not yet translated will show English (fallback behavior).

## Adding New Translations

### For Spanish Translations

1. Create a file in `i18n/es/docusaurus-plugin-content-docs/current/` mirroring the path of the English file in `docs/`
2. Copy the frontmatter from the English file
3. Translate the content (keep code examples in English)
4. Maintain the same Docusaurus components and structure

Example:

```bash
# English source
docs/intro.mdx

# Spanish translation
i18n/es/docusaurus-plugin-content-docs/current/intro.mdx
```

## Translation Files

| Type                   | Path                                              |
|------------------------|---------------------------------------------------|
| UI strings             | `i18n/es/code.json`                               |
| Theme (navbar, footer) | `i18n/es/docusaurus-theme-classic/`               |
| Document content       | `i18n/es/docusaurus-plugin-content-docs/current/` |

## Category Translations

**Do not** create `_category_.json` files in i18n directories—they are ignored.

Use `i18n/es/docusaurus-plugin-content-docs/current.json` instead:

```json
{
  "sidebar.tutorialSidebar.category.Big Picture": {
    "message": "La Idea General",
    "description": "The label for category Big Picture in sidebar tutorialSidebar"
  },
  "sidebar.tutorialSidebar.category.Big Picture.link.generated-index.description": {
    "message": "Entendé las ideas y estructuras generales detrás del desarrollo de software.",
    "description": "The generated-index page description for category Big Picture in sidebar tutorialSidebar"
  }
}
```

## Spanish Translation Guidelines

### Tone & Voice

- Use **vos** (consistent with the persona)
- Keep the "senior dev mentor" voice but in Spanish
- Argentine/Latin American expressions are welcome but keep them accessible
- Address the reader directly ("como te decía", "fijate")

### What to Translate vs. Keep in English

**Translate:** All prose, headings, explanations, callouts
**Keep in English:** Code examples, comments within code, file paths, technical terms without Spanish equivalent
**Transliterate with caution:** Terms like "boilerplate", "stack", "workflow" may stay in English

### Practical Tips

- Translate frontmatter `title` but keep it in English (or translate it if preferred)
- Keep `sidebar_position` as-is
- Preserve all Docusaurus component syntax (`<Admonition>`, `<Tabs>`, etc.)
- Translate admonition `title` attributes but keep `type` values (`tip`, `warning`, etc.)
- Links to English docs should point to `/docs/`, links to Spanish docs should point to `/es/docs/`

### Spanish Heading Capitalization

Spanish **does not use Title Case**. When generating document titles or headings in Spanish:

1. Capitalize **only the first word**
2. Capitalize **proper nouns** (e.g., Spring Boot, Java, Kubernetes)
3. All other words must remain lowercase, including verbs, adjectives, and common nouns
4. Do **not** apply English Title Case rules to Spanish content

Examples:

- `Introducción a Spring Boot`
- `Cómo funciona la inyección de dependencias`
