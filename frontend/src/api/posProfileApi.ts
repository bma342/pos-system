import axios from 'axios';
import { POSProfile, POSIntegration } from '../types/posTypes';

const BASE_URL = '/api/pos-profiles';

export const fetchPOSProfiles = async (clientId: string): Promise<POSProfile[]> => {
  const response = await axios.get(`${BASE_URL}`, { params: { clientId } });
  return response.data;
};

export const createPOSProfile = async (profile: Omit<POSProfile, 'id'>): Promise<POSProfile> => {
  const response = await axios.post(`${BASE_URL}`, profile);
  return response.data;
};

export const updatePOSProfile = async (profileId: string, profile: Partial<POSProfile>): Promise<POSProfile> => {
  const response = await axios.put(`${BASE_URL}/${profileId}`, profile);
  return response.data;
};

export const deletePOSProfile = async (profileId: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${profileId}`);
};

export const fetchPOSIntegrations = async (clientId: string): Promise<POSIntegration[]> => {
  const response = await axios.get(`${BASE_URL}/integrations`, { params: { clientId } });
  return response.data;
};

export const createPOSIntegration = async (integration: Omit<POSIntegration, 'id'>): Promise<POSIntegration> => {
  const response = await axios.post(`${BASE_URL}/integrations`, integration);
  return response.data;
};

export const updatePOSIntegration = async (integrationId: string, integration: Partial<POSIntegration>): Promise<POSIntegration> => {
  const response = await axios.put(`${BASE_URL}/integrations/${integrationId}`, integration);
  return response.data;
};

export const deletePOSIntegration = async (integrationId: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/integrations/${integrationId}`);
};

export const syncPOSProfile = async (profileId: string): Promise<void> => {
  await axios.post(`${BASE_URL}/${profileId}/sync`);
};

export const fetchPOSProfile = async (clientId: string, locationId: string, profileId: string): Promise<POSProfile> => {
  const response = await axios.get(`${BASE_URL}/clients/${clientId}/locations/${locationId}/pos-profiles/${profileId}`);
  return response.data;
};

export const fetchPOSIntegration = async (clientId: string, integrationId: string): Promise<POSIntegration> => {
  const response = await axios.get(`${BASE_URL}/clients/${clientId}/pos-integrations/${integrationId}`);
  return response.data;
};