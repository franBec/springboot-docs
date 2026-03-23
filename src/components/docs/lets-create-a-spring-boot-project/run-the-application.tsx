import CodeBlock from '@theme/CodeBlock';

export const WhitelabelErrorPage = () => (
  <CodeBlock language="log" title="Terminal">
    {`$ w3m -dump http://localhost:8080
Whitelabel Error Page

This application has no explicit mapping for /error, so you are seeing this as
a fallback.
`}
  </CodeBlock>
);
