const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providerController');

// Get all providers
router.get('/', providerController.getAllProviders);

// Update a provider's settings
router.put('/:id', providerController.updateProvider);

module.exports = router;
