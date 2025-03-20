---
sidebar_position: 4
---

# Use The Generated Code

## Delete The Model We Previously Wrote

If we go to `src/main/java/dev/pollito/users_manager/model/User.java`, we will find the following error:

![duplicated](img/duplicated.png)

That is because the openapi-generator plugin already created a `User` class at the same path, but in the build folder. Let's delete the class (and the whole `model` package) we created by hand, so **we favor the generated class**.

## Fix Whatever Broke

This replacement breaks `UserServiceImpl` hardcoded `User`, but it is a really simple fix.

* Before fix:

    ```java
    private static final User USER_1 =
      User.builder()
          .id(1L)
          .name("Leanne Graham")
          .username("Bret")
          .email("Sincere@april.biz")
          .build();
    ```

* After fix:

    ```java
    private static final User USER_1 =
      new User()
          .id(1L)
          .name("Leanne Graham")
          .username("Bret")
          .email("Sincere@april.biz");
    ```
  
The openapi-generator plugin has a slightly different way of implementing the [Builder design pattern](https://refactoring.guru/design-patterns/builder/typescript/example) compared to Lombok.

