import apiClient from './apiClient';
import { POSIntegration } from '../types/posIntegrationTypes';

export const getProfiles = async (clientId: string): Promise<POSIntegration[]> => {
  const response = await apiClient.get<POSIntegration[]>(`/clients/${clientId}/pos-integrations`);
  return response.data;
};

export const createProfile = async (clientId: string, profile: Omit<POSIntegration, 'id'>): Promise<POSIntegration> => {
  const response = await apiClient.post<POSIntegration>(`/clients/${clientId}/pos-integrations`, profile);
  return response.data;
};

export const updateProfile = async (clientId: string, id: string, profile: Partial<POSIntegration>): Promise<POSIntegration> => {
  const response = await apiClient.put<POSIntegration>(`/clients/${clientId}/pos-integrations/${id}`, profile);
  return response.data;
};

export const deleteProfile = async (clientId: string, id: string): Promise<void> => {
  await apiClient.delete(`/clients/${clientId}/pos-integrations/${id}`);
};

export const syncProfile = async (clientId: string, id: string): Promise<void> => {
  await apiClient.post(`/clients/${clientId}/pos-integrations/${id}/sync`);
};
