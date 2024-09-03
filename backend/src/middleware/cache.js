const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient(process.env.REDIS_URL);
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const cache = (duration) => async (req, res, next) => {
  const key = `__express__${req.originalUrl || req.url}`;
  const cachedResponse = await getAsync(key);
  if (cachedResponse) {
    res.send(JSON.parse(cachedResponse));
    return;
  }
  res.sendResponse = res.send;
  res.send = (body) => {
    setAsync(key, JSON.stringify(body), 'EX', duration);
    res.sendResponse(body);
  };
  next();
};

module.exports = cache;

// Use in routes:
// backend/src/routes/dashboardRoutes.js
const cache = require('../middleware/cache');
router.get('/data/:clientId', authenticate, cache(300), dashboardController.getDashboardData);