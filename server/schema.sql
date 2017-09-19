drop database if exists chat;

CREATE DATABASE chat;

USE chat;

/*
CREATE TABLE rooms (
  id INT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);
*/
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL UNIQUE KEY
);


CREATE TABLE messages (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  text VARCHAR(300) NOT NULL,
  roomname VARCHAR(300) NOT NULL,
  user_id INT,
  FOREIGN KEY(user_id)
    REFERENCES users(id)
);



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

