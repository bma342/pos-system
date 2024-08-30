const locationService = require('../services/locationService');
const posSyncService = require('../services/posSyncService');
const logger = require('../services/logger');

// Create a new location
exports.createLocation = async (req, res) => {
  try {
    const { clientId } = req.user;
    const locationDetails = req.body;

    if (!locationDetails.name || !locationDetails.address) {
      return res.status(400).json({ message: 'Name and address are required fields.' });
    }

    const newLocation = await locationService.createLocation(clientId, locationDetails);

    if (newLocation.posProfileId) {
      await posSyncService.syncMenus(newLocation.posProfile);
      await posSyncService.syncInventory(newLocation.posProfile);
    }

    logger.info(`Location created: ${newLocation.name} (ID: ${newLocation.id}, Client ID: ${clientId})`);
    res.status(201).json(newLocation);
  } catch (error) {
    logger.error(`Error creating location: ${error.message}`, { clientId: req.user.clientId, ip: req.ip });
    res.status(500).json({ message: 'Error creating location', error });
  }
};

// Update an existing location
exports.updateLocation = async (req, res) => {
  try {
    const locationId = req.params.id;
    const locationDetails = req.body;

    if (!locationDetails.name || !locationDetails.address) {
      return res.status(400).json({ message: 'Name and address are required fields for updating.' });
    }

    const updatedLocation = await locationService.updateLocation(locationId, locationDetails);

    if (updatedLocation.posProfileId) {
      await posSyncService.syncMenus(updatedLocation.posProfile);
      await posSyncService.syncInventory(updatedLocation.posProfile);
    }

    logger.info(`Location updated: ${updatedLocation.name} (ID: ${updatedLocation.id})`);
    res.status(200).json(updatedLocation);
  } catch (error) {
    logger.error(`Error updating location (ID: ${req.params.id}): ${error.message}`, { ip: req.ip });
    res.status(500).json({ message: 'Error updating location', error });
  }
};

// Fetch all locations for a client
exports.getLocations = async (req, res) => {
  try {
    const clientId = req.user.clientId;
    const locations = await locationService.getLocations(clientId);
    res.status(200).json(locations);
  } catch (error) {
    logger.error(`Error fetching locations for client ID ${req.user.clientId}: ${error.message}`, { ip: req.ip });
    res.status(500).json({ message: 'Error fetching locations', error });
  }
};

// Fetch a single location by ID
exports.getLocationById = async (req, res) => {
  try {
    const locationId = req.params.id;
    const location = await locationService.getLocationById(locationId);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.status(200).json(location);
  } catch (error) {
    logger.error(`Error fetching location (ID: ${req.params.id}): ${error.message}`, { ip: req.ip });
    res.status(500).json({ message: 'Error fetching location', error });
  }
};

// Delete a location
exports.deleteLocation = async (req, res) => {
  try {
    const locationId = req.params.id;
    await locationService.deleteLocation(locationId);
    logger.info(`Location deleted: ID ${locationId}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting location (ID: ${req.params.id}): ${error.message}`, { ip: req.ip });
    res.status(500).json({ message: 'Error deleting location', error });
  }
};

// Create a drop-off spot for a location
exports.createDropOffSpot = async (req, res) => {
  try {
    const { locationId } = req.params;
    const spotDetails = req.body;
    const newDropOffSpot = await locationService.createDropOffSpot(locationId, spotDetails);
    logger.info(`Drop-off spot created for location ID ${locationId}`);
    res.status(201).json(newDropOffSpot);
  } catch (error) {
    logger.error(`Error creating drop-off spot for location ID ${req.params.locationId}: ${error.message}`, { ip: req.ip });
    res.status(500).json({ message: 'Error creating drop-off spot', error });
  }
};

// Update a drop-off spot
exports.updateDropOffSpot = async (req, res) => {
  try {
    const { spotId } = req.params;
    const spotDetails = req.body;
    const updatedSpot = await locationService.updateDropOffSpot(spotId, spotDetails);
    logger.info(`Drop-off spot updated: ID ${spotId}`);
    res.status(200).json(updatedSpot);
  } catch (error) {
    logger.error(`Error updating drop-off spot (ID: ${req.params.spotId}): ${error.message}`, { ip: req.ip });
    res.status(500).json({ message: 'Error updating drop-off spot', error });
  }
};

// Fetch all drop-off spots for a location
exports.getDropOffSpots = async (req, res) => {
  try {
    const { locationId } = req.params;
    const spots = await locationService.getDropOffSpots(locationId);
    res.status(200).json(spots);
  } catch (error) {
    logger.error(`Error fetching drop-off spots for location ID ${req.params.locationId}: ${error.message}`, { ip: req.ip });
    res.status(500).json({ message: 'Error fetching drop-off spots', error });
  }
};

// Delete a drop-off spot
exports.deleteDropOffSpot = async (req, res) => {
  try {
    const { spotId } = req.params;
    await locationService.deleteDropOffSpot(spotId);
    logger.info(`Drop-off spot deleted: ID ${spotId}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting drop-off spot (ID: ${req.params.spotId}): ${error.message}`, { ip: req.ip });
    res.status(500).json({ message: 'Error deleting drop-off spot', error });
  }
};
