const express = require('express');
const router = express.Router();
const roleTemplateAssignmentsController = require('../controllers/roleTemplateAssignmentsController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles('Admin', 'Manager'), roleTemplateAssignmentsController.getAllRoleTemplateAssignments);
router.post('/', authorizeRoles('Admin', 'Manager'), roleTemplateAssignmentsController.createRoleTemplateAssignment);
router.get('/:id', authorizeRoles('Admin', 'Manager'), roleTemplateAssignmentsController.getRoleTemplateAssignmentById);
router.put('/:id', authorizeRoles('Admin', 'Manager'), roleTemplateAssignmentsController.updateRoleTemplateAssignment);
router.delete('/:id', authorizeRoles('Admin', 'Manager'), roleTemplateAssignmentsController.deleteRoleTemplateAssignment);

module.exports = router;
