-- =====================
-- TABLE: player_histories
-- =====================
CREATE TABLE
    player_histories (
        id SERIAL PRIMARY KEY,
        player_id INT NOT NULL REFERENCES players (id) ON DELETE CASCADE,
        team_id INT NOT NULL REFERENCES teams (id) ON DELETE CASCADE,
        season_id INT NOT NULL REFERENCES seasons (id) ON DELETE CASCADE,
        position VARCHAR,
        jersey_number INT,
        is_captain BOOLEAN DEFAULT FALSE,
        locked BOOLEAN DEFAULT FALSE,
        locked_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );