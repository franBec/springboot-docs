---
sidebar_position: 3
---

import YouTube from '@site/src/components/YouTube';

# Tips and Tricks

## Testing Frameworks

We're going to be using JUnit 5, but it's worth knowing about alternatives:

- [JUnit 5](https://junit.org/junit5/): The latest version with improved features like nested tests, parameterized tests, and a better extension model.
- [JUnit 4](https://junit.org/junit4/): Still widely used in legacy projects.
- [Mockito](https://site.mockito.org/): The most popular mocking framework for Java.
- [Mockk](https://mockk.io/): A powerful mocking library designed specifically for Kotlin.
- [Spock](https://spockframework.org/): A testing framework written in Groovy that can test Java code, known for its readable specification-style tests.

```java
// JUnit 5 example
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class CalculatorTest {
    @Test
    void addsTwoNumbers() {
        assertEquals(4, 2 + 2);
    }
}
```

## Given-When-Then

The Given-When-Then pattern creates a clear structure for your tests, making them more readable and maintainable:

* **Given**: Set up the test scenario and preconditions.
* **When**: Execute the code being tested.
* **Then**: Verify the expected outcomes.

```java
@Test
void withdrawReducesBalance() {
    // Given
    Account account = new Account();
    account.deposit(100.0);
    
    // When
    account.withdraw(30.0);
    
    // Then
    assertEquals(70.0, account.getBalance());
}
```

You can use comments to separate sections or structure your code in this order.

## Common Structure of a JUnit 5 Test with Mockito

A well-structured test class follows these conventions:

* `@ExtendWith(MockitoExtension.class)`: Integrates Mockito with JUnit 5, initializing mocks and handling lifecycle.
* `@InjectMocks`: Creates an instance of the class being tested and injects mocked dependencies into it. This is where your service or component under test goes.
* `@Mock`: Creates mock implementations of dependencies that the tested class relies on.
* `@BeforeEach`: Defines setup that runs before each test method. Use this for:
   * Creating test data objects.
   * Setting up mock behavior that's common across tests.
   * Initializing any resources needed for testing.
   * Test Methods: Each test method focuses on testing a specific behavior or scenario.

```java
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)  // Enables Mockito integration with JUnit 5
class UserServiceTest {

    @InjectMocks
    private UserService userService;  // Class we're testing
    
    @Mock
    private UserRepository userRepository;  // Dependency to be mocked
    
    @Mock
    private EmailService emailService;  // Another dependency
    
    private User testUser;  // Common test data
    
    @BeforeEach
    void setUp() {
        // Setup that runs before each test
        testUser = new User();
        testUser.setId(1L);
        testUser.setName("Franco");
        testUser.setEmail("franco@example.com");
        
        // Common mock behavior
        when(userRepository.findById(1L)).thenReturn(java.util.Optional.of(testUser));
    }
    
    @Test
    void getUserName_userExists_returnsCorrectName() {
        // Additional test-specific setup
        
        // When
        String result = userService.getUserName(1L);
        
        // Then
        assertEquals("Franco", result);
    }
    
    @Test
    void sendWelcomeEmail_newUser_emailSent() {
        // When
        userService.sendWelcomeEmail(testUser);
        
        // Then
        // Verify email was sent
        Mockito.verify(emailService).sendEmail(
            testUser.getEmail(), 
            "Welcome!", 
            Mockito.anyString()
        );
    }
}
```

This structure keeps your tests clean, readable, and maintainable while supporting the Given-When-Then pattern.

## Keep Your Mocks Simple

When creating mocks, focus only on what's necessary for the test. Overly complex mocks make tests fragile and difficult to maintain.

**Do this**:

```java
@Test
void returnsUserNameWhenUserExists() {
    // Given
    User mockUser = Mockito.mock(User.class);
    Mockito.when(mockUser.getName()).thenReturn("Franco");
    Mockito.when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
    
    // When
    String name = userService.getUserName(1L);
    
    // Then
    assertEquals("Franco", name);
}
```

**Not this**:

```java
@Test
void returnsUserNameWhenUserExists() {
    // Unnecessarily complex mock with irrelevant details
    User mockUser = Mockito.mock(User.class);
    Mockito.when(mockUser.getName()).thenReturn("Franco");
    Mockito.when(mockUser.getEmail()).thenReturn("franco@example.com");
    Mockito.when(mockUser.getAge()).thenReturn(30);
    Mockito.when(mockUser.getAddress()).thenReturn("123 Spring St");
    Mockito.when(mockUser.isActive()).thenReturn(true);
    // ...and so on with unnecessary mocking
    
    // When & Then continue...
}
```

Only mock what you need to test the specific behavior you're interested in.

## Naming Test Methods

Good test names are like documentation—they explain what the code should do and under what circumstances.

### Effective Naming Patterns

1. `methodName_stateUnderTest_expectedBehavior`

    ```java
    @Test
    void getUserName_userExists_returnsCorrectName() { ... }
    ```

2. `should_expectedBehavior_when_stateUnderTest`

    ```java
    @Test
    void shouldReturnCorrectName_whenUserExists() { ... }
    ```

3. `given_preconditions_when_stateUnderTest_then_expectedBehavior`

    ```java
    @Test
    void givenValidUser_whenGetName_thenReturnsCorrectName() { ... }
    ```

### Using @DisplayName

JUnit 5 introduces the `@DisplayName` annotation, which allows you to provide a more descriptive, human-readable name for test methods:

```java
@Test
@DisplayName("User repository should return user by ID when user exists")
void findById_existingUser_returnsUser() {
    // Test code...
}
```

This is especially useful for test reports and IDE display, as it makes test results much easier to interpret without sacrificing proper method naming conventions.

## Recommended Learning Resource

**I really recommend** Cody Engel's video "How To Write Unit Tests (The Right Way)".

<YouTube id="aId-WLZnvkw" />