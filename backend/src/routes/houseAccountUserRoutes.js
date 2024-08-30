const express = require('express');
const router = express.Router();
const houseAccountUserController = require('../controllers/houseAccountUserController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), houseAccountUserController.getAllHouseAccountUsers);
router.get('/:id', authorizeRoles(1, 2), houseAccountUserController.getHouseAccountUserById);
router.post('/', authorizeRoles(1, 2), houseAccountUserController.createHouseAccountUser);
router.put('/:id', authorizeRoles(1, 2), houseAccountUserController.updateHouseAccountUser);
router.delete('/:id', authorizeRoles(1, 2), houseAccountUserController.deleteHouseAccountUser);

module.exports = router;
