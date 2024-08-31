const express = require('express');
const taxController = require('../controllers/taxController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Get all tax rates
router.get('/', authorize(['admin', 'manager']), taxController.getAllTaxRates);

// Get a specific tax rate
router.get('/:id', authorize(['admin', 'manager']), taxController.getTaxRateById);

// Create a new tax rate
router.post('/', authorize(['admin']), taxController.createTaxRate);

// Update a tax rate
router.put('/:id', authorize(['admin']), taxController.updateTaxRate);

// Delete a tax rate
router.delete('/:id', authorize(['admin']), taxController.deleteTaxRate);

// Get tax rates for a specific location
router.get('/location/:locationId', authorize(['admin', 'manager']), taxController.getTaxRatesByLocation);

// Calculate tax for an order
router.post('/calculate', authorize(['admin', 'manager', 'customer']), taxController.calculateTax);

module.exports = router;
