const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/menuController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.get('/client/:clientId', authenticateToken, authorizeRoles('Super Admin', 'Admin'), MenuController.getMenus);
router.post('/', authenticateToken, authorizeRoles('Super Admin', 'Admin'), MenuController.createMenu);
router.put('/:id', authenticateToken, authorizeRoles('Super Admin', 'Admin'), MenuController.updateMenu);
router.delete('/:id', authenticateToken, authorizeRoles('Super Admin', 'Admin'), MenuController.deleteMenu);

module.exports = router;
