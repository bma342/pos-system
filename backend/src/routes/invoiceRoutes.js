const express = require('express');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const invoiceController = require('../controllers/invoiceController');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Generate invoice
router.post('/generate', authorize(['admin', 'manager']), invoiceController.generateInvoice);

// Get invoice by ID
router.get('/:id', authorize(['admin', 'manager']), invoiceController.getInvoiceById);

// Get all invoices for a client
router.get('/client/:clientId', authorize(['admin', 'manager']), invoiceController.getClientInvoices);

// Update invoice
router.put('/:id', authorize(['admin']), invoiceController.updateInvoice);

// Delete invoice
router.delete('/:id', authorize(['admin']), invoiceController.deleteInvoice);

module.exports = router;
