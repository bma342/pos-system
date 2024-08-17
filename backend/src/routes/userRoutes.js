const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const UserController = require('../controllers/userController');

// Get all users (Super Admins only)
router.get('/', authenticateToken, authorizeRoles('Super Admin'), UserController.getAllUsers);
router.put('/:id', authenticateToken, authorizeRoles('Super Admin', 'Admin'), UserController.updateUser);

// Update a user (Admins and above)

module.exports = router;
