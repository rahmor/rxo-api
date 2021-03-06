DROP TABLE IF EXISTS prescriptions;

CREATE TABLE prescriptions (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  rx_name TEXT NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
);