const { Discount } = require('../models');
const discountUtils = require('../utils/discountUtils');

class DiscountService {
  static async createDiscount(discountData) {
    return await Discount.create(discountData);
  }

  static async getDiscountsByLocation(locationId) {
    return await Discount.findAll({
      where: { locationId },
    });
  }

  static async validateAndApplyDiscounts(order, guestId) {
    const applicableDiscounts = await discountUtils.getApplicableDiscounts(order, guestId);
    return discountUtils.applyBestDiscount(applicableDiscounts, order);
  }
}

module.exports = DiscountService;
