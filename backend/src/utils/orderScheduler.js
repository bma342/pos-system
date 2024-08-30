const cron = require('node-cron');
const { Order, Op } = require('../models'); // Added Op import

// Schedule job to process scheduled orders every minute
cron.schedule('* * * * *', async () => {
  console.log('Processing scheduled orders...');
  try {
    const now = new Date();
    const scheduledOrders = await Order.findAll({
      where: {
        status: 'scheduled',
        scheduledFor: { [Op.lte]: now }, // Process orders scheduled for now or earlier
      }
    });

    for (const order of scheduledOrders) {
      order.status = 'processing';
      await order.save();

      // Implement logic to send order to the kitchen or process as needed
      console.log(`Order ${order.id} is now processing.`);
    }
  } catch (error) {
    console.error('Error processing scheduled orders:', error);
  }
});
