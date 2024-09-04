import api from './api';
import { ClientConfig, ClientMetrics } from '../types/clientTypes';

export const ClientService = {
  fetchClientConfig: async (): Promise<ClientConfig> => {
    const response = await api.get('/client-config');
    return response.data;
  },
  fetchClientMetrics: async (locationId: string): Promise<ClientMetrics> => {
    const response = await api.get(`/locations/${locationId}/client-metrics`);
    return response.data;
  },
  // ... other client-related methods
};
