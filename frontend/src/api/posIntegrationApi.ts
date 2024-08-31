import apiClient from './apiClient';

export const fetchPOSIntegrations = async () => {
  return await apiClient.get('/api/pos-integrations');
};
