var models = require('../models');
var mysql = require('mysql');
var dc = require('../db/index.js');

module.exports = {
  messages: {
    get: function (req, res) {
      dc.dbConnection.query(`SELECT * FROM messages;`, (err, result) => {
        if (err) {
          throw err;
        }   
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
      });

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      const {username, message, roomname} = req.body; 

      dc.dbConnection.query(`INSERT INTO messages (text, user_id, roomname) VALUES (${mysql.escape(message)}, (SELECT id FROM users WHERE name=${mysql.escape(username)}), ${mysql.escape(roomname)});`, (err, result) => {
        if (err) {
          throw err;
        }          
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end();
      });

    } 
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      const {username} = req.body;
   
      dc.dbConnection.query(`INSERT IGNORE INTO users (name) VALUES (${'\'' + username + '\''});`, (err, result) => {
        if (err) {
          throw err;
        }          
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end();
      });
    }
  }
};

