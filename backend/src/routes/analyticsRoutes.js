const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/client', authorizeRoles(1, 2), analyticsController.getClientAnalytics);
router.post('/', authorizeRoles(1, 2), analyticsController.addAnalyticsEntry);
router.get('/:id', authorizeRoles(1, 2), analyticsController.getAnalyticsEntry);
router.put('/:id', authorizeRoles(1, 2), analyticsController.updateAnalyticsEntry);
router.delete('/:id', authorizeRoles(1, 2), analyticsController.deleteAnalyticsEntry);

module.exports = router;
