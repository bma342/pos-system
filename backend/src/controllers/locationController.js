const { Location } = require('../models');
const locationService = require('../services/locationService');
const { AppError } = require('../utils/errorHandler');

const getLocationsController = async (req, res) => {
  try {
    const locations = await locationService.getLocations();
    res.json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ message: 'Error fetching locations' });
  }
};

const createLocationController = async (req, res) => {
  try {
    const location = await locationService.createLocation(req.body);
    res.status(201).json(location);
  } catch (error) {
    console.error('Error creating location:', error);
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error creating location' });
    }
  }
};

const changeLocationStatusController = async (req, res) => {
  try {
    const { locationId, isOpen } = req.body;
    const updatedLocation = await locationService.updateLocationStatus(locationId, isOpen);
    res.status(200).json(updatedLocation);
  } catch (error) {
    console.error('Error updating location status:', error);
    res.status(500).json({ message: 'Error updating location status' });
  }
};

const getAllLocationsController = async (req, res) => {
  try {
    const locations = await locationService.getLocations();
    res.status(200).json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ message: 'Error fetching locations' });
  }
};

const getLocationProfilesController = async (req, res) => {
  try {
    const profiles = await locationService.getLocationProfiles();
    res.status(200).json(profiles);
  } catch (error) {
    console.error('Error fetching location profiles:', error);
    res.status(500).json({ message: 'Error fetching location profiles' });
  }
};

module.exports = {
  getLocationsController,
  createLocationController,
  changeLocationStatusController,
  getAllLocationsController,
  getLocationProfilesController
};