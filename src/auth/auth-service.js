'use strict';

const bcrypt = require('bcryptjs');

const AuthService = {
  getUsers(knex) {
    return knex('users').select('*');
  }
};

module.exports = AuthService;
