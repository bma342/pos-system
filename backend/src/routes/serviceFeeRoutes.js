const express = require('express');
const router = express.Router();
const serviceFeeController = require('../controllers/serviceFeeController');

router.get('/', serviceFeeController.getServiceFees);
router.post('/update', serviceFeeController.updateServiceFee);

module.exports = router;
