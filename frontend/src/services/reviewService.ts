import api from './api';
import { Review } from '../types/reviewTypes';

export const reviewService = {
  getReviews: async (itemId: string): Promise<Review[]> => {
    const response = await api.get(`/reviews/${itemId}`);
    return response.data;
  },
  // Add other review-related methods as needed
};
