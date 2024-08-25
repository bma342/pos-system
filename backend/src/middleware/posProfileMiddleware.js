const PosProfile = require('../models/PosProfile');

// Middleware to load POS profile based on location ID or selected profile
const loadPosProfile = async (req, res, next) => {
  try {
    const { locationId } = req.body;

    if (!locationId) {
      return res.status(400).json({ message: 'Location ID is required.' });
    }

    const posProfile = await PosProfile.findOne({ where: { locationId } });

    if (!posProfile) {
      return res.status(404).json({ message: 'POS Profile not found for the given location.' });
    }

    req.posProfile = posProfile;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error loading POS Profile', error });
  }
};

module.exports = loadPosProfile;
