const express = require('express');
const router = express.Router();
const cateringOrderAssignmentsController = require('../controllers/cateringOrderAssignmentsController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), cateringOrderAssignmentsController.getAllAssignments);
router.post('/', authorizeRoles(1, 2), cateringOrderAssignmentsController.createAssignment);
router.get('/:id', authorizeRoles(1, 2), cateringOrderAssignmentsController.getAssignment);
router.put('/:id', authorizeRoles(1, 2), cateringOrderAssignmentsController.updateAssignment);
router.delete('/:id', authorizeRoles(1, 2), cateringOrderAssignmentsController.deleteAssignment);

module.exports = router;
