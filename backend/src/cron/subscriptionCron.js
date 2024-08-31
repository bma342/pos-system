const cron = require 'node-cron';
const { processSubscriptions } = require '../services/subscriptionService';
const logger = require '../utils/logger';

const startSubscriptionCron = () => {
  // Run every day at midnight
  cron.schedule('0 0 * * *', async () => {
    try {
      logger.info('Starting subscription processing');
      await processSubscriptions();
      logger.info('Subscription processing completed');
    } catch (error) {
      logger.error('Error processing subscriptions:', error);
    }
  });
};