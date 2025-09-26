-- =====================
-- TABLE: achievements
-- =====================
CREATE TABLE
    achievements (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        date TIMESTAMP NOT NULL,
        player_id INT REFERENCES players (id) ON DELETE SET NULL,
        team_id INT REFERENCES teams (id) ON DELETE SET NULL,
        entity VARCHAR(50),
        locked BOOLEAN DEFAULT FALSE,
        locked_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );