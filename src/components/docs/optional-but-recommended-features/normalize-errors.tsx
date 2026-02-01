import { CollapsibleCodeBlock } from '@site/src/components/collapsible-code-block';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { FileTreeInfo } from '@site/src/components/file-tree-info';

const FileTreeJava = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`├── ...
└── src
    ├── main
    │   ├── java
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_java
    │   │               ├── config
    │   │               │   ├── advice
// highlight-added
    │   │               │   │   └── ControllerAdvice.java
    │   │               │   └── ...
    │   │               └── ...
    │   └── ...
    └── ...`}
  </CollapsibleCodeBlock>
);

const FileTreeKt = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`├── ...
└── src
    ├── main
    │   ├── java
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_kotlin
    │   │               ├── config
    │   │               │   ├── advice
// highlight-added
    │   │               │   │   └── ControllerAdvice.kt
    │   │               │   └── ...
    │   │               └── ...
    │   └── ...
    └── ...`}
  </CollapsibleCodeBlock>
);

const FileTreeGroovy = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`├── ...
└── src
    ├── main
    │   ├── java
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_groovy
    │   │               ├── config
    │   │               │   ├── advice
// highlight-added
    │   │               │   │   └── ControllerAdvice.groovy
    │   │               │   └── ...
    │   │               └── ...
    │   └── ...
    └── ...`}
  </CollapsibleCodeBlock>
);

export const FileTree = () => (
  <FileTreeInfo>
    <Tabs groupId="language" queryString>
      <TabItem value="java" label="Java" default>
        <FileTreeJava />
      </TabItem>
      <TabItem value="kotlin" label="Kotlin">
        <FileTreeKt />
      </TabItem>
      <TabItem value="groovy" label="Groovy">
        <FileTreeGroovy />
      </TabItem>
    </Tabs>
  </FileTreeInfo>
);

const ControllerAdviceJavaCode = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/config/advice/ControllerAdvice.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.config.advice;

import static io.opentelemetry.api.trace.Span.current;
import static java.time.Instant.*;
import static java.time.format.DateTimeFormatter.ISO_INSTANT;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@RestControllerAdvice
@Slf4j
public class ControllerAdvice {
  private static @NotNull ProblemDetail buildProblemDetail(
      @NotNull Exception e, @NotNull HttpStatus status) {
    String exceptionSimpleName = e.getClass().getSimpleName();
    String logMessage = "{} being handled";

    switch (status.series()) {
      case SERVER_ERROR -> log.error(logMessage, exceptionSimpleName, e);
      case CLIENT_ERROR -> log.warn(logMessage, exceptionSimpleName, e);
      default -> log.info(logMessage, exceptionSimpleName, e);
    }

    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(status, e.getLocalizedMessage());
    problemDetail.setProperty("timestamp", ISO_INSTANT.format(now()));
    problemDetail.setProperty("trace", current().getSpanContext().getTraceId());

    return problemDetail;
  }

  @ExceptionHandler(Exception.class)
  public ProblemDetail handle(Exception e) {
    return buildProblemDetail(e, INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(NoResourceFoundException.class)
  public ProblemDetail handle(NoResourceFoundException e) {
    return buildProblemDetail(e, NOT_FOUND);
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const ControllerAdviceKtCode = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/config/advice/ControllerAdvice.kt"
  >
    {`// highlight-added-start
package dev.pollito.spring_kotlin.config.advice

import io.github.oshai.kotlinlogging.KotlinLogging
import io.opentelemetry.api.trace.Span.current
import java.time.Instant.now
import java.time.format.DateTimeFormatter.ISO_INSTANT
import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR
import org.springframework.http.HttpStatus.NOT_FOUND
import org.springframework.http.ProblemDetail
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.resource.NoResourceFoundException

private val log = KotlinLogging.logger {}

@RestControllerAdvice
class ControllerAdvice {
  companion object {
    private fun buildProblemDetail(e: Exception, status: HttpStatus): ProblemDetail {
      val exceptionSimpleName = e.javaClass.simpleName
      val logMessage = "$exceptionSimpleName being handled"

      when {
        status.is5xxServerError -> log.error(e) { logMessage }
        status.is4xxClientError -> log.warn(e) { logMessage }
        else -> log.info(e) { logMessage }
      }

      val problemDetail = ProblemDetail.forStatusAndDetail(status, e.localizedMessage)
      problemDetail.setProperty("timestamp", ISO_INSTANT.format(now()))
      problemDetail.setProperty("trace", current().spanContext.traceId)

      return problemDetail
    }
  }

  @ExceptionHandler(Exception::class)
  fun handle(e: Exception): ProblemDetail {
    return buildProblemDetail(e, INTERNAL_SERVER_ERROR)
  }

  @ExceptionHandler(NoResourceFoundException::class)
  fun handle(e: NoResourceFoundException): ProblemDetail {
    return buildProblemDetail(e, NOT_FOUND)
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const ControllerAdviceGroovyCode = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/config/advice/ControllerAdvice.groovy"
  >
    {`// highlight-added-start
package dev.pollito.spring_groovy.config.advice

import static java.time.Instant.now
import static java.time.format.DateTimeFormatter.ISO_INSTANT
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.Series.CLIENT_ERROR
import static org.springframework.http.HttpStatus.Series.SERVER_ERROR

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import io.opentelemetry.api.trace.Span
import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.resource.NoResourceFoundException

@RestControllerAdvice
@Slf4j
@CompileStatic
class ControllerAdvice {
  private static ProblemDetail buildProblemDetail(Exception e, HttpStatus status) {
    def exceptionSimpleName = e.class.simpleName
    def logMessage = "\${exceptionSimpleName} being handled"

    switch (status.series()) {
      case SERVER_ERROR:
        log.error(logMessage, e)
        break
      case CLIENT_ERROR:
        log.warn(logMessage, e)
        break
      default:
        log.info(logMessage, e)
        break
    }

    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(status, e.getLocalizedMessage())
    problemDetail.setProperty("timestamp", ISO_INSTANT.format(now()))
    problemDetail.setProperty("trace", Span.current().spanContext.traceId)

    problemDetail
  }

  @ExceptionHandler(Exception.class)
  ProblemDetail handle(Exception e) {
    buildProblemDetail(e, INTERNAL_SERVER_ERROR)
  }

  @ExceptionHandler(NoResourceFoundException)
  ProblemDetail handle(NoResourceFoundException e) {
    buildProblemDetail(e, NOT_FOUND)
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const ControllerAdvice = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <ControllerAdviceJavaCode />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <ControllerAdviceKtCode />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <ControllerAdviceGroovyCode />
    </TabItem>
  </Tabs>
);

export const NotFoundErrorTerminal = () => (
  <CollapsibleCodeBlock language="sh" title="Terminal">
    {`pollito in @ springboot-demo-projects  \\$ curl -s http://localhost:8080 | jq; curl -sw "→ HTTP %{http_code}\\n" -o /dev/null http://localhost:8080
{
  "detail": "No static resource  for request '/'.",
  "instance": "/",
  "status": 404,
  "title": "Not Found",
  "timestamp": "2026-01-11T20:16:13.240960834Z",
  "trace": "d9178227-18d6-4442-8598-9a9f17f65f9c"
}
→ HTTP 404`}
  </CollapsibleCodeBlock>
);
