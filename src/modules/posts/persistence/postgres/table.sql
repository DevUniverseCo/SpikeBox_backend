-- =====================
-- TABLE: posts
-- =====================
CREATE TABLE
    posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        image TEXT,
        author_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        tags VARCHAR[],
        published_at TIMESTAMP,
        locked BOOLEAN DEFAULT FALSE,
        locked_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW (),
        updated_at TIMESTAMP DEFAULT NOW ()
    );