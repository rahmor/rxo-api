const knex = require('knex');
require('dotenv').config();

const db = knex({
  client: 'pg',
  connection: process.env.TEST_DB_URL
});

module.exports = db;
