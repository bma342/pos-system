const express = require 'express';
import { 
  getLocations, 
  createLocation, 
  updateLocation, 
  deleteLocation,
  updateLocationPOSSettings
} from '../controllers/locationController';
const { authenticate, authorize } = require '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, getLocations);
router.post('/', authenticate, authorize('admin'), createLocation);
router.put('/:id', authenticate, authorize('admin'), updateLocation);
router.delete('/:id', authenticate, authorize('admin'), deleteLocation);
router.put('/:id/pos-settings', authenticate, authorize('admin'), updateLocationPOSSettings);

module.exports = router;