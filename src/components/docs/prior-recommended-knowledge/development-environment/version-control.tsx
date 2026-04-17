import CodeBlock from '@theme/CodeBlock';

export const GitFourCommands = () => (
  <CodeBlock language="bash" title="Terminal">
    {`git add .
git commit -m "save point"
git push
git checkout -b`}
  </CodeBlock>
);
