const cron = require('node-cron');
const CateringService = require('./services/cateringService');
const logger = require('./utils/logger');

// Schedule guest orders based on their scheduled time
cron.schedule('* * * * *', async () => {
  try {
    logger.info('Running scheduled task for guest orders...');
    await CateringService.handleScheduledOrders();
  } catch (error) {
    logger.error('Error handling scheduled guest orders:', error);
  }
});

// Schedule catering orders based on their scheduled time
cron.schedule('* * * * *', async () => {
  try {
    logger.info('Running scheduled task for catering orders...');
    await CateringService.handleScheduledOrders();
  } catch (error) {
    logger.error('Error handling scheduled catering orders:', error);
  }
});
