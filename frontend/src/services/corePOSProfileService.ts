import axios from 'axios';
import { POSProfile, POSIntegration } from '../types/posTypes';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

export const corePOSProfileService = {
  async getCorePOSProfiles(clientId: string): Promise<POSProfile[]> {
    const response = await axios.get<POSProfile[]>(`${API_BASE_URL}/clients/${clientId}/core-pos-profiles`);
    return response.data;
  },

  async getCorePOSProfile(clientId: string, profileId: string): Promise<POSProfile> {
    const response = await axios.get<POSProfile>(`${API_BASE_URL}/clients/${clientId}/core-pos-profiles/${profileId}`);
    return response.data;
  },

  async createCorePOSProfile(clientId: string, profile: Omit<POSProfile, 'id'>): Promise<POSProfile> {
    const response = await axios.post<POSProfile>(`${API_BASE_URL}/clients/${clientId}/core-pos-profiles`, profile);
    return response.data;
  },

  async updateCorePOSProfile(clientId: string, profileId: string, profile: Partial<POSProfile>): Promise<POSProfile> {
    const response = await axios.put<POSProfile>(`${API_BASE_URL}/clients/${clientId}/core-pos-profiles/${profileId}`, profile);
    return response.data;
  },

  async deleteCorePOSProfile(clientId: string, profileId: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/clients/${clientId}/core-pos-profiles/${profileId}`);
  },

  async getPOSIntegrations(clientId: string, locationId: string): Promise<POSIntegration[]> {
    const response = await axios.get<POSIntegration[]>(`${API_BASE_URL}/clients/${clientId}/locations/${locationId}/pos-integrations`);
    return response.data;
  },

  async getPOSIntegration(clientId: string, locationId: string, integrationId: string): Promise<POSIntegration> {
    const response = await axios.get<POSIntegration>(`${API_BASE_URL}/clients/${clientId}/locations/${locationId}/pos-integrations/${integrationId}`);
    return response.data;
  },

  async createPOSIntegration(clientId: string, locationId: string, integration: Omit<POSIntegration, 'id'>): Promise<POSIntegration> {
    const response = await axios.post<POSIntegration>(`${API_BASE_URL}/clients/${clientId}/locations/${locationId}/pos-integrations`, integration);
    return response.data;
  },

  async updatePOSIntegration(clientId: string, locationId: string, integrationId: string, integration: Partial<POSIntegration>): Promise<POSIntegration> {
    const response = await axios.put<POSIntegration>(`${API_BASE_URL}/clients/${clientId}/locations/${locationId}/pos-integrations/${integrationId}`, integration);
    return response.data;
  },

  async deletePOSIntegration(clientId: string, locationId: string, integrationId: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/clients/${clientId}/locations/${locationId}/pos-integrations/${integrationId}`);
  },
};
