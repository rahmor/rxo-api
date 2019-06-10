const app = require('../src/app');
const db = require('./test-helpers');
require('dotenv').config();

describe.only('/API/LOGIN endpoint', () => {
  before('set database connection', () => {
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  it('POST should return 200 with credentials', () => {
    const user = {
      user_name: process.env.DB_USER,
      user_password: process.env.DB_PASSWORD
    };

    return supertest(app)
      .post('/api/login')
      .send(user)
      .expect(200);
  });
});
