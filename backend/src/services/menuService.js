const { MenuItem } = require('../models/index');
const { getIO } = require('../socket');

const updateInventory = async (menuItemId, quantity) => {
  const menuItem = await MenuItem.findByPk(menuItemId);
  if (menuItem) {
    await menuItem.update({
      onlineInventoryOffset: menuItem.onlineInventoryOffset - quantity,
    });

    const io = getIO();
    io.to(`location-${menuItem.locationId}`).emit('inventory-update', {
      menuItemId: menuItem.id,
      newInventory: menuItem.onlineInventoryOffset,
    });
  }
};

module.exports = {
  updateInventory
};