const express = require('express');
const router = express.Router();
const abTestResultController = require('../controllers/abTestResultController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), abTestResultController.getAllABTestResults);
router.post('/', authorizeRoles(1, 2), abTestResultController.createABTestResult);
router.get('/:id', authorizeRoles(1, 2), abTestResultController.getABTestResult);
router.put('/:id', authorizeRoles(1, 2), abTestResultController.updateABTestResult);
router.delete('/:id', authorizeRoles(1, 2), abTestResultController.deleteABTestResult);

module.exports = router;
