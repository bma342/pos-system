const express = require('express');
const houseAccountController = require('../controllers/houseAccountController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Get house accounts by client
router.get('/client/:clientId', authorize(['admin', 'manager']), houseAccountController.getHouseAccountsByClient);

// Get a specific house account
router.get('/:id', authorize(['admin', 'manager']), houseAccountController.getHouseAccountById);

// Create a new house account
router.post('/', authorize(['admin']), houseAccountController.createHouseAccount);

// Update a house account
router.put('/:id', authorize(['admin']), houseAccountController.updateHouseAccount);

// Delete a house account
router.delete('/:id', authorize(['admin']), houseAccountController.deleteHouseAccount);

// Add funds to a house account
router.post('/:id/add-funds', authorize(['admin', 'manager']), houseAccountController.addFunds);

// Deduct funds from a house account
router.post('/:id/deduct-funds', authorize(['admin', 'manager']), houseAccountController.deductFunds);

// Get transaction history for a house account
router.get('/:id/transactions', authorize(['admin', 'manager']), houseAccountController.getTransactionHistory);

module.exports = router;
