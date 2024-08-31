const express = require('express');
const analyticsController = require('../controllers/analyticsController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Use authenticate middleware for all routes
router.use(authenticate);

// Define routes
router.get('/order', authorize(['Admin']), analyticsController.getOrderAnalytics);
router.get('/guest', authorize(['Admin']), analyticsController.getGuestAnalytics);
router.get('/revenue', authorize(['Admin']), analyticsController.getRevenue);
router.get('/customers', authorize(['Admin']), analyticsController.getCustomers);
router.get('/realtime', authorize(['Admin']), analyticsController.getRealtimeMetricsController);

module.exports = router;
