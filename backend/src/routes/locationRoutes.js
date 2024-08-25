const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Routes for managing locations
router.post('/create', authenticateToken, authorizeRoles('Client Admin'), locationController.createLocation);
router.put('/:id', authenticateToken, authorizeRoles('Client Admin', 'Location Manager'), locationController.updateLocation);
router.get('/', authenticateToken, authorizeRoles('Client Admin', 'Location Manager'), locationController.getLocations);
router.get('/:id', authenticateToken, authorizeRoles('Client Admin', 'Location Manager'), locationController.getLocationById);
router.delete('/:id', authenticateToken, authorizeRoles('Client Admin'), locationController.deleteLocation);

// Routes for managing drop-off spots
router.post('/:locationId/dropoff-spots', authenticateToken, authorizeRoles('Client Admin', 'Location Manager'), locationController.createDropOffSpot);
router.put('/dropoff-spots/:spotId', authenticateToken, authorizeRoles('Client Admin', 'Location Manager'), locationController.updateDropOffSpot);
router.get('/:locationId/dropoff-spots', authenticateToken, authorizeRoles('Client Admin', 'Location Manager'), locationController.getDropOffSpots);
router.delete('/dropoff-spots/:spotId', authenticateToken, authorizeRoles('Client Admin', 'Location Manager'), locationController.deleteDropOffSpot);

module.exports = router;
