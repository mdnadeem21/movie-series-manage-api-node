// services/bcryptService.js
const bcrypt = require('bcrypt');
const saltRounds = 10;

const bcryptService = {
  hashPassword: (password) => bcrypt.hash(password, saltRounds),
  comparePassword: (password, hash) => bcrypt.compare(password, hash),
};

module.exports = bcryptService;
