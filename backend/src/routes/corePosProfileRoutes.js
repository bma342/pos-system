const express = require('express');
const corePosProfileController = require('../controllers/corePosProfileController');

const router = express.Router();

router.get('/', corePosProfileController.getAll);
router.get('/:id', corePosProfileController.getById);
router.post('/', corePosProfileController.create);
router.put('/:id', corePosProfileController.update);
router.delete('/:id', corePosProfileController.delete);
router.post('/:id/sync', corePosProfileController.syncLocation);

module.exports = router;
