---
sidebar_position: 3
---

# Consejos y trucos

## Frameworks de testing

Vamos a usar JUnit 5, pero vale la pena conocer otras alternativas:

- [JUnit 5](https://junit.org/junit5/): La última versión con mejoras como tests anidados, tests parametrizados y un mejor modelo de extensiones.
- [JUnit 4](https://junit.org/junit4/): Sigue siendo muy usado en proyectos legacy.
- [Mockito](https://site.mockito.org/): El framework de mocking más popular para Java.
- [Mockk](https://mockk.io/): Una poderosa librería de mocking diseñada específicamente para Kotlin.
- [Spock](https://spockframework.org/): Un framework de testing escrito en Groovy que puede testear código Java, conocido por sus tests en estilo de especificación que resultan muy legibles.

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

El patrón Given-When-Then crea una estructura clara para tus tests, haciéndolos más legibles y fáciles de mantener:

* **Given**: Configura el escenario del test y las condiciones previas.
* **When**: Ejecuta el código que se está testeando.
* **Then**: Verifica los resultados esperados.

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

Podés usar comentarios para separar las secciones o simplemente estructurar tu código en ese orden. Algunos equipos incluso utilizan nombres de métodos descriptivos que siguen este patrón.

## Estructura común de un test en JUnit 5 con Mockito

Una clase de test bien estructurada sigue estas convenciones:

* `@ExtendWith(MockitoExtension.class)`: Integra Mockito con JUnit 5, inicializando los mocks y manejando su ciclo de vida.
* `@InjectMocks`: Crea una instancia de la clase a testear e inyecta en ella las dependencias mockeadas. Es acá donde va tu servicio o componente a probar.
* `@Mock`: Crea implementaciones mock de las dependencias de las que depende la clase testeada.
* `@BeforeEach`: Define una configuración que se ejecuta antes de cada método de test. Usalo para:
    * Crear objetos de datos para los tests.
    * Configurar comportamientos de mocks comunes a varios tests.
    * Inicializar cualquier recurso necesario para testear.
* Métodos de test: Cada método se enfoca en testear un comportamiento o escenario específico.

```java
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

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
    
    private User testUser;  // Datos de prueba comunes
    
    @BeforeEach
    void setUp() {
        // Configuración que se ejecuta antes de cada test
        testUser = new User();
        testUser.setId(1L);
        testUser.setName("Franco");
        testUser.setEmail("franco@example.com");
        
        // Comportamiento común del mock
        when(userRepository.findById(1L)).thenReturn(java.util.Optional.of(testUser));
    }
    
    @Test
    void getUserName_userExists_returnsCorrectName() {
        // Configuración adicional especifica del test
        
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
        // Verifica que se haya enviado el email
        Mockito.verify(emailService).sendEmail(
            testUser.getEmail(), 
            "Welcome!", 
            Mockito.anyString()
        );
    }
}
```

Esta estructura mantiene tus tests limpios, legibles y fáciles de mantener, además de soportar el patrón Given-When-Then.

## Mantén tus mocks simples

Cuando creés mocks, enfocáte solo en lo necesario para el test. Mocks excesivamente complejos hacen que los tests sean frágiles y difíciles de mantener.

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

**No hacés esto**:

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
    // ...y así con mocks innecesarios
    
    // When & Then continúan...
}
```

**Recordá**: Solo mockeá lo que necesites para testear el comportamiento específico que te interesa.

## Nombres de métodos de test

Un buen nombre para un test es como documentación: explica qué debería hacer el código y bajo qué circunstancias.

### Patrones efectivos de nombres

1. methodName_stateUnderTest_expectedBehavior

    ```java
    @Test
    void getUserName_userExists_returnsCorrectName() { ... }
    ```

2. should_expectedBehavior_when_stateUnderTest

    ```java
    @Test
    void shouldReturnCorrectName_whenUserExists() { ... }
    ```

3. given_preconditions_when_stateUnderTest_then_expectedBehavior

    ```java
    @Test
    void givenValidUser_whenGetName_thenReturnsCorrectName() { ... }
    ```

### Uso de @DisplayName

JUnit 5 trae la anotación `@DisplayName`, que te permite dar un nombre más descriptivo y legible a los métodos de test:

```java
@Test
@DisplayName("User repository should return user by ID when user exists")
void findById_existingUser_returnsUser() {
    // Código del test...
}
```

Esto es especialmente útil para los reportes de test y su visualización en el IDE, ya que hace los resultados mucho más fáciles de interpretar sin sacrificar las convenciones de nombres correctas.
