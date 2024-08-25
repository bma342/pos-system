const express = require('express');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const PosController = require('../controllers/PosController');

const router = express.Router();

// POS profile routes
router.post('/', authenticateToken, authorizeRoles('admin'), PosController.createProfile);
router.get('/', authenticateToken, PosController.getAllProfiles);
router.get('/:id', authenticateToken, PosController.getProfileById);
router.put('/:id', authenticateToken, authorizeRoles('admin'), PosController.updateProfile);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), PosController.deleteProfile);

module.exports = router;
