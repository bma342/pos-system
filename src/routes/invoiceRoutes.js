const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const InvoiceService = require('../services/InvoiceService');

// Generate an invoice for a house account or catering order
router.post('/generate', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const invoice = await InvoiceService.generateInvoice(req.body);
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Error generating invoice', error });
  }
});

// Retrieve stored invoices
router.get('/:id', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const invoice = await InvoiceService.getInvoice(req.params.id);
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving invoice', error });
  }
});

module.exports = router;
