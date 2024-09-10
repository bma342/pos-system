import axios from 'axios';

export const POSIntegrationService = {
  syncDiscounts: async (clientId: string) => {
    const response = await axios.post(`/api/pos-integration/${clientId}/sync-discounts`);
    return response.data;
  },
};