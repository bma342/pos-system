import api from '../api/apiClient';
import { Provider, PaginatedResponse } from '../types/providerTypes';

export const providerService = {
  getProviders: async ({ page, limit }: { page: number; limit: number }): Promise<PaginatedResponse<Provider>> => {
    const response = await api.get('/providers', { params: { page, limit } });
    return response.data;
  },
};
