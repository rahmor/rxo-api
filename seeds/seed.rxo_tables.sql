BEGIN;

TRUNCATE users, prescriptions, schedules;

INSERT INTO users (user_name, user_password)
VALUES
  ('dunder', '$2a$12$cmIaVwyCLCMa.wAN/U7uk.6hke29d9iirx4aRB2KX9G/WuQvWMQmW'),
  ('mifflin','$2a$12$GREsE0uLMjvkOAZXP1YmruaFzMDdlTRhy/aRblRutYrQHKuxWYF8C'),
  ('rahim', '$2a$12$fUNlEUpqOzON3W0rMdkK8.5uJ/NpGU8JXRnT69EVK9OzRIP7L1dD6');

INSERT INTO prescriptions (rx_name, user_id)
VALUES
  ('Vicodin', 1),
  ('Simvastatin',3);

INSERT INTO schedules (prescription_id, wednesday, nine)
VALUES
  (1,true,true),
  (2,true,true);

COMMIT;