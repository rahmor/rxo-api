const app = require('../src/app');
require('dotenv').config();
const knex = require('knex');

describe.only('/API/REGISTER endpoint', () => {
  before('set database connection', () => {
    db = knex({ client: 'pg', connection: process.env.TEST_DB_URL });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  it('POST should return 201 with credentials', () => {
    const user = {
      user_name: 'testuser',
      user_password: 'testuserpassword'
    };

    return supertest(app)
      .post('/api/register')
      .send(user)
      .expect(201);
  });
});
