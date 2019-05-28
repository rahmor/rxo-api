'use strict';
const express = require('express');

const loginRouter = express.Router();
const jsonBodyParser = express.json();

loginRouter.post('/', jsonBodyParser, (req, res, next) => {
  res.status(201).json(req.body);
});

module.exports = loginRouter;
