const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const ReportService = require('../services/ReportService');

// Sales Summary Report
router.get('/sales-summary', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const { locationId, startDate, endDate } = req.query;
    if (!locationId || !startDate || !endDate) {
      return res.status(400).json({ message: 'Missing required query parameters: locationId, startDate, endDate' });
    }

    const summary = await ReportService.getSalesSummary({ locationId, startDate, endDate });
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Error generating sales summary report', error: error.message });
  }
});

// Guest Activity Report
router.get('/guest-activity', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const { locationId, guestId, startDate, endDate } = req.query;
    if (!locationId || !guestId || !startDate || !endDate) {
      return res.status(400).json({ message: 'Missing required query parameters: locationId, guestId, startDate, endDate' });
    }

    const activity = await ReportService.getGuestActivity({ locationId, guestId, startDate, endDate });
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Error generating guest activity report', error: error.message });
  }
});

// Inventory Report
router.get('/inventory', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const { locationId, startDate, endDate } = req.query;
    if (!locationId || !startDate || !endDate) {
      return res.status(400).json({ message: 'Missing required query parameters: locationId, startDate, endDate' });
    }

    const inventoryReport = await ReportService.getInventoryReport({ locationId, startDate, endDate });
    res.json(inventoryReport);
  } catch (error) {
    res.status(500).json({ message: 'Error generating inventory report', error: error.message });
  }
});

// Loyalty Performance Report
router.get('/loyalty-performance', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const { locationId, startDate, endDate } = req.query;
    if (!locationId || !startDate || !endDate) {
      return res.status(400).json({ message: 'Missing required query parameters: locationId, startDate, endDate' });
    }

    const loyaltyReport = await ReportService.getLoyaltyPerformanceReport({ locationId, startDate, endDate });
    res.json(loyaltyReport);
  } catch (error) {
    res.status(500).json({ message: 'Error generating loyalty performance report', error: error.message });
  }
});

module.exports = router;
