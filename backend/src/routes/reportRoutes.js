const express = require('express');
const reportController = require('../controllers/reportController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Generate report
router.post('/generate', authorize(['admin', 'manager']), reportController.generateReport);

// Get report by ID
router.get('/:id', authorize(['admin', 'manager']), reportController.getReportById);

// Get all reports for a client
router.get('/client/:clientId', authorize(['admin', 'manager']), reportController.getClientReports);

// Update report
router.put('/:id', authorize(['admin']), reportController.updateReport);

// Delete report
router.delete('/:id', authorize(['admin']), reportController.deleteReport);

module.exports = router;
