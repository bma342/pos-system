const express = require('express');
const router = express.Router();
const LocationController = require('../controllers/LocationController');
const AuthController = require('../controllers/AuthController');

// Get all locations for the selection page
router.get('/', LocationController.getAllLocations);

// Get filtered locations
router.post('/filter', LocationController.getFilteredLocations);

// Get client branding information
router.get('/branding', LocationController.getClientBranding);

// Get user role (for admin dashboard access)
router.get('/user-role', AuthController.getUserRole);

// Login route (if needed on this page)
router.post('/login', AuthController.login);

module.exports = router;
