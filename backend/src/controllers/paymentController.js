const PaymentProfile = require('../models/PaymentProfile');
const PaymentService = require('../services/paymentService');

exports.createPaymentProfile = async (req, res) => {
  try {
    const { provider, apiKey, secretKey, locationId, sandboxMode } = req.body;

    const paymentProfile = await PaymentProfile.create({
      provider,
      apiKey,
      secretKey,
      locationId,
      sandboxMode,
    });

    res.status(201).json(paymentProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment profile', error });
  }
};

exports.updatePaymentProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const paymentProfile = await PaymentProfile.findByPk(id);
    if (!paymentProfile) return res.status(404).json({ message: 'Payment profile not found' });

    await paymentProfile.update(updatedData);
    res.json(paymentProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error updating payment profile', error });
  }
};

exports.deletePaymentProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const paymentProfile = await PaymentProfile.findByPk(id);
    if (!paymentProfile) return res.status(404).json({ message: 'Payment profile not found' });

    await paymentProfile.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting payment profile', error });
  }
};

exports.processPayment = async (req, res) => {
  try {
    const { provider, paymentData } = req.body;
    const paymentProfile = await PaymentProfile.findOne({ where: { provider } });

    if (!paymentProfile) {
      return res.status(404).json({ message: 'Payment profile not found for provider' });
    }

    const result = await PaymentService.processPayment(
      provider,
      paymentProfile.apiKey,
      paymentProfile.secretKey,
      paymentData
    );

    res.json({ message: 'Payment processed successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error processing payment', error });
  }
};
