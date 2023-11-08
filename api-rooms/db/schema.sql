DROP TABLE IF EXISTS rooms;

CREATE TABLE rooms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  status VARCHAR(255) NOT NULL,
  leader VARCHAR(255),
  users VARCHAR(255) NOT NULL,
  items VARCHAR(255) NOT NULL
);

INSERT INTO
  rooms (status, leader, users, items)
VALUES
  (
    'READY',
    'alice',
    '["alice", "bob"]',
    '[{"user": "alice", "word": "word"}]'
  );