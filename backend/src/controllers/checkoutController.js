const OrderHistory = require('../models/OrderHistory');
const Order = require('../models/Order');
const axios = require('axios');
const Guest = require('../models/Guest');
const { calculateServiceFees, calculateDiscounts } = require('../utils/pricingUtils');

const checkout = async (req, res) => {
  const { items, paymentMethod, guestId, locationId } = req.body;

  try {
    let totalCurrencyPrice = 0;
    let totalPointsPrice = 0;
    const orderDetails = [];

    for (const item of items) {
      const locationOverride = await LocationMenuOverride.findOne({
        where: { menuItemId: item.menuItemId, locationId },
      });

      if (!locationOverride) {
        return res.status(400).json({ message: `Item ${item.menuItemId} not available for this location.` });
      }

      let price = locationOverride.price;
      if (paymentMethod === 'currency') {
        const { finalPrice, serviceFees } = calculateServiceFees(price, locationOverride, locationId);
        price = finalPrice;
        totalCurrencyPrice += price * item.quantity;
      } else if (paymentMethod === 'points') {
        totalPointsPrice += locationOverride.pointsPrice * item.quantity;
      }

      const detail = {
        menuItemId: item.menuItemId,
        name: item.name,
        quantity: item.quantity,
        price,
        pointsPrice: locationOverride.pointsPrice,
        serviceFees: serviceFees || 0
      };

      orderDetails.push(detail);
    }

    // Apply discounts
    const guest = await Guest.findByPk(guestId);
    const discount = calculateDiscounts(guest.loyaltyTier, totalCurrencyPrice);
    totalCurrencyPrice -= discount;

    // Prepare order data for POS system
    const posOrderData = {
      guestId,
      locationId,
      items: orderDetails,
      paymentMethod,
      totalCurrencyPrice,
      totalPointsPrice,
    };

    // Send order to POS system for approval/acceptance
    const posResponse = await sendOrderToPOS(posOrderData);
    if (!posResponse.approved) {
      return res.status(400).json({ message: 'Order could not be approved by the POS system.' });
    }

    // Save the order in Order model
    const order = await Order.create({
      guestId,
      locationId,
      paymentMethod,
      totalAmount: paymentMethod === 'currency' ? totalCurrencyPrice : totalPointsPrice,
    });

    // Save the order in OrderHistory
    await OrderHistory.create({
      orderId: order.id,
      guestId,
      locationId,
      paymentMethod,
      totalAmount: paymentMethod === 'currency' ? totalCurrencyPrice : totalPointsPrice,
      orderDetails,
      action: 'Order Placed',
    });

    res.json({
      totalCurrencyPrice,
      totalPointsPrice,
      message: 'Checkout and order processed successfully.',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during checkout', error });
  }
};

// Function to send the order to the POS system
async function sendOrderToPOS(orderData) {
  try {
    // Replace the URL with the actual POS API endpoint
    const response = await axios.post('https://pos-system.com/api/orders', orderData);

    // Return the response indicating whether the order was approved or not
    return response.data;
  } catch (error) {
    console.error('Error communicating with POS system:', error);
    return { approved: false };
  }
}

module.exports = {
  checkout,
};
