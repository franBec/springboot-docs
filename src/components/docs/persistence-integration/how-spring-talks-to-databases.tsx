import CodeBlock from '@theme/CodeBlock';
import Mermaid from '@theme/Mermaid';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import ZoomContainer from '@site/src/components/zoom-container';

export const RawJdbcExample = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <CodeBlock language="java" title="Raw JDBC query">
        {`import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

Connection conn = DriverManager.getConnection(
    "jdbc:postgresql://localhost:5432/sakila", "user", "password"
);

PreparedStatement stmt = conn.prepareStatement(
    "SELECT film_id, title FROM film WHERE release_year = ?"
);
stmt.setInt(1, 2006);

ResultSet rs = stmt.executeQuery();
while (rs.next()) {
    int id       = rs.getInt("film_id");
    String title = rs.getString("title");
    System.out.println(id + ": " + title);
}

rs.close();
stmt.close();
conn.close();`}
      </CodeBlock>
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <CodeBlock language="kotlin" title="Raw JDBC query">
        {`import java.sql.DriverManager

val conn = DriverManager.getConnection(
    "jdbc:postgresql://localhost:5432/sakila", "user", "password"
)

val stmt = conn.prepareStatement(
    "SELECT film_id, title FROM film WHERE release_year = ?"
)
stmt.setInt(1, 2006)

val rs = stmt.executeQuery()
while (rs.next()) {
    val id    = rs.getInt("film_id")
    val title = rs.getString("title")
    println("\$id: \$title")
}

rs.close()
stmt.close()
conn.close()`}
      </CodeBlock>
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <CodeBlock language="groovy" title="Raw JDBC query">
        {`import java.sql.DriverManager

def conn = DriverManager.getConnection(
    'jdbc:postgresql://localhost:5432/sakila', 'user', 'password'
)

def stmt = conn.prepareStatement(
    'SELECT film_id, title FROM film WHERE release_year = ?'
)
stmt.setInt(1, 2006)

def rs = stmt.executeQuery()
while (rs.next()) {
    def id    = rs.getInt('film_id')
    def title = rs.getString('title')
    println "\$id: \$title"
}

rs.close()
stmt.close()
conn.close()`}
      </CodeBlock>
    </TabItem>
  </Tabs>
);

export const HibernateEntityExample = () => (
  <CodeBlock language="java" title="Film.java">
    {`@Entity
@Table(name = "film")
public class Film {

    @Id
    @Column(name = "film_id")
    private Integer filmId;

    @Column(name = "title")
    private String title;

    @Column(name = "release_year")
    private Integer releaseYear;
}`}
  </CodeBlock>
);

export const EntityManagerExample = () => (
  <Tabs groupId="language" queryString>
    <TabItem value="java" label="Java" default>
      <CodeBlock language="java" title="FilmRepository.java">
        {`import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
public class FilmRepository {

    @PersistenceContext
    private EntityManager em;

    public Film findById(Integer id) {
        return em.find(Film.class, id);
    }

    public void save(Film film) {
        em.persist(film);
    }
}`}
      </CodeBlock>
    </TabItem>
    <TabItem value="kotlin" label="Kotlin">
      <CodeBlock language="kotlin" title="FilmRepository.kt">
        {`import jakarta.persistence.EntityManager
import jakarta.persistence.PersistenceContext

@Repository
class FilmRepository {

    @PersistenceContext
    private lateinit var em: EntityManager

    fun findById(id: Int): Film? =
        em.find(Film::class.java, id)

    fun save(film: Film) =
        em.persist(film)
}`}
      </CodeBlock>
    </TabItem>
    <TabItem value="groovy" label="Groovy">
      <CodeBlock language="groovy" title="FilmRepository.groovy">
        {`import jakarta.persistence.EntityManager
import jakarta.persistence.PersistenceContext

@Repository
class FilmRepository {

    @PersistenceContext
    EntityManager em

    Film findById(Integer id) {
        em.find(Film, id)
    }

    void save(Film film) {
        em.persist(film)
    }
}`}
      </CodeBlock>
    </TabItem>
  </Tabs>
);

export const SpringDataJpaInterfaceExample = () => (
  <CodeBlock language="java" title="FilmRepository.java">
    {`public interface FilmRepository extends JpaRepository<Film, Integer> {
    List<Film> findByReleaseYear(Integer year);
}`}
  </CodeBlock>
);

export const StackDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`sequenceDiagram
    participant App as Your Code
    participant SDJ as Spring Data JPA
    participant JPA as JPA / EntityManager
    participant Hib as Hibernate
    participant JDBC as JDBC
    participant Drv as JDBC Driver
    participant DB as Database

    App->>SDJ: filmRepository.findByReleaseYear(2006)
    SDJ->>JPA: invoke generated query
    JPA->>Hib: resolve entity mapping
    Hib->>JDBC: prepareStatement("SELECT … WHERE release_year = ?")
    JDBC->>Drv: bind params & execute
    Drv->>DB: SQL request over wire
    DB-->>Drv: result rows
    Drv-->>JDBC: ResultSet
    JDBC-->>Hib: ResultSet
    Hib-->>JPA: map rows → Film entities
    JPA-->>SDJ: managed Film objects
    SDJ-->>App: List of Film`}
    />
  </ZoomContainer>
);
