'use strict';
const app = require('../src/app');

describe('App', () => {
  it('GET / responds with 404 containing object with value "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect(404);
  });
});
