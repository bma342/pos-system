const express = require 'express';
const { getOrderAnalytics, getGuestAnalytics } = require '../controllers/analyticsController';

const router = express.Router();

router.get('/orders', getOrderAnalytics);
router.get('/guests', getGuestAnalytics);

module.exports = router;