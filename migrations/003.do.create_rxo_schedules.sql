DROP TABLE IF EXISTS schedules;

CREATE TABLE schedules (
id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
prescription_id INTEGER REFERENCES prescriptions(id) ON DELETE CASCADE NOT NULL,
sunday BOOLEAN DEFAULT FALSE NOT NULL,
monday BOOLEAN DEFAULT FALSE NOT NULL,
tuesday BOOLEAN DEFAULT FALSE NOT NULL,
wednesday BOOLEAN DEFAULT FALSE NOT NULL,
thursday BOOLEAN DEFAULT FALSE NOT NULL,
friday BOOLEAN DEFAULT FALSE NOT NULL,
saturday BOOLEAN DEFAULT FALSE NOT NULL
);