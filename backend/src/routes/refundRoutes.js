const express = require('express');
const router = express.Router();
const refundController = require('../controllers/refundController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles('Admin', 'Manager'), refundController.getAllRefunds);
router.post('/', authorizeRoles('Admin', 'Manager'), refundController.createRefund);
router.get('/:id', authorizeRoles('Admin', 'Manager'), refundController.getRefundById);
router.put('/:id', authorizeRoles('Admin', 'Manager'), refundController.updateRefund);
router.delete('/:id', authorizeRoles('Admin', 'Manager'), refundController.deleteRefund);

module.exports = router;
