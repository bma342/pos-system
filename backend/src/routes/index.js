const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const toastRoutes = require('./toastRoutes'); // Add this line

// Existing routes
router.use('/auth', authRoutes);

// Add Toast routes
router.use('/api', toastRoutes);

module.exports = router;
