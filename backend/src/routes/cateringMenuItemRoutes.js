const express = require('express');
const router = express.Router();
const cateringMenuItemController = require('../controllers/cateringMenuItemController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), cateringMenuItemController.getAllCateringMenuItems);
router.post('/', authorizeRoles(1, 2), cateringMenuItemController.createCateringMenuItem);
router.get('/:id', authorizeRoles(1, 2), cateringMenuItemController.getCateringMenuItem);
router.put('/:id', authorizeRoles(1, 2), cateringMenuItemController.updateCateringMenuItem);
router.delete('/:id', authorizeRoles(1, 2), cateringMenuItemController.deleteCateringMenuItem);

module.exports = router;
