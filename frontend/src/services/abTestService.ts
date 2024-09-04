import { ABTest } from '../types/abTestTypes';
import { fetchABTests, createABTest, updateABTest } from '../api/abTestApi';

export const ABTestService = {
  fetchABTests,
  createABTest,
  updateABTest,
};
