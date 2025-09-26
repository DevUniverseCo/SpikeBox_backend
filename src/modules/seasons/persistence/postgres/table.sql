-- =====================
-- TABLE: seasons
-- =====================
CREATE TABLE
    seasons (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        season VARCHAR(255) NOT NULL,
        locked BOOLEAN DEFAULT FALSE,
        locked_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );