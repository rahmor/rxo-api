TRUNCATE users, prescriptions, schedules;

INSERT INTO users (user_name, user_password)
VALUES
  ('dunder', '$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne'),
  ('b.deboop','$2a$12$VQ5HgWm34QQK2rJyLc0lmu59cy2jcZiV6U1.bE8rBBnC9VxDf/YQO'),
  ('c.bloggs', '$2a$12$2fv9OPgM07xGnhDbyL6xsuAeQjAYpZx/3V2dnu0XNIR27gTeiK2gK');

INSERT INTO prescriptions (rx_name, user_id)
VALUES
  ('Vicodin', 1),
  ('Simvastatin',3);

INSERT INTO schedules (prescription_id, wednesday, nine)
VALUES
  (1,true,true),
  (2,true,true);
