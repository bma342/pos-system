const { Location, MenuItem } = require('../models');
const { scheduleJob } = require('node-schedule');
const LocationProfile = require('../models/LocationProfile');
const { AppError } = require('../utils/errorHandler');

const updateLocationStatus = async (locationId, isOpen) => {
  const location = await Location.findByPk(locationId);
  if (!location) {
    throw new AppError('Location not found', 404);
  }
  location.isOpen = isOpen;
  await location.save();
  return location;
};

const getLocations = async () => {
  return await Location.findAll();
};

const createLocation = async (locationData) => {
  const location = await Location.create(locationData);
  await setupInventoryReset(location.id);
  return location;
};

const updateLocation = async (locationData) => {
  const location = await Location.findByPk(locationData.id);
  if (!location) throw new AppError('Location not found', 404);

  await location.update(locationData);
  await setupInventoryReset(location.id);
  return location;
};

const getLocationProfiles = async () => {
  return await LocationProfile.findAll();
};

const setupInventoryReset = async (locationId) => {
  const location = await Location.findByPk(locationId);
  if (!location || !location.inventoryResetTime) return;

  const [hours, minutes] = location.inventoryResetTime.split(':').map(Number);

  scheduleJob(`${minutes} ${hours} * * *`, async () => {
    const menuItems = await MenuItem.findAll({ where: { locationId } });
    for (const item of menuItems) {
      await item.update({ onlineInventoryOffset: 0 });
    }
  });
};

module.exports = {
  updateLocationStatus,
  getLocations,
  createLocation,
  updateLocation,
  getLocationProfiles,
  setupInventoryReset
};