const express = require('express');
const router = express.Router();
const cateringAdminController = require('../controllers/cateringAdminController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), cateringAdminController.getAllCateringAdmins);
router.post('/', authorizeRoles(1, 2), cateringAdminController.createCateringAdmin);
router.get('/:id', authorizeRoles(1, 2), cateringAdminController.getCateringAdmin);
router.put('/:id', authorizeRoles(1, 2), cateringAdminController.updateCateringAdmin);
router.delete('/:id', authorizeRoles(1, 2), cateringAdminController.deleteCateringAdmin);

module.exports = router;
