'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const AuthService = {
  getUserWithUserName(knex, user_name) {
    return knex
      .from('users')
      .where({ user_name })
      .first();
  },

  comparePasswords(login_password, user_password) {
    return bcrypt.compare(login_password, user_password);
  },
  createJwt(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      algorithm: 'HS256'
    });
  },
  verifyJwt(token) {
    return jwt.verify(token, config.JWT_SECRET, {
      algorithms: ['HS256']
    });
  }
};

module.exports = AuthService;
