const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Menu API', () => {
  it('should create a new menu', async () => {
    const res = await request(app)
      .post('/api/menus')
      .send({
        name: 'Lunch Menu',
        description: 'A special lunch menu',
        clientId: 1,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Lunch Menu');
  });

  it('should fetch all menus', async () => {
    const res = await request(app).get('/api/menus/client/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
