'use strict';
const express = require('express');
const prescriptionsRouter = express.Router();
const jsonBodyParser = express.json();
const PrescriptionsService = require('./prescriptions-service');
const { requireAuth, getIdFromToken } = require('../middleware/jwt-service');

prescriptionsRouter
  .route('/:id')
  .all(requireAuth)
  .get((req, res, next) => {
    PrescriptionsService.getUserPrescriptions(req.app.get('db'), req.params.id)
      .then(response => res.status(200).json({ schedule: response }))
      .catch(next);
  });

prescriptionsRouter
  .route('/')
  .all(requireAuth)
  .post(jsonBodyParser, (req, res) => {
    const { rx_name, days, times } = req.body;
    const user_id = getIdFromToken(req.get('Authorization'));
    const prescription = { rx_name, days, times, user_id };
    PrescriptionsService.addUserPrescriptions(
      req.app.get('db'),
      prescription
    ).then(response => {
      res.status(201).json({ message: `${rx_name} was added` });
    });
  });

module.exports = prescriptionsRouter;
