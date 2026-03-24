# Agent Instructions

## Project Overview

This is a Docusaurus project (v3.9.2).

## Commands

### Build Commands

- `pnpm run build` - Build the production site (all locales).
- `pnpm run start` - Start the development server (default English locale).
- `pnpm run start:es` - Start the Spanish locale development server.
- `pnpm run serve` - Serve the built site locally.

### Linting & Formatting

- `pnpm run format` - Format code with Prettier.
- `pnpm run typecheck` - Run TypeScript type checking.

### Testing

This is a documentation site without tests. No test commands are available.

## Execution Environment

- The environment is running **BusyBox**, which provides a lightweight version of common Unix tools.
- The `pgrep` command is a "stripped down" version and **does not support the `-g` flag**.
- Don't rebuild the project after simple trivial change, it kills the development server, which becomes annoying and time-consuming.
