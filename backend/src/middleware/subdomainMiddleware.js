const { Client } = require('../models');
const NodeCache = require('node-cache');
const logger = require('../services/logger');

// Cache setup (TTL: 10 minutes)
const clientCache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

const subdomainMiddleware = async (req, res, next) => {
  const subdomain = req.headers.host.split('.')[0]; // Get the subdomain part

  // Ignore predefined subdomains
  if (['www', 'api', 'yourplatform', 'localhost'].includes(subdomain)) { 
    return next(); 
  }

  try {
    // Check cache first
    let client = clientCache.get(subdomain);
    if (!client) {
      client = await Client.findOne({ where: { subdomain } });
      if (!client) {
        logger.warn(`Client not found for subdomain: ${subdomain}`);
        return res.status(404).json({ message: 'Client not found' });
      }
      // Store in cache
      clientCache.set(subdomain, client);
    }

    req.client = client; // Attach the client data to the request
    next();
  } catch (error) {
    logger.error(`Error retrieving client information for subdomain: ${subdomain}`, { error });
    return res.status(500).json({ message: 'Error retrieving client information', error });
  }
};

module.exports = subdomainMiddleware;
