CREATE TABLE IF NOT EXISTS t_p72901293_summer_camp_programs.visits (
    id SERIAL PRIMARY KEY,
    visited_at TIMESTAMP DEFAULT NOW(),
    visitor_id TEXT NOT NULL UNIQUE
);