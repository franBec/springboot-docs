---
sidebar_position: 8
---

# Filtrado y Paginación

[La paginación](https://www.merge.dev/blog/rest-api-pagination) es un patrón que divide grandes conjuntos de datos en porciones manejables, controlando:

- **Consumo de recursos**: Limita el uso de memoria y la carga en la base de datos.
- **Eficiencia de la respuesta**: Reduce el tamaño de la carga útil para transferencias de red más rápidas.
- **Experiencia del usuario**: Permite patrones de navegación de datos predecibles.

## ¿Por Qué Hacer Paginación?

¿Por qué implementamos paginación cuando el conjunto actual de usuarios es pequeño (solo 10 usuarios)?

1. **Escala sin problemas**: Maneja el aumento del conjunto de datos sin necesidad de cambiar la API.
2. **Soporta múltiples clientes**: Permite que distintos consumidores (web/móvil/terceros) pidan porciones óptimas.
3. **Facilita el acceso ágil a los datos**: Prepara el terreno para posibles funciones de la UI como el ordenamiento dinámico en tablas.
4. **Reduce la deuda técnica**: Evita refactorizaciones costosas cuando los datos superan los enfoques de carga en memoria.

## Implementando Filtrado y Paginación

En `src/main/java/dev/pollito/users_manager/service/impl/UserServiceImpl.java`, implementemos funcionalidades como:

* Verificar si el string provisto `q` forma parte del email, nombre o username.
* Criterios de ordenamiento en el formato `campo:dirección`.
* Índice de página basado en cero (0..N).
* Tamaño de la página a retornar.

El resultado final debería verse algo así:

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

    List<com.typicode.jsonplaceholder.model.User> filteredUsers = filterUsersByQ(users, q);
    List<com.typicode.jsonplaceholder.model.User> sortedUsers = sortUsers(filteredUsers, pageSort);
    List<com.typicode.jsonplaceholder.model.User> paginatedUsers =
        applyPagination(sortedUsers, pageNumber, pageSize);

    return new Users()
        .content(userMapper.map(paginatedUsers))
        .pageable(new Pageable().pageNumber(pageNumber).pageSize(pageSize))
        .totalElements(filteredUsers.size());
  }

  @Override
  public User findById(Long id) {
    return userMapper.map(
        userApi.getUsers().stream()
            .filter(u -> Objects.nonNull(u.getId()))
            .filter(u -> u.getId() == id.intValue())
            .findFirst()
            .orElseThrow(NoSuchElementException::new));
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

  private static @NotNull List<com.typicode.jsonplaceholder.model.User> applyPagination(
      @NotNull List<com.typicode.jsonplaceholder.model.User> users,
      Integer pageNumber,
      Integer pageSize) {
    int total = users.size();
    int fromIndex = Math.min(pageNumber * pageSize, total);
    int toIndex = Math.min(fromIndex + pageSize, total);

    return new ArrayList<>(users).subList(fromIndex, toIndex);
  }
}
```

Parece bastante intimidante, pero **acá va una explicación de lo que está pasando**:

Esta clase, `UserServiceImpl`, se integra con un servicio de caché del API externo para obtener usuarios y luego procesa los datos aplicando filtrado, ordenamiento y paginación antes de mapearlos al modelo interno. Acá te explico brevemente:

* **Recuperación y Mapeo de Datos**: La clase utiliza `UserApiCacheService` para obtener una lista de usuarios desde una API externa. Luego usa `UserMapper` para convertir esos usuarios al modelo interno de la aplicación.
* **Filtrado**: El método `filterUsersByQ` filtra la lista de usuarios basándose en una cadena de consulta (`q`). Verifica si la consulta está presente en el `email`, `nombre` o `username` del usuario de manera insensible a mayúsculas.
* **Ordenamiento**: El método `sortUsers` ordena la lista filtrada conforme a los criterios de ordenamiento proporcionados (`pageSort`). Cada criterio de ordenamiento sigue el formato `campo:dirección`, donde se priorizan campos como `name`, `username` y `email`, con un orden por defecto basado en `id` si no se especifica.
* **Paginación**: Finalmente, el método `applyPagination` recorta la lista ordenada para retornar solo los usuarios correspondientes a la página especificada según `pageNumber` y `pageSize`.

**Métodos sobrescritos**:

* `findAll`: Combina filtrado, ordenamiento y paginación para retornar una lista paginada y mapeada de usuarios envuelta en un objeto `Users`.
* `findById`: Recupera un único usuario comparando el ID proporcionado.

Este enfoque estructurado asegura que los clientes reciban únicamente el subconjunto relevante de datos de usuarios de forma consistente, ordenada y paginada.

Commiteá el progreso hasta ahora.

```bash
git add .
git commit -m "filtering and pagination"
```