const express = require('express');
const router = express.Router();
const abTestController = require('../controllers/abTestController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), abTestController.getAllABTests);
router.post('/', authorizeRoles(1, 2), abTestController.createABTest);
router.get('/:id', authorizeRoles(1, 2), abTestController.getABTest);
router.put('/:id', authorizeRoles(1, 2), abTestController.updateABTest);
router.delete('/:id', authorizeRoles(1, 2), abTestController.deleteABTest);

module.exports = router;
