const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('../models');
const logger = require('../services/logger');

class PaymentService {
  // Process a payment
  async processPayment(paymentData) {
    try {
      const { amount, currency, paymentMethod, guestId, locationId } = paymentData;

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method: paymentMethod,
        confirmation_method: 'automatic',
        confirm: true,
      });

      const paymentRecord = await db.Payment.create({
        guestId,
        locationId,
        paymentMethod,
        amount,
        currency,
        status: paymentIntent.status,
        transactionId: paymentIntent.id,
      });

      logger.info(`Payment processed: ID ${paymentRecord.id} for guest ID ${guestId}`);
      return paymentRecord;
    } catch (error) {
      logger.error(`Error processing payment: ${error.message}`);
      throw error;
    }
  }

  // Handle refunds
  async processRefund(paymentId, amount) {
    try {
      const payment = await db.Payment.findByPk(paymentId);
      if (!payment) throw new Error('Payment not found');

      const refund = await stripe.refunds.create({
        payment_intent: payment.transactionId,
        amount,
      });

      payment.status = 'refunded';
      await payment.save();

      logger.info(`Refund processed: Payment ID ${payment.id}`);
      return refund;
    } catch (error) {
      logger.error(`Error processing refund: ${error.message}`);
      throw error;
    }
  }

  // Retrieve payment history for a guest
  async getPaymentHistory(guestId) {
    try {
      const payments = await db.Payment.findAll({ where: { guestId } });
      return payments;
    } catch (error) {
      logger.error(`Error fetching payment history: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new PaymentService();
