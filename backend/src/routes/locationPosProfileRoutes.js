const express = require('express');
const router = express.Router();
const locationPosProfileController = require('../controllers/locationPosProfileController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), locationPosProfileController.getAllLocationPosProfiles);
router.get('/:id', authorizeRoles(1, 2), locationPosProfileController.getLocationPosProfileById);
router.post('/', authorizeRoles(1, 2), locationPosProfileController.createLocationPosProfile);
router.put('/:id', authorizeRoles(1, 2), locationPosProfileController.updateLocationPosProfile);
router.delete('/:id', authorizeRoles(1, 2), locationPosProfileController.deleteLocationPosProfile);

module.exports = router;
