---
sidebar_position: 3
---

import YouTube from '@site/src/components/YouTube';

# Server and Serverless

Our applications ultimately need to run _somewhere_. That "somewhere" typically comes down to two options: traditional servers (where you play the house owner) or serverless environments (where you're a cloud nomad). Both approaches keep your code running in the clouds, but one gives you keys to the server room while the other hands you an Uber-like bill. Let's break down these options.

## Server

While serverless gets all the hype, traditional server-based architectures still power enterprise systems. Here's what you need to know:

* **You own the box**: physical (on-premise hardware) or virtual (cloud VMs such as [AWS EC2](https://aws.amazon.com/ec2/) or [Google Compute Engine](https://cloud.google.com/products/compute)), you have full control over:
  * OS patches and security updates.
  * Scaling strategies (vertical/horizontal).
  * Resource allocation (CPU, RAM, storage).
* **Predictable costs**: Fixed monthly bills regardless of traffic spikes.

## Serverless

The term “Serverless” is a bit misleading. There are still servers involved, but you never see or manage them.

* Instead of worrying about hardware, software updates, or scaling, developers focus purely on writing code.
* Cloud providers (like [AWS](https://aws.amazon.com/), [Google Cloud](https://cloud.google.com/), or [Microsoft Azure](https://portal.azure.com/)) handle the grunt work: spinning up servers when needed, patching security holes, balancing traffic, and even backing up data automatically.

In an era where “serverless computing” is the buzzword of choice, it’s tempting to think of servers as outdated relics of a simpler time. After all, why deal with them at all when you can let cloud providers handle everything for you?

However, before you jump on the serverless bandwagon, it’s worth pausing to consider whether it’s truly the best choice for your app (and your wallet).

<div>
  <img src={require('@site/static/img/prior-recommended-knowledge/serverless-meme.png').default} alt="serverless meme" />
</div>

### The Serverless Dream can quickly become a nightmare

Serverless computing promises unparalleled scalability, but that flexibility often comes with an unpredictable cost structure. A striking example of this came to light just a few months ago when [cara.app](https://cara.app/explore), a small indie project, went viral. Built using [serverless functions](https://www.splunk.com/en_us/blog/learn/serverless-functions.html), the app’s sudden popularity led to a staggering $96,000 cloud bill for its creator.

<YouTube id="SCIfWhAheVw" />

This isn’t an isolated incident. Serverless pricing is heavily based on usage, and while that can seem cost-effective at first, a spike in demand can quickly send your costs into orbit.

## Conclusion: It's Not Either/Or

| Criteria           | Server                          | Serverless                    |
|--------------------|---------------------------------|-------------------------------|
| **Cost Structure** | Predictable (fixed/month)       | Variable (pay-per-execution)  |
| **Scaling**        | Manual/auto-scaling setup       | Automatic (but costly spikes) |
| **Maintenance**    | High (you manage everything)    | Zero (cloud provider's duty)  |
| **Control**        | Full control over environment   | Limited to runtime/config     |
| **Cold Starts**    | None (always running)           | There's latency               |
| **Best For**       | Stable workloads, stateful apps | Event-driven, bursty traffic  |

Most teams you'll join have already made this decision years before your arrival. But here's why this matters to **you**:

* **Architecture discussions**: Understand tradeoffs when colleagues debate _migrating to Lambda_.
* **Debugging context**: Issues in serverless (cold starts/timeouts) are different from those in servers (thread pool).
* **Career moves**: Cloud certifications expect this knowledge.
* **Promotion potential**: Roles such as Tech leads need to advise on infrastructure choices.

Whether you're maintaining a dusty server or building serverless microservices, the best architecture is the one your team can actually operate.