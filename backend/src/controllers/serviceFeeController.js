const { ServiceFee } = require('../models');

exports.createServiceFee = async (req, res) => {
  try {
    const { clientId, locationId, feeAmount, feeType } = req.body;
    const serviceFee = await ServiceFee.create({ clientId, locationId, feeAmount, feeType });
    res.status(201).json(serviceFee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getServiceFees = async (req, res) => {
  try {
    const serviceFees = await ServiceFee.findAll();
    res.status(200).json(serviceFees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
