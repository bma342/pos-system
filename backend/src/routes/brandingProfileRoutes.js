const express = require('express');
const router = express.Router();
const brandingProfileController = require('../controllers/brandingProfileController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), brandingProfileController.getBrandingProfile);
router.post('/', authorizeRoles(1, 2), brandingProfileController.createBrandingProfile);
router.put('/', authorizeRoles(1, 2), brandingProfileController.updateBrandingProfile);
router.delete('/', authorizeRoles(1, 2), brandingProfileController.deleteBrandingProfile);

module.exports = router;
