const express = require('express');
const router = express.Router();
const cateringOrderLocationController = require('../controllers/cateringOrderLocationController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), cateringOrderLocationController.getAllLocations);
router.post('/', authorizeRoles(1, 2), cateringOrderLocationController.createLocation);
router.get('/:id', authorizeRoles(1, 2), cateringOrderLocationController.getLocation);
router.put('/:id', authorizeRoles(1, 2), cateringOrderLocationController.updateLocation);
router.delete('/:id', authorizeRoles(1, 2), cateringOrderLocationController.deleteLocation);

module.exports = router;
