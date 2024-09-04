import { Location } from '../types/locationTypes';
import apiClient from './apiClient';

export const getLocations = async (clientId: string): Promise<Location[]> => {
  const response = await apiClient.get<Location[]>(`/clients/${clientId}/locations`);
  return response.data;
};

export const getLocation = async (clientId: string, locationId: string): Promise<Location> => {
  const response = await apiClient.get<Location>(`/clients/${clientId}/locations/${locationId}`);
  return response.data;
};
