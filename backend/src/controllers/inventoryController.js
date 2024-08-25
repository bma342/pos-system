const InventoryService = require('../services/inventoryService');
const logger = require('../services/logger');

// Sync POS inventory and calculate online inventory based on buffer
exports.syncInventory = async (req, res) => {
  try {
    const { locationId } = req.body;

    if (!locationId) {
      return res.status(400).json({ message: 'Location ID is required for syncing inventory.' });
    }

    const inventory = await InventoryService.syncAndCalculateOnlineInventory(locationId);

    logger.info(`Inventory synced for location ID ${locationId}`);
    res.json(inventory);
  } catch (error) {
    logger.error(`Error syncing inventory for location ID ${req.body.locationId}: ${error.message}`);
    res.status(500).json({ message: 'Error syncing inventory', error });
  }
};

// Get the calculated online inventory for a location
exports.getOnlineInventory = async (req, res) => {
  try {
    const { locationId } = req.params;

    if (!locationId) {
      return res.status(400).json({ message: 'Location ID is required to fetch online inventory.' });
    }

    const onlineInventory = await InventoryService.getOnlineInventory(locationId);

    if (!onlineInventory.length) {
      return res.status(404).json({ message: 'No inventory found for this location.' });
    }

    logger.info(`Fetched online inventory for location ID ${locationId}`);
    res.json(onlineInventory);
  } catch (error) {
    logger.error(`Error fetching online inventory for location ID ${req.params.locationId}: ${error.message}`);
    res.status(500).json({ message: 'Error fetching online inventory', error });
  }
};

// Set the buffer for online inventory
exports.setOnlineInventoryBuffer = async (req, res) => {
  try {
    const { locationId, buffer } = req.body;

    if (!locationId || typeof buffer !== 'number') {
      return res.status(400).json({ message: 'Location ID and valid buffer value are required.' });
    }

    await InventoryService.setOnlineInventoryBuffer(locationId, buffer);

    logger.info(`Online inventory buffer set for location ID ${locationId}`);
    res.status(200).json({ message: 'Online inventory buffer updated successfully' });
  } catch (error) {
    logger.error(`Error setting online inventory buffer for location ID ${req.body.locationId}: ${error.message}`);
    res.status(500).json({ message: 'Error setting online inventory buffer', error });
  }
};
