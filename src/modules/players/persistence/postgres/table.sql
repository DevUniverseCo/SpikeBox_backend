-- =====================
-- TABLE: players
-- =====================
CREATE TABLE
    players (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        birth_date DATE,
        gender VARCHAR,
        height_cm INT,
        weight_kg INT,
        handedness VARCHAR,
        country VARCHAR,
        biography TEXT,
        image_url TEXT,
        contact JSONB,
        platform JSONB,
        locked BOOLEAN DEFAULT FALSE,
        locked_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );