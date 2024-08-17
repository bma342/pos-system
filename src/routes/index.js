const express = require('express');
const router = express.Router();

// Define routes here
// Example: router.use('/users', require('./users'));

// Default route
router.get('/', (req, res) => res.send('API is working'));

module.exports = router;
