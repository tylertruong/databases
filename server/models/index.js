var db = require('../db/index.js');
var mysql = require('mysql');

module.exports = {
  messages: {
    get: function () {
      return new Promise ((resolve, reject) => {
        db.messages.findAll({include: [{model: db.users, required: true}]})
          .then(function(messages) {
            resolve(messages);
          });
        

      });
    }, // a function which produces all the messages
    post: function (username, text, roomname) {
      return new Promise ((resolve, reject) => {
        db.users.findOrCreate({ where: {username: username} })
          .then(function (data) {
          })
              .then(function() {
                return db.users.findOne({where: {username: username}});
              })
              .then(function(data) {
                return db.messages.create({username: username, text: text, roomname: roomname, userId: data.dataValues.id});
              })
              .catch(function(err) {
                console.error(err);
              });
      
      }); // a function which can be used to insert a message into the database
    }
  },

  users: {
    // Ditto as above.
    get: function () {
      return new Promise ((resolve, reject) => {
        db.users.findAll()
          .then(function(messages) {
            resolve(messages);
          });
      });
    },
    post: function (username) {
      return new Promise ((resolve, reject) => {
        db.users.sync()
          .then(function() {
            return db.users.findOrCreate({username: username});
          })
          .catch(function(err) {
            console.error(err);
          });

      });
    }
  }
};

