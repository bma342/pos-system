import api from './api';
import { ClientBranding } from '../types/clientTypes'; // Make sure to create this type

export const ClientBrandingService = {
  fetchClientBranding: async (clientId: string): Promise<ClientBranding> => {
    const response = await api.get(`/clients/${clientId}/branding`);
    return response.data;
  },
  updateClientBranding: async (clientId: string, brandingData: Partial<ClientBranding>): Promise<ClientBranding> => {
    const response = await api.patch(`/clients/${clientId}/branding`, brandingData);
    return response.data;
  },
};
