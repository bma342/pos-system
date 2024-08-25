const PosProfile = require('../models/PosProfile');
const PosSyncService = require('../services/posSyncService');

// Controller for syncing menus
exports.syncMenus = async (req, res) => {
  try {
    const posProfile = await PosProfile.findByPk(req.body.posProfileId);

    if (!posProfile) {
      return res.status(404).json({ message: 'POS Profile not found' });
    }

    const syncResult = await PosSyncService.syncMenus(posProfile);

    res.json(syncResult);
  } catch (error) {
    res.status(500).json({ message: 'Error syncing menus', error });
  }
};

// Controller for syncing orders
exports.syncOrders = async (req, res) => {
  try {
    const posProfile = await PosProfile.findByPk(req.body.posProfileId);

    if (!posProfile) {
      return res.status(404).json({ message: 'POS Profile not found' });
    }

    const syncResult = await PosSyncService.syncOrders(posProfile);

    res.json(syncResult);
  } catch (error) {
    res.status(500).json({ message: 'Error syncing orders', error });
  }
};

// Controller for syncing inventory
exports.syncInventory = async (req, res) => {
  try {
    const posProfile = await PosProfile.findByPk(req.body.posProfileId);

    if (!posProfile) {
      return res.status(404).json({ message: 'POS Profile not found' });
    }

    const syncResult = await PosSyncService.syncInventory(posProfile);

    res.json(syncResult);
  } catch (error) {
    res.status(500).json({ message: 'Error syncing inventory', error });
  }
};

// Controller for syncing tax rates (if applicable for the POS system)
exports.syncTaxRates = async (req, res) => {
  try {
    const posProfile = await PosProfile.findByPk(req.body.posProfileId);

    if (!posProfile) {
      return res.status(404).json({ message: 'POS Profile not found' });
    }

    const syncResult = await PosSyncService.syncTaxRates(posProfile);

    res.json(syncResult);
  } catch (error) {
    res.status(500).json({ message: 'Error syncing tax rates', error });
  }
};

