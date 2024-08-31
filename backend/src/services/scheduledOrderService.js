const { Op } = require 'sequelize';
const ScheduledOrder = require '../models/ScheduledOrder';
const Order = require '../models/Order';
const { sendOrderToPOS } = require '../utils/posIntegration';

const processScheduledOrders = async () => {
  const now = new Date();
  const scheduledOrders = await ScheduledOrder.findAll({
    where: {
      scheduledTime: {
        [Op.lte],
      },
      sentToPOS,
    },
    include: [Order],
  });

  for (const scheduledOrder of scheduledOrders) {
    await sendOrderToPOS(scheduledOrder.Order);
    await scheduledOrder.update({ sentToPOS });
  }
};