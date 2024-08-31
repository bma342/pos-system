const express = require('express');
const MenuController = require('../controllers/menuController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.get('/client/:clientId', authenticate, authorize(['Super Admin', 'Admin']), MenuController.getMenus);
router.get('/:menuId', authenticate, MenuController.getMenuById);
router.post('/', authenticate, authorize(['Super Admin', 'Admin']), MenuController.createMenu);
router.put('/:menuId', authenticate, authorize(['Super Admin', 'Admin']), MenuController.updateMenu);
router.delete('/:menuId', authenticate, authorize(['Super Admin', 'Admin']), MenuController.deleteMenu);
router.post('/item', authenticate, authorize(['Super Admin', 'Admin']), MenuController.upsertMenuItem);

module.exports = router;
