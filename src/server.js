'use strict';
const knex = require('knex');

const app = require('./app');

const { PORT, DATABASE_URL, DB_URL, NODE_ENV } = require('./config');

const db = knex({
  client: 'pg',
  connection: NODE_ENV === 'development' ? DB_URL : DATABASE_URL
});

app.set('db', db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
