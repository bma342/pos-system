const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const ClientController = require('../controllers/clientController');

// Client routes
router.get('/', authenticateToken, authorizeRoles('Super Admin', 'Admin'), ClientController.getAllClients);
router.get('/:id', authenticateToken, authorizeRoles('Super Admin', 'Admin'), ClientController.getClientById);
router.post('/', authenticateToken, authorizeRoles('Super Admin'), ClientController.createClient);
router.put('/:id', authenticateToken, authorizeRoles('Super Admin', 'Admin'), ClientController.updateClient);
router.delete('/:id', authenticateToken, authorizeRoles('Super Admin'), ClientController.deleteClient);
router.get('/theme', ClientController.getClientTheme);

module.exports = router;
