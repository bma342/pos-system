const { Counter, Histogram } = require('prom-client');
const { Order } = require('../models/Order');
const { MenuItem } = require('../models/MenuItem');
const { calculatePrepTime, formatEstimatedTime, checkInventory } = require('./orderPrepService');
const { emitDashboardUpdate, emitNewOrder } = require('./dashboardService'); // Changed from './dashboardService1' to './dashboardService'
const { emitOrderUpdate } = require('../socket');
const { io } = require('../socket');
const { sendNotification } = require('../utils/notificationService');

const orderCounter = new Counter({
  name: 'pos_orders_total',
  help: 'Total number of orders'
});

const orderValueHistogram = new Histogram({
  name: 'pos_order_value',
  help: 'Distribution of order values'
});

const createOrder = async (orderData) => {
  // Check inventory
  const inventoryAvailable = await checkInventory(orderData.items);
  if (!inventoryAvailable) {
    throw new Error('Some items are out of stock');
  }

  // Calculate prep time
  const prepTime = await calculatePrepTime(orderData);
  const estimatedTime = formatEstimatedTime(prepTime, orderData.scheduledTime);

  // Create order
  const order = await Order.create({
    ...orderData,
    estimatedPickupTime: estimatedTime,
  });

  // Update inventory
  for (const item of orderData.items) {
    const menuItem = await MenuItem.findByPk(item.menuItemId);
    if (menuItem) {
      await menuItem.update({
        onlineInventoryOffset: menuItem.onlineInventoryOffset - item.quantity,
      });
    }
  }

  // Emit updates
  emitNewOrder(order);
  emitDashboardUpdate();

  return order;
};

// ... other order-related functions ...

const getActiveOrders = async () => {
  return await Order.findAll({
    where: {
      status: ['pending', 'in-progress'],
    },
    order: [['promiseTime', 'ASC']],
  });
};

const cancelOrder = async (orderId) => {
  const order = await Order.findByPk(orderId);
  if (!order) {
    throw new Error('Order not found');
  }
  await order.update({ status: 'cancelled' });
  
  // Notify guest
  await sendNotification(order.guestId, 'Your order has been cancelled');
  
  // Notify provider (if applicable)
  if (order.providerId) {
    await sendNotification(order.providerId, `Order #${order.id} has been cancelled`);
  }
  
  // Notify driver (if applicable)
  if (order.driverId) {
    await sendNotification(order.driverId, `Order #${order.id} has been cancelled`);
  }
  
  emitOrderUpdate(order);
};

const markItemOutOfStock = async (itemId) => {
  const menuItem = await MenuItem.findByPk(itemId);
  if (!menuItem) {
    throw new Error('Menu item not found');
  }
  await menuItem.update({ isAvailable: false });
  
  // Emit event to update all channels
  io.emit('menu-item-update', { itemId, isAvailable: false });
  
  // Update third-party delivery services
  await updateThirdPartyMenus(itemId, false);
};

const updateThirdPartyMenus = async (itemId, isAvailable) => {
  // Implement logic to update menus on third-party delivery services
  // This might involve calling APIs for services like DoorDash, Uber Eats, etc.
};

module.exports = {
  createOrder,
  getActiveOrders,
  cancelOrder,
  markItemOutOfStock,
  updateThirdPartyMenus
};