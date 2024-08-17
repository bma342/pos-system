const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

router.get('/secure-endpoint', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Access granted' });
});

module.exports = router;
