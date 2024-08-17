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

describe('Auth Middleware Tests', () => {
  const token = jwt.sign({ roleId: 1 }, process.env.JWT_SECRET, { expiresIn: '1h' });

  it('should deny access if an invalid token is provided', async () => {
    const res = await request(app)
      .get('/api/secure-endpoint')
      .set('Authorization', 'Bearer invalidtoken');
    expect(res.statusCode).toEqual(403);
    expect(res.body.message).toBe('Invalid or expired token.');
  });

  it('should grant access with a valid token', async () => {
    const res = await request(app)
      .get('/api/secure-endpoint')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Access granted');
  });
});
