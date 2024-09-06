import axios from 'axios';
import { POSProfile, POSIntegration } from '../types/posTypes';

const BASE_URL = '/api/pos-profiles';

export const fetchPOSProfiles = async (locationId: string): Promise<POSProfile[]> => {
  const response = await axios.get(`${BASE_URL}/location/${locationId}`);
  return response.data;
};

export const createPOSProfile = async (profile: Omit<POSProfile, 'id'>): Promise<POSProfile> => {
  const response = await axios.post(BASE_URL, profile);
  return response.data;
};

export const updatePOSProfile = async (id: string, profile: Partial<POSProfile>): Promise<POSProfile> => {
  const response = await axios.put(`${BASE_URL}/${id}`, profile);
  return response.data;
};

export const deletePOSProfile = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};

// New functions for POS Integrations
export const fetchPOSIntegrations = async (): Promise<POSIntegration[]> => {
  const response = await axios.get(`${BASE_URL}/integrations`);
  return response.data;
};

export const fetchPOSIntegration = async (id: string): Promise<POSIntegration> => {
  const response = await axios.get(`${BASE_URL}/integrations/${id}`);
  return response.data;
};

export const createPOSIntegration = async (integration: Omit<POSIntegration, 'id'>): Promise<POSIntegration> => {
  const response = await axios.post(`${BASE_URL}/integrations`, integration);
  return response.data;
};

export const updatePOSIntegration = async (id: string, integration: Partial<POSIntegration>): Promise<POSIntegration> => {
  const response = await axios.put(`${BASE_URL}/integrations/${id}`, integration);
  return response.data;
};

export const deletePOSIntegration = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/integrations/${id}`);
};