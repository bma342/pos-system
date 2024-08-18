const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles, checkPermission } = require('../middleware/roleMiddleware');
const dataWallController = require('../controllers/dataWallController');

// Routes for managing data walls
router.post('/', authenticateToken, authorizeRoles(['Admin']), dataWallController.createDataWall);
router.get('/:locationId', authenticateToken, authorizeRoles(['Admin', 'Manager']), dataWallController.getDataWallsByLocation);

module.exports = router;
