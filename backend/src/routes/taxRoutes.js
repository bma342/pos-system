const express = require('express');
const router = express.Router();
const taxController = require('../controllers/taxController');
const { authenticateToken } = require('../middleware/auth');

// Route to get tax settings for a location and provider
router.get('/:locationId/:provider', authenticateToken, taxController.getTaxSettings);

// Route to update tax settings
router.post('/update', authenticateToken, taxController.updateTaxSettings);

module.exports = router;
