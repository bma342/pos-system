import axios from 'axios';
import { ABTest } from '../types';

const API_URL = '/api/ab-tests';

export const abTestService = {
  getABTests: async (): Promise<ABTest[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  createABTest: async (testData: Partial<ABTest>): Promise<ABTest> => {
    const response = await axios.post(API_URL, testData);
    return response.data;
  },

  updateABTest: async (testData: ABTest): Promise<ABTest> => {
    const response = await axios.put(`${API_URL}/${testData.id}`, testData);
    return response.data;
  },

  deleteABTest: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};
