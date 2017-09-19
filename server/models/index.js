var db = require('../db/index.js');
var mysql = require('mysql');

module.exports = {
  messages: {
    get: function () {
      return new Promise ((resolve, reject) => {
        db.dbConnection.query('SELECT messages.id, text, roomname, username FROM messages INNER JOIN users ON users.id = messages.user_id;', (err, result) => {
          if (err) {
            reject(err);
          }   
          resolve(result);
        });
      });
    }, // a function which produces all the messages
    post: function (username, text, roomname) {
      return new Promise ((resolve, reject) => {
        db.dbConnection.query(`INSERT IGNORE INTO users (username) VALUES (${'\'' + username + '\''});`, (err, result) => {
          if (err) {
            reject(err);
          }  
          db.dbConnection.query(`INSERT INTO messages (text, user_id, roomname) VALUES (${mysql.escape(text)}, (SELECT id FROM users WHERE username=${mysql.escape(username)}), ${mysql.escape(roomname)});`, (err, result) => {
            if (err) {
              reject(err);
            }
            resolve(result);
          });
        });          
      }); // a function which can be used to insert a message into the database
    }
  },

  users: {
    // Ditto as above.
    get: function () {
      return new Promise ((resolve, reject) => {
        db.dbConnection.query('SELECT * FROM users;', (err, result) => {
          if (err) {
            reject(err);
          }   
          resolve(result);
        });
      });
    },
    post: function (username) {
      return new Promise ((resolve, reject) => {
        db.dbConnection.query(`INSERT IGNORE INTO users (username) VALUES (${'\'' + username + '\''});`, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);          
        });
      });
    }
  }
};

