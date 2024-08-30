const OrderHistory = require('../models/OrderHistory');
const Order = require('../models/Order');
const axios = require('axios');
const Guest = require('../models/Guest');
const LocationMenuOverride = require('../models/LocationMenuOverride');
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
        orderDetails.push({ ...item, price, serviceFees });
      } else if (paymentMethod === 'points') {
        totalPointsPrice += locationOverride.pointsPrice * item.quantity;
        orderDetails.push({ ...item, price: locationOverride.pointsPrice });
      }
    }

    const guest = await Guest.findByPk(guestId);
    const discount = calculateDiscounts(guest.loyaltyTier, totalCurrencyPrice);
    totalCurrencyPrice -= discount;

    const posOrderData = {
      guestId,
      locationId,
      items: orderDetails,
      paymentMethod,
      totalCurrencyPrice,
      totalPointsPrice,
    };

    const posResponse = await sendOrderToPOS(posOrderData);
    if (!posResponse.approved) {
      return res.status(400).json({ message: 'Order could not be approved by the POS system.' });
    }

    const order = await Order.create({
      guestId,
      locationId,
      paymentMethod,
      totalAmount: paymentMethod === 'currency' ? totalCurrencyPrice : totalPointsPrice,
    });

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

async function sendOrderToPOS(orderData) {
  try {
    const response = await axios.post('https://pos-system.com/api/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error communicating with POS system:', error);
    return { approved: false };
  }
}

module.exports = {
  checkout,
};
