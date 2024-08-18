const express = require('express');
const router = express.Router();
const serviceFeeController = require('../controllers/serviceFeeController');

router.post('/service-fees', serviceFeeController.createServiceFee);
router.get('/service-fees', serviceFeeController.getServiceFees);

module.exports = router;
