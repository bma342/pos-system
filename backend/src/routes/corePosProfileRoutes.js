const express = require('express');
const router = express.Router();
const corePosProfileController = require('../controllers/corePosProfileController');

// Routes for managing Core POS Profiles
router.get('/', corePosProfileController.getAllProfiles);
router.get('/:id', corePosProfileController.getProfileById);
router.post('/', corePosProfileController.createProfile);
router.put('/:id', corePosProfileController.updateProfile);
router.delete('/:id', corePosProfileController.deleteProfile);

module.exports = router;
