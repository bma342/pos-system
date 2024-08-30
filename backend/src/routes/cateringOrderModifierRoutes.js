const express = require('express');
const router = express.Router();
const cateringOrderModifierController = require('../controllers/cateringOrderModifierController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), cateringOrderModifierController.getAllModifiers);
router.post('/', authorizeRoles(1, 2), cateringOrderModifierController.createModifier);
router.get('/:id', authorizeRoles(1, 2), cateringOrderModifierController.getModifier);
router.put('/:id', authorizeRoles(1, 2), cateringOrderModifierController.updateModifier);
router.delete('/:id', authorizeRoles(1, 2), cateringOrderModifierController.deleteModifier);

module.exports = router;
