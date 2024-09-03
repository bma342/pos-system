const express = require('express');
const providerController = require('../controllers/providerController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Get all providers
router.get('/', authorize(['admin', 'manager']), providerController.getAllProviders);

// Get a specific provider
router.get('/:id', authorize(['admin', 'manager']), providerController.getProviderById);

// Create a new provider
router.post('/', authorize(['admin']), providerController.createProvider);

// Update a provider
router.put('/:id', authorize(['admin']), providerController.updateProvider);

// Delete a provider
router.delete('/:id', authorize(['admin']), providerController.deleteProvider);

// Get provider settings
router.get('/:id/settings', authorize(['admin', 'manager']), providerController.getProviderSettings);

// Update provider settings
router.put('/:id/settings', authorize(['admin']), providerController.updateProviderSettings);

// Get provider integrations
router.get('/:id/integrations', authorize(['admin', 'manager']), providerController.getProviderIntegrations);

// Add provider integration
router.post('/:id/integrations', authorize(['admin']), providerController.addProviderIntegration);

// Update provider integration
router.put('/:id/integrations/:integrationId', authorize(['admin']), providerController.updateProviderIntegration);

// Delete provider integration
router.delete('/:id/integrations/:integrationId', authorize(['admin']), providerController.deleteProviderIntegration);

// Sync provider data
router.post('/:id/sync', authorize(['admin']), providerController.syncProviderData);

// New routes for provider service
router.get('/providers', providerController.getProviders);
router.get('/providers/:id', providerController.getProvider);
router.post('/providers', providerController.addProvider);
router.put('/providers/:id', providerController.updateProvider);
router.delete('/providers/:id', providerController.deleteProvider);
router.get('/providers/search', providerController.searchProviders);
router.post('/providers/bulk-delete', providerController.bulkDeleteProviders);
router.get('/providers/stats', providerController.getProviderStats);

module.exports = router;
