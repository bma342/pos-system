const helmet = require 'helmet';
const cors = require 'cors';
const { Express } = require 'express';

const setupSecurity = (app) => {
  // Set security HTTP headers
  app.use(helmet());

  // Enable CORS
  app.use(cors());

  // Prevent XSS attacks
  app.use(helmet.xssFilter());

  // Prevent clickjacking
  app.use(helmet.frameguard({ action: 'deny' }));

  // Hide X-Powered-By header
  app.use(helmet.hidePoweredBy());

  // Prevent MIME type sniffing
  app.use(helmet.noSniff());

  // Set strict transport security
  app.use(helmet.hsts({
    maxAge: 31536000,
    includeSubDomains,
    preload
  }));
};