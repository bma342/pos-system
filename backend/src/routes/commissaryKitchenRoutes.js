const express = require('express');
const router = express.Router();
const commissaryKitchenController = require('../controllers/commissaryKitchenController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), commissaryKitchenController.getAllCommissaryKitchens);
router.get('/:id', authorizeRoles(1, 2), commissaryKitchenController.getCommissaryKitchenById);
router.post('/', authorizeRoles(1, 2), commissaryKitchenController.createCommissaryKitchen);
router.put('/:id', authorizeRoles(1, 2), commissaryKitchenController.updateCommissaryKitchen);
router.delete('/:id', authorizeRoles(1, 2), commissaryKitchenController.deleteCommissaryKitchen);

module.exports = router;
