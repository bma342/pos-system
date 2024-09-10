import axios from 'axios';
import { Location } from '../types/locationTypes';

export const fetchLocations = async (clientId: string): Promise<Location[]> => {
  const response = await axios.get(`/api/locations/${clientId}`);
  return response.data;
};

// Add other location-related API calls here

export const createLocation = async (location: Location): Promise<Location> => {
  const response = await axios.post('/api/locations', location);
  return response.data;
};

export const updateLocation = async (location: Location): Promise<Location> => {
  const response = await axios.put(`/api/locations/${location.id}`, location);
  return response.data;
};

export const deleteLocation = async (id: string): Promise<void> => {
  await axios.delete(`/api/locations/${id}`);
};
