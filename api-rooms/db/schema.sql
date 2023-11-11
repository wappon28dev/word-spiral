DROP TABLE IF EXISTS rooms;

DROP TABLE IF EXISTS users;

CREATE TABLE rooms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  status VARCHAR(255) NOT NULL,
  leader_id INTEGER NOT NULL,
  user_ids VARCHAR(255) NOT NULL,
  data VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL,
  room_id INTEGER
);

INSERT INTO
  users (name, room_id)
VALUES
  ('alice', 1),
  ('bob', 1);

INSERT INTO
  rooms (status, leader_id, user_ids, data)
VALUES
  (
    'TEST',
    1,
    '[1, 2]',
    '{"items": [], "info": { "roomName": "test" }}'
  );