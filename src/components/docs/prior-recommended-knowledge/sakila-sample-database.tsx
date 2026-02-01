import { CollapsibleCodeBlock } from '@site/src/components/collapsible-code-block';
import ZoomContainer from '@site/src/components/zoom-container';
import Mermaid from '@theme/Mermaid';

export const SakilaSchemaDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`
erDiagram
    %% Geographic hierarchies
    COUNTRY ||--|{ CITY : "has"
    CITY ||--|{ ADDRESS : "has"

    %% The Address hub (everything links here)
    ADDRESS ||--|{ STORE : "location for"
    ADDRESS ||--|{ CUSTOMER : "home of"
    ADDRESS ||--|{ STAFF : "home of"

    %% Store and Staff (The circular dependency joy)
    STORE ||--|{ STAFF : "employs"
    STORE ||--|{ INVENTORY : "stocks"
    STORE ||--|{ CUSTOMER : "registration point"

    %% Implicit relationship: A store has a manager (Staff),
    %% represented by fk_store_staff in the schema usually.

    %% Customer interactions
    CUSTOMER ||--|{ RENTAL : "rents"
    CUSTOMER ||--|{ PAYMENT : "pays"

    %% Staff interactions
    STAFF ||--|{ RENTAL : "processes"
    STAFF ||--|{ PAYMENT : "processes"

    %% Inventory and Rentals
    INVENTORY ||--|{ RENTAL : "item rented"
    RENTAL ||--|{ PAYMENT : "generates"

    %% The Film Catalog (The core product)
    FILM ||--|{ INVENTORY : "in stock"
    LANGUAGE ||--|{ FILM : "original/dubbed"

    %% Many-to-Many resolutions (Junction Tables)
    FILM ||--|{ FILM_ACTOR : "features"
    ACTOR ||--|{ FILM_ACTOR : "acts in"

    FILM ||--|{ FILM_CATEGORY : "categorized as"
    CATEGORY ||--|{ FILM_CATEGORY : "contains"

    %% Table Definitions (Pragmatic Subset of Columns)
    COUNTRY {
        smallint country_id PK
        varchar country
    }
    CITY {
        smallint city_id PK
        smallint country_id FK
        varchar city
    }
    ADDRESS {
        smallint address_id PK
        smallint city_id FK
        varchar address
        varchar district
        varchar postal_code
        varchar phone
    }
    STORE {
        tinyint store_id PK
        tinyint manager_staff_id FK
        smallint address_id FK
    }
    STAFF {
        tinyint staff_id PK
        tinyint store_id FK
        smallint address_id FK
        varchar first_name
        varchar last_name
        blob picture
    }
    CUSTOMER {
        smallint customer_id PK
        tinyint store_id FK
        smallint address_id FK
        varchar first_name
        varchar last_name
        timestamp create_date
    }
    INVENTORY {
        mediumint inventory_id PK
        smallint film_id FK
        tinyint store_id FK
    }
    RENTAL {
        int rental_id PK
        mediumint inventory_id FK
        smallint customer_id FK
        tinyint staff_id FK
        datetime rental_date
        datetime return_date
    }
    PAYMENT {
        smallint payment_id PK
        smallint customer_id FK
        tinyint staff_id FK
        int rental_id FK
        decimal amount
    }
    FILM {
        smallint film_id PK
        tinyint language_id FK
        tinyint original_language_id FK
        varchar title
        text description
        year release_year
    }
    LANGUAGE {
        tinyint language_id PK
        char name
    }
    ACTOR {
        smallint actor_id PK
        varchar first_name
        varchar last_name
    }
    CATEGORY {
        tinyint category_id PK
        varchar name
    }
    FILM_ACTOR {
        smallint actor_id PK,FK
        smallint film_id PK,FK
    }
    FILM_CATEGORY {
        smallint film_id PK,FK
        tinyint category_id PK,FK
    }

`}
    />
  </ZoomContainer>
);
