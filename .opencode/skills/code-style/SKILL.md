---
name: code-style
description: TypeScript, React, and documentation code style conventions including naming, formatting, snippet management, and image usage patterns
license: MIT
compatibility: opencode
metadata:
   language: typescript
   framework: react
   type: conventions
---

## When to use me

Use this skill when:
- Writing new React components
- Creating or modifying documentation with code snippets
- Adding images to documentation
- Naming files, components, or functions
- Extracting code examples from MDX files

## TypeScript & React Patterns

- Use functional components with hooks
- Use `React.FC` type for function components
- Define explicit interfaces for props
- Use `ReactNode` as return type for components
- Destructure props in function parameters with explicit type annotation
- Use `clsx` for conditional className merging
- Use named imports from React (e.g., `import { useState } from 'react'`) — avoid `import React from 'react'`

## Naming Conventions

| Type                | Case                   | Example                                            |
|---------------------|------------------------|----------------------------------------------------|
| Components          | PascalCase             | `CollapsibleCodeBlock`, `ZoomContainer`            |
| Functions           | camelCase              | `handleToggle`, `fetchData`                        |
| Constants/Variables | camelCase              | `maxLines`, `isExpanded`                           |
| Snippet exports     | Descriptive PascalCase | `FilmStructureJson`, `OpenApiSpecYaml`             |
| Files               | kebab-case             | `collapsible-code-block.tsx`, `zoom-container.tsx` |

## Formatting

Run `pnpm run format` to format code with Prettier.

## Code Snippet Management

For large documentation files with extensive code examples, extract code snippets into separate React components.

### File Location Convention

1. Mirror the `docs/` directory structure within `src/components/docs/`
2. Convert document filename by removing `.mdx` extension

**Example:** `docs/deployment/observability.mdx` → `src/components/docs/deployment/observability.tsx`

### Snippet Component Structure

```tsx
import { CollapsibleCodeBlock } from '@site/src/components/collapsible-code-block';
import ZoomContainer from '@site/src/components/zoom-container';
import Mermaid from '@theme/Mermaid';

export const TerminalCode = () => (
  <CollapsibleCodeBlock
    language="sh"
    title="Terminal"
  >{`output`}</CollapsibleCodeBlock>
);

export const ApplicationLogs = () => (
  <CollapsibleCodeBlock
    language="log"
    title="Application logs"
  >{`logs`}</CollapsibleCodeBlock>
);

export const SequenceDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram participant A participant B A->>B: Example`}
    />
  </ZoomContainer>
);
```

### Escaping in Template Literals

When embedding code in JavaScript template literals, escape:

- `$` → `\$`
- `` ` `` → `` \` ``

## Image Component Usage

Use the custom `Image` component instead of raw `<img>` tags or `<div>` wrappers:

```tsx
import Image from '@site/src/components/image';

<Image src={require('@site/static/img/deployment/screenshot.png').default} />;
```

**Important:** Always use `require('@site/static/img/...').default` syntax for static images.
