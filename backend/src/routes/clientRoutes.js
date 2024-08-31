const express = require('express');
const clientController = require('../controllers/clientController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const { body } = require('express-validator');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Get all clients (Super Admin only)
router.get('/', authorize(['superAdmin']), clientController.getAllClients);

// Get a specific client
router.get('/:id', authorize(['superAdmin', 'clientAdmin']), clientController.getClientById);

// Create a new client (Super Admin only)
router.post('/', 
  authorize(['superAdmin']),
  [
    body('name').notEmpty().withMessage('Client name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    // Add other validation as needed
  ],
  clientController.createClient
);

// Update a client
router.put('/:id', 
  authorize(['superAdmin', 'clientAdmin']),
  [
    body('name').optional().notEmpty().withMessage('Client name cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    // Add other validation as needed
  ],
  clientController.updateClient
);

// Delete a client (Super Admin only)
router.delete('/:id', authorize(['superAdmin']), clientController.deleteClient);

// Get client settings
router.get('/:id/settings', authorize(['superAdmin', 'clientAdmin']), clientController.getClientSettings);

// Update client settings
router.put('/:id/settings', 
  authorize(['superAdmin', 'clientAdmin']),
  [
    // Add validation for settings fields
  ],
  clientController.updateClientSettings
);

module.exports = router;
