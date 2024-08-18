const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/roleMiddleware');
const clientController = require('../controllers/clientController');

// Routes for managing clients
router.post('/', authenticateToken, authorizeRoles(['Super Admin']), clientController.createClient);
router.put('/:id', authenticateToken, authorizeRoles(['Super Admin']), clientController.updateClient);
router.delete('/:id', authenticateToken, authorizeRoles(['Super Admin']), clientController.deleteClient);
router.get('/:id', authenticateToken, authorizeRoles(['Super Admin', 'Admin']), clientController.getClientDetails);

module.exports = router;

