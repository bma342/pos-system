const express = require('express');
const trackingPixelController = require('../controllers/trackingPixelController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Create a new tracking pixel
router.post('/', authorize(['Admin']), trackingPixelController.createPixel);

// Get all tracking pixels
router.get('/', authorize(['Admin']), trackingPixelController.getAllPixels);

// Get a specific tracking pixel
router.get('/:id', authorize(['Admin']), trackingPixelController.getPixelById);

// Update a tracking pixel
router.put('/:id', authorize(['Admin']), trackingPixelController.updatePixel);

// Delete a tracking pixel
router.delete('/:id', authorize(['Admin']), trackingPixelController.deletePixel);

// Trigger a tracking pixel
router.get('/trigger/:id', trackingPixelController.triggerPixel);

module.exports = router;
