const db = require('../models');
const logger = require('../services/logger');
const TaxService = require('./taxService');
const PaymentService = require('./paymentService');
const LoyaltyService = require('./loyaltyService'); // In case loyalty points are involved

class CateringOrderService {
  // Calculate the total price for a catering order
  calculateOrderTotal(items, fees = {}, tips = {}) {
    const itemTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Calculate fees and tips
    const serviceFee = fees.serviceFee || 0;
    const packagingFee = fees.packagingFee || 0;
    const deliveryFee = fees.deliveryFee || 0;
    const kitchenTip = tips.kitchenTip || 0;
    const driverTip = tips.driverTip || 0;

    // Calculate the grand total
    const total = itemTotal + serviceFee + packagingFee + deliveryFee + kitchenTip + driverTip;

    return parseFloat(total.toFixed(2));
  }

  // Create a new catering order with all logic
  async createCateringOrder(orderData) {
    try {
      const {
        guestId,
        houseAccountId,
        orderDate,
        scheduledDate,
        locationId,
        items,
        fees,
        tips,
        provider,
      } = orderData;

      // Fetch applicable tax using the TaxService
      const taxDetails = await TaxService.getApplicableTax(locationId, provider, guestId);

      // Calculate the subtotal and then the total with tax
      const subtotal = this.calculateOrderTotal(items, fees, tips);
      const totalWithTax = subtotal + (subtotal * taxDetails.rate) / 100;

      // Handle loyalty points if applicable
      if (orderData.loyaltyPointsUsed) {
        await LoyaltyService.deductPoints(guestId, orderData.loyaltyPointsUsed);
      }

      // Create the catering order
      const order = await db.CateringOrder.create({
        guestId,
        houseAccountId,
        orderDate,
        scheduledDate,
        totalPrice: totalWithTax,
        orderDetails: items,
        taxExempt: taxDetails.rate === 0,
        taxIdNumber: taxDetails.taxId,
      });

      // Handle payment if required
      if (orderData.paymentData) {
        await PaymentService.processPayment({
          amount: totalWithTax,
          currency: 'usd', // or another currency
          paymentMethod: orderData.paymentData.paymentMethod,
          guestId,
          locationId,
        });
      }

      logger.info(`Catering order created: ID ${order.id} for guest ID ${guestId}`);
      return order;
    } catch (error) {
      logger.error(`Error creating catering order: ${error.message}`);
      throw new Error('Error creating catering order');
    }
  }

  // Fetch all catering orders by house account
  async getCateringOrdersByHouseAccount(houseAccountId) {
    try {
      const orders = await db.CateringOrder.findAll({
        where: { houseAccountId },
      });
      return orders;
    } catch (error) {
      logger.error(`Error fetching catering orders for house account ID ${houseAccountId}: ${error.message}`);
      throw new Error('Error fetching catering orders');
    }
  }

  // Fetch all catering orders by guest
  async getCateringOrdersByGuest(guestId) {
    try {
      const orders = await db.CateringOrder.findAll({
        where: { guestId },
      });
      return orders;
    } catch (error) {
      logger.error(`Error fetching catering orders for guest ID ${guestId}: ${error.message}`);
      throw new Error('Error fetching catering orders');
    }
  }

  // Handle catering order invoicing
  async handleCateringInvoicing(orderId) {
    try {
      const order = await db.CateringOrder.findByPk(orderId);
      if (!order) throw new Error('Catering order not found');

      // Invoicing logic: calculate invoice total, apply discounts, etc.
      const invoiceTotal = order.totalPrice; // Can be extended to handle discounts and additional charges

      logger.info(`Catering invoicing processed for order ID ${orderId}`);
      return { success: true, message: 'Invoicing processed successfully', invoiceTotal };
    } catch (error) {
      logger.error(`Error handling catering invoicing for order ID ${orderId}: ${error.message}`);
      throw new Error('Error handling catering invoicing');
    }
  }
}

module.exports = new CateringOrderService();
