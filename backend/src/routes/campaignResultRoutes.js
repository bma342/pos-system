const express = require('express');
const campaignResultController = require('../controllers/campaignResultController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Apply authorization middleware to all routes
router.use(authorize(['admin', 'manager']));

// Get all campaign results
router.get('/', campaignResultController.getAllCampaignResults);

// Get a specific campaign result
router.get('/:id', campaignResultController.getCampaignResultById);

// Create a new campaign result
router.post('/', campaignResultController.createCampaignResult);

// Update a campaign result
router.put('/:id', campaignResultController.updateCampaignResult);

// Delete a campaign result
router.delete('/:id', campaignResultController.deleteCampaignResult);

module.exports = router;
