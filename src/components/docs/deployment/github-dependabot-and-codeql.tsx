import CodeBlock from '@theme/CodeBlock';
import { FileTreeInfo } from '@site/src/components/file-tree-info';

export const FileTree = () => (
  <FileTreeInfo>
    <CodeBlock language="log" title="File Tree">
      {`springboot-demo-projects/
└── .github/
// highlight-added-start
    ├── dependabot.yml
// highlight-added-end
    └── workflows/
// highlight-added-start
        └── codeql.yml
// highlight-added-end`}
    </CodeBlock>
  </FileTreeInfo>
);
