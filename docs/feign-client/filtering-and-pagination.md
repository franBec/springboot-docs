---
sidebar_position: 8
---

# Filtering And Pagination

[Pagination](https://www.merge.dev/blog/rest-api-pagination) is a pattern that breaks large datasets into manageable chunks, controlling:

- **Resource Consumption**: Limits memory usage and database load.
- **Response Efficiency**: Reduces payload size for faster network transfers.
- **User Experience**: Enables predictable data navigation patterns.

## Why Do Pagination?

Why are we doing pagination when the current set of users is small (only 10 users)?

1. **Scales seamlessly**: Handles dataset growth without API changes.
2. **Supports multiple clients**: Allows different consumers (web/mobile/third-party) to request optimal chunks.
3. **Enables agile data access**: Prepares for potential UI features like dynamic table sorting.
4. **Reduces technical debt**: Avoids costly refactoring when data outgrows memory-load approaches.

## Implementing Filtering And Pagination

In `src/main/java/dev/pollito/users_manager/service/impl/UserServiceImpl.java`, let's implement features such as:

* Check if provided string `q` is part of email, name, or username.
* Sorting criteria in the format `field:direction`.
* Zero-based page index (0..N)
* Size of the page to be returned.

The end result should look something like this:

```java
package dev.pollito.users_manager.service.impl;

import dev.pollito.users_manager.mapper.UserMapper;
import dev.pollito.users_manager.model.Pageable;
import dev.pollito.users_manager.model.User;
import dev.pollito.users_manager.model.Users;
import dev.pollito.users_manager.service.UserApiCacheService;
import dev.pollito.users_manager.service.UserService;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserApiCacheService userApi;
  private final UserMapper userMapper;

  @Override
  public Users findAll(Integer pageNumber, Integer pageSize, List<String> pageSort, String q) {
    List<com.typicode.jsonplaceholder.model.User> users = userApi.getUsers();

    return new Users()
        .content(
            userMapper.map(
                applyPagination(
                    sortUsers(filterUsersByQ(users, q), pageSort), pageNumber, pageSize)))
        .pageable(new Pageable().pageNumber(pageNumber).pageSize(pageSize))
        .totalElements(users.size());
  }

  @Override
  public User findById(Long id) {
    return userMapper.map(
        userApi.getUsers().stream()
            .filter(u -> Objects.nonNull(u.getId()))
            .filter(u -> u.getId() == id.intValue())
            .findFirst()
            .orElseThrow());
  }

  private static List<com.typicode.jsonplaceholder.model.User> filterUsersByQ(
      @NotNull List<com.typicode.jsonplaceholder.model.User> users, String q) {
    if (StringUtils.isBlank(q)) {
      return users;
    }
    return new ArrayList<>(users)
        .stream().filter(user -> filterUsersByQPredicate(user, q)).toList();
  }

  private static boolean filterUsersByQPredicate(
      com.typicode.jsonplaceholder.model.@NotNull User user, @NotNull String q) {
    String query = q.toLowerCase();
    return (Objects.nonNull(user.getEmail()) && user.getEmail().toLowerCase().contains(query))
        || (Objects.nonNull(user.getName()) && user.getName().toLowerCase().contains(query))
        || (Objects.nonNull(user.getUsername())
            && user.getUsername().toLowerCase().contains(query));
  }

  private static @NotNull List<com.typicode.jsonplaceholder.model.User> sortUsers(
      @NotNull List<com.typicode.jsonplaceholder.model.User> users, List<String> pageSort) {

    if (users.isEmpty()) {
      return Collections.emptyList();
    }

    List<com.typicode.jsonplaceholder.model.User> result = new ArrayList<>(users);

    List<String> criteria =
        (Objects.isNull(pageSort) || pageSort.isEmpty())
            ? Collections.singletonList("id:asc")
            : pageSort;

    Comparator<com.typicode.jsonplaceholder.model.User> comparator = null;

    for (String sortStr : criteria) {
      String[] parts = sortStr.split(":", 2);
      String field = parts[0].trim().toLowerCase();
      Comparator<com.typicode.jsonplaceholder.model.User> current = getUserComparator(parts, field);

      if (Objects.isNull(comparator)) {
        comparator = current;
      } else {
        comparator = comparator.thenComparing(current);
      }
    }

    result.sort(comparator);
    return result;
  }

  private static @NotNull Comparator<com.typicode.jsonplaceholder.model.User> getUserComparator(
      String @NotNull [] parts, @NotNull String field) {
    String dir = (parts.length > 1) ? parts[1].trim().toLowerCase() : "asc";

    Comparator<com.typicode.jsonplaceholder.model.User> current =
        switch (field) {
          case "name" ->
              Comparator.comparing(
                  com.typicode.jsonplaceholder.model.User::getName,
                  Comparator.nullsFirst(Comparator.naturalOrder()));
          case "username" ->
              Comparator.comparing(
                  com.typicode.jsonplaceholder.model.User::getUsername,
                  Comparator.nullsFirst(Comparator.naturalOrder()));
          case "email" ->
              Comparator.comparing(
                  com.typicode.jsonplaceholder.model.User::getEmail,
                  Comparator.nullsFirst(Comparator.naturalOrder()));
          default ->
              Comparator.comparing(
                  com.typicode.jsonplaceholder.model.User::getId,
                  Comparator.nullsFirst(Comparator.naturalOrder()));
        };

    if ("desc".equals(dir)) {
      current = current.reversed();
    }
    return current;
  }

  private @NotNull List<com.typicode.jsonplaceholder.model.User> applyPagination(
      @NotNull List<com.typicode.jsonplaceholder.model.User> users,
      Integer pageNumber,
      Integer pageSize) {
    int total = users.size();
    int fromIndex = Math.min(pageNumber * pageSize, total);
    int toIndex = Math.min(fromIndex + pageSize, total);

    return users.subList(fromIndex, toIndex);
  }
}
```

Looks quite scary, but **here is an explanation of what is going on**:

This class, `UserServiceImpl`, integrates with an external API cache service to fetch users and then processes the data by applying filtering, sorting, and pagination before mapping it to the internal model. Here’s a brief breakdown:

* **Data Retrieval & Mapping**: The class leverages `UserApiCacheService` to obtain a list of users from an external API. It then uses UserMapper to convert these users into the application's internal model.
* **Filtering**: The method `filterUsersByQ` filters the user list based on a query string (`q`). It checks if the query is present in the user's email, name, or username in a case-insensitive manner.
* **Sorting**: The `sortUsers` method sorts the filtered list according to the provided sort criteria (`pageSort`). Each sort criterion follows the format `field:direction`, where fields like `name`, `username`, and `email` are prioritized, with a default sort on `id` if the field is not specified. The helper method `getUserComparator` constructs the corresponding comparator for each criterion, allowing for both ascending and descending orders.
* **Pagination**: Finally, the `applyPagination` method slices the sorted list to return only the users for the specified page based on `pageNumber` and `pageSize`.

**Overriden methods**:

* `findAll`: Combines filtering, sorting, and pagination to return a paged and mapped list of users wrapped in a Users object.
* `findById`: Retrieves a single user by matching the provided ID.

This structured approach ensures that clients receive only the relevant subset of user data in a consistent, ordered, and paginated format.

Commit the progress so far.

```bash
git add .
git commit -m "filtering and pagination"
```