-- =====================
-- TABLE: staff
-- =====================
CREATE TABLE
    staff (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        birth_date DATE,
        country VARCHAR,
        biography TEXT,
        image_url TEXT,
        locked BOOLEAN DEFAULT FALSE,
        locked_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );