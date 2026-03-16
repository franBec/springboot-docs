import { CollapsibleCodeBlock } from '@site/src/components/collapsible-code-block';
import { FileTreeInfo } from '@site/src/components/file-tree-info';

export const FileTree = () => (
  <FileTreeInfo>
    <CollapsibleCodeBlock language="log" title="File Tree">
      {`springboot-demo-projects/
└── .github/
// highlight-added-start
    ├── dependabot.yml
// highlight-added-end
    └── workflows/
// highlight-added-start
        └── codeql.yml
// highlight-added-end`}
    </CollapsibleCodeBlock>
  </FileTreeInfo>
);

export const Dependabot = () => (
  <CollapsibleCodeBlock language="yaml" title=".github/dependabot.yml">
    {`// highlight-added-start
version: 2
updates:
  - package-ecosystem: "gradle"
    directory: "/spring_java"
    schedule:
      interval: "weekly"
      day: "sunday"
      time: "06:00"
      timezone: "UTC"
    open-pull-requests-limit: 3
    commit-message:
      prefix: "deps"

  - package-ecosystem: "gradle"
    directory: "/spring_kotlin"
    schedule:
      interval: "weekly"
      day: "sunday"
      time: "06:00"
      timezone: "UTC"
    open-pull-requests-limit: 3
    commit-message:
      prefix: "deps"

  - package-ecosystem: "gradle"
    directory: "/spring_groovy"
    schedule:
      interval: "weekly"
      day: "sunday"
      time: "06:00"
      timezone: "UTC"
    open-pull-requests-limit: 3
    commit-message:
      prefix: "deps"
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const CodeQL = () => (
  <CollapsibleCodeBlock language="yaml" title=".github/workflows/codeql.yml">
    {`// highlight-added-start
name: CodeQL

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  analyze:
    name: Analyze
    runs-on: ubuntu-latest
    permissions:
      actions: read
      contents: read
      security-events: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up JDK
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'

      - name: Initialize CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: java, kotlin
          queries: security-extended

      - name: Build with Gradle
        run: ./gradlew assemble --no-daemon -x test

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3
// highlight-added-end`}
  </CollapsibleCodeBlock>
);
