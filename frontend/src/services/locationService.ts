import axios from 'axios';
import { Location } from '../types/locationTypes';

export const locationService = {
  fetchLocations: async (clientId: string): Promise<Location[]> => {
    const response = await axios.get(`/api/clients/${clientId}/locations`);
    return response.data;
  },
};

