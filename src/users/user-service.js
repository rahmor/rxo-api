'use strict';

const bcrypt = require('bcryptjs');

const UserService = {
  hasUserWithUserName(db, user_name) {
    return db('users')
      .where({ user_name })
      .first()
      .then(user => !!user);
  },

  saveUser(db, user_name, user_password) {
    return db('users')
      .insert({ user_name: user_name, user_password: user_password })
      .into('users')
      .returning('*')
      .then(([user]) => user);
  },

  hashPassword(password) {
    return bcrypt.hash(password, 12);
  }
};

module.exports = UserService;
