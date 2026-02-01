import { CollapsibleCodeBlock } from '@site/src/components/collapsible-code-block';
import ZoomContainer from '@site/src/components/zoom-container';
import Mermaid from '@theme/Mermaid';
import { FileTreeInfo } from '@site/src/components/file-tree-info';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

const FileTreeJava = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`// highlight-modified
├── build.gradle
├── ...
└── src
    ├── main
    │   ├── java
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_java
    │   │               ├── config
    │   │               │   ├── log
// highlight-added-start
    │   │               │   │   ├── LogAspect.java
    │   │               │   │   ├── LogFilter.java
    │   │               │   │   ├── MaskingPatternLayout.java
    │   │               │   │   └── TraceIdFilter.java
// highlight-added-end
    │   │               │   └── ...
    │   │               └── ...
    │   └── resources
// highlight-added
    │       ├── application-dev.yaml
    │       └── ...
    └── test
        └── ...`}
  </CollapsibleCodeBlock>
);

const FileTreeKt = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`// highlight-modified
├── build.gradle.kts
├── ...
└── src
    ├── main
    │   ├── kotlin
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_kotlin
    │   │               ├── config
    │   │               │   ├── log
// highlight-added-start
    │   │               │   │   ├── LogAspect.kt
    │   │               │   │   ├── LogFilter.kt
    │   │               │   │   ├── MaskingPatternLayout.kt
    │   │               │   │   └── TraceIdFilter.kt
// highlight-added-end
    │   │               │   └── ...
    │   │               └── ...
    │   └── resources
// highlight-modified
    │       ├── application-dev.yaml
    │       └── ...
    └── test
        └── ...`}
  </CollapsibleCodeBlock>
);

