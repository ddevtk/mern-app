const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'admin',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('thachraucau', 10),
    isAdmin: true,
  },
  {
    name: 'duong',
    email: 'duong@gmail.com',
    password: bcrypt.hashSync('thachraucau', 10),
  },
];
module.exports = users;
