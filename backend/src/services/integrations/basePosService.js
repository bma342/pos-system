const { MenuItem, Order, InventoryItem } = require('../../models');

class BasePosService {
  constructor(coreProfile, locationProfile) {
    this.coreProfile = coreProfile;
    this.locationProfile = locationProfile;
  }

  async processAndSaveMenuItems(menuItems) {
    for (const item of menuItems) {
      await MenuItem.upsert({
        externalId: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        locationId: this.locationProfile.id,
      });
    }
  }

  async processAndSaveOrders(orders) {
    for (const order of orders) {
      await Order.upsert({
        externalId: order.id,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
        locationId: this.locationProfile.id,
      });
    }
  }

  async processAndSaveInventory(inventoryItems) {
    for (const item of inventoryItems) {
      await InventoryItem.upsert({
        externalId: item.id,
        name: item.name,
        quantity: item.quantity,
        locationId: this.locationProfile.id,
      });
    }
  }
}

module.exports = BasePosService;
