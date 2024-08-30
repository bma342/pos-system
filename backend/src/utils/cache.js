const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

module.exports = {
  async get(key) {
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  },
  set(key, value, ttl) {
    return redis.set(key, JSON.stringify(value), 'EX', ttl);
  },
  del(key) {
    return redis.del(key);
  }
};
