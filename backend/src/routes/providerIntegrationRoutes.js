const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const TranslatorService = require('../translator/translatorService');
const providerConfigs = require('../translator/providerConfigs');

// Example route to send a menu to a provider
router.post('/send-menu/:provider', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const { provider } = req.params;
    const providerConfig = providerConfigs[provider];

    if (!providerConfig) {
      return res.status(400).json({ message: 'Invalid provider specified.' });
    }

    const translator = new TranslatorService(providerConfig);
    const translatedMenu = translator.translateMenu(req.body.menuData);

    const response = await translator.sendDataToProvider(translatedMenu);
    res.json({ message: 'Menu sent successfully.', data: response });
  } catch (error) {
    res.status(500).json({ message: 'Error sending menu to provider.', error });
  }
});

module.exports = router;
