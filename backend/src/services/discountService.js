const db = require('../models');

class DiscountService {
  // Create a discount
  async createDiscount(discountDetails) {
    return await db.Discount.create(discountDetails);
  }

  // Get discounts by location
  async getDiscountsByLocation(locationId) {
    return await db.Discount.findAll({ where: { locationId } });
  }

  // Update a discount
  async updateDiscount(discountId, discountDetails) {
    const discount = await db.Discount.findByPk(discountId);
    if (!discount) {
      throw new Error('Discount not found');
    }

    return await discount.update(discountDetails);
  }

  // Delete a discount
  async deleteDiscount(discountId) {
    const discount = await db.Discount.findByPk(discountId);
    if (!discount) {
      throw new Error('Discount not found');
    }

    return await discount.destroy();
  }

  // Schedule a discount drop for guests
  async scheduleDiscountDrop(discountId, guestIds, scheduleTime) {
    setTimeout(async () => {
      const discount = await db.Discount.findByPk(discountId);
      if (!discount) return;

      for (const guestId of guestIds) {
        await db.GuestDiscounts.create({ guestId, discountId });
      }
    }, new Date(scheduleTime) - Date.now());
  }
}

module.exports = new DiscountService();
