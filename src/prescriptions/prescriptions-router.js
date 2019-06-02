'use strict';
const express = require('express');
const prescriptionsRouter = express.Router();
const jsonBodyParser = express.json();

prescriptionsRouter.post('/', jsonBodyParser, (req, res, next) => {
  res.status(201).json(req.body);
});

module.exports = prescriptionsRouter;
