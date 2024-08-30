const express = require('express');
const router = express.Router();
const itemModifierController = require('../controllers/itemModifierController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), itemModifierController.getAllItemModifiers);
router.get('/:id', authorizeRoles(1, 2), itemModifierController.getItemModifierById);
router.post('/', authorizeRoles(1, 2), itemModifierController.createItemModifier);
router.put('/:id', authorizeRoles(1, 2), itemModifierController.updateItemModifier);
router.delete('/:id', authorizeRoles(1, 2), itemModifierController.deleteItemModifier);

module.exports = router;
