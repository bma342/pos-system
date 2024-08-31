const express = require('express');
const brandingController = require('../controllers/brandingController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.get('/client/:clientId', authenticate, authorize(['Super Admin', 'Admin']), brandingController.getBrandingProfiles);
router.get('/:id', authenticate, authorize(['Super Admin', 'Admin']), brandingController.getBrandingProfileById);
router.post('/', authenticate, authorize(['Super Admin', 'Admin']), brandingController.createBrandingProfile);
router.put('/:id', authenticate, authorize(['Super Admin', 'Admin']), brandingController.updateBrandingProfile);
router.delete('/:id', authenticate, authorize(['Super Admin']), brandingController.deleteBrandingProfile);

module.exports = router;

