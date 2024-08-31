const OrderHistory = require('../models/OrderHistory');
const Order = require('../models/Order');
const axios = require('axios');
const Guest = require('../models/Guest');
const LocationMenuOverride = require('../models/LocationMenuOverride');
const { calculateServiceFees, calculateDiscounts } = require('../utils/pricingUtils');
const checkoutService = require('../services/checkoutService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

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

const initializeCheckout = async (req, res, next) => {
  try {
    const checkout = await checkoutService.initializeCheckout(req.body, req.user.clientId);
    res.status(200).json(checkout);
  } catch (error) {
    logger.error('Error initializing checkout:', error);
    next(new AppError('Error initializing checkout', 500));
  }
};

const processPayment = async (req, res, next) => {
  try {
    const result = await checkoutService.processPayment(req.body, req.user.clientId);
    res.status(200).json(result);
  } catch (error) {
    logger.error('Error processing payment:', error);
    next(new AppError('Error processing payment', 500));
  }
};

const confirmOrder = async (req, res, next) => {
  try {
    const order = await checkoutService.confirmOrder(req.body, req.user.clientId);
    res.status(200).json(order);
  } catch (error) {
    logger.error('Error confirming order:', error);
    next(new AppError('Error confirming order', 500));
  }
};

const getCheckoutStatus = async (req, res, next) => {
  try {
    const status = await checkoutService.getCheckoutStatus(req.params.checkoutId, req.user.clientId);
    res.status(200).json(status);
  } catch (error) {
    logger.error(`Error fetching checkout status for ${req.params.checkoutId}:`, error);
    next(new AppError('Error fetching checkout status', 500));
  }
};

const applyCoupon = async (req, res, next) => {
  try {
    const result = await checkoutService.applyCoupon(req.body.checkoutId, req.body.couponCode, req.user.clientId);
    res.status(200).json(result);
  } catch (error) {
    logger.error('Error applying coupon:', error);
    next(new AppError('Error applying coupon', 500));
  }
};

const removeCoupon = async (req, res, next) => {
  try {
    const result = await checkoutService.removeCoupon(req.body.checkoutId, req.user.clientId);
    res.status(200).json(result);
  } catch (error) {
    logger.error('Error removing coupon:', error);
    next(new AppError('Error removing coupon', 500));
  }
};

const updateShippingAddress = async (req, res, next) => {
  try {
    const result = await checkoutService.updateShippingAddress(req.body.checkoutId, req.body.address, req.user.clientId);
    res.status(200).json(result);
  } catch (error) {
    logger.error('Error updating shipping address:', error);
    next(new AppError('Error updating shipping address', 500));
  }
};

const getPaymentMethods = async (req, res, next) => {
  try {
    const methods = await checkoutService.getPaymentMethods(req.user.clientId);
    res.status(200).json(methods);
  } catch (error) {
    logger.error('Error fetching payment methods:', error);
    next(new AppError('Error fetching payment methods', 500));
  }
};

module.exports = {
  checkout,
  initializeCheckout,
  processPayment,
  confirmOrder,
  getCheckoutStatus,
  applyCoupon,
  removeCoupon,
  updateShippingAddress,
  getPaymentMethods
};
