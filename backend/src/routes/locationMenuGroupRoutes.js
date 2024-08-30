const express = require('express');
const router = express.Router();
const locationMenuGroupController = require('../controllers/locationMenuGroupController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), locationMenuGroupController.getAllLocationMenuGroups);
router.get('/:id', authorizeRoles(1, 2), locationMenuGroupController.getLocationMenuGroupById);
router.post('/', authorizeRoles(1, 2), locationMenuGroupController.createLocationMenuGroup);
router.put('/:id', authorizeRoles(1, 2), locationMenuGroupController.updateLocationMenuGroup);
router.delete('/:id', authorizeRoles(1, 2), locationMenuGroupController.deleteLocationMenuGroup);

module.exports = router;
