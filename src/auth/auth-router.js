'use strict';
const express = require('express');
const loginRouter = express.Router();
const jsonBodyParser = express.json();
const AuthService = require('./auth-service');

loginRouter.post('/', jsonBodyParser, (req, res, next) => {
  const { user_name, user_password } = req.body;
  AuthService.getUsers(req.app.get('db')).then(users => console.log(users[0]));
  res.status(201).json({ message: 'Hello, world!' });
});

module.exports = loginRouter;

//receive response body with credentials
//check for existance of all crednetial in object.
//Check base 64 creds against database
//if true, return jwt token as part of response
//other return invidad token
//make sure token has name
//make sure token has password
//make sure there is a bearer token
