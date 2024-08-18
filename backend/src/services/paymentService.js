const stripe = require('stripe');
const worldpay = require('worldpay'); // Example, replace with actual package

class PaymentService {
  static async processPayment(provider, apiKey, secretKey, paymentData) {
    switch (provider) {
      case 'stripe':
        const stripeClient = stripe(secretKey);
        return await stripeClient.paymentIntents.create(paymentData);

      case 'worldpay':
        const worldpayClient = new worldpay(apiKey, secretKey);
        return await worldpayClient.createPayment(paymentData);

      // Add more providers as needed

      default:
        throw new Error('Unsupported payment provider.');
    }
  }
}

module.exports = PaymentService;
