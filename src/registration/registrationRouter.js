'use strict';
const express = require('express');
const registrationRouter = express.Router();
const jsonBodyParser = express.json();

registrationRouter.post('/', jsonBodyParser, (req, res, next) => {
  res.status(201).json(req.body);
});

module.exports = registrationRouter;
