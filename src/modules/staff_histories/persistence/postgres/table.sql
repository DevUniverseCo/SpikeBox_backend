-- =====================
-- TABLE: staff_histories
-- =====================
CREATE TABLE
    staff_histories (
        id SERIAL PRIMARY KEY,
        staff_id INT NOT NULL REFERENCES staff (id) ON DELETE CASCADE,
        team_id INT NOT NULL REFERENCES teams (id) ON DELETE CASCADE,
        season_id INT NOT NULL REFERENCES seasons (id) ON DELETE CASCADE,
        office VARCHAR[],
        locked BOOLEAN DEFAULT FALSE,
        locked_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );