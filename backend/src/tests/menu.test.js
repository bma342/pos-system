const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => ({
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue('OK'),
    del: jest.fn().mockResolvedValue(1),
  }));
});

describe('Menu API', () => {
  const token = jwt.sign({ roleId: 1 }, process.env.JWT_SECRET, { expiresIn: '1h' });

  it('should create a new menu', async () => {
    const res = await request(app)
      .post('/api/menus')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Lunch Menu',
        description: 'This is a lunch menu.',
        clientId: 1,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Lunch Menu');
  });

  it('should fetch all menus', async () => {
    const res = await request(app)
      .get('/api/menus/client/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
