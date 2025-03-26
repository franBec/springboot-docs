---
sidebar_position: 2
---

# Entity

Imagine you have a database table, like a spreadsheet used to keep track of `Products`. Each row in this spreadsheet is a specific product, and the columns represent its details (like `ProductID`, `Name`, `Price`, `Description`).

## What is an Entity Class?

An **Entity** class serves as a **Java representation of a single row** within a database table

*   Think of an **Entity class** in your Java code as a **blueprint** or a **template**. This blueprint precisely matches the structure of that `Products` database table (or spreadsheet).
*   So, for the `Products` table, you would create a class in Java named `Product`.
*   Inside this `Product` class, you'd have variables (often called fields or properties) that directly correspond to the columns in the table: a variable for `productId`, another for `name`, one for `price`, and so on.

## Role in the Repository Pattern

*   The **Entity (`Product` class)** defines **what** your data looks like when represented in Java, mirroring a database table's structure.
*   The **Repository (`ProductRepository`)** defines **how** you manage and interact with that data (saving, finding, deleting) stored in the database, always working with the Entity blueprint.

This separation keeps your code organized and easier to manage. Your main application logic can focus on working with straightforward Java `Product` objects, while the Repository takes care of the underlying database operations, hiding that complexity.