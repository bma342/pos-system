const FeatureManagement = require('../models/FeatureManagement');

exports.getClientFeatures = async (req, res) => {
  try {
    const { clientId } = req.params;
    const features = await FeatureManagement.findOne({ where: { clientId } });
    if (!features) return res.status(404).json({ message: 'Client features not found' });

    res.json(features);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching client features', error });
  }
};

exports.updateClientFeatures = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { loyaltyEnabled, orderAggregationEnabled, onlineOrderingEnabled, reportingEnabled } = req.body;

    let features = await FeatureManagement.findOne({ where: { clientId } });
    if (!features) {
      features = await FeatureManagement.create({ clientId, loyaltyEnabled, orderAggregationEnabled, onlineOrderingEnabled, reportingEnabled });
    } else {
      features.update({ loyaltyEnabled, orderAggregationEnabled, onlineOrderingEnabled, reportingEnabled });
    }

    res.json(features);
  } catch (error) {
    res.status(500).json({ message: 'Error updating client features', error });
  }
};
