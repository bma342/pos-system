import axios from 'axios';
import { Provider } from '../types/providerTypes';

export const providerApi = {
  getProviders: async (clientId: string): Promise<Provider[]> => {
    const response = await axios.get(`/api/providers/${clientId}`);
    return response.data;
  },
  // Add other provider-related API calls here
};