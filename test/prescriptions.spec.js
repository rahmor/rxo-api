'use strict';
const app = require('../src/app');
require('dotenv').config();
const {
  getDB,
  clearTables,
  makeAuthHeader,
  createUser
} = require('./test-helpers');

describe('/API/PRESCRIPTIONS endpoint', () => {
  let db;
  const user = {
    user_id: 1,
    user_name: 'testuser',
    user_password: 'testuserpassword'
  };
  before('set database connection and create user', () => {
    db = getDB();
    app.set('db', db);
    clearTables(db);
    return createUser(user, db);
  });

  after('disconnect from db', () => {
    clearTables(db).then(response => {
      db.destroy();
    });
  });

  const schedule = {
    rx_name: 'aspirin',
    day: 'Thursday',
    user_id: 1
  };
  const user1 = {
    user_id: 1,
    user_name: 'testuser',
    user_password: 'testuserpassword'
  };
  const header = makeAuthHeader(user1);

  it('POST should return 201', () => {
    return supertest(app)
      .post('/api/prescriptions')
      .set({
        Authorization: header
      })
      .send(schedule)
      .expect(201);
  });

  it('GET should return 200 with user schedule', () => {
    return supertest(app)
      .get(`/api/prescriptions/1`)
      .set({
        Authorization: header
      })
      .expect(200)
      .then(response => {
        console.log('response', response.body.schedule);
      });
  });
});
