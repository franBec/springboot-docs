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

While direct contributions to this demo repository are not actively sought, **feedback on the guide itself is always welcome**. If you find issues, have suggestions for improvement, or want to report inaccuracies, please feel free to open an issue or contact me on [LinkedIn](https://linkedin.com/in/franco-becvort/).

## Skills

For detailed guidance on specific aspects, coding agents (and humans too) can use the OpenCode skills:

- **[AGENTS.md](./AGENTS.md)** - Agent instructions.
- **`.opencode/skills/code-style`** - TypeScript, React, and Markdown code style conventions including naming, formatting, snippet management, and image usage patterns.
- **`.opencode/skills/coolify-deployment`** - Deployment guide for the Docusaurus documentation site to Coolify. Covers application setup, build configuration, domain settings, and automatic deployments.
- **`.opencode/skills/docusaurus-i18n`** - Guidelines for translating Docusaurus documentation to Spanish, including file placement, tone, and formatting rules.
- **`.opencode/skills/writing-style`** - Guidelines for creating documentation with a pragmatic senior developer mentor tone and voice. Covers Docusaurus formatting, heading capitalization rules, and writing patterns to avoid.

---

Built with [Docusaurus](https://docusaurus.io/).
