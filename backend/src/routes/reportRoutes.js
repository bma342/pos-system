const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const ReportService = require('../services/ReportService');

router.get('/sales-summary', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const summary = await ReportService.getSalesSummary(req.query);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Error generating report', error });
  }
});

router.get('/guest-activity', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const activity = await ReportService.getGuestActivity(req.query);
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Error generating report', error });
  }
});

module.exports = router;
