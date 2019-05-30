'use strict';
const express = require('express');
const loginRouter = express.Router();
const jsonBodyParser = express.json();

loginRouter.post('/', jsonBodyParser, (req, res, next) => {
  res.status(201).json(req.body);
});

module.exports = loginRouter;

//receive response body with credentials
//turn crentials into base 64.
//Check base 64 creds against database
//if true, return jwt token as part of response
//other return invidad token
//make sure token has name
//make sure token has password
//make sure there is a bearer token

//create database
//add table in migrations
//add user in seed
// setup postgrator.config
