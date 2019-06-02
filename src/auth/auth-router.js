'use strict';
const express = require('express');
const loginRouter = express.Router();
const jsonBodyParser = express.json();
const AuthService = require('./auth-service');

loginRouter.post('/', jsonBodyParser, (req, res, next) => {
  const { user_name, user_password } = req.body;
  const loginUser = { user_name, user_password };

  for (const field of ['user_name', 'user_password']) {
    if (!req.body[field])
      return res
        .status(400)
        .json({ error: `Missing ${field} in request body` });
  }

  AuthService.getUserWithUserName(req.app.get('db'), loginUser.user_name)
    .then(dbUser => {
      if (!dbUser)
        return res.status(400).json({
          error: 'Incorrect user_name or password'
        });

      return AuthService.comparePasswords(
        loginUser.user_password,
        dbUser.user_password
      ).then(compareMatch => {
        if (!compareMatch)
          return res.status(400).json({
            error: 'Incorrect user_name or password'
          });

        const sub = dbUser.user_name;
        const payload = { user_id: dbUser.id };
        //fix response with and return json
        res.send({
          authToken: AuthService.createJwt(sub, payload)
        });
      });
    })
    .catch(next);
});

module.exports = loginRouter;
