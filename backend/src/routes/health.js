const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Simple health check without database query
    res.status(200).json({ status: 'healthy' });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({ status: 'unhealthy', error: error.message });
  }
});

module.exports = router;
