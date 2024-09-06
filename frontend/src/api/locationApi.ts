import axios from 'axios';
import { Location } from '../types/locationTypes';

export const getLocations = async (clientId: string): Promise<Location[]> => {
  try {
    const response = await axios.get(`/api/clients/${clientId}/locations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};

// Add other location-related API calls here