const FileTreeGroovy = () => (
  <CollapsibleCodeBlock language="log" title="File Tree">
    {`// highlight-modified
├── build.gradle
├── ...
└── src
    ├── main
    │   ├── groovy
    │   │   └── dev
    │   │       └── pollito
    │   │           └── spring_groovy
    │   │               ├── config
    │   │               │   └── log
// highlight-added-start
    │   │               │       ├── LogAspect.groovy
    │   │               │       ├── LogFilter.groovy
    │   │               │       ├── MaskingPatternLayout.groovy
    │   │               │       └── TraceIdFilter.groovy
// highlight-added-end
    │   │               └── ...
    │   └── resources
// highlight-modified
    │       ├── application-dev.yaml
    │       └── ...
    └── test
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

export const BuildGradleJava = () => (
  <CollapsibleCodeBlock language="groovy" title="build.gradle">
    {`plugins {
  id 'java'
  id 'org.springframework.boot' version '4.0.1'
  id 'io.spring.dependency-management' version '1.1.7'
  id 'com.diffplug.spotless' version '8.1.0'
}

group = 'dev.pollito'
version = '0.0.1-SNAPSHOT'
description = 'Demo project for Spring Boot with Java'

java {
  toolchain {
    languageVersion = JavaLanguageVersion.of(21)
  }
}

configurations {
  compileOnly {
    extendsFrom annotationProcessor
  }
}

repositories {
  mavenCentral()
}

dependencies {
  implementation 'org.springframework.boot:spring-boot-starter-actuator'
  implementation 'org.springframework.boot:spring-boot-starter-webmvc'
  compileOnly 'org.projectlombok:lombok'
  developmentOnly 'org.springframework.boot:spring-boot-devtools'
  annotationProcessor 'org.springframework.boot:spring-boot-configuration-processor'
  annotationProcessor 'org.projectlombok:lombok'
  testImplementation 'org.springframework.boot:spring-boot-starter-actuator-test'
  testImplementation 'org.springframework.boot:spring-boot-starter-webmvc-test'
  testRuntimeOnly 'org.junit.platform:junit-platform-launcher'

  def mapstructVersion = '1.6.3'
  def mapstructSpringExtensionsVersion = '2.0.0'
  implementation "org.mapstruct:mapstruct:\${mapstructVersion}"
  annotationProcessor "org.mapstruct:mapstruct-processor:\${mapstructVersion}"
  implementation "org.mapstruct.extensions.spring:mapstruct-spring-annotations:\${mapstructSpringExtensionsVersion}"
  annotationProcessor "org.mapstruct.extensions.spring:mapstruct-spring-extensions:\${mapstructSpringExtensionsVersion}"
  testImplementation "org.mapstruct.extensions.spring:mapstruct-spring-test-extensions:\${mapstructSpringExtensionsVersion}"
  testAnnotationProcessor "org.mapstruct.extensions.spring:mapstruct-spring-extensions:\${mapstructSpringExtensionsVersion}"

// highlight-added-start
  implementation 'org.aspectj:aspectjtools:1.9.25.1'
  implementation 'org.springframework.boot:spring-boot-starter-opentelemetry'
// highlight-added-end
}

tasks.named('test') {
  useJUnitPlatform()
}

spotless {
  java {
    target 'src/*/java/**/*.java'
    googleJavaFormat()
    removeUnusedImports()
    cleanthat()
    formatAnnotations()
  }
  groovyGradle {
    target '*.gradle'
    greclipse().configFile('greclipse.properties')
  }
}

tasks.named("build") {
  dependsOn 'spotlessApply'
  dependsOn 'spotlessGroovyGradleApply'
}`}
  </CollapsibleCodeBlock>
);

export const BuildGradleKts = () => (
  <CollapsibleCodeBlock language="kts" title="build.gradle.kts">
    {`plugins {
  kotlin("jvm") version "2.2.21"
  kotlin("plugin.spring") version "2.2.21"
  id("org.springframework.boot") version "4.0.1"
  id("io.spring.dependency-management") version "1.1.7"
  id("com.diffplug.spotless") version "8.1.0"
  kotlin("kapt") version "2.3.0"
}

group = "dev.pollito"

version = "0.0.1-SNAPSHOT"

description = "Demo project for Spring Boot with Kotlin"

java { toolchain { languageVersion = JavaLanguageVersion.of(21) } }

configurations { compileOnly { extendsFrom(configurations.annotationProcessor.get()) } }

repositories { mavenCentral() }

dependencies {
  implementation("org.springframework.boot:spring-boot-starter-actuator")
  implementation("org.springframework.boot:spring-boot-starter-webmvc")
  implementation("org.jetbrains.kotlin:kotlin-reflect")
  implementation("tools.jackson.module:jackson-module-kotlin")
  developmentOnly("org.springframework.boot:spring-boot-devtools")
  annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
  testImplementation("org.springframework.boot:spring-boot-starter-actuator-test")
  testImplementation("org.springframework.boot:spring-boot-starter-webmvc-test")
  testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
  testRuntimeOnly("org.junit.platform:junit-platform-launcher")

  val mapstructVersion = "1.6.3"
  val mapstructSpringExtensionsVersion = "2.0.0"
  implementation("org.mapstruct:mapstruct:$mapstructVersion")
  kapt("org.mapstruct:mapstruct-processor:$mapstructVersion")
  implementation(
      "org.mapstruct.extensions.spring:mapstruct-spring-annotations:$mapstructSpringExtensionsVersion"
  )
  kapt(
      "org.mapstruct.extensions.spring:mapstruct-spring-extensions:$mapstructSpringExtensionsVersion"
  )

// highlight-added-start
  implementation("io.github.oshai:kotlin-logging-jvm:7.0.13")
  implementation("org.aspectj:aspectjtools:1.9.25.1")
  implementation("org.springframework.boot:spring-boot-starter-opentelemetry")
// highlight-added-end
}

kotlin {
  compilerOptions {
    freeCompilerArgs.addAll("-Xjsr305=strict", "-Xannotation-default-target=param-property")
  }
}

tasks.withType<Test> { useJUnitPlatform() }

configure<com.diffplug.gradle.spotless.SpotlessExtension> {
  kotlin { ktfmt() }
  kotlinGradle {
    target("*.gradle.kts")
    ktfmt()
  }
}

tasks.named("build") {
  dependsOn("spotlessKotlinApply")
  dependsOn("spotlessKotlinGradleApply")
}`}
  </CollapsibleCodeBlock>
);

export const BuildGradleGroovy = () => (
  <CollapsibleCodeBlock language="groovy" title="build.gradle">
    {`plugins {
  id 'groovy'
  id 'org.springframework.boot' version '4.0.1'
  id 'io.spring.dependency-management' version '1.1.7'
  id 'com.diffplug.spotless' version '8.1.0'
}

group = 'dev.pollito'
version = '0.0.1-SNAPSHOT'
description = 'Demo project for Spring Boot with Groovy'

java {
  toolchain {
    languageVersion = JavaLanguageVersion.of(21)
  }
}

configurations {
  compileOnly {
    extendsFrom annotationProcessor
  }
}

repositories {
  mavenCentral()
}

dependencies {
  implementation 'org.springframework.boot:spring-boot-starter-actuator'
  implementation 'org.springframework.boot:spring-boot-starter-webmvc'
  implementation 'org.apache.groovy:groovy'
  developmentOnly 'org.springframework.boot:spring-boot-devtools'
  annotationProcessor 'org.springframework.boot:spring-boot-configuration-processor'
  testImplementation 'org.springframework.boot:spring-boot-starter-actuator-test'
  testImplementation 'org.springframework.boot:spring-boot-starter-webmvc-test'
  testRuntimeOnly 'org.junit.platform:junit-platform-launcher'

// highlight-added-start
  implementation 'org.aspectj:aspectjtools:1.9.25.1'
  implementation 'org.springframework.boot:spring-boot-starter-opentelemetry'
// highlight-added-end
}

tasks.named('test') {
  useJUnitPlatform()
}

spotless {
  groovy {
    importOrder()
    removeSemicolons()
    greclipse().configFile('greclipse.properties')
    excludeJava()
  }
  groovyGradle {
    target '*.gradle'
    greclipse().configFile('greclipse.properties')
  }
}

tasks.named("build") {
  dependsOn 'spotlessGroovyApply'
  dependsOn 'spotlessGroovyGradleApply'
}`}
  </CollapsibleCodeBlock>
);

const ApplicationDevYamlJava = () => (
  <CollapsibleCodeBlock language="yaml" title="resources/application-dev.yaml">
    {`// highlight-added-start
spring:
  application:
    name: spring_java
management:
  otlp:
    metrics:
      export:
        enabled: false
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const ApplicationDevYamlKt = () => (
  <CollapsibleCodeBlock language="yaml" title="resources/application-dev.yaml">
    {`// highlight-added-start
spring:
  application:
    name: spring_kotlin
management:
  otlp:
    metrics:
      export:
        enabled: false
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const ApplicationDevYamlGroovy = () => (
  <CollapsibleCodeBlock language="yaml" title="resources/application-dev.yaml">
    {`// highlight-added-start
spring:
  application:
    name: spring_groovy
management:
  otlp:
    metrics:
      export:
        enabled: false
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const ApplicationDevYaml = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <ApplicationDevYamlJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <ApplicationDevYamlKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <ApplicationDevYamlGroovy />
    </TabItem>
  </Tabs>
);

const LogAspectJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/config/log/LogAspect.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.config.log;

import java.util.Arrays;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.jspecify.annotations.NonNull;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class LogAspect {
  @Pointcut("within(@org.springframework.web.bind.annotation.RestController *)")
  public void controllerPublicMethodsPointcut() {}

  @Before("controllerPublicMethodsPointcut()")
  public void logBefore(@NonNull JoinPoint joinPoint) {
    log.info(
        "[{}] Args: {}",
        joinPoint.getSignature().toShortString(),
        Arrays.toString(joinPoint.getArgs()));
  }

  @AfterReturning(pointcut = "controllerPublicMethodsPointcut()", returning = "result")
  public void logAfterReturning(@NonNull JoinPoint joinPoint, Object result) {
    log.info("[{}] Response: {}", joinPoint.getSignature().toShortString(), result);
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const LogAspectKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/config/log/LogAspect.kt"
  >
    {`// highlight-added-start
package dev.pollito.spring_kotlin.config.log

import io.github.oshai.kotlinlogging.KotlinLogging
import org.aspectj.lang.JoinPoint
import org.aspectj.lang.annotation.AfterReturning
import org.aspectj.lang.annotation.Aspect
import org.aspectj.lang.annotation.Before
import org.aspectj.lang.annotation.Pointcut
import org.springframework.stereotype.Component

private val log = KotlinLogging.logger {}

@Aspect
@Component
class LogAspect {

  @Pointcut("within(@org.springframework.web.bind.annotation.RestController *)")
  fun controllerPublicMethodsPointcut() {
    // Method is empty as this is just a Pointcut declaration
  }

  @Before("controllerPublicMethodsPointcut()")
  fun logBefore(joinPoint: JoinPoint) {
    log.info {
      "[\${joinPoint.signature.toShortString()}] Args: \${joinPoint.args.contentToString()}"
    }
  }

  @AfterReturning(pointcut = "controllerPublicMethodsPointcut()", returning = "result")
  fun logAfterReturning(joinPoint: JoinPoint, result: Any?) {
    log.info { "[\${joinPoint.signature.toShortString()}] Response: $result" }
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const LogAspectGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/config/log/LogAspect.groovy"
  >
    {`// highlight-added-start
package dev.pollito.spring_groovy.config.log

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.aspectj.lang.JoinPoint
import org.aspectj.lang.annotation.AfterReturning
import org.aspectj.lang.annotation.Aspect
import org.aspectj.lang.annotation.Before
import org.aspectj.lang.annotation.Pointcut
import org.springframework.stereotype.Component

@Aspect
@Component
@Slf4j
@CompileStatic
class LogAspect {

  @Pointcut("within(@org.springframework.web.bind.annotation.RestController *)")
  void controllerPublicMethodsPointcut() {
    // Method is empty as this is just a Pointcut declaration
  }

  @Before("controllerPublicMethodsPointcut()")
  void logBefore(JoinPoint joinPoint) {
    log.info "[\${joinPoint.signature.toShortString()}] Args: \${joinPoint.args*.toString().join(', ')}"
  }

  @AfterReturning(pointcut = "controllerPublicMethodsPointcut()", returning = "result")
  void logAfterReturning(JoinPoint joinPoint, Object result) {
    log.info "[\${joinPoint.signature.toShortString()}] Response: \${result}"
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const LogAspect = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <LogAspectJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <LogAspectKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <LogAspectGroovy />
    </TabItem>
  </Tabs>
);

const LogFilterJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/config/log/LogFilter.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.config.log;

import static java.util.Collections.list;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@Order()
@Slf4j
public class LogFilter extends OncePerRequestFilter {

  @Override
  protected void doFilterInternal(
      @NonNull HttpServletRequest request,
      @NonNull HttpServletResponse response,
      @NonNull FilterChain filterChain)
      throws ServletException, IOException {
    logRequestDetails(request);
    filterChain.doFilter(request, response);
    logResponseDetails(response);
  }

  private void logRequestDetails(@NonNull HttpServletRequest request) {
    log.info(
        ">>>> Method: {}; URI: {}; QueryString: {}; Headers: {}",
        request.getMethod(),
        request.getRequestURI(),
        request.getQueryString(),
        headersToString(request));
  }

  private @NonNull String headersToString(@NonNull HttpServletRequest request) {
    List<String> headers = new ArrayList<>();

    List<String> headerNames = list(request.getHeaderNames());

    for (String headerName : headerNames) {
      if (headerName != null && !headerName.isBlank()) {
        String headerValue = request.getHeader(headerName);
        if (headerValue != null && !headerValue.isBlank()) {
          headers.add(headerName + ": " + headerValue);
        }
      }
    }

    if (headers.isEmpty()) {
      return "{}";
    }

    return "{" + String.join(", ", headers) + "}";
  }

  private void logResponseDetails(@NonNull HttpServletResponse response) {
    log.info("<<<< Response Status: {}", response.getStatus());
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const LogFilterKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/config/log/LogFilter.kt"
  >
    {`// highlight-added-start
package dev.pollito.spring_kotlin.config.log

import io.github.oshai.kotlinlogging.KotlinLogging
import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import java.io.IOException
import org.springframework.core.Ordered.LOWEST_PRECEDENCE
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

private val log = KotlinLogging.logger {}

@Component
@Order(LOWEST_PRECEDENCE)
class LogFilter : OncePerRequestFilter() {

  @Throws(ServletException::class, IOException::class)
  override fun doFilterInternal(
      request: HttpServletRequest,
      response: HttpServletResponse,
      filterChain: FilterChain,
  ) {
    logRequestDetails(request)
    filterChain.doFilter(request, response)
    logResponseDetails(response)
  }

  private fun logRequestDetails(request: HttpServletRequest) {
    log.info {
      ">>>> Method: \${request.method}; URI: \${request.requestURI}; QueryString: \${request.queryString}; Headers: \${headersToString(request)}"
    }
  }

  private fun headersToString(request: HttpServletRequest): String {
    val headers =
        request.headerNames
            .toList()
            .filter { !it.isNullOrBlank() }
            .mapNotNull { headerName ->
              val headerValue = request.getHeader(headerName)
              if (!headerValue.isNullOrBlank()) {
                "$headerName: $headerValue"
              } else {
                null
              }
            }

    return if (headers.isEmpty()) {
      "{}"
    } else {
      headers.joinToString(separator = ", ", prefix = "{", postfix = "}")
    }
  }

  private fun logResponseDetails(response: HttpServletResponse) {
    log.info { "<<<< Response Status: \${response.status}" }
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const LogFilterGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/config/log/LogFilter.groovy"
  >
    {`// highlight-added-start
package dev.pollito.spring_groovy.config.log

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
@Order(2147483647)
@Slf4j
@CompileStatic
class LogFilter extends OncePerRequestFilter {

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
  throws ServletException, IOException {
    logRequestDetails(request)
    filterChain.doFilter(request, response)
    logResponseDetails(response)
  }

  private static void logRequestDetails(HttpServletRequest request) {
    log.info(
        ">>>> Method: {}; URI: {}; QueryString: {}; Headers: {}",
        request.method,
        request.requestURI,
        request.queryString,
        headersToString(request))
  }

  private static String headersToString(HttpServletRequest request) {
    def headers = request.headerNames
        .toList()
        .findAll { it && it.trim() }
        .collect { headerName ->
          def headerValue = request.getHeader(headerName)
          if (headerValue && headerValue.trim()) {
            "\${headerName}: \${headerValue}"
          } else {
            null
          }
        }
        .findAll { it != null }

    if (headers.isEmpty()) {
      "{}"
    } else {
      headers.join(", ").with { "{\${it}}" }
    }
  }

  private static void logResponseDetails(HttpServletResponse response) {
    log.info("<<<< Response Status: {}", response.status)
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const LogFilter = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <LogFilterJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <LogFilterKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <LogFilterGroovy />
    </TabItem>
  </Tabs>
);

const TraceIdFilterJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/config/log/TraceIdFilter.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.config.log;

import static io.opentelemetry.api.trace.Span.current;
import static org.slf4j.MDC.put;
import static org.slf4j.MDC.remove;
import static org.springframework.core.Ordered.LOWEST_PRECEDENCE;

import io.opentelemetry.api.trace.SpanContext;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.jspecify.annotations.NonNull;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@Order(LOWEST_PRECEDENCE - 1)
public class TraceIdFilter extends OncePerRequestFilter {

  @Override
  protected void doFilterInternal(
      @NonNull HttpServletRequest request,
      @NonNull HttpServletResponse response,
      @NonNull FilterChain filterChain)
      throws ServletException, IOException {

    SpanContext spanContext = current().getSpanContext();
    if (spanContext.isValid()) {
      put("trace_id", spanContext.getTraceId());
      put("span_id", spanContext.getSpanId());
      put("trace_flags", spanContext.getTraceFlags().isSampled() ? "01" : "00");
    }

    try {
      filterChain.doFilter(request, response);
    } finally {
      remove("trace_id");
      remove("span_id");
      remove("trace_flags");
    }
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const TraceIdFilterKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/config/log/TraceIdFilter.kt"
  >
    {`// highlight-added-start
package dev.pollito.spring_kotlin.config.log

import io.opentelemetry.api.trace.Span.current
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.MDC.put
import org.slf4j.MDC.remove
import org.springframework.core.Ordered.LOWEST_PRECEDENCE
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
@Order(LOWEST_PRECEDENCE - 1)
class TraceIdFilter : OncePerRequestFilter() {

  override fun doFilterInternal(
      request: HttpServletRequest,
      response: HttpServletResponse,
      filterChain: FilterChain,
  ) {
    val spanContext = current().spanContext
    if (spanContext.isValid) {
      put("trace_id", spanContext.traceId)
      put("span_id", spanContext.spanId)
      put("trace_flags", if (spanContext.traceFlags.isSampled) "01" else "00")
    }

    try {
      filterChain.doFilter(request, response)
    } finally {
      remove("trace_id")
      remove("span_id")
      remove("trace_flags")
    }
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const TraceIdFilterGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/config/log/TraceIdFilter.groovy"
  >
    {`// highlight-added-start
package dev.pollito.spring_groovy.config.log

import static org.slf4j.MDC.put
import static org.slf4j.MDC.remove

import groovy.transform.CompileStatic
import io.opentelemetry.api.trace.Span
import io.opentelemetry.api.trace.SpanContext
import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
@Order(2147483646)
@CompileStatic
class TraceIdFilter extends OncePerRequestFilter {

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
  throws ServletException, IOException {

    SpanContext spanContext = Span.current().spanContext
    if (spanContext.valid) {
      put("trace_id", spanContext.traceId)
      put("span_id", spanContext.spanId)
      put("trace_flags", spanContext.traceFlags.sampled ? "01" : "00")
    }

    try {
      filterChain.doFilter(request, response)
    } finally {
      remove("trace_id")
      remove("span_id")
      remove("trace_flags")
    }
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const TraceIdFilter = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <TraceIdFilterJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <TraceIdFilterKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <TraceIdFilterGroovy />
    </TabItem>
  </Tabs>
);

const MaskingPatternLayoutJava = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/dev/pollito/spring_java/config/log/MaskingPatternLayout.java"
  >
    {`// highlight-added-start
package dev.pollito.spring_java.config.log;

import static java.util.regex.Matcher.quoteReplacement;
import static java.util.regex.Pattern.CASE_INSENSITIVE;
import static java.util.regex.Pattern.MULTILINE;

import ch.qos.logback.classic.PatternLayout;
import ch.qos.logback.classic.spi.ILoggingEvent;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.regex.MatchResult;
import java.util.regex.Pattern;
import java.util.stream.IntStream;
import org.jspecify.annotations.NonNull;

public class MaskingPatternLayout extends PatternLayout {

  private Pattern multilinePattern;
  private final List<String> maskPatterns = new ArrayList<>();

  public void addMaskPattern(String maskPattern) {
    maskPatterns.add(maskPattern);
    multilinePattern =
        Pattern.compile(String.join("|", maskPatterns), MULTILINE | CASE_INSENSITIVE);
  }

  @Override
  public String doLayout(ILoggingEvent event) {
    return maskMessage(super.doLayout(event));
  }

  private String maskMessage(String message) {
    if (multilinePattern == null) {
      return message;
    }
    return multilinePattern.matcher(message).replaceAll(this::computeReplacement);
  }

  private String computeReplacement(@NonNull MatchResult matchResult) {
    List<String> nonNullGroups =
        IntStream.rangeClosed(1, matchResult.groupCount())
            .mapToObj(matchResult::group)
            .filter(Objects::nonNull)
            .limit(2)
            .toList();

    String replacement =
        switch (nonNullGroups.size()) {
          case 0 -> matchResult.group(0);
          case 1 -> nonNullGroups.getFirst();
          default -> nonNullGroups.getFirst() + "****";
        };

    return quoteReplacement(replacement);
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const MaskingPatternLayoutKt = () => (
  <CollapsibleCodeBlock
    language="kt"
    title="kotlin/dev/pollito/spring_kotlin/config/log/MaskingPatternLayout.kt"
  >
    {`// highlight-added-start
package dev.pollito.spring_kotlin.config.log

import ch.qos.logback.classic.PatternLayout
import ch.qos.logback.classic.spi.ILoggingEvent
import kotlin.text.RegexOption.IGNORE_CASE
import kotlin.text.RegexOption.MULTILINE

class MaskingPatternLayout : PatternLayout() {
  private var multilineRegex: Regex? = null
  private val maskPatterns = mutableListOf<String>()

  fun addMaskPattern(maskPattern: String) {
    maskPatterns.add(maskPattern)
    multilineRegex = maskPatterns.joinToString("|").toRegex(setOf(MULTILINE, IGNORE_CASE))
  }

  override fun doLayout(event: ILoggingEvent): String = maskMessage(super.doLayout(event))

  private fun maskMessage(message: String): String {
    val regex = multilineRegex ?: return message

    return regex.replace(message) { match ->
      val nonNullGroups = (1..match.groupValues.lastIndex).mapNotNull { match.groups[it]?.value }

      nonNullGroups.firstOrNull()?.let { prefix ->
        if (nonNullGroups.size >= 2) "$prefix****" else prefix
      } ?: match.value
    }
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const MaskingPatternLayoutGroovy = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/dev/pollito/spring_groovy/config/log/MaskingPatternLayout.groovy"
  >
    {`// highlight-added-start
package dev.pollito.spring_groovy.config.log

import static java.util.regex.Matcher.quoteReplacement
import static java.util.regex.Pattern.CASE_INSENSITIVE
import static java.util.regex.Pattern.MULTILINE
import static java.util.regex.Pattern.compile

import ch.qos.logback.classic.PatternLayout
import ch.qos.logback.classic.spi.ILoggingEvent
import groovy.transform.CompileStatic
import java.util.regex.Matcher
import java.util.regex.Pattern

@CompileStatic
class MaskingPatternLayout extends PatternLayout {

  private Pattern multilinePattern
  private final List<String> maskPatterns = []

  void addMaskPattern(String maskPattern) {
    maskPatterns.add(maskPattern)
    multilinePattern =
        compile(maskPatterns.join("|"), MULTILINE | CASE_INSENSITIVE)
  }

  @Override
  String doLayout(ILoggingEvent event) {
    maskMessage(super.doLayout(event))
  }

  private String maskMessage(String message) {
    if (multilinePattern == null) {
      return message
    }

    Matcher matcher = multilinePattern.matcher(message)
    StringBuilder sb = new StringBuilder()

    while (matcher.find()) {
      List<String> groups = (1..matcher.groupCount())
          .collect { matcher.group(it) }
          .findAll { it != null }

      String replacement = groups.empty
          ? matcher.group(0)
          : groups[0] + (groups.size() > 1 ? "****" : "")

      matcher.appendReplacement(sb, quoteReplacement(replacement))
    }
    matcher.appendTail(sb)

    sb.toString()
  }
}
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const MaskingPatternLayout = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <MaskingPatternLayoutJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <MaskingPatternLayoutKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <MaskingPatternLayoutGroovy />
    </TabItem>
  </Tabs>
);

const LogbackJava = () => (
  <CollapsibleCodeBlock language="xml" title="resources/logback-spring.xml">
    {`// highlight-added-start
<configuration>
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
            <layout class="dev.pollito.spring_java.config.log.MaskingPatternLayout">
                <maskPattern>(?i)((?:authorization|proxy-authorization|cookie|x-api-key|x-auth-token|x-csrf-token):\\s+)([^\\r\\n,]+)</maskPattern>
                <maskPattern>(?i)((?:password|token|secret)[\\s:="]+)(\\S+)</maskPattern>

                <pattern>%d{yyyy-MM-dd} %d{HH:mm:ss.SSS} trace_id=%X{trace_id} span_id=%X{span_id} trace_flags=%X{trace_flags} %-5level %thread --- %logger{36} %msg%n</pattern>
            </layout>
        </encoder>
    </appender>

    <root level="INFO">
        <appender-ref ref="CONSOLE"/>
    </root>
</configuration>
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const LogbackKt = () => (
  <CollapsibleCodeBlock language="xml" title="resources/logback-spring.xml">
    {`// highlight-added-start
<configuration>
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
            <layout class="dev.pollito.spring_kotlin.config.log.MaskingPatternLayout">
                <maskPattern>(?i)((?:authorization|proxy-authorization|cookie|x-api-key|x-auth-token|x-csrf-token):\\s+)([^\\r\\n,]+)</maskPattern>
                <maskPattern>(?i)((?:password|token|secret)[\\s:="]+)(\\S+)</maskPattern>

                <pattern>%d{yyyy-MM-dd} %d{HH:mm:ss.SSS} trace_id=%X{trace_id} span_id=%X{span_id} trace_flags=%X{trace_flags} %-5level %thread --- %logger{36} %msg%n</pattern>
            </layout>
        </encoder>
    </appender>

    <root level="INFO">
        <appender-ref ref="CONSOLE"/>
    </root>
</configuration>
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

const LogbackGroovy = () => (
  <CollapsibleCodeBlock language="xml" title="resources/logback-spring.xml">
    {`// highlight-added-start
<configuration>

    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
            <layout class="dev.pollito.spring_groovy.config.log.MaskingPatternLayout">
                <maskPattern>(?i)((?:authorization|proxy-authorization|cookie|x-api-key|x-auth-token|x-csrf-token):\\s+)([^\\r\\n,]+)</maskPattern>
                <maskPattern>(?i)((?:password|token|secret)[\\s:="]+)(\\S+)</maskPattern>

                <pattern>%d{yyyy-MM-dd} %d{HH:mm:ss.SSS} trace_id=%X{trace_id} span_id=%X{span_id} trace_flags=%X{trace_flags} %-5level %thread --- %logger{36} %msg%n</pattern>
            </layout>
        </encoder>
    </appender>

    <root level="INFO">
        <appender-ref ref="CONSOLE"/>
    </root>

</configuration>
// highlight-added-end`}
  </CollapsibleCodeBlock>
);

export const Logback = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <LogbackJava />
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <LogbackKt />
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <LogbackGroovy />
    </TabItem>
  </Tabs>
);

export const CurlRequest = () => (
  <CollapsibleCodeBlock language="sh" title="Terminal">
    {`curl -s --request GET \
  --url http://localhost:8080/api/films/42 \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
  --header 'Cookie: JSESSIONID=A1B2C3D4E5F6G7H8I9J0; auth_token=secret123token456' \
  --header 'Proxy-Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=' \
  --header 'User-Agent: Mozilla/5.0 (Test Client)' \
  --header 'X-API-Key: super-secret-api-key' \
  --header 'X-Auth-Token: super-secret-auth-token-12345' \
  --header 'X-CSRF-Token: csrf_abc123def456ghi789' | jq`}
  </CollapsibleCodeBlock>
);

export const ApplicationLogs = () => (
  <CollapsibleCodeBlock language="log" title="Application logs">
    {`2026-02-18 15:28:11.600 trace_id=b8e1447340832e9b466fde0a1f172b55 span_id=a4fa1234784f7c02 trace_flags=01 INFO  http-nio-8080-exec-1 --- d.p.spring_java.config.log.LogFilter >>>> Method: GET; URI: /api/films/42; QueryString: null; Headers: {Host: localhost:8080, Accept: application/json, Authorization: ****, Cookie: ****, Proxy-Authorization: ****, User-Agent: Mozilla/5.0 (Test Client), X-API-Key: ****, X-Auth-Token: ****, X-CSRF-Token: ****
2026-02-18 15:28:11.619 trace_id=b8e1447340832e9b466fde0a1f172b55 span_id=a4fa1234784f7c02 trace_flags=01 INFO  http-nio-8080-exec-1 --- d.p.spring_java.config.log.LogAspect [FilmRestController.findById(..)] Args: [42]
2026-02-18 15:28:11.620 trace_id=b8e1447340832e9b466fde0a1f172b55 span_id=a4fa1234784f7c02 trace_flags=01 INFO  http-nio-8080-exec-1 --- d.p.spring_java.config.log.LogAspect [FilmRestController.findById(..)] Response: FilmResponse(id=42, title=ACADEMY DINOSAUR, description=A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies, releaseYear=2006, rating=PG, lengthMinutes=86, language=English)
2026-02-18 15:28:11.664 trace_id=b8e1447340832e9b466fde0a1f172b55 span_id=a4fa1234784f7c02 trace_flags=01 INFO  http-nio-8080-exec-1 --- d.p.spring_java.config.log.LogFilter <<<< Response Status: 200`}
  </CollapsibleCodeBlock>
);

export const ApplicationSequenceDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
participant Client
participant TraceIdFilter
participant LogFilter
participant LogAspect
participant FilmRestController

Client->>TraceIdFilter: HTTP Request
activate TraceIdFilter

TraceIdFilter->>TraceIdFilter: Set trace_id in MDC

TraceIdFilter->>LogFilter: doFilter(request, response)
activate LogFilter

Note over LogFilter: Log Request Details<br/>(Method, URI, QueryString, Headers)

LogFilter->>LogAspect: @Before advice
activate LogAspect
Note over LogAspect: Log method args

LogAspect->>FilmRestController: findById(42)
activate FilmRestController
FilmRestController-->>LogAspect: FilmResponse
deactivate FilmRestController

LogAspect-->>LogAspect: @AfterReturning advice
Note over LogAspect: Log method response

LogAspect-->>LogFilter: Return response
deactivate LogAspect

Note over LogFilter: Log Response Details<br/>(Status Code)

LogFilter-->>TraceIdFilter: Return response
deactivate LogFilter

TraceIdFilter->>TraceIdFilter: Clear MDC

TraceIdFilter-->>Client: HTTP Response
deactivate TraceIdFilter`}
    />
  </ZoomContainer>
);
