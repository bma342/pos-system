const express = require('express');
const { getMenus, updateMenuItem } = require('../controllers/menuController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/clients/:clientId/menus', authMiddleware, getMenus);
router.put('/menus/:menuId/items/:itemId', authMiddleware, updateMenuItem);

module.exports = router;
