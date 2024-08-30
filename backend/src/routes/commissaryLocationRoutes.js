const express = require('express');
const router = express.Router();
const commissaryLocationController = require('../controllers/commissaryLocationController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), commissaryLocationController.getAllCommissaryLocations);
router.get('/:id', authorizeRoles(1, 2), commissaryLocationController.getCommissaryLocationById);
router.post('/', authorizeRoles(1, 2), commissaryLocationController.createCommissaryLocation);
router.put('/:id', authorizeRoles(1, 2), commissaryLocationController.updateCommissaryLocation);
router.delete('/:id', authorizeRoles(1, 2), commissaryLocationController.deleteCommissaryLocation);

module.exports = router;
