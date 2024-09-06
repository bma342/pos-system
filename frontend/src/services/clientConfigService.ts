import axios from 'axios';
import { ClientConfig } from '../types/clientTypes';

export const clientConfigService = {
  fetchClientConfig: async (clientId: string): Promise<ClientConfig> => {
    try {
      const response = await axios.get(`/api/clients/${clientId}/config`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch client config: ' + (error as Error).message);
    }
  },

  updateClientConfig: async (clientId: string, config: Partial<ClientConfig>): Promise<ClientConfig> => {
    try {
      const response = await axios.put(`/api/clients/${clientId}/config`, config);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update client config: ' + (error as Error).message);
    }
  }
};
