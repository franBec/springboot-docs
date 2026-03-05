import ZoomContainer from '@site/src/components/zoom-container';
import Mermaid from '@theme/Mermaid';

export const SakilaSchemaDiagram = () => (
  <ZoomContainer>
    <Mermaid
      value={`erDiagram
    COUNTRY {
        SMALLINT COUNTRY_ID PK
        VARCHAR COUNTRY
        TIMESTAMP LAST_UPDATE
    }
    
    CITY {
        SMALLINT CITY_ID PK
        VARCHAR CITY
        SMALLINT COUNTRY_ID FK
        TIMESTAMP LAST_UPDATE
    }
    
    ADDRESS {
        SMALLINT ADDRESS_ID PK
        VARCHAR ADDRESS
        VARCHAR ADDRESS2
        VARCHAR DISTRICT
        SMALLINT CITY_ID FK
        VARCHAR POSTAL_CODE
        VARCHAR PHONE
        TIMESTAMP LAST_UPDATE
    }
    
    LANGUAGE {
        TINYINT LANGUAGE_ID PK
        VARCHAR NAME
        TIMESTAMP LAST_UPDATE
    }
    
    CATEGORY {
        TINYINT CATEGORY_ID PK
        VARCHAR NAME
        TIMESTAMP LAST_UPDATE
    }
    
    ACTOR {
        SMALLINT ACTOR_ID PK
        VARCHAR FIRST_NAME
        VARCHAR LAST_NAME
        TIMESTAMP LAST_UPDATE
    }
    
    FILM {
        SMALLINT FILM_ID PK
        VARCHAR TITLE
        LONGVARCHAR DESCRIPTION
        DATE RELEASE_YEAR
        TINYINT LANGUAGE_ID FK
        TINYINT ORIGINAL_LANGUAGE_ID FK
        TINYINT RENTAL_DURATION
        DECIMAL RENTAL_RATE
        SMALLINT LENGTH
        DECIMAL REPLACEMENT_COST
        VARCHAR RATING
        VARCHAR SPECIAL_FEATURES
        TIMESTAMP LAST_UPDATE
    }
    
    FILM_TEXT {
        SMALLINT FILM_ID PK
        VARCHAR TITLE
        LONGVARCHAR DESCRIPTION
    }
    
    FILM_ACTOR {
        SMALLINT ACTOR_ID PK_FK
        SMALLINT FILM_ID PK_FK
        TIMESTAMP LAST_UPDATE
    }
    
    FILM_CATEGORY {
        SMALLINT FILM_ID PK_FK
        TINYINT CATEGORY_ID PK_FK
        TIMESTAMP LAST_UPDATE
    }
    
    STORE {
        TINYINT STORE_ID PK
        TINYINT MANAGER_STAFF_ID FK
        SMALLINT ADDRESS_ID FK
        TIMESTAMP LAST_UPDATE
    }
    
    STAFF {
        TINYINT STAFF_ID PK
        VARCHAR FIRST_NAME
        VARCHAR LAST_NAME
        SMALLINT ADDRESS_ID FK
        LONGVARBINARY PICTURE
        VARCHAR EMAIL
        TINYINT STORE_ID FK
        BOOLEAN ACTIVE
        VARCHAR USERNAME
        VARCHAR PASSWORD
        TIMESTAMP LAST_UPDATE
    }
    
    CUSTOMER {
        SMALLINT CUSTOMER_ID PK
        TINYINT STORE_ID FK
        VARCHAR FIRST_NAME
        VARCHAR LAST_NAME
        VARCHAR EMAIL
        SMALLINT ADDRESS_ID FK
        BOOLEAN ACTIVE
        TIMESTAMP CREATE_DATE
        TIMESTAMP LAST_UPDATE
    }
    
    INVENTORY {
        INTEGER INVENTORY_ID PK
        SMALLINT FILM_ID FK
        TINYINT STORE_ID FK
        TIMESTAMP LAST_UPDATE
    }
    
    RENTAL {
        INTEGER RENTAL_ID PK
        TIMESTAMP RENTAL_DATE
        INTEGER INVENTORY_ID FK
        SMALLINT CUSTOMER_ID FK
        TIMESTAMP RETURN_DATE
        TINYINT STAFF_ID FK
        TIMESTAMP LAST_UPDATE
    }
    
    PAYMENT {
        SMALLINT PAYMENT_ID PK
        SMALLINT CUSTOMER_ID FK
        TINYINT STAFF_ID FK
        INTEGER RENTAL_ID FK
        DECIMAL AMOUNT
        TIMESTAMP PAYMENT_DATE
        TIMESTAMP LAST_UPDATE
    }

    %% Relationships
    COUNTRY ||--o{ CITY : "has"
    CITY ||--o{ ADDRESS : "has"
    
    ADDRESS ||--o{ CUSTOMER : "lives at"
    ADDRESS ||--o{ STAFF : "lives at"
    ADDRESS ||--o{ STORE : "located at"
    
    LANGUAGE ||--o{ FILM : "language"
    LANGUAGE ||--o{ FILM : "original language"
    
    FILM ||--o{ INVENTORY : "stocked as"
    FILM ||--o{ FILM_ACTOR : "features"
    FILM ||--o{ FILM_CATEGORY : "belongs to"
    
    ACTOR ||--o{ FILM_ACTOR : "acts in"
    CATEGORY ||--o{ FILM_CATEGORY : "categorizes"
    
    STORE ||--o{ INVENTORY : "holds"
    STORE ||--o{ CUSTOMER : "registered at"
    STORE ||--o{ STAFF : "employs"
    STAFF ||--o| STORE : "manages"
    
    INVENTORY ||--o{ RENTAL : "rented as"
    CUSTOMER ||--o{ RENTAL : "makes"
    STAFF ||--o{ RENTAL : "processes"
    
    CUSTOMER ||--o{ PAYMENT : "pays"
    STAFF ||--o{ PAYMENT : "receives"
    RENTAL ||--o{ PAYMENT : "paid by"`}
    />
  </ZoomContainer>
);
