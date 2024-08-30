const express = require('express');
const router = express.Router();
const cateringOrderItemController = require('../controllers/cateringOrderItemController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), cateringOrderItemController.getAllItems);
router.post('/', authorizeRoles(1, 2), cateringOrderItemController.createItem);
router.get('/:id', authorizeRoles(1, 2), cateringOrderItemController.getItem);
router.put('/:id', authorizeRoles(1, 2), cateringOrderItemController.updateItem);
router.delete('/:id', authorizeRoles(1, 2), cateringOrderItemController.deleteItem);

module.exports = router;
