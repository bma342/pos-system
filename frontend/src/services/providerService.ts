import axios from 'axios';
import { Provider, PaginatedResponse } from '../types/providerTypes';

export const providerService = {
  getProviders: async (clientId: string, params: { page: number; limit: number }): Promise<PaginatedResponse<Provider>> => {
    try {
      const response = await axios.get(`/api/clients/${clientId}/providers`, { params });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch providers: ' + (error as Error).message);
    }
  },

  createProvider: async (clientId: string, providerData: Omit<Provider, 'id'>): Promise<Provider> => {
    try {
      const response = await axios.post(`/api/clients/${clientId}/providers`, providerData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create provider: ' + (error as Error).message);
    }
  },

  updateProvider: async (clientId: string, providerId: string, providerData: Partial<Provider>): Promise<Provider> => {
    try {
      const response = await axios.put(`/api/clients/${clientId}/providers/${providerId}`, providerData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update provider: ' + (error as Error).message);
    }
  },

  deleteProvider: async (clientId: string, providerId: string): Promise<void> => {
    try {
      await axios.delete(`/api/clients/${clientId}/providers/${providerId}`);
    } catch (error) {
      throw new Error('Failed to delete provider: ' + (error as Error).message);
    }
  },

  getProviderStats: async (clientId: string, providerId: string): Promise<any> => {
    try {
      const response = await axios.get(`/api/clients/${clientId}/providers/${providerId}/stats`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch provider stats: ' + (error as Error).message);
    }
  }
};
