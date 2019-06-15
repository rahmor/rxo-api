'use strict';
const app = require('../src/app');
const { getDB, clearTables } = require('./test-helpers');

describe('/API/REGISTER endpoint', () => {
  let db;

  before('set database connection', () => {
    db = getDB();
    app.set('db', db);
  });

  //before truncate database;
  beforeEach('clear tables', () => {
    clearTables(db);
  });

  after('disconnect from db', () => db.destroy());

  //afterEach, truncate table
  afterEach('clear user table', () => {
    clearTables(db);
  });

  it('POST should return 201 with credentials', () => {
    const user = {
      user_name: 'user1',
      user_password: 'user1234'
    };

    return supertest(app)
      .post('/api/register')
      .send(user)
      .expect(201);
  });
});
