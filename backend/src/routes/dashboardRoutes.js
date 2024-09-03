const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authenticateUser, authorizeGlobalAdmin } = require('../middleware/auth');

router.get('/data', authenticateUser, dashboardController.getDashboardData);
router.get('/global-data', authenticateUser, authorizeGlobalAdmin, dashboardController.getGlobalDashboardData);

module.exports = router;


