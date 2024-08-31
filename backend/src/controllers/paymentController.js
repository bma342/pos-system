const { Request, Response } = require ('express');
const { getAvailablePaymentGateways } = require ('../services/paymentService');

const getAvailablePaymentGatewaysForOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const availableGateways = await getAvailablePaymentGateways(order.clientId, order.locationId);
    res.json({ availableGateways });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching available payment gateways' });
  }
};

const paymentService = require('../services/paymentService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

exports.processPayment = async (req, res, next) => {
  try {
    const { orderId, amount, gateway, paymentDetails } = req.body;
    const payment = await paymentService.processPayment(orderId, amount, gateway, paymentDetails);
    res.status(200).json(payment);
  } catch (error) {
    logger.error('Error processing payment:', error);
    next(new AppError('Payment processing failed', 500));
  }
};

exports.getPaymentById = async (req, res, next) => {
  try {
    const payment = await paymentService.getPaymentById(req.params.id);
    res.status(200).json(payment);
  } catch (error) {
    logger.error(`Error fetching payment ${req.params.id}:`, error);
    next(error);
  }
};

exports.refundPayment = async (req, res, next) => {
  try {
    const { paymentId, amount } = req.body;
    const refund = await paymentService.refundPayment(paymentId, amount);
    res.status(200).json(refund);
  } catch (error) {
    logger.error('Error processing refund:', error);
    next(new AppError('Refund processing failed', 500));
  }
};

exports.getPaymentMethods = async (req, res, next) => {
  try {
    const methods = await paymentService.getPaymentMethods(req.params.clientId);
    res.status(200).json(methods);
  } catch (error) {
    logger.error(`Error fetching payment methods for client ${req.params.clientId}:`, error);
    next(error);
  }
};

exports.addPaymentMethod = async (req, res, next) => {
  try {
    const newMethod = await paymentService.addPaymentMethod(req.body);
    res.status(201).json(newMethod);
  } catch (error) {
    logger.error('Error adding payment method:', error);
    next(error);
  }
};

exports.updatePaymentMethod = async (req, res, next) => {
  try {
    const updatedMethod = await paymentService.updatePaymentMethod(req.params.methodId, req.body);
    res.status(200).json(updatedMethod);
  } catch (error) {
    logger.error(`Error updating payment method ${req.params.methodId}:`, error);
    next(error);
  }
};

exports.deletePaymentMethod = async (req, res, next) => {
  try {
    await paymentService.deletePaymentMethod(req.params.methodId);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting payment method ${req.params.methodId}:`, error);
    next(error);
  }
};