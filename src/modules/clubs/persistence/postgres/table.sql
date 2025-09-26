-- =====================
-- TABLE: clubs
-- =====================
CREATE TABLE
    clubs (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        foundation_year INT,
        logo_url TEXT,
        contact JSONB,
        location JSONB,
        platform JSONB,
        locked BOOLEAN DEFAULT FALSE,
        locked_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );