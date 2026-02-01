# Agent Instructions and Project Context

## Project Overview

This is a **Spring Boot documentation site** that serves as a practical, hands-on guide for developers learning Spring Boot. **Target Audience:** Developers who know Java/OOP but haven't built APIs, want to avoid jargon-heavy tutorials, and prefer learning by doing. **Key Characteristics:** Pragmatic, conversational "senior dev mentor" tone. Code examples in Java, Kotlin, and Groovy. Teaches hexagonal/clean architecture patterns. Focuses on practical skills used 90% of the time. Avoids deep theory unless necessary.

## Commands

### Build Commands

- `pnpm run build` - Build the production site (all locales)
- `pnpm run start` - Start the development server (default English locale)
- `pnpm run start:es` - Start the Spanish locale development server
- `pnpm run serve` - Serve the built site locally

### Linting & Formatting

- `pnpm run format` - Format code with Prettier
- `pnpm run typecheck` - Run TypeScript type checking

### Testing

This is a documentation site without tests. No test commands are available.

## Global Behavior Constraints

1. **Project Context:** This is a Docusaurus project (v3.9.2). All generated document content markdown files (`.md` or `.mdx`) must include appropriate `sidebar_position` and `title` Docusaurus frontmatter.
2. **Sidebar Autogeneration:** There's no need to check `sidebars.ts` to confirm the sidebar reflects the change as `sidebars.ts` autogenerates from the `docs` directory.

## Execution Environment

- The environment is running **BusyBox**, which provides a lightweight version of common Unix tools.
- The `pgrep` command is a "stripped down" version and **does not support the `-g` flag**.

## TypeScript and LSP Warnings

### Ignore False Positives from TypeScript Strict Mode

When working with Docusaurus theme imports like `@theme/Mermaid` or `@theme/CodeBlock`, you may encounter TypeScript LSP warnings such as:

- `Cannot find name 'ZoomContainer'`
- `Cannot find name 'Mermaid'`
- `Property 'children' is missing in type '{}'`

These are **false positives** caused by Docusaurus's theme imports not being fully typed in the TypeScript compilation context. The imports work correctly at runtime because Docusaurus injects them during build.

### Avoid `import React from 'react'`

Do **not** use `import React from 'react';` in `.tsx` files. This import causes false positive TypeScript errors:

```
TS2741: Property 'children' is missing in type '{ type: string; }' but required in type 'Props'.
```

Instead, use named imports:

```tsx
import { useState, useRef } from 'react';
```

This issue occurs because the default `React` import creates type conflicts with Docusaurus's injected theme components. Named imports avoid this problem entirely.
