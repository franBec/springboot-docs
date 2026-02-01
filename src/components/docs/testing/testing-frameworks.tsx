import { CollapsibleCodeBlock } from '@site/src/components/collapsible-code-block';
import ZoomContainer from '@site/src/components/zoom-container';
import Mermaid from '@theme/Mermaid';

export const JUnit5BasicStructure = () => (
  <CollapsibleCodeBlock
    language="java"
    title="java/com/example/service/FilmServiceTest.java"
  >
    {`@SpringBootTest
class FilmServiceTest {

    @Autowired
    private FilmService filmService;

    @MockBean
    private FilmRepository filmRepository;

    @Test
    void whenFilmExists_thenReturnFilm() {
        Film mockFilm = new Film("ACADEMY DINOSAUR", "A Epic Drama of a Feminist Pilot who must battle a Dentist in Australia", 2006);
        when(filmRepository.findById(1L)).thenReturn(Optional.of(mockFilm));

        Film result = filmService.getFilmById(1L);

        assertThat(result.getTitle()).isEqualTo("ACADEMY DINOSAUR");
        assertThat(result.getDescription()).contains("Drama");
    }

    @Test
    void whenFilmNotExists_thenThrowException() {
        when(filmRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> filmService.getFilmById(999L))
            .isInstanceOf(FilmNotFoundException.class);
    }
}`}
  </CollapsibleCodeBlock>
);

export const KotlinMockkExample = () => (
  <CollapsibleCodeBlock
    language="kotlin"
    title="kotlin/com/example/service/FilmServiceTest.kt"
  >
    {`@ExtendWith(MockKExtension::class)
class FilmServiceTest {

    @InjectMockKs
    private lateinit var filmService: FilmService

    @MockK
    private lateinit var filmRepository: FilmRepository

    @Test
    fun \`when film exists, return film\`() = every { filmRepository.findById(1L) } returns Film("ACADEMY DINOSAUR", "A Epic Drama", 2006)

    val result = filmService.getFilmById(1L)

    assertThat(result.title).isEqualTo("ACADEMY DINOSAUR")
    assertThat(result.description).contains("Drama")
}

    @Test
    fun \`when film not exists, throw exception\`() = every { filmRepository.findById(999L) } returns null {
        assertThrows<FilmNotFoundException> { filmService.getFilmById(999L) }
    }
}`}
  </CollapsibleCodeBlock>
);

export const SpockBasicStructure = () => (
  <CollapsibleCodeBlock
    language="groovy"
    title="groovy/com/example/service/FilmServiceSpec.groovy"
  >
    {`@SpringBootTest
class FilmServiceSpec extends Specification {

    FilmService filmService
    FilmRepository filmRepository = Mock()

    def setup() {
        filmService = new FilmService(filmRepository)
    }

    def "when film exists, return film"() {
        given: "a mock film"
        Film mockFilm = new Film("ACADEMY DINOSAUR", "A Epic Drama of a Feminist Pilot", 2006)

        and: "the repository returns the film"
        1 * filmRepository.findById(1L) >> Optional.of(mockFilm)

        when: "we request the film"
        Film result = filmService.getFilmById(1L)

        then: "we get the expected film"
        result.title == "ACADEMY DINOSAUR"
        result.releaseYear == 2006
    }

    def "when film not exists, throw exception"() {
        given: "no film in repository"
        1 * filmRepository.findById(999L) >> Optional.empty()

        when: "we request a non-existent film"
        filmService.getFilmById(999L)

        then: "we get an exception"
        thrown(FilmNotFoundException)
    }
}`}
  </CollapsibleCodeBlock>
);

export const TestingFrameworkDecisionGraph = () => (
  <ZoomContainer>
    <Mermaid
      value={`graph TD
    Start([What testing framework should I use?]) --> Lang{What language is your<br/>production code?}
    
    Lang -->|Java| Java1{Do you want tests<br/>in pure Java?}
    Lang -->|Kotlin| Kotlin1{Comfortable with<br/>Kotlin-native tools?}
    Lang -->|Groovy| Groovy1[Use Spock<br/>It's the natural choice]
    
    Java1 -->|Yes| Java2{Need advanced<br/>data-driven testing?}
    Java1 -->|No, open to Groovy| Spock1[Use Spock<br/>Best readability + power]
    
    Java2 -->|Yes| Spock2[Use Spock<br/>Data tables are unmatched]
    Java2 -->|No| JUnit1[Use JUnit 5 + Mockito<br/>Industry standard]
    
    Kotlin1 -->|Yes| MockK1[Use JUnit 5 + MockK<br/>Kotlin-first mocking]
    Kotlin1 -->|No| Mockito1{Okay with<br/>Mockito workarounds?}
    
    Mockito1 -->|Yes| JUnit2[Use JUnit 5 + Mockito<br/>More verbose in Kotlin]
    Mockito1 -->|No| Spock3[Use Spock<br/>Groovy is JVM-compatible]
    
    style Spock1 stroke:#000,stroke-width:4px
    style Spock2 stroke:#000,stroke-width:4px
    style Spock3 stroke:#000,stroke-width:4px
    style Groovy1 stroke:#000,stroke-width:4px
    style JUnit1 stroke:#555,stroke-width:4px,stroke-dasharray: 5 5
    style JUnit2 stroke:#555,stroke-width:4px,stroke-dasharray: 5 5
    style MockK1 stroke:#333,stroke-width:4px,stroke-dasharray: 2 2`}
    />
  </ZoomContainer>
);

export const TestingFrameworkDecisionGraphES = () => (
  <ZoomContainer>
    <Mermaid
      value={`graph TD
    Start([¿Qué framework de testing debería usar?]) --> Lang{¿En qué lenguaje está<br/>tu código de producción?}
    
    Lang -->|Java| Java1{¿Quieres tests<br/>en Java puro?}
    Lang -->|Kotlin| Kotlin1{¿Te sientes cómodo con<br/>herramientas nativas de Kotlin?}
    Lang -->|Groovy| Groovy1[Usa Spock<br/>Es la elección natural]
    
    Java1 -->|Sí| Java2{¿Necesitas testing<br/>data-driven avanzado?}
    Java1 -->|No, abierto a Groovy| Spock1[Usa Spock<br/>Mejor legibilidad + potencia]
    
    Java2 -->|Sí| Spock2[Usa Spock<br/>Las tablas de datos son inigualables]
    Java2 -->|No| JUnit1[Usa JUnit 5 + Mockito<br/>Estándar de la industria]
    
    Kotlin1 -->|Sí| MockK1[Usa JUnit 5 + MockK<br/>Mocking pensado para Kotlin]
    Kotlin1 -->|No| Mockito1{¿Aceptas los<br/>workarounds de Mockito?}
    
    Mockito1 -->|Sí| JUnit2[Usa JUnit 5 + Mockito<br/>Más verboso en Kotlin]
    Mockito1 -->|No| Spock3[Usa Spock<br/>Groovy es compatible con JVM]
    
    style Spock1 stroke:#000,stroke-width:4px
    style Spock2 stroke:#000,stroke-width:4px
    style Spock3 stroke:#000,stroke-width:4px
    style Groovy1 stroke:#000,stroke-width:4px
    style JUnit1 stroke:#555,stroke-width:4px,stroke-dasharray: 5 5
    style JUnit2 stroke:#555,stroke-width:4px,stroke-dasharray: 5 5
    style MockK1 stroke:#333,stroke-width:4px,stroke-dasharray: 2 2`}
    />
  </ZoomContainer>
);
