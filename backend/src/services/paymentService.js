const { Payment, Order } = require('../models');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

// Define payment gateways as an object instead of an enum
const PaymentGateway = {
  STRIPE: 'stripe',
  PAYPAL: 'paypal',
  SQUARE: 'square'
};

const processPayment = async (orderId, amount, gateway, paymentDetails) => {
  try {
    // Validate the order
    const order = await Order.findByPk(orderId);
    if (!order) {
      throw new AppError('Order not found', 404);
    }

    // Process payment based on the gateway
    let paymentResult;
    switch (gateway) {
      case PaymentGateway.STRIPE:
        paymentResult = await processStripePayment(amount, paymentDetails);
        break;
      case PaymentGateway.PAYPAL:
        paymentResult = await processPayPalPayment(amount, paymentDetails);
        break;
      case PaymentGateway.SQUARE:
        paymentResult = await processSquarePayment(amount, paymentDetails);
        break;
      default:
        throw new AppError('Invalid payment gateway', 400);
    }

    // Create a payment record
    const payment = await Payment.create({
      orderId,
      amount,
      gateway,
      status: paymentResult.status,
      transactionId: paymentResult.transactionId
    });

    // Update order status
    await order.update({ paymentStatus: 'paid' });

    logger.info(`Payment processed successfully for order ${orderId}`);
    return payment;
  } catch (error) {
    logger.error(`Error processing payment for order ${orderId}:`, error);
    throw error instanceof AppError ? error : new AppError('Payment processing failed', 500);
  }
};

const processStripePayment = async (amount, paymentDetails) => {
  // Implement Stripe payment logic here
  // This is a placeholder implementation
  return { status: 'success', transactionId: 'stripe_' + Date.now() };
};

const processPayPalPayment = async (amount, paymentDetails) => {
  // Implement PayPal payment logic here
  // This is a placeholder implementation
  return { status: 'success', transactionId: 'paypal_' + Date.now() };
};

const processSquarePayment = async (amount, paymentDetails) => {
  // Implement Square payment logic here
  // This is a placeholder implementation
  return { status: 'success', transactionId: 'square_' + Date.now() };
};

const getPaymentById = async (paymentId) => {
  try {
    const payment = await Payment.findByPk(paymentId);
    if (!payment) {
      throw new AppError('Payment not found', 404);
    }
    return payment;
  } catch (error) {
    logger.error(`Error fetching payment ${paymentId}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to fetch payment', 500);
  }
};

const refundPayment = async (paymentId, amount) => {
  try {
    const payment = await getPaymentById(paymentId);
    
    // Process refund based on the original payment gateway
    let refundResult;
    switch (payment.gateway) {
      case PaymentGateway.STRIPE:
        refundResult = await processStripeRefund(payment.transactionId, amount);
        break;
      case PaymentGateway.PAYPAL:
        refundResult = await processPayPalRefund(payment.transactionId, amount);
        break;
      case PaymentGateway.SQUARE:
        refundResult = await processSquareRefund(payment.transactionId, amount);
        break;
      default:
        throw new AppError('Invalid payment gateway', 400);
    }

    // Update payment record
    await payment.update({
      refundedAmount: (payment.refundedAmount || 0) + amount,
      status: amount === payment.amount ? 'refunded' : 'partially_refunded'
    });

    logger.info(`Refund processed successfully for payment ${paymentId}`);
    return payment;
  } catch (error) {
    logger.error(`Error processing refund for payment ${paymentId}:`, error);
    throw error instanceof AppError ? error : new AppError('Refund processing failed', 500);
  }
};

const processStripeRefund = async (transactionId, amount) => {
  // Implement Stripe refund logic here
  // This is a placeholder implementation
  return { status: 'success', refundId: 'stripe_refund_' + Date.now() };
};

const processPayPalRefund = async (transactionId, amount) => {
  // Implement PayPal refund logic here
  // This is a placeholder implementation
  return { status: 'success', refundId: 'paypal_refund_' + Date.now() };
};

const processSquareRefund = async (transactionId, amount) => {
  // Implement Square refund logic here
  // This is a placeholder implementation
  return { status: 'success', refundId: 'square_refund_' + Date.now() };
};

module.exports = {
  PaymentGateway,
  processPayment,
  getPaymentById,
  refundPayment
};