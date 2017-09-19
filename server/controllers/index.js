var models = require('../models');
var mysql = require('mysql');
var dc = require('../db/index.js');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get()
        .then((result) => {
          var data = {};
          data.results = result;
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(data));
        });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      });
      req.on('end', () => {
        body = body.toString();
        body = JSON.parse(body);
        const {username, text, roomname} = body; 
        models.messages.post(username, text, roomname)
          .then((result) => {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(result));
          });
      });
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get()
        .then((result) => {
          var data = {};
          data.results = result;
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(data));
        });
    },
    post: function (req, res) {
      const {username} = req.body;
      models.users.post(username)
        .then((result) => {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(result));
        });
    }
  }
};

