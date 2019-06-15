'use strict';
const app = require('../src/app');
const { getDB, createUser, clearTables } = require('./test-helpers');

describe('/API/LOGIN endpoint', () => {
  let db;
  const user = {
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
    return clearTables(db).then(response => {
      return db.destroy();
    });
  });

  it('POST should return 200 with credentials', () => {
    return supertest(app)
      .post('/api/login')
      .send(user)
      .expect(200);
  });
});
