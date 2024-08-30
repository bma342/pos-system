const express = require('express');
const router = express.Router();
const guestRewardsController = require('../controllers/guestRewardsController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), guestRewardsController.getAllGuestRewards);
router.get('/:id', authorizeRoles(1, 2), guestRewardsController.getGuestRewardById);
router.post('/', authorizeRoles(1, 2), guestRewardsController.createGuestReward);
router.put('/:id', authorizeRoles(1, 2), guestRewardsController.updateGuestReward);
router.delete('/:id', authorizeRoles(1, 2), guestRewardsController.deleteGuestReward);

module.exports = router;
