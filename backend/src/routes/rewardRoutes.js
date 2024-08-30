const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles('Admin', 'Manager'), rewardController.getAllRewards);
router.post('/', authorizeRoles('Admin', 'Manager'), rewardController.createReward);
router.get('/:id', authorizeRoles('Admin', 'Manager'), rewardController.getRewardById);

module.exports = router;
