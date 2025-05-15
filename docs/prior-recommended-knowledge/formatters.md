---
sidebar_position: 8
---

import YouTube from '@site/src/components/YouTube';

# Formatters

A **formatter** automatically styles your code (indentation, spacing, line breaks) to enforce consistency. No more debates about _tabs vs. spaces_

<YouTube id="V7PLxL8jIl8" />

Before imposing a formatter, check your team’s workflow:

* **Consistency > personal preference**: If your team already uses a formatter (e.g., [Checkstyle](https://checkstyle.org/), [Google Java Format](https://github.com/google/google-java-format)), stick with their setup.
* **For existing projects without a formatter**, consult the team first. A sudden formatting overhaul in a shared codebase can bury meaningful changes in noise. If agreed, create a dedicated commit purely for formatting (no logic tweaks!) to simplify code reviews.

I recommend [Spotless](https://github.com/diffplug/spotless). Why? Personal preference, it is the one I’ve always used and haven’t bothered looking into others.