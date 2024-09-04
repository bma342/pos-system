import api from './api';
import { ABTest } from '../types/abTestTypes';

export const ABTestService = {
  fetchABTests: async (): Promise<ABTest[]> => {
    const response = await api.get('/ab-tests');
    return response.data;
  },
  createABTest: async (abTest: Omit<ABTest, 'id'>): Promise<ABTest> => {
    const response = await api.post('/ab-tests', abTest);
    return response.data;
  },
  updateABTest: async (id: string, abTest: Partial<ABTest>): Promise<ABTest> => {
    const response = await api.put(`/ab-tests/${id}`, abTest);
    return response.data;
  },
};
