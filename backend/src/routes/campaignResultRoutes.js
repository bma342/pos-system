const express = require('express');
const router = express.Router();
const campaignResultController = require('../controllers/campaignResultController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), campaignResultController.getAllCampaignResults);
router.post('/', authorizeRoles(1, 2), campaignResultController.createCampaignResult);
router.get('/:id', authorizeRoles(1, 2), campaignResultController.getCampaignResult);
router.put('/:id', authorizeRoles(1, 2), campaignResultController.updateCampaignResult);
router.delete('/:id', authorizeRoles(1, 2), campaignResultController.deleteCampaignResult);

module.exports = router;
