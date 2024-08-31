const express = require 'express';
const { apiLimiter } = require './middleware/rateLimiter';
const { cacheMiddleware } = require './middleware/cache';
const authRoutes = require './routes/authRoutes';
const orderRoutes = require './routes/orderRoutes';
// const subscriptionRoutes = require './routes/subscriptionRoutes';
const paymentRoutes = require './routes/paymentRoutes';
const twoFactorRoutes = require './routes/twoFactorRoutes';
const clientSettingsRoutes = require './routes/clientSettingsRoutes';

const app = express();

if (typeof app.use === 'function') {
  app.use(express.json());
  app.use(apiLimiter);

  app.use('/api/auth', authRoutes);
  app.use('/api/orders', cacheMiddleware(300), orderRoutes); // Cache for 5 minutes
  // app.use('/api/subscriptions', subscriptionRoutes);
} else {
  console.error('app.use is not a function. Make sure express is properly initialized.');
}
app.use('/api/payments', paymentRoutes);
app.use('/api/2fa', twoFactorRoutes);
app.use('/api/client-settings', clientSettingsRoutes);

module.exports = app;