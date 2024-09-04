import api from '../api/apiClient';
import { Review } from '../types/reviewTypes';

export const reviewService = {
  getReviews: async (itemId: string): Promise<Review[]> => {
    const response = await api.get(`/reviews/${itemId}`);
    return response.data;
  },
};
