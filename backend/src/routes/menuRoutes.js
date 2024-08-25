const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/menuController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Menu routes
router.get('/client/:clientId', authenticateToken, authorizeRoles('Super Admin', 'Admin'), MenuController.getMenus);
router.get('/:id', authenticateToken, authorizeRoles('Super Admin', 'Admin'), MenuController.getMenuById);
router.post('/', authenticateToken, authorizeRoles('Super Admin', 'Admin'), MenuController.createMenu);
router.put('/:id', authenticateToken, authorizeRoles('Super Admin', 'Admin'), MenuController.updateMenu);
router.delete('/:id', authenticateToken, authorizeRoles('Super Admin', 'Admin'), MenuController.deleteMenu);

// Menu groups and items
router.post('/group', authenticateToken, authorizeRoles('Super Admin', 'Admin'), MenuController.createMenuGroup);
router.put('/group/:id', authenticateToken, authorizeRoles('Super Admin', 'Admin'), MenuController.updateMenuGroup);
router.delete('/group/:id', authenticateToken, authorizeRoles('Super Admin', 'Admin'), MenuController.deleteMenuGroup);

router.post('/item', authenticateToken, authorizeRoles('Super Admin', 'Admin'), MenuController.upsertMenuItem);
router.delete('/item/:id', authenticateToken, authorizeRoles('Super Admin', 'Admin'), MenuController.deleteMenuItem);

// Sync endpoints
router.post('/sync-menus', authenticateToken, authorizeRoles('Super Admin', 'Admin'), MenuController.syncMenus);
router.post('/sync-menu-groups', authenticateToken, authorizeRoles('Super Admin', 'Admin'), MenuController.syncMenuGroups);
router.post('/sync-menu-items', authenticateToken, authorizeRoles('Super Admin', 'Admin'), MenuController.syncMenuItems);

module.exports = router;
