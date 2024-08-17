const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const POSConnectorService = require('../posConnector/posConnectorService');
const posProfiles = require('../posConnector/posProfiles');

// Route to sync menus with the POS system
router.post('/sync-menus/:locationId', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const { locationId } = req.params;
    const profile = posProfiles[`location${locationId}`];

    if (!profile) {
      return res.status(400).json({ message: 'Invalid location specified.' });
    }

    const posConnector = new POSConnectorService(profile.posConfig);
    const translatedMenu = posConnector.syncMenus(req.body.menuData);

    const response = await posConnector.sendOrderToPOS(translatedMenu);
    res.json({ message: 'Menus synced successfully with POS.', data: response });
  } catch (error) {
    res.status(500).json({ message: 'Error syncing menus with POS.', error });
  }
});

// Additional routes can be created here for syncing orders, inventory, etc.

module.exports = router;
