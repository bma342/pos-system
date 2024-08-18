const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const rewardController = require('../controllers/rewardController');

// Create or update reward schedule for a guest
router.post('/schedule', authenticateToken, rewardController.createOrUpdateRewardSchedule);

// Placeholder route for triggering rewards manually (can be scheduled by cron jobs)
router.post('/trigger', rewardController.checkAndTriggerRewards);

module.exports = router;
