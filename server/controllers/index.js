var models = require('../models');
var mysql = require('mysql');
var dc = require('../db/index.js');

module.exports = {
  messages: {
    get: function (req, res) {}, // a function which handles a get request for all messages
    post: function (req, res) {
      const {username, message, roomname} = req.body; 
      console.log(username, message, roomname);

      dc.dbConnection.query(`INSERT INTO messages (txt, user_id) VALUES (${mysql.escape(message)}, (SELECT id FROM users WHERE name=${mysql.escape(username)}));`, (err, result) => {
        if (err) {
          throw err;
        }          
        console.log('result', result);
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
   
      dc.dbConnection.query(`INSERT INTO users (name) VALUES (${'\'' + username + '\''});`, (err, result) => {
        if (err) {
          throw err;
        }          
        console.log('result', result);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end();
      });
    }
  }
};

