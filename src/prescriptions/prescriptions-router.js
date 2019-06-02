'use strict';
const express = require('express');
const prescriptionsRouter = express.Router();
const jsonBodyParser = express.json();
const prescriptionsService = require('./prescriptions-service');

prescriptionsRouter.get('/:id', (req, res, next) => {
  prescriptionsService
    .getUserPrescriptions(req.app.get('db'), req.params.id)
    .then(response => res.status(200).json({ schedule: response }))
    .catch(next);
});

prescriptionsRouter.post('/', jsonBodyParser, (req, res) => {
  res.status(201).json(req.body);
});

module.exports = prescriptionsRouter;
