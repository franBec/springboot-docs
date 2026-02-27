# Spring Boot Docs

A practical, hands-on guide for developers learning Spring Boot.

This documentation site is already deployed and accessible at: **https://springboot.pollito.tech/**

## Development Commands

### Build Commands

- `pnpm run build` - Build the production site (all locales)
- `pnpm run start` - Start the development server (default English locale)
- `pnpm run start:es` - Start the Spanish locale development server
- `pnpm run serve` - Serve the built site locally

### Linting & Formatting

- `pnpm run format` - Format code with Prettier
- `pnpm run typecheck` - Run TypeScript type checking

## Internationalization

This project supports multiple locales:

- **English (`en`)** - Default locale, source files in `docs/`
- **Spanish (`es`)** - Translated files in `i18n/es/docusaurus-plugin-content-docs/current/`

Pages not yet translated will show English (fallback behavior).

## Contributing

While direct contributions to this demo repository are not actively sought, **feedback on the guide itself is always welcome**. If you find issues, have suggestions for improvement, or want to report inaccuracies, please feel free to open an issue or contact the maintainers.

## Detailed Convention Documents

For comprehensive guidance on specific aspects, refer to the following convention documents:

- **[AGENTS.md](./AGENTS.md)** - Agent instructions, project context, and global behavior constraints
- **[CONVENTIONS-i18n.md](./CONVENTIONS-i18n.md)** - Internationalization guidelines and translation processes
- **[CONVENTIONS-code-style-guidelines.md](./CONVENTIONS-code-style-guidelines.md)** - TypeScript, React patterns, and code formatting standards
- **[CONVENTIONS-writing-style-guidelines.md](./CONVENTIONS-writing-style-guidelines.md)** - Writing persona, tone, and content structure guidelines

---

Built with [Docusaurus](https://docusaurus.io/).
