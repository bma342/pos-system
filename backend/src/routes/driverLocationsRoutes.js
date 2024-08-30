const express = require('express');
const router = express.Router();
const driverLocationsController = require('../controllers/driverLocationsController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), driverLocationsController.getAllDriverLocations);
router.get('/:id', authorizeRoles(1, 2), driverLocationsController.getDriverLocationById);
router.post('/', authorizeRoles(1, 2), driverLocationsController.createDriverLocation);
router.put('/:id', authorizeRoles(1, 2), driverLocationsController.updateDriverLocation);
router.delete('/:id', authorizeRoles(1, 2), driverLocationsController.deleteDriverLocation);

module.exports = router;
