const express = require('express');
const guestController = require('../controllers/guestController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Get all guests
router.get('/', authorize(['admin', 'manager']), guestController.getAllGuests);

// Get a specific guest
router.get('/:id', authorize(['admin', 'manager']), guestController.getGuestById);

// Create a new guest
router.post('/', authorize(['admin', 'manager']), guestController.createGuest);

// Update a guest
router.put('/:id', authorize(['admin', 'manager']), guestController.updateGuest);

// Delete a guest
router.delete('/:id', authorize(['admin']), guestController.deleteGuest);

module.exports = router;