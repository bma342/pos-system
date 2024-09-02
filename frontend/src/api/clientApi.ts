import axios from 'axios';
import {
  Client,
  ClientPreferences,
  ClientBranding,
} from '../types/clientTypes';
import apiClient from './apiClient';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'https://api.eatsuite.net';

export const fetchClientId = async (): Promise<number | null> => {
  try {
    const response = await axios.get<number>('/api/clients/get-client-id');
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
    const response = await axios.put<Client>(
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
    await axios.delete(`/api/clients/${clientId}`);
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
  const response = await axios.put<Client>(
    `/api/clients/${clientId}/preferences`,
    preferences
  );
  return response.data;
};

export const fetchClientBySubdomain = async (
  subdomain: string
): Promise<Client> => {
  try {
    const response = await axios.get<Client>(
      `/api/clients/subdomain/${subdomain}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching client by subdomain:', error);
    throw error;
  }
};
