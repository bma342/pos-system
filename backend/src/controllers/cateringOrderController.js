const CateringOrderService = require('../services/cateringOrderService');
const logger = require('../services/logger');
const { check, validationResult } = require('express-validator');

// Validation middleware for catering order creation
const validateCateringOrder = [
  check('guestId').isInt().withMessage('Valid guest ID is required'),
  check('locationId').isInt().withMessage('Valid location ID is required'),
  check('scheduledDate').isISO8601().withMessage('Valid scheduled date is required'),
  check('orderDetails').isArray().withMessage('Order details must be an array of items'),
  check('houseAccountId').optional().isInt().withMessage('Valid house account ID is required'),
  check('serviceFees').optional().isObject().withMessage('Service fees must be an object'),
  check('tips').optional().isObject().withMessage('Tips must be an object'),
];

// Create a new catering order
exports.createCateringOrder = [
  ...validateCateringOrder,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const order = await CateringOrderService.createCateringOrder(req.body);
      res.status(201).json(order);
    } catch (error) {
      logger.error(`Error creating catering order: ${error.message}`);
      res.status(500).json({ message: 'Error creating catering order', error });
    }
  }
];

// Fetch catering orders by house account
exports.getCateringOrdersByHouseAccount = async (req, res) => {
  try {
    const orders = await CateringOrderService.getCateringOrdersByHouseAccount(req.params.houseAccountId);
    res.json(orders);
  } catch (error) {
    logger.error(`Error fetching catering orders by house account: ${error.message}`);
    res.status(500).json({ message: 'Error fetching catering orders', error });
  }
};

// Fetch catering orders by guest
exports.getCateringOrdersByGuest = async (req, res) => {
  try {
    const orders = await CateringOrderService.getCateringOrdersByGuest(req.params.guestId);
    res.json(orders);
  } catch (error) {
    logger.error(`Error fetching catering orders by guest: ${error.message}`);
    res.status(500).json({ message: 'Error fetching catering orders', error });
  }
};

// Handle catering invoicing
exports.handleCateringInvoicing = async (req, res) => {
  try {
    const result = await CateringOrderService.handleCateringInvoicing(req.params.orderId);
    res.json(result);
  } catch (error) {
    logger.error(`Error handling catering invoicing: ${error.message}`);
    res.status(500).json({ message: 'Error handling catering invoicing', error });
  }
};
