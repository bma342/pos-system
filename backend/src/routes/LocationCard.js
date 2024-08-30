const express = require('express');
const router = express.Router();
const LocationController = require('../controllers/LocationController');

// Get location card details
router.get('/:locationId', LocationController.getLocationCard);

// Update location card details
router.put('/:locationId', LocationController.updateLocationCard);

// Start order for a location
router.post('/:locationId/start-order', LocationController.startOrder);

module.exports = router;
