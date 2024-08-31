const express = require('express');
const PosController = require('../controllers/posController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Define routes with appropriate authorization
router.post('/', authorize(['admin']), PosController.createProfile);
router.get('/:id', authorize(['admin']), PosController.getProfile);
router.put('/:id', authorize(['admin']), PosController.updateProfile);
router.delete('/:id', authorize(['admin']), PosController.deleteProfile);
router.post('/sync', authorize(['admin']), PosController.syncData);
router.get('/status/:id', authorize(['admin']), PosController.getStatus);

module.exports = router;
