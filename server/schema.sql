CREATE DATABASE chat;

USE chat;

CREATE TABLE rooms (
  id INT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE users (
  id INT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);


CREATE TABLE messages (
  id INT NOT NULL,
  txt VARCHAR(30) NOT NULL,
  room_id INT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(room_id)
    REFERENCES rooms(id),
  FOREIGN KEY(user_id)
    REFERENCES users(id)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

