const express = require('express');
const UserController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Check if the method exists before using it
if (UserController.getAllUsers) {
  router.get('/', authenticate, authorize(['Super Admin']), UserController.getAllUsers);
} else {
  console.warn('Warning: UserController.getAllUsers is not defined');
}

if (UserController.getUserById) {
  router.get('/:id', authenticate, authorize(['Super Admin', 'Admin']), UserController.getUserById);
} else {
  console.warn('Warning: UserController.getUserById is not defined');
}

if (UserController.createUser) {
  router.post('/', authenticate, authorize(['Super Admin']), UserController.createUser);
} else {
  console.warn('Warning: UserController.createUser is not defined');
}

if (UserController.updateUser) {
  router.put('/:id', authenticate, authorize(['Super Admin', 'Admin']), UserController.updateUser);
} else {
  console.warn('Warning: UserController.updateUser is not defined');
}

if (UserController.deleteUser) {
  router.delete('/:id', authenticate, authorize(['Super Admin']), UserController.deleteUser);
} else {
  console.warn('Warning: UserController.deleteUser is not defined');
}

module.exports = router;
