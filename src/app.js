'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const loginRouter = require('./middleware/login');
const registationRouter = require('./registration/registrationRouter');
const prescriptionsRouter = require('./prescriptions/prescriptionsRouter');
const { NODE_ENV } = require('./config');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

const whitelist = [
  'http://localhost:3000',
  'https://rxo-app.rahmor.now.sh/',
  'http://localhost:5000'
];
const options = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
  res.json({ message: 'Hello, world!' });
});
app.use('/api/login', loginRouter);
app.use('/api/register', registationRouter);
app.use('/api/prescriptions', prescriptionsRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
