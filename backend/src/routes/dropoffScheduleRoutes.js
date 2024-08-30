const express = require('express');
const router = express.Router();
const dropoffScheduleController = require('../controllers/dropoffScheduleController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), dropoffScheduleController.getAllDropoffSchedules);
router.get('/:id', authorizeRoles(1, 2), dropoffScheduleController.getDropoffScheduleById);
router.post('/', authorizeRoles(1, 2), dropoffScheduleController.createDropoffSchedule);
router.put('/:id', authorizeRoles(1, 2), dropoffScheduleController.updateDropoffSchedule);
router.delete('/:id', authorizeRoles(1, 2), dropoffScheduleController.deleteDropoffSchedule);

module.exports = router;
