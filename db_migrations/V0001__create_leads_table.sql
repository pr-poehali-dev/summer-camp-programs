CREATE TABLE IF NOT EXISTS t_p72901293_summer_camp_programs.leads (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW(),
    name TEXT,
    phone TEXT,
    shift TEXT,
    age TEXT,
    interests TEXT,
    goal TEXT,
    adaptation TEXT,
    experience TEXT,
    duration TEXT,
    priorities TEXT
);