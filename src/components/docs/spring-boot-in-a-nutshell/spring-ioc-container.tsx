import ZoomContainer from '@site/src/components/zoom-container';
import Mermaid from '@theme/Mermaid';
import { CollapsibleCodeBlock } from '@site/src/components/collapsible-code-block';

export const SpringIocContainerGraph = () => (
  <ZoomContainer>
    <Mermaid
      value={`graph TD
    subgraph " "
        A["<b>Spring IoC Container</b><br>The central registry"]
    end

    subgraph "Your Classes"
        direction LR
        C1["UserService<br>@Service"]
        C2["UserController<br>@RestController<br>@Autowired"]
    end

    subgraph "Managed Beans in Container"
        direction LR
        B1["userService (instance)"]
        B2["userController (instance)"]
    end

    A -- "1. Scans classes for annotations" --> C1
    A -- "1. Scans classes for annotations" --> C2

    C1 -- "2. Creates bean from class" --> B1
    C2 -- "2. Creates bean from class" --> B2

    B1 -- "3. Injects dependency" --> B2`}
    />
  </ZoomContainer>
);

export const SpringIocContainerGraphES = () => (
  <ZoomContainer>
    <Mermaid
      value={`graph TD
    subgraph " "
        A["<b>Contenedor IoC de Spring</b><br>El registro central"]
    end

    subgraph "Tus Clases"
        direction LR
        C1["UserService<br>@Service"]
        C2["UserController<br>@RestController<br>@Autowired"]
    end

    subgraph "Beans Gestionados en el Contenedor"
        direction LR
        B1["userService (instancia)"]
        B2["userController (instancia)"]
    end

    A -- "1. Escanea clases buscando anotaciones" --> C1
    A -- "1. Escanea clases buscando anotaciones" --> C2

    C1 -- "2. Crea bean a partir de la clase" --> B1
    C2 -- "2. Crea bean a partir de la clase" --> B2

    B1 -- "3. Inyecta dependencia" --> B2`}
    />
  </ZoomContainer>
);

export const AnnotationsLayerJava = () => (
  <CollapsibleCodeBlock language="java">
    {`@Repository  // Data layer
public class UserRepository { ... }

@Service     // Business logic
public class UserService { ... }

@RestController  // API layer
public class UserController { ... }`}
  </CollapsibleCodeBlock>
);

export const AnnotationsLayerKt = () => (
  <CollapsibleCodeBlock language="kt">
    {`@Repository  // Data layer
class UserRepository { ... }

@Service     // Business logic
class UserService { ... }

@RestController  // API layer
class UserController { ... }`}
  </CollapsibleCodeBlock>
);

export const AnnotationsLayerGroovy = () => (
  <CollapsibleCodeBlock language="groovy">
    {`@Repository  // Data layer
class UserRepository { ... }

@Service     // Business logic
class UserService { ... }

@RestController  // API layer
class UserController { ... }`}
  </CollapsibleCodeBlock>
);

export const ConfigurationBeanJava = () => (
  <CollapsibleCodeBlock language="java">
    {`@Configuration
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}`}
  </CollapsibleCodeBlock>
);

export const ConfigurationBeanKt = () => (
  <CollapsibleCodeBlock language="kt">
    {`@Configuration
class SecurityConfig {
    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }
}`}
  </CollapsibleCodeBlock>
);

export const ConfigurationBeanGroovy = () => (
  <CollapsibleCodeBlock language="groovy">
    {`@Configuration
class SecurityConfig {
    @Bean
    PasswordEncoder passwordEncoder() {
        new BCryptPasswordEncoder()
    }
}`}
  </CollapsibleCodeBlock>
);

export const ProfileBeanJava = () => (
  <CollapsibleCodeBlock language="java">
    {`@Profile("dev")
@Service
public class MockPaymentService implements PaymentService { ... }`}
  </CollapsibleCodeBlock>
);

export const ProfileBeanKt = () => (
  <CollapsibleCodeBlock language="kt">
    {`@Profile("dev")
@Service
class MockPaymentService : PaymentService { ... }`}
  </CollapsibleCodeBlock>
);

export const ProfileBeanGroovy = () => (
  <CollapsibleCodeBlock language="groovy">
    {`@Profile("dev")
@Service
class MockPaymentService implements PaymentService { ... }`}
  </CollapsibleCodeBlock>
);

