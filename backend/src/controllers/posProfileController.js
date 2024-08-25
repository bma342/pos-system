const posSyncService = require('../services/posSyncService');
const db = require('../models');
const logger = require('../services/logger');

// Create a Core POS profile (Admin Only)
exports.createCorePosProfile = async (req, res) => {
  try {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const coreProfileData = req.body;
    const newCoreProfile = await db.CorePOSProfile.create(coreProfileData);

    logger.info(`Core POS profile created: ${newCoreProfile.profileName}`);
    res.status(201).json(newCoreProfile);
  } catch (error) {
    logger.error(`Error creating Core POS profile: ${error.message}`);
    res.status(500).json({ message: 'Error creating Core POS profile', error });
  }
};

// Fetch Core POS profiles (Admin Only)
exports.getCorePosProfiles = async (req, res) => {
  try {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const profiles = await db.CorePOSProfile.findAll();
    res.status(200).json(profiles);
  } catch (error) {
    logger.error(`Error fetching Core POS profiles: ${error.message}`);
    res.status(500).json({ message: 'Error fetching Core POS profiles', error });
  }
};

// Create a Location-specific POS profile
exports.createLocationPosProfile = async (req, res) => {
  try {
    const { locationId } = req.params;
    const profileData = req.body;

    const location = await db.Location.findByPk(locationId);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    const coreProfile = await db.CorePOSProfile.findByPk(profileData.coreProfileId);
    if (!coreProfile) {
      return res.status(404).json({ message: 'Core POS Profile not found' });
    }

    const newLocationProfile = await db.LocationPOSProfile.create({
      ...profileData,
      locationId,
      coreProfileId: coreProfile.id,
    });

    logger.info(`Location POS profile created for location ID ${locationId}`);
    res.status(201).json(newLocationProfile);
  } catch (error) {
    logger.error(`Error creating Location POS profile: ${error.message}`);
    res.status(500).json({ message: 'Error creating Location POS profile', error });
  }
};

// Update a Location-specific POS profile
exports.updateLocationPosProfile = async (req, res) => {
  try {
    const { profileId } = req.params;
    const profileData = req.body;

    const locationProfile = await db.LocationPOSProfile.findByPk(profileId);
    if (!locationProfile) {
      return res.status(404).json({ message: 'Location POS profile not found' });
    }

    await locationProfile.update(profileData);

    logger.info(`Location POS profile updated: ID ${profileId}`);
    res.status(200).json(locationProfile);
  } catch (error) {
    logger.error(`Error updating Location POS profile: ${error.message}`);
    res.status(500).json({ message: 'Error updating Location POS profile', error });
  }
};

// Fetch a Location-specific POS profile by ID
exports.getLocationPosProfileById = async (req, res) => {
  try {
    const { profileId } = req.params;
    const locationProfile = await db.LocationPOSProfile.findByPk(profileId);

    if (!locationProfile) {
      return res.status(404).json({ message: 'Location POS profile not found' });
    }

    res.status(200).json(locationProfile);
  } catch (error) {
    logger.error(`Error fetching Location POS profile: ${error.message}`);
    res.status(500).json({ message: 'Error fetching Location POS profile', error });
  }
};

// Sync POS data based on Location Profile settings
exports.syncPosData = async (req, res) => {
  try {
    const { profileId } = req.params;
    const locationProfile = await db.LocationPOSProfile.findByPk(profileId);
    if (!locationProfile) {
      return res.status(404).json({ message: 'Location POS profile not found' });
    }

    const coreProfile = await db.CorePOSProfile.findByPk(locationProfile.coreProfileId);
    if (!coreProfile) {
      return res.status(404).json({ message: 'Core POS profile not found' });
    }

    await posSyncService.syncMenus(locationProfile, coreProfile);
    await posSyncService.syncInventory(locationProfile, coreProfile);

    logger.info(`POS sync triggered for location profile ID ${profileId}`);
    res.status(200).json({ message: 'POS data synced successfully' });
  } catch (error) {
    logger.error(`Error syncing POS data: ${error.message}`);
    res.status(500).json({ message: 'Error syncing POS data', error });
  }
};

