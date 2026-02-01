import { CollapsibleCodeBlock } from '@site/src/components/collapsible-code-block';

export const WhitelabelErrorPage = () => (
  <CollapsibleCodeBlock language="log" title="Terminal">
    {`pollito in @ springboot-demo-projects  $ w3m -dump http://localhost:8080
Whitelabel Error Page

This application has no explicit mapping for /error, so you are seeing this as
a fallback.
`}
  </CollapsibleCodeBlock>
);
