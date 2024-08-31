const express = require('express');
const locationController = require('../controllers/locationController');
const authorize = require('../middleware/authorize');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate); // Authenticate all location routes

router.get('/', locationController.getLocations);
router.post('/', locationController.createLocation);
router.get('/:id', locationController.getLocationDetails);
router.put('/:id', locationController.updateLocation);
router.delete('/:id', locationController.deleteLocation);

module.exports = router;
