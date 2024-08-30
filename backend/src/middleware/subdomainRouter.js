const { Client } = require('../models');
const cache = require('../utils/cache');

const subdomainRouter = async (req, res, next) => {
  const host = req.get('host');
  const subdomain = host.split('.')[0];

  // Handle predefined subdomains like 'www', 'api', and 'localhost'
  if (['www', 'api', 'localhost'].includes(subdomain)) { 
    return next(); 
  }

  try {
    let client = await cache.get(`client:${subdomain}`);
    if (!client) {
      client = await Client.findOne({ where: { subdomain } });
      if (client) {
        await cache.set(`client:${subdomain}`, client, 3600); // Cache for 1 hour
      }
    }

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    req.client = client;
    next();
  } catch (error) {
    console.error('Subdomain routing error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = subdomainRouter;

