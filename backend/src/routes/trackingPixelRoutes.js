const express = require('express');
const router = express.Router();
const trackingPixelController = require('../controllers/trackingPixelController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.post('/', authenticateToken, authorizeRoles('Admin'), trackingPixelController.createPixel);
router.put('/:id', authenticateToken, authorizeRoles('Admin'), trackingPixelController.updatePixel);
router.delete('/:id', authenticateToken, authorizeRoles('Admin'), trackingPixelController.deletePixel);
router.get('/location/:locationId', authenticateToken, authorizeRoles('Admin'), trackingPixelController.getPixelsByLocation);

module.exports = router;
