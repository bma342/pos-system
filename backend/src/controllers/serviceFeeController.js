const ServiceFee = require('../models/ServiceFee');
const posSyncService = require('../services/posSyncService');

exports.getServiceFees = async (req, res) => {
  try {
    const serviceFees = await ServiceFee.findAll();
    res.json(serviceFees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service fees', error });
  }
};

exports.updateServiceFee = async (req, res) => {
  try {
    const { locationId, providerId, orderType, feeAmount } = req.body;
    let serviceFee = await ServiceFee.findOne({ where: { locationId, providerId, orderType } });

    if (serviceFee) {
      serviceFee.feeAmount = feeAmount;
      await serviceFee.save();
    } else {
      serviceFee = await ServiceFee.create({ locationId, providerId, orderType, feeAmount });
    }

    // Sync service fee with POS
    const posProfile = await serviceFee.getLocation().getPosProfile();
    if (posProfile) {
      await posSyncService.syncServiceFees(posProfile);
    }

    res.json(serviceFee);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service fee', error });
  }
};
