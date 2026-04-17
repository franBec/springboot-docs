import CodeBlock from '@theme/CodeBlock';

export const ThrowableHierarchy = () => (
  <CodeBlock language="text">
    {`Throwable
├── Error
│   ├── OutOfMemoryError
│   ├── StackOverflowError
│   └── ... (other errors)
└── Exception
    ├── RuntimeException (unchecked)
    │   ├── NullPointerException
    │   ├── IllegalArgumentException
    │   ├── IndexOutOfBoundsException
    │   └── ... (other runtime exceptions)
    └── Exception (checked)
        ├── IOException
        ├── SQLException
        └── ... (other checked exceptions)`}
  </CodeBlock>
);

export const ErrorExamples = () => (
  <CodeBlock language="java">
    {`// Examples of errors you'll rarely (hopefully) see
new StackOverflowError();      // Too much recursion
new OutOfMemoryError();        // JVM ran out of memory
new NoClassDefFoundError();    // Class was available at compile time but not runtime`}
  </CodeBlock>
);

export const ExceptionHandlingExample = () => (
  <CodeBlock language="java">
    {`try {
    String result = fetchDataFromApi();
} catch (ConnectionException e) {
    // Handle gracefully - retry, fallback, log, etc.
}`}
  </CodeBlock>
);

export const RuntimeExceptionExample = () => (
  <CodeBlock language="java">
    {`public void processUser(String name) {
    // NullPointerException can be thrown here but no 'throws' needed
    System.out.println(name.toUpperCase());
}`}
  </CodeBlock>
);

export const CheckedExceptionExample = () => (
  <CodeBlock language="java">
    {`public String readFile(String path) throws IOException {
    // This method can throw IOException
    // Caller MUST handle or declare it
    return Files.readString(Path.of(path));
}`}
  </CodeBlock>
);
