---
sidebar_position: 1
---

import YouTube from '@site/src/components/YouTube';

# About Unit Testing

When I started to write this document, I was very sure that I wanted to talk about Unit Testing, but I was not sure where to put it in the context of the whole page.

* In theory, unit testing should be the very first thing.
* In practice, it is more engaging to start with a practical scenario.

Why does this happen?

## My Story with Unit Testing

**In my first job**, unit testing was non-existent. We worked on an ancient monolith that had survived years without proper technical leadership. The codebase grew chaotically, a digital Frankenstein's monster patched together to meet business demands with little regard for quality or maintainability.

**My second job** introduced the concept of unit testing, but implementation was superficial at best. Some team members weaponized unit testing as a shield during daily standups: "Still working on those unit tests!" became the perfect excuse when progress stalled. It's remarkably effective against non-technical stakeholders like scrum masters or product owners who appreciate the term but don't know enough to challenge it.

It wasn't until **my current position** that I experienced genuine unit testing culture. Here, code quality is paramount, measured rigorously through [Sonar](https://docs.sonarsource.com/sonarqube-server/latest/), with unit test coverage being a key metric. This environment finally showed me what proper testing looks like in practice, not just in theory.

## Everyone Does Not Love unit Testing

> Unit Testing is a way to set up a guardrail at every possible turn when developers are the ones whose job is to make the path.

That is a hot take said by Theo ([T3.gg](https://t3.gg/)) in his video _Why I Don’t Unit Test_

<YouTube id="ZGKGb109-I4" />

That video got an interesting answer by someone who heavily recommends unit testing and creates content around that topic.

<YouTube id="S5geCJb_bN4" />

## The Value in Unit Testing

When I learned about Unit Testing in university, I was told something along the lines of:

> The value of Unit Testing isn't immediately clear to the author of the code. You don't write tests for yourself today—you write them for the developer (possibly future you) who'll maintain your code tomorrow.

* **Unit tests provide immediate feedback when making changes to existing code**. They give developers confidence to refactor, enhance, or fix issues without the fear of introducing new bugs. They're like having a safety net when walking a tightrope—you hope you won't need it, but you're certainly glad it's there.
* **Well-written tests also serve as living documentation**... If done well. They demonstrate the expected behavior of your code in various scenarios, often more clearly than written documentation that tends to drift out of sync with actual implementation.

## TDD

[Test-Driven Development (TDD)](https://www.agilealliance.org/glossary/tdd/) is an approach where you write tests before writing the actual code.

* Imagine sketching the outline of a painting before applying any color—you define what success looks like first, then work to achieve it.
* The process typically follows a "Red-Green-Refactor" cycle: write a failing test, implement the minimum code to make it pass, then improve the code while keeping tests green.

<div>
  <img src={require('@site/static/img/unit-testing/tdd.png').default} alt="tdd" />
</div>

Despite its popularity, **I have yet to witness a developer who truly commits to TDD in their daily workflow**. It's one of those practices everyone claims to value, but few consistently implement.

This isn't necessarily because TDD lacks merit—it can be incredibly powerful when applied correctly. Rather, it's because shifting from "code first, test later" (if at all) to a test-driven mindset requires significant discipline and a supportive engineering culture. In the rush of deadlines and feature demands, the discipline of TDD is often the first casualty.