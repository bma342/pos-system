const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const houseAccountController = require('../controllers/houseAccountController');

// Get all house accounts for a client
router.get('/client/:clientId', authenticateToken, authorizeRoles(1, 2), houseAccountController.getHouseAccountsByClient);

// Create a new house account
router.post('/', authenticateToken, authorizeRoles(1, 2), houseAccountController.createHouseAccount);

// Add a user to a house account
router.post('/:houseAccountId/users', authenticateToken, authorizeRoles(1, 2), houseAccountController.addUserToHouseAccount);

// Get users for a specific house account
router.get('/:houseAccountId/users', authenticateToken, authorizeRoles(1, 2), houseAccountController.getUsersByHouseAccount);

module.exports = router;
