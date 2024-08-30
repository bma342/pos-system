const express = require('express');
const router = express.Router();
const campaignStepController = require('../controllers/campaignStepController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), campaignStepController.getAllCampaignSteps);
router.post('/', authorizeRoles(1, 2), campaignStepController.createCampaignStep);
router.get('/:id', authorizeRoles(1, 2), campaignStepController.getCampaignStep);
router.put('/:id', authorizeRoles(1, 2), campaignStepController.updateCampaignStep);
router.delete('/:id', authorizeRoles(1, 2), campaignStepController.deleteCampaignStep);

module.exports = router;
