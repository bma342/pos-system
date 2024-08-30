const express = require('express');
const router = express.Router();
const cateringOrderCustomizationController = require('../controllers/cateringOrderCustomizationController');

// GET all customizations
router.get('/', cateringOrderCustomizationController.getAllCustomizations);

// GET a single customization by ID
router.get('/:id', cateringOrderCustomizationController.getCustomizationById);

// POST a new customization
router.post('/', cateringOrderCustomizationController.createCustomization);

// PUT update an existing customization
router.put('/:id', cateringOrderCustomizationController.updateCustomization);

// DELETE a customization
router.delete('/:id', cateringOrderCustomizationController.deleteCustomization);

module.exports = router;
