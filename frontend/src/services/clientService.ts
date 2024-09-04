import { fetchClientId, fetchClientData, fetchClientConfig, fetchClientMetrics } from '../api/clientApi';
import { ClientConfig, ClientMetrics } from '../types/clientTypes';

export const ClientService = {
  fetchClientConfig: async (): Promise<ClientConfig> => {
    const clientId = await fetchClientId();
    return fetchClientConfig(clientId?.toString() || '');
  },
  fetchClientMetrics: async (): Promise<ClientMetrics> => {
    const clientId = await fetchClientId();
    return fetchClientMetrics(clientId?.toString() || '');
  },
};
