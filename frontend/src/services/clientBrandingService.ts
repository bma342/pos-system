import axios from 'axios';
import { ClientBranding } from '../types/clientTypes';

export const ClientBrandingService = {
  fetchClientBranding: async (clientId: string): Promise<ClientBranding> => {
    try {
      const response = await axios.get(`/api/clients/${clientId}/branding`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch client branding: ' + (error as Error).message);
    }
  },

  updateClientBranding: async (clientId: string, brandingData: Partial<ClientBranding>): Promise<ClientBranding> => {
    try {
      const response = await axios.put(`/api/clients/${clientId}/branding`, brandingData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update client branding: ' + (error as Error).message);
    }
  }
};
