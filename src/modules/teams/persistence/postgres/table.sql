-- =====================
-- TABLE: teams
-- =====================
CREATE TABLE
    teams (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        image_url TEXT,
        location JSONB,
        season_id INT NOT NULL REFERENCES seasons (id) ON DELETE CASCADE,
        club_id INT NOT NULL REFERENCES clubs (id) ON DELETE CASCADE,
        level VARCHAR,
        gender VARCHAR,
        leagues VARCHAR[],
        locked BOOLEAN DEFAULT FALSE,
        locked_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );