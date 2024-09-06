import axios from 'axios';
import { POSIntegration } from '../types/posIntegrationTypes';

export const posIntegrationService = {
  fetchPOSIntegrations: async (clientId: string, locationId?: string): Promise<POSIntegration[]> => {
    const url = locationId 
      ? `/api/clients/${clientId}/locations/${locationId}/pos-integrations`
      : `/api/clients/${clientId}/pos-integrations`;
    const response = await axios.get(url);
    return response.data;
  },

  createPOSIntegration: async (clientId: string, integration: Omit<POSIntegration, 'id'>): Promise<POSIntegration> => {
    try {
      const response = await axios.post(`/api/clients/${clientId}/pos-integrations`, integration);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create POS integration: ' + (error as Error).message);
    }
  },

  updatePOSIntegration: async (clientId: string, integrationId: string, integration: Partial<POSIntegration>): Promise<POSIntegration> => {
    try {
      const response = await axios.put(`/api/clients/${clientId}/pos-integrations/${integrationId}`, integration);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update POS integration: ' + (error as Error).message);
    }
  },

  deletePOSIntegration: async (clientId: string, integrationId: string): Promise<void> => {
    try {
      await axios.delete(`/api/clients/${clientId}/pos-integrations/${integrationId}`);
    } catch (error) {
      throw new Error('Failed to delete POS integration: ' + (error as Error).message);
    }
  },

  syncPOSData: async (clientId: string, locationId: string, integrationType: string): Promise<void> => {
    try {
      await axios.post(`/api/clients/${clientId}/locations/${locationId}/pos-sync`, { integrationType });
    } catch (error) {
      throw new Error('Failed to sync POS data: ' + (error as Error).message);
    }
  }
};
