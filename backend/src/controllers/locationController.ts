import { Request, Response } from 'express';
import { Location } from '../models/Location';
import { updateLocationStatus, getLocations } from '../services/locationService';
import { AppError } from '../utils/errorHandler';

export const getLocations = async (req: Request, res: Response) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    logger.error('Error fetching locations:', error);
    res.status(500).json({ message: 'Error fetching locations' });
  }
};

export const createLocation = async (req: Request, res: Response) => {
  try {
    const location = new Location(req.body);
    await location.save();
    res.status(201).json(location);
  } catch (error) {
    logger.error('Error creating location:', error);
    res.status(500).json({ message: 'Error creating location' });
  }
};

export const changeLocationStatus = async (req: Request, res: Response) => {
  try {
    const { locationId, isOpen } = req.body;
    const updatedLocation = await updateLocationStatus(locationId, isOpen);
    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(500).json({ message: 'Error updating location status', error });
  }
};

export const getAllLocations = async (req: Request, res: Response) => {
  try {
    const locations = await getLocations();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching locations', error });
  }
};

// Implement other CRUD operations...

export const createLocationController = async (req: Request, res: Response) => {
  try {
    const locationData = req.body;
    const newLocation = await createLocation(locationData);
    res.status(201).json(newLocation);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error creating location' });
    }
  }
};

export const getLocationsController = async (req: Request, res: Response) => {
  try {
    const locations = await getLocations();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching locations' });
  }
};

export const getLocationProfilesController = async (req: Request, res: Response) => {
  try {
    const profiles = await getLocationProfiles();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching location profiles' });
  }
};