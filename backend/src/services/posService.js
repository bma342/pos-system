const { PosProfile } = require('../models');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const createProfile = async (profileData) => {
  try {
    const profile = await PosProfile.create(profileData);
    logger.info(`POS profile created with ID: ${profile.id}`);
    return profile;
  } catch (error) {
    logger.error('Error creating POS profile:', error);
    throw new AppError('Failed to create POS profile', 500);
  }
};

const getProfile = async (id) => {
  try {
    const profile = await PosProfile.findByPk(id);
    if (!profile) {
      throw new AppError('POS profile not found', 404);
    }
    return profile;
  } catch (error) {
    logger.error(`Error fetching POS profile with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to fetch POS profile', 500);
  }
};

const updateProfile = async (id, profileData) => {
  try {
    const profile = await getProfile(id);
    const updatedProfile = await profile.update(profileData);
    logger.info(`POS profile updated with ID: ${id}`);
    return updatedProfile;
  } catch (error) {
    logger.error(`Error updating POS profile with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to update POS profile', 500);
  }
};

const deleteProfile = async (id) => {
  try {
    const profile = await getProfile(id);
    await profile.destroy();
    logger.info(`POS profile deleted with ID: ${id}`);
  } catch (error) {
    logger.error(`Error deleting POS profile with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to delete POS profile', 500);
  }
};

const syncData = async (syncData) => {
  try {
    // Implement your sync logic here
    // This could involve updating multiple models or calling external APIs
    logger.info('POS data sync initiated');
    // Example: await SomeModel.bulkCreate(syncData.someData, { updateOnDuplicate: ['field1', 'field2'] });
    return { message: 'Data synced successfully' };
  } catch (error) {
    logger.error('Error syncing POS data:', error);
    throw new AppError('Failed to sync POS data', 500);
  }
};

const getStatus = async (id) => {
  try {
    const profile = await getProfile(id);
    // Implement logic to determine POS status
    // This could involve checking connection status, last sync time, etc.
    const status = {
      isOnline: true, // Example status
      lastSyncTime: profile.lastSyncTime,
      // Add other relevant status information
    };
    return status;
  } catch (error) {
    logger.error(`Error fetching POS status for profile ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to fetch POS status', 500);
  }
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  syncData,
  getStatus
};