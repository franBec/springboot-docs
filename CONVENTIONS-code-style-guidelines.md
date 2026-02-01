# Code Style Guidelines

## TypeScript & React Patterns

- Use functional components with hooks
- Use `React.FC` type for function components
- Define explicit interfaces for props
- Use `ReactNode` as return type for components
- Destructure props in function parameters with explicit type annotation
- Use `clsx` for conditional className merging

## Naming Conventions

- Components: PascalCase (`CollapsibleCodeBlock`, `ZoomContainer`)
- Functions: camelCase (`handleToggle`, `fetchData`)
- Constants/Variables: camelCase (`maxLines`, `isExpanded`)
- Snippet component exports: Descriptive PascalCase (`FilmStructureJson`, `OpenApiSpecYaml`)
- Files: kebab-case (`collapsible-code-block.tsx`, `zoom-container.tsx`)

## Formatting (Prettier)

`pnpm run format` formats code with Prettier

## Code Snippet Management

For large documentation files with extensive code examples, extract code snippets into separate React components.

### File Naming and Location Convention

1. **Directory Structure:** Mirror the `docs/` directory structure within `src/components/docs/`.
2. **Filename Convention:** Convert the document filename to a snippets file by removing the `.mdx` extension. Example: `docs/deployment/observability.mdx` → `src/components/docs/deployment/observability.tsx`

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

### Escaping

When embedding code in JavaScript template literals, escape: `$` → `\$` and `` ` `` → `` \` ``.

## Image Component Usage

For images in documentation, use the custom `Image` component instead of raw `<img>` tags or `<div>` wrappers.

```tsx
import Image from '@site/src/components/image';

<Image src={require('@site/static/img/deployment/screenshot.png').default} />;
```

**Use the `require` syntax for static images:** When referencing images from `static/img/`, always use `require('@site/static/img/...').default`.