export const AnnotationSoupJava = () => (
  <CollapsibleCodeBlock language="java">
    {`@Component @Service  // Redundant!
public class UserService { ... }`}
  </CollapsibleCodeBlock>
);

export const AnnotationSoupKt = () => (
  <CollapsibleCodeBlock language="kt">
    {`@Component @Service  // Redundant!
class UserService { ... }`}
  </CollapsibleCodeBlock>
);

export const AnnotationSoupGroovy = () => (
  <CollapsibleCodeBlock language="groovy">
    {`@Component @Service  // Redundant!
class UserService { ... }`}
  </CollapsibleCodeBlock>
);

export const ConstructorInjectionJava = () => (
  <CollapsibleCodeBlock language="java">
    {`@RestController
public class CheckoutController {

    private final PaymentService paymentService;

    // You ask for the "what" (the interface) in your constructor
    public CheckoutController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    //Controller logic...
}`}
  </CollapsibleCodeBlock>
);

export const ConstructorInjectionKt = () => (
  <CollapsibleCodeBlock language="kt">
    {`@RestController
class CheckoutController(private val paymentService: PaymentService) {
    // In Kotlin, the primary constructor is concise and does the same thing.

    //Controller logic...
}`}
  </CollapsibleCodeBlock>
);

export const ConstructorInjectionGroovy = () => (
  <CollapsibleCodeBlock language="groovy">
    {`@RestController
class CheckoutController {

    private final PaymentService paymentService

    // You ask for the "what" (the interface) in your constructor
    CheckoutController(PaymentService paymentService) {
        this.paymentService = paymentService
    }

    //Controller logic...
}`}
  </CollapsibleCodeBlock>
);

export const RequiredArgsConstructor = () => (
  <CollapsibleCodeBlock language="java">
    {`@RestController
@RequiredArgsConstructor // <-- Lombok annotation
public class CheckoutController {

    private final PaymentService paymentService;

    //Controller logic
}`}
  </CollapsibleCodeBlock>
);

export const KtPrimaryConstructor = () => (
  <CollapsibleCodeBlock language="kt">
    {`@RestController
// In Kotlin, this is built into the language with primary constructors.
class CheckoutController(private val paymentService: PaymentService) {
    //Controller logic
}`}
  </CollapsibleCodeBlock>
);

export const GroovyImmutable = () => (
  <CollapsibleCodeBlock language="groovy">
    {`@RestController
@Immutable // This generates a constructor for all properties
class CheckoutController {
    PaymentService paymentService

    //Controller logic
}`}
  </CollapsibleCodeBlock>
);

export const SetterInjectionJava = () => (
  <CollapsibleCodeBlock language="java">
    {`@RestController
public class CheckoutController {

    private PaymentService paymentService;

    @Autowired
    public void setPaymentService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
    //...
}`}
  </CollapsibleCodeBlock>
);

export const SetterInjectionKt = () => (
  <CollapsibleCodeBlock language="kt">
    {`@RestController
class CheckoutController {

    @Autowired
    lateinit var paymentService: PaymentService
    //...
}`}
  </CollapsibleCodeBlock>
);

export const SetterInjectionGroovy = () => (
  <CollapsibleCodeBlock language="groovy">
    {`@RestController
class CheckoutController {

    PaymentService paymentService

    @Autowired
    void setPaymentService(PaymentService paymentService) {
        this.paymentService = paymentService
    }
    //...
}`}
  </CollapsibleCodeBlock>
);

export const FieldInjectionJava = () => (
  <CollapsibleCodeBlock language="java">
    {`@RestController
public class CheckoutController {

    @Autowired
    private PaymentService paymentService;

    //...
}`}
  </CollapsibleCodeBlock>
);

export const FieldInjectionKt = () => (
  <CollapsibleCodeBlock language="kt">
    {`@RestController
class CheckoutController {

    @Autowired
    private lateinit var paymentService: PaymentService

    //...
}`}
  </CollapsibleCodeBlock>
);

export const FieldInjectionGroovy = () => (
  <CollapsibleCodeBlock language="groovy">
    {`@RestController
class CheckoutController {

    @Autowired
    private PaymentService paymentService

    //...
}`}
  </CollapsibleCodeBlock>
);
