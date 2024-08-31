const Cart = require('../models/Cart');
const DiscountService = require('./DiscountService');
const LoyaltyService = require('./LoyaltyService');

class CartService {
  static async calculateCart(cartId) {
    const cart = await Cart.findByPk(cartId, {
      include: ['Items', 'Discounts', 'LoyaltyRewards'],
    });

    let cartTotal = 0;

    // Calculate item totals
    cart.Items.forEach(item => {
      cartTotal += item.price;
      item.Modifiers.forEach(modifier => {
        if (modifier.price > 0) {
          cartTotal += modifier.price;
        }
      });
    });

    // Apply discounts
    cartTotal = await DiscountService.applyDiscounts(cart, cartTotal);

    // Apply loyalty rewards
    cartTotal = await LoyaltyService.applyLoyaltyRewards(cart, cartTotal);

    // Apply service fees, taxes, etc.

    return {
      cartTotal,
      breakdown: {
        items: cart.Items,
        discounts: cart.Discounts,
        loyaltyRewards: cart.LoyaltyRewards,
      },
    };
  }
}

module.exports = CartService;
