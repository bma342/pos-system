import apiClient from './axios';
import { Location } from '../types';

// Fetch all locations for a client
export const fetchLocations = async (): Promise<Location[]> => {
  const response = await apiClient.get<Location[]>('/api/locations');
  return response.data;
};

// Fetch a specific location by ID
export const fetchLocationById = async (
  locationId: number
): Promise<Location> => {
  const response = await apiClient.get<Location>(
    `/api/locations/${locationId}`
  );
  return response.data;
};

// Create a new location
export const createLocation = async (
  locationData: Partial<Location>
): Promise<Location> => {
  const response = await apiClient.post<Location>(
    '/api/locations/create',
    locationData
  );
  return response.data;
};

// Update an existing location
export const updateLocation = async (
  locationId: number,
  locationData: Partial<Location>
): Promise<Location> => {
  const response = await apiClient.put<Location>(
    `/api/locations/${locationId}`,
    locationData
  );
  return response.data;
};

// Delete a location
export const deleteLocation = async (locationId: number): Promise<void> => {
  await apiClient.delete(`/api/locations/${locationId}`);
};
