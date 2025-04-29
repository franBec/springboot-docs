---
sidebar_position: 3
---

import YouTube from '@site/src/components/YouTube';

# Tips y trucos

## Frameworks de testing

Vamos a usar JUnit 5, pero vale la pena conocer las alternativas:

* [JUnit 5](https://junit.org/junit5/): La última versión con funcionalidades mejoradas como tests anidados, tests parametrizados y un mejor modelo de extensión.
* [JUnit 4](https://junit.org/junit4/): Todavía muy usado en proyectos legados.
* [Mockito](https://site.mockito.org/): El framework de mocking más popular para Java.
* [Mockk](https://mockk.io/): Una potente librería de mocking diseñada específicamente para Kotlin.
* [Spock](https://spockframework.org/): Un framework de testing escrito en Groovy que puede testear código Java, conocido por sus tests con estilo de especificación legibles.

```java
// Ejemplo de JUnit 5
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class CalculatorTest {
    @Test
    void addsTwoNumbers() {
        assertEquals(4, 2 + 2);
    }
}
```

## Given-when-then

El patrón Given-When-Then crea una estructura clara para tus tests, haciéndolos más legibles y mantenibles:

* **Given**: Configurá el escenario de test y las precondiciones.
* **When**: Ejecutá el código que se está testeando.
* **Then**: Verificá los resultados esperados.

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

Podés usar comentarios para separar secciones o estructurar tu código en este orden.

## Estructura común de un test JUnit 5 con Mockito

Una clase de test bien estructurada sigue estas convenciones:

* `@ExtendWith(MockitoExtension.class)`: Integra Mockito con JUnit 5, inicializando mocks y manejando el ciclo de vida.
* `@InjectMocks`: Crea una instancia de la clase que se está testeando e inyecta las dependencias mockeadas en ella. Acá va tu servicio o componente bajo test.
*  `@Mock`: Crea implementaciones mock de las dependencias de las que depende la clase testeada.
* `@BeforeEach`: Define la configuración que se ejecuta antes de cada método de test. Usala para:
    * Crear objetos de datos de test.
    * Configurar comportamientos de mock comunes a varios tests.
    * Inicializar cualquier recurso necesario para el testing.
    * Métodos de Test: Cada método de test se enfoca en testear un comportamiento o escenario específico.

```java
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.Mockito; // Importación necesaria para Mockito.anyString() y Mockito.verify()

import java.util.Optional; // Importación necesaria para Optional

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)  // Habilita la integración de Mockito con JUnit 5
class UserServiceTest {

    @InjectMocks
    private UserService userService;  // Clase que estamos testeando

    @Mock
    private UserRepository userRepository;  // Dependencia a mockear

    @Mock
    private EmailService emailService;  // Otra dependencia

    private User testUser;  // Datos de test comunes

    @BeforeEach // Este método se ejecuta antes de cada test
    void setUp() {
        // Configuración que se ejecuta antes de cada test
        testUser = new User();
        testUser.setId(1L);
        testUser.setName("Franco");
        testUser.setEmail("franco@example.com");

        // Comportamiento común del mock
        when(userRepository.findById(1L)).thenReturn(java.util.Optional.of(testUser));
    }

    @Test // Declara un método de test
    void getUserName_userExists_returnsCorrectName() {
        // Configuración adicional específica del test

        // When
        String result = userService.getUserName(1L);

        // Then
        assertEquals("Franco", result); // Verifica que el resultado es el nombre esperado
    }

    @Test // Declara otro método de test
    void sendWelcomeEmail_newUser_emailSent() {
        // When
        userService.sendWelcomeEmail(testUser);

        // Then
        // Verifica que se envió el email
        Mockito.verify(emailService).sendEmail(
            testUser.getEmail(),
            "Welcome!",
            Mockito.anyString() // Verifica que el contenido del email es cualquier String
        );
    }
}
```

Esta estructura mantiene tus tests limpios, legibles y mantenibles mientras soporta el patrón Given-When-Then.

## Mantené tus mocks simples

Al crear mocks, enfocáte solo en lo que es necesario para el test. Los mocks excesivamente complejos hacen que los tests sean frágiles y difíciles de mantener.

**Hacé esto**:

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

**No esto**:

```java
@Test
void returnsUserNameWhenUserExists() {
    // Mock innecesariamente complejo con detalles irrelevantes
    User mockUser = Mockito.mock(User.class);
    Mockito.when(mockUser.getName()).thenReturn("Franco");
    Mockito.when(mockUser.getEmail()).thenReturn("franco@example.com");
    Mockito.when(mockUser.getAge()).thenReturn(30);
    Mockito.when(mockUser.getAddress()).thenReturn("123 Spring St");
    Mockito.when(mockUser.isActive()).thenReturn(true);
    // ...y así con mocking innecesario

    // When & Then continúan...
}
```

Mockeá solo lo que necesitás para testear el comportamiento específico que te interesa.

## Nomenclatura de métodos de test

Los buenos nombres de test son como documentación — explican qué debe hacer el código y bajo qué circunstancias.

### Patrones de nomenclatura efectivos

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

### Usando @DisplayName

JUnit 5 introduce la anotación `@DisplayName`, que te permite proporcionar un nombre más descriptivo y legible para los métodos de test:

```java
@Test
@DisplayName("El repositorio de usuarios debe devolver el usuario por ID cuando el usuario existe")
void findById_existingUser_returnsUser() {
    // Código de test...
}
```

Esto es especialmente útil para informes de test y la visualización en el IDE, ya que hace que los resultados de los tests sean mucho más fáciles de interpretar sin sacrificar las convenciones de nomenclatura adecuadas de los métodos.

## Recurso de aprendizaje recomendado

**Te recomiendo mucho** el video de Cody Engel "How To Write Unit Tests (The Right Way)".

<YouTube id="aId-WLZnvkw" />