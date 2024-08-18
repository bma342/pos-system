// src/middleware/subdomainMiddleware.js
const { Client } = require('../models');

const subdomainMiddleware = async (req, res, next) => {
  const subdomain = req.headers.host.split('.')[0]; // Get the subdomain part

  if (subdomain === 'www' || subdomain === 'api' || subdomain === 'yourplatform') {
    return next(); // Ignore non-client subdomains
  }

  try {
    const client = await Client.findOne({ where: { subdomain } });
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    req.client = client; // Attach the client data to the request
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving client information', error });
  }
};

module.exports = subdomainMiddleware;
