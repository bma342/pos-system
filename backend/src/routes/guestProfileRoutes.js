const express = require('express');
const router = express.Router();
const guestProfileController = require('../controllers/guestProfileController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), guestProfileController.getAllGuestProfiles);
router.get('/:id', authorizeRoles(1, 2), guestProfileController.getGuestProfileById);
router.post('/', authorizeRoles(1, 2), guestProfileController.createGuestProfile);
router.put('/:id', authorizeRoles(1, 2), guestProfileController.updateGuestProfile);
router.delete('/:id', authorizeRoles(1, 2), guestProfileController.deleteGuestProfile);

module.exports = router;
