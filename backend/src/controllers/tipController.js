const { Tip } = require('../models');

exports.createTip = async (req, res) => {
  try {
    const { clientId, locationId, tipAmount, tipType, displayAmount } = req.body;
    const tip = await Tip.create({ clientId, locationId, tipAmount, tipType, displayAmount });
    res.status(201).json(tip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTips = async (req, res) => {
  try {
    const tips = await Tip.findAll();
    res.status(200).json(tips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
