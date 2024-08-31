const { MenuItem } = require('../models/MenuItem');
const { Location } = require('../models/Location');
const { Order } = require('../models/Order');

const calculatePrepTime = async (order) => {
  const location = await Location.findByPk(order.locationId);
  const menuItems = await MenuItem.findAll({
    where: { id: order.items.map(item => item.menuItemId) }
  });

  const maxPrepTime = Math.max(
    ...menuItems.map(item => item.prepTime),
    location?.defaultPrepTime || 15
  );

  return maxPrepTime;
};

const formatEstimatedTime = (minutes) => {
  const now = new Date();
  const estimatedTime = new Date(now.getTime() + minutes * 60000);
  
  // Round to nearest 5 minutes
  estimatedTime.setMinutes(Math.round(estimatedTime.getMinutes() / 5) * 5);
  
  const start = new Date(estimatedTime);
  const end = new Date(estimatedTime.getTime() + 15 * 60000);

  return `${formatTime(start)}-${formatTime(end)}`;
};

const formatTime = (date) => {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

const checkInventory = async (orderItems) => {
  for (const item of orderItems) {
    const menuItem = await MenuItem.findByPk(item.menuItemId);
    if (!menuItem) continue;

    const availableStock = await getAvailableStock(menuItem);
    if (item.quantity > availableStock) {
      return false;
    }
  }
  return true;
};

const getAvailableStock = async (menuItem) => {
  // This is a placeholder. In a real scenario, you'd fetch the actual stock from your POS system.
  const posStock = 10; // Example value
  return Math.max(0, posStock + menuItem.onlineInventoryOffset);
};

module.exports = {
  calculatePrepTime,
  formatEstimatedTime,
  checkInventory,
  getAvailableStock
};