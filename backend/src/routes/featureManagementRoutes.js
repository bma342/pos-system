const express = require('express');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const featureManagementController = require('../controllers/featureManagementController');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Get client features
router.get('/features/:clientId', authorize(['superAdmin']), featureManagementController.getClientFeatures);

// Update client features
router.put('/features/:clientId', authorize(['superAdmin']), featureManagementController.updateClientFeatures);

// Get all available features
router.get('/available-features', authorize(['superAdmin']), featureManagementController.getAllAvailableFeatures);

// Create a new feature
router.post('/features', authorize(['superAdmin']), featureManagementController.createFeature);

// Update an existing feature
router.put('/features/:featureId', authorize(['superAdmin']), featureManagementController.updateFeature);

// Delete a feature
router.delete('/features/:featureId', authorize(['superAdmin']), featureManagementController.deleteFeature);

module.exports = router;
