const express = require('express');
const router = express.Router();
const ToastService = require('../services/ToastService');
const { authenticateToken } = require('../middleware/auth');

// Route to authenticate with Toast and retrieve the token
router.post('/toast/authenticate', authenticateToken, async (req, res) => {
  try {
    const { clientId, clientSecret } = req.body;
    const token = await ToastService.authenticate(clientId, clientSecret);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Authentication failed', error: error.message });
  }
});

// Route to fetch menu data from Toast
router.get('/toast/menu', authenticateToken, async (req, res) => {
  try {
    const { token, restaurantId } = req.query;
    const menuData = await ToastService.getMenu(token, restaurantId);
    res.status(200).json(menuData);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve menu data', error: error.message });
  }
});

module.exports = router;
