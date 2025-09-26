-- =====================
-- TABLE: achievements
-- =====================
CREATE TABLE
    achievements (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        achieved_at TIMESTAMP NOT NULL,
        season_id INT REFERENCES seasons (id) ON DELETE SET NULL,
        staff_id INT REFERENCES staff (id) ON DELETE SET NULL,
        player_id INT REFERENCES players (id) ON DELETE SET NULL,
        team_id INT REFERENCES teams (id) ON DELETE SET NULL,
        locked BOOLEAN DEFAULT FALSE,
        locked_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );