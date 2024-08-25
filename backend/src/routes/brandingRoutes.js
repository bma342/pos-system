const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const brandingController = require('../controllers/brandingController');

// Get branding settings for a client
router.get('/client/:clientId', authenticateToken, authorizeRoles(1, 2), brandingController.getBrandingProfiles);

// Update branding settings for a client
router.put('/client/:clientId', authenticateToken, authorizeRoles(1, 2), brandingController.saveBrandingProfile);

// Schedule branding settings for future use
router.post('/client/:clientId/schedule', authenticateToken, authorizeRoles(1, 2), brandingController.scheduleBrandingProfile);

// Upload branding logo
router.post('/upload-logo', authenticateToken, authorizeRoles(1, 2), brandingController.uploadLogo);

module.exports = router;

