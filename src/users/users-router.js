'use strict';
const express = require('express');
const registrationRouter = express.Router();
const jsonBodyParser = express.json();
const UserService = require('./user-service');

registrationRouter.post('/', jsonBodyParser, (req, res, next) => {
  let { user_name, user_password } = req.body;

  for (const field of ['user_name', 'user_password']) {
    if (!req.body[field])
      return res
        .status(400)
        .json({ error: `Missing ${field} in request body` });
  }

  UserService.hasUserWithUserName(req.app.get('db'), user_name)
    .then(dbUser => {
      if (dbUser)
        return res.status(400).json({
          error: 'Username already taken'
        });
      return (user_password = UserService.hashPassword(user_password));
    })
    .then(password => {
      UserService.saveUser(req.app.get('db'), user_name, password).then(
        response =>
          res
            .status(201)
            .json({
              message: `Registation successful for ${response.user_name}`
            })
      );
    })
    .catch(error => console.log(error));
});

module.exports = registrationRouter;

//save request to database and send successful response
