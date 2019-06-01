'use strict';
const express = require('express');
const registrationRouter = express.Router();
const jsonBodyParser = express.json();

registrationRouter.post('/', jsonBodyParser, (req, res, next) => {
  const db = req.app.get('db');

  db('users')
    .select('*')
    .then(response => console.log(response));
  res.status(201).json(req.body);
});

module.exports = registrationRouter;

//receive response body with credentials
//turn crentials into base 64.
//Check base 64 creds against database
//if true, return jwt token as part of response
//other return invidad token
//make sure token has name
//make sure token has password
//make sure there is a bearer token
