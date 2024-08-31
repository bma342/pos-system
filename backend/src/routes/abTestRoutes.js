const express = require('express');
const { body } = require('express-validator');
const ABTestController = require('../controllers/abTestController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.use(authenticate);

router.post('/', 
  authorize(['admin']),
  [
    body('name').notEmpty().withMessage('Name is required'),
    // Add other validation rules as needed
  ],
  ABTestController.createABTest
);

router.get('/:id', authorize(['admin']), ABTestController.getABTest);
router.put('/:id', authorize(['admin']), ABTestController.updateABTest);
router.delete('/:id', authorize(['admin']), ABTestController.deleteABTest);
router.get('/:id/results', authorize(['admin']), ABTestController.getABTestResults);
router.post('/:id/start', authorize(['admin']), ABTestController.startABTest);
router.post('/:id/stop', authorize(['admin']), ABTestController.stopABTest);

module.exports = router;
