---
sidebar_position: 2
---

# What to Test?

## Finding the Right Balance

There's a purist approach to unit testing that advocates

> If a line of code can be executed, it must be tested.

While this philosophy sounds thorough, it can lead to what I call "testing paralysis" – where teams spend so much time writing tests that actual feature delivery gets significantly delayed. And even with 100% coverage, you can never guarantee that an unforeseen edge case won't slip through.

## A Pragmatic Approach

In my current role, we've found a balanced strategy that delivers both quality and timeliness:

- **Focus on business logic**: Prioritize testing everything in the controller(s) and service implementation(s), where most of your critical business logic resides.
- **Target realistic coverage**: While 100% coverage might be the theoretical ideal, we aim for a practical 70% threshold. This benchmark ensures robust testing while allowing teams to maintain momentum.
- **Consider the context**: The more complex or critical a component is, the more thoroughly it should be tested. Not all code deserves equal testing attention.

## When Coverage Gets Tough

Even with our reasonable 70% coverage requirement, we still experience delivery challenges. This is especially clear when working with older, poorly maintained codebases where:

- Methods are often lengthy and complex.
- Dependencies are tightly coupled and difficult to mock.
- Side effects are common and unpredictable.
- Documentation is sparse or outdated.

In these situations, refactoring might be necessary before effective testing can begin, which further highlights how **unit testing encourages better code design**.