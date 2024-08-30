const express = require('express');
const router = express.Router();
const houseAccountLocationsController = require('../controllers/houseAccountLocationsController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), houseAccountLocationsController.getAllHouseAccountLocations);
router.get('/:id', authorizeRoles(1, 2), houseAccountLocationsController.getHouseAccountLocationById);
router.post('/', authorizeRoles(1, 2), houseAccountLocationsController.createHouseAccountLocation);
router.put('/:id', authorizeRoles(1, 2), houseAccountLocationsController.updateHouseAccountLocation);
router.delete('/:id', authorizeRoles(1, 2), houseAccountLocationsController.deleteHouseAccountLocation);

module.exports = router;
