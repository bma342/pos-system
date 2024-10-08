import { ABTest } from '../types/abTestTypes';
import apiClient from './apiClient';

export const fetchABTests = async (clientId: string): Promise<ABTest[]> => {
  const response = await apiClient.get<ABTest[]>(`/clients/${clientId}/ab-tests`);
  return response.data;
};

export const createABTest = async (clientId: string, abTest: Omit<ABTest, 'id'>): Promise<ABTest> => {
  const response = await apiClient.post<ABTest>(`/clients/${clientId}/ab-tests`, abTest);
  return response.data;
};

export const updateABTest = async (clientId: string, abTest: ABTest): Promise<ABTest> => {
  const response = await apiClient.put<ABTest>(`/clients/${clientId}/ab-tests/${abTest.id}`, abTest);
  return response.data;
};

// Keep the existing abTestApi object
export const abTestApi = {
  getABTests: async (): Promise<ABTest[]> => {
    try {
      const response = await apiClient.get<ABTest[]>('/ab-tests');
      return response.data;
    } catch (error) {
      console.error('Error fetching AB tests:', error);
      throw error;
    }
  },

  getABTest: async (id: number): Promise<ABTest> => {
    try {
      const response = await apiClient.get<ABTest>(`/ab-tests/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching AB test with id ${id}:`, error);
      throw error;
    }
  },

  createABTest: async (abTest: Omit<ABTest, 'id'>): Promise<ABTest> => {
    try {
      const response = await apiClient.post<ABTest>('/ab-tests', abTest);
      return response.data;
    } catch (error) {
      console.error('Error creating AB test:', error);
      throw error;
    }
  },

  updateABTest: async (abTest: ABTest): Promise<ABTest> => {
    try {
      const response = await apiClient.put<ABTest>(`/ab-tests/${abTest.id}`, abTest);
      return response.data;
    } catch (error) {
      console.error(`Error updating AB test with id ${abTest.id}:`, error);
      throw error;
    }
  },

  deleteABTest: async (id: string): Promise<void> => {
    await apiClient.delete(`/ab-tests/${id}`);
  },

  getABTestResults: async (id: number): Promise<any> => {
    try {
      const response = await apiClient.get(`/ab-tests/${id}/results`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching results for AB test with id ${id}:`, error);
      throw error;
    }
  },
};
