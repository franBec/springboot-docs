---
sidebar_position: 1
---

# What Is a Contract?

In the [Design by contract wikipedia article](https://en.wikipedia.org/wiki/Design_by_contract), we can find the following affirmation:

<div>
  <img src={require('@site/static/img/contract-driven-development/design-by-contract.png').default} alt="design by contract" />
</div>

> […] software designers should define formal, precise, and verifiable interface specifications for software components, which extend the ordinary definition of abstract data types with preconditions, postconditions, and invariants.

From that, I made my own adaptation of the Contract-Driven Development philosophy for backends:

> Backends must comply with a contract, which defines inputs, outputs, and errors.

So, **what is a contract?** Is a **set of assertions** containing the following information:

* **Valid input values**, and their meaning.
* **Valid return values**, and their meaning.
* **Error values that can occur** and their meaning.

In a Contract there are two parties:

* **Consumer**: provides the input values and waits for the return.
* **Provider**: waits for the input values and provides the return.

So, **how do we write a contract?** Check the next lecture ;)