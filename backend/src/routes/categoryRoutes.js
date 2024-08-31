const express = require('express');
const categoryController = require('../controllers/categoryController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Get all categories
router.get('/', authorize(['admin', 'manager']), categoryController.getAllCategories);

// Get a specific category
router.get('/:id', authorize(['admin', 'manager']), categoryController.getCategoryById);

// Create a new category
router.post('/', authorize(['admin']), categoryController.createCategory);

// Update a category
router.put('/:id', authorize(['admin']), categoryController.updateCategory);

// Delete a category
router.delete('/:id', authorize(['admin']), categoryController.deleteCategory);

module.exports = router;
