import axios from 'axios';
import { Provider, ProviderIntegration } from '../types/providerTypes';

const BASE_URL = '/api/providers';

export const fetchProviders = async (clientId: string): Promise<Provider[]> => {
  const response = await axios.get(`${BASE_URL}`, { params: { clientId } });
  return response.data;
};

export const createProvider = async (provider: Omit<Provider, 'id'>): Promise<Provider> => {
  const response = await axios.post(`${BASE_URL}`, provider);
  return response.data;
};

export const updateProvider = async (providerId: string, provider: Partial<Provider>): Promise<Provider> => {
  const response = await axios.put(`${BASE_URL}/${providerId}`, provider);
  return response.data;
};

export const deleteProvider = async (providerId: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${providerId}`);
};

export const fetchProviderIntegrations = async (clientId: string): Promise<ProviderIntegration[]> => {
  const response = await axios.get(`${BASE_URL}/integrations`, { params: { clientId } });
  return response.data;
};

export const createProviderIntegration = async (integration: Omit<ProviderIntegration, 'id'>): Promise<ProviderIntegration> => {
  const response = await axios.post(`${BASE_URL}/integrations`, integration);
  return response.data;
};

export const updateProviderIntegration = async (integrationId: string, integration: Partial<ProviderIntegration>): Promise<ProviderIntegration> => {
  const response = await axios.put(`${BASE_URL}/integrations/${integrationId}`, integration);
  return response.data;
};

export const deleteProviderIntegration = async (integrationId: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/integrations/${integrationId}`);
};

export const syncProviderData = async (providerId: string): Promise<void> => {
  await axios.post(`${BASE_URL}/${providerId}/sync`);
};