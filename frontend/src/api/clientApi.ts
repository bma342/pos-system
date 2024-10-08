import axios from 'axios';
import {
  Client,
  ClientPreferences,
  ClientBranding,
} from '../types/clientTypes';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'https://api.eatsuite.net';

// Use API_BASE_URL in your axios calls
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Replace all axios calls with apiClient
export const fetchClientId = async (): Promise<number | null> => {
  try {
    const response = await apiClient.get<number>('/api/clients/get-client-id');
    return response.data;
  } catch (error) {
    console.error('Error fetching client ID:', error);
    return null;
  }
};

export const updateClientDetails = async (
  clientId: number,
  clientData: Partial<Client>
): Promise<Client | null> => {
  try {
    const response = await apiClient.put<Client>(
      `/api/clients/${clientId}`,
      clientData
    );
    return response.data;
  } catch (error) {
    console.error('Error updating client details:', error);
    return null;
  }
};

export const deleteClient = async (clientId: number): Promise<boolean> => {
  try {
    await apiClient.delete(`/api/clients/${clientId}`);
    return true;
  } catch (error) {
    console.error('Error deleting client:', error);
    return false;
  }
};

export const fetchClientBranding = async (): Promise<ClientBranding> => {
  try {
    const response = await apiClient.get('/api/client-branding');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch client branding');
  }
};

export const updateClientBranding = async (
  brandingData: ClientBranding
): Promise<ClientBranding> => {
  try {
    const response = await apiClient.put('/api/client-branding', brandingData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update client branding');
  }
};

export const createClient = async (clientData: Partial<Client>) => {
  try {
    const response = await apiClient.post<Client>('/api/clients', clientData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create client');
  }
};

export const updateClientPreferences = async (
  clientId: string,
  preferences: Partial<ClientPreferences>
): Promise<Client> => {
  const response = await apiClient.put<Client>(
    `/api/clients/${clientId}/preferences`,
    preferences
  );
  return response.data;
};

export const fetchClientBySubdomain = async (
  subdomain: string
): Promise<Client> => {
  try {
    const response = await apiClient.get<Client>(
      `/api/clients/subdomain/${subdomain}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching client by subdomain:', error);
    throw error;
  }
};

export const fetchClientConfig = async (clientId: string): Promise<ClientConfig> => {
  const response = await apiClient.get<ClientConfig>(`/clients/${clientId}/config`);
  return response.data;
};

export const updateClientConfig = async (clientId: string, config: Partial<ClientConfig>): Promise<ClientConfig> => {
  const response = await apiClient.put<ClientConfig>(`/clients/${clientId}/config`, config);
  return response.data;
};

export const fetchClientData = async (clientId: string): Promise<Client> => {
  const response = await apiClient.get<Client>(`/clients/${clientId}`);
  return response.data;
};

export const fetchClientMetrics = async (clientId: string): Promise<ClientMetrics> => {
  const response = await apiClient.get<ClientMetrics>(`/clients/${clientId}/metrics`);
  return response.data;
};
