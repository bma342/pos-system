import api from './axios';
import { Location } from '../types/locationTypes';

export const getLocations = async () => {
  return await api.get<Location[]>('/locations');
};

export const getLocationById = async (id: string) => {
  return await api.get<Location>(`/locations/${id}`);
};

// Add other location-related API calls as needed