'use strict';
const knex = require('knex');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config();

function getDB() {
  const db = knex({
    client: 'pg',
    connection: process.env.TEST_DB_URL
  });
  return db;
}

function clearTables(db) {
  return db.transaction(trx =>
    trx
      .raw(
        `TRUNCATE
        schedules,
        prescriptions,
        users
      `
      )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE schedules_id_seq minvalue 0 START WITH 1`),
          trx.raw(
            `ALTER SEQUENCE prescriptions_id_seq minvalue 0 START WITH 1`
          ),
          trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('schedules_id_seq', 0)`),
          trx.raw(`SELECT setval('prescriptions_id_seq', 0)`),
          trx.raw(`SELECT setval('users_id_seq', 0)`)
        ])
      )
  );
}

function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

function createUser(user, db) {
  return hashPassword(user.user_password).then(hashedPassword => {
    const hashedUser = {
      user_name: user.user_name,
      user_password: hashedPassword
    };
    return db
      .into('users')
      .insert(hashedUser)
      .then(() => db.raw(`SELECT setval('users_id_seq', 1)`));
  });
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256'
  });
  return `Bearer ${token}`;
}

module.exports = { getDB, clearTables, makeAuthHeader, createUser };
