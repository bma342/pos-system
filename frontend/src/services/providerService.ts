import axios, { AxiosError } from 'axios';
import type { Provider, PaginatedResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

class ProviderService {
  private async request<T>(
    endpoint: string,
    method: string = 'GET',
    data?: any,
    params?: Record<string, string | number>
  ): Promise<T> {
    try {
      const response = await axios({
        method,
        url: `${API_BASE_URL}${endpoint}`,
        data,
        params,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const errorMessage = (axiosError.response.data as { message?: string }).message || axiosError.message;
          throw new Error(errorMessage);
        }
      }
      throw error;
    }
  }

  async getProviders(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Provider>> {
    return this.request<PaginatedResponse<Provider>>('/providers', 'GET', undefined, { page, limit });
  }

  async getProvider(id: string): Promise<Provider> {
    return this.request<Provider>(`/providers/${id}`);
  }

  async createProvider(provider: Omit<Provider, 'id'>): Promise<Provider> {
    return this.request<Provider>('/providers', 'POST', provider);
  }

  async updateProvider(id: string, provider: Partial<Provider>): Promise<Provider> {
    return this.request<Provider>(`/providers/${id}`, 'PUT', provider);
  }

  async deleteProvider(id: string): Promise<void> {
    await this.request<void>(`/providers/${id}`, 'DELETE');
  }

  async searchProviders(query: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<Provider>> {
    return this.request<PaginatedResponse<Provider>>('/providers/search', 'GET', undefined, { query, page, limit });
  }

  async bulkDeleteProviders(ids: string[]): Promise<void> {
    await this.request<void>('/providers/bulk-delete', 'POST', { ids });
  }

  async getProviderStats(): Promise<{ totalProviders: number; activeProviders: number }> {
    return this.request<{ totalProviders: number; activeProviders: number }>('/providers/stats');
  }
}

export const providerService = new ProviderService();
