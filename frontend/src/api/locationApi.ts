import apiClient from './apiClient';
import { Location, LocationCreateData } from '../types/locationTypes';

export const fetchLocations = async () => {
  return await apiClient.get<Location[]>('/api/locations');
};

export const createLocation = async (locationData: LocationCreateData) => {
  return await apiClient.post<Location>('/api/locations', locationData);
};

export const fetchLocationProfiles = async () => {
  return await apiClient.get('/api/location-profiles');
};
