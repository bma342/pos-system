const express = require('express');
const router = express.Router();
const guestLoyaltyProgramController = require('../controllers/guestLoyaltyProgramController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), guestLoyaltyProgramController.getAllGuestLoyaltyPrograms);
router.get('/:id', authorizeRoles(1, 2), guestLoyaltyProgramController.getGuestLoyaltyProgramById);
router.post('/', authorizeRoles(1, 2), guestLoyaltyProgramController.createGuestLoyaltyProgram);
router.put('/:id', authorizeRoles(1, 2), guestLoyaltyProgramController.updateGuestLoyaltyProgram);
router.delete('/:id', authorizeRoles(1, 2), guestLoyaltyProgramController.deleteGuestLoyaltyProgram);

module.exports = router;
