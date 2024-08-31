const request = require 'supertest';
const app = require '../app';
const { Location } = require '../models/Location';

describe('Location API', () => {
  beforeEach(async () => {
    await Location.deleteMany({});
  });

  it('should create a new location', async () => {
    const res = await request(app)
      .post('/api/locations')
      .send({
        name: 'Test Location',
        address: '123 Test St',
        city: 'Testville',
        state: 'TS',
        zipCode: '12345',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Test Location');
  });

  // Add more tests...
});