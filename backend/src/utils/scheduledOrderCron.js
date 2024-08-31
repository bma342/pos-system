const cron = require 'node-cron';
const { processScheduledOrders } = require '../services/scheduledOrderService';

const startScheduledOrderCron = () => {
  cron.schedule('* * * * *', async () => {
    await processScheduledOrders();
  });
};