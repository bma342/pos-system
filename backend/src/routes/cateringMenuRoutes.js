const express = require('express');
const router = express.Router();
const cateringMenuController = require('../controllers/cateringMenuController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), cateringMenuController.getAllCateringMenus);
router.post('/', authorizeRoles(1, 2), cateringMenuController.createCateringMenu);
router.get('/:id', authorizeRoles(1, 2), cateringMenuController.getCateringMenu);
router.put('/:id', authorizeRoles(1, 2), cateringMenuController.updateCateringMenu);
router.delete('/:id', authorizeRoles(1, 2), cateringMenuController.deleteCateringMenu);

module.exports = router;
