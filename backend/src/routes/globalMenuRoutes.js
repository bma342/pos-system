const express = require('express');
const router = express.Router();
const globalMenuController = require('../controllers/globalMenuController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), globalMenuController.getAllGlobalMenus);
router.get('/:id', authorizeRoles(1, 2), globalMenuController.getGlobalMenuById);
router.post('/', authorizeRoles(1, 2), globalMenuController.createGlobalMenu);
router.put('/:id', authorizeRoles(1, 2), globalMenuController.updateGlobalMenu);
router.delete('/:id', authorizeRoles(1, 2), globalMenuController.deleteGlobalMenu);

module.exports = router;
