const express = require('express');
const router = express.Router();
const clientLocationsController = require('../controllers/clientLocationsController');

router.get('/:clientId', clientLocationsController.getClientLocations);

module.exports = router;
