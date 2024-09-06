import axios from 'axios';
import { ABTest } from '../types/abTestTypes';

export const ABTestService = {
  fetchABTests: async (clientId: string, locationId?: string): Promise<ABTest[]> => {
    const url = locationId 
      ? `/api/clients/${clientId}/locations/${locationId}/ab-tests`
      : `/api/clients/${clientId}/ab-tests`;
    const response = await axios.get(url);
    return response.data;
  },

  createABTest: async (clientId: string, locationId: string, abTest: Omit<ABTest, 'id'>): Promise<ABTest> => {
    const response = await axios.post(`/api/clients/${clientId}/locations/${locationId}/ab-tests`, abTest);
    return response.data;
  },

  updateABTest: async (clientId: string, locationId: string, abTestId: string, abTest: Partial<ABTest>): Promise<ABTest> => {
    const response = await axios.put(`/api/clients/${clientId}/locations/${locationId}/ab-tests/${abTestId}`, abTest);
    return response.data;
  },
};
