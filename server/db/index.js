var mysql = require('mysql');
var Sequelize = require('sequelize');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
db = new Sequelize('chat', 'root', 'plantlife');

const users = db.define('users', {
  username: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

const messages = db.define('messages', {
  text: Sequelize.STRING,
  roomname: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

messages.belongsTo(users);

users.sync();
messages.sync();

exports.db = db;
exports.users = users;
exports.messages = messages;

// exports.dbConnection = mysql.createConnection({
//   user: 'root',
//   password: 'plantlife',
//   database: 'chat'
// });

//dbConnection.connect();
