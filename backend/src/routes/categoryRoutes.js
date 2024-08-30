const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), categoryController.getAllCategories);
router.post('/', authorizeRoles(1, 2), categoryController.createCategory);
router.get('/:id', authorizeRoles(1, 2), categoryController.getCategory);
router.put('/:id', authorizeRoles(1, 2), categoryController.updateCategory);
router.delete('/:id', authorizeRoles(1, 2), categoryController.deleteCategory);

module.exports = router;
